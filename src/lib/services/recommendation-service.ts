import { openai } from '@/lib/openai';
import { ApiError } from '@/lib/api/errors';

export type RecommendInput = {
  productType: string;
  purpose: string;
  budget: number;
  parameters: string[];
  customPurpose?: string | null;
};

export async function generateRecommendations(input: RecommendInput) {
  const { productType, purpose, budget, parameters, customPurpose } = input;

  if (
    !productType ||
    !purpose ||
    !budget ||
    !Array.isArray(parameters) ||
    parameters.length === 0
  ) {
    throw new ApiError(400, 'Invalid input');
  }

  const prompt = buildPrompt({
    device_type: productType,
    use_case: customPurpose || purpose,
    budget_eur: budget,
    important_params: parameters,
  });

  const useMock =
    process.env.NEXT_PUBLIC_MOCK_OPENAI === 'true' || process.env.OPEN_AI_KEY === 'mock';

  if (useMock) {
    return buildMockResponse(input);
  }

  if (!process.env.OPEN_AI_KEY) {
    throw new ApiError(500, 'Missing OpenAI API key');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });
    const content = completion.choices?.[0]?.message?.content ?? '{}';
    const normalized = content.replace(/:\s*unknown(\s*[,\}])/g, ': null$1');
    return JSON.parse(normalized);
  } catch {
    throw new ApiError(502, 'AI generation failed', 'openai_error');
  }
}

function buildPrompt(args: {
  device_type: string;
  use_case: string;
  budget_eur: number;
  important_params: string[];
}) {
  const { device_type, use_case, budget_eur, important_params } = args;
  return `You are a device-recommender for consumer laptops/smartphones/smartwatches. 
Return EXACTLY 4 recommendations in strict JSON, ordered best→worst (index 0 is best).
Context & rules:
- Inputs come as: productType, purpose, budget (EUR), parameters (array of user priorities).
- Market: EU/Germany; prices in EUR. Prefer models released in the last 24 months.
- Do not invent facts. If unknown, write "unknown".
- Map user parameters to concrete checks:
  • "screen" → display.size_inches, resolution, refresh_hz, panel_type
  • "portability" → weight_kg, thickness_mm
  • "battery" → battery_wh, claimed_hours
- Always include: GPU, CPU, RAM_GB, storage_GB, display fields above, weight_kg, battery_wh (or "unknown"), ports_note, release_year.
- Scoring (internal, do not output the math): 
  1) Use-case fit (e.g., for gaming: GPU tier and cooling) – 40%
  2) Parameters coverage truthiness (true>partial>unknown>false) – 25%
  3) Price fit vs budget (<=budget best; allow up to +10% if overall score high) – 20%
  4) Display quality for gaming (refresh/resolution/panel) – 10%
  5) Portability & battery as applicable – 5%
- If price > budget, include over_budget_by (EUR) and penalize score.
- Provide compact explanations: one-line "why_ranked" for each item.
- Also provide a top-level "overall_conclusion" that explains why item[0] is best for the stated purpose & parameters.
- Output STRICTLY the JSON object described below. No extra text.
 ;;;; and this output prompt: Evaluate this request and return ONLY JSON.

Input:
{
  "productType": "${device_type}",
  "purpose": "${use_case}",
  "budget": ${budget_eur},
  "parameters": ${JSON.stringify(important_params)}
}

Output schema (use exactly these keys):
{
  "query": {
    "device_type": "string",
    "use_case": "string",
    "budget_eur": number,
    "important_params": ["string"]
  },
  "results": [
    {
      "device_name": "string",
      "type": "string",
      "price": { "amount": number|null, "currency": "EUR", "price_note": "msrp|street|unknown" },
      "over_budget_by": number|null,
      "specs": {
        "gpu": "string|unknown",
        "cpu": "string|unknown",
        "ram_gb": number|null,
        "storage_gb": number|null,
        "display": {
          "size_inches": number|null,
          "resolution": "string|unknown",
          "refresh_hz": number|null,
          "panel_type": "IPS|OLED|VA|unknown"
        },
        "weight_kg": number|null,
        "thickness_mm": number|null,
        "battery_wh": number|null,
        "claimed_hours": number|null,
        "ports_note": "string|unknown",
        "release_year": number|null
      },
      "parameters_check": [
        { "name": "screen", "exists": "true|partial|false|unknown", "detail": "string|null" },
        { "name": "portability", "exists": "true|partial|false|unknown", "detail": "string|null" },
        { "name": "battery", "exists": "true|partial|false|unknown", "detail": "string|null" }
      ],
      "score": number,
      "why_ranked": "short reason"
    },
    { /* item 2 */ },
    { /* item 3 */ },
    { /* item 4 */ }
  ],
  "overall_conclusion": "1–3 sentences explaining why item[0] is the best fit given purpose, budget, and parameters."
}

Constraints:
- Exactly 4 items.
- Prices in EUR. If unknown, set amount:null and price_note:"unknown".
- Keep explanations concise.
- For numeric fields use null when unknown (do NOT write the word unknown for numbers).
- Return ONLY the JSON object, nothing else.`;
}

function buildMockResponse(input: RecommendInput) {
  const { productType, purpose, budget, parameters } = input;
  if (String(productType).toLowerCase() === 'camera') {
    return {
      query: {
        device_type: 'camera',
        use_case: 'photography',
        budget_eur: 500,
        important_params: ['performance', 'camera', 'portability'],
      },
      results: [
        {
          device_name: 'Canon EOS M50 Mark II',
          type: 'mirrorless camera',
          price: { amount: 499, currency: 'EUR', price_note: 'msrp' },
          over_budget_by: null,
          specs: {
            gpu: 'unknown',
            cpu: 'DIGIC 8',
            ram_gb: null,
            storage_gb: null,
            display: {
              size_inches: 3,
              resolution: '1920x1080',
              refresh_hz: null,
              panel_type: 'unknown',
            },
            weight_kg: 0.387,
            thickness_mm: 116.3,
            battery_wh: 10.4,
            claimed_hours: 1,
            ports_note: 'USB-C, HDMI',
            release_year: 2020,
          },
          parameters_check: [
            { name: 'screen', exists: 'partial', detail: '3-inch display, 1080p resolution' },
            { name: 'portability', exists: 'true', detail: 'lightweight and compact' },
            { name: 'battery', exists: 'partial', detail: 'battery life claimed at 1 hour' },
          ],
          score: 85,
          why_ranked: 'Great performance for photography and very portable.',
        },
        {
          device_name: 'Sony Alpha a6100',
          type: 'mirrorless camera',
          price: { amount: 549, currency: 'EUR', price_note: 'street' },
          over_budget_by: 49,
          specs: {
            gpu: 'unknown',
            cpu: 'BIONZ X',
            ram_gb: null,
            storage_gb: null,
            display: {
              size_inches: 3,
              resolution: '1920x1080',
              refresh_hz: null,
              panel_type: 'unknown',
            },
            weight_kg: 0.396,
            thickness_mm: 66.9,
            battery_wh: 11.5,
            claimed_hours: 1,
            ports_note: 'USB-C, HDMI',
            release_year: 2019,
          },
          parameters_check: [
            { name: 'screen', exists: 'partial', detail: '3-inch display, 1080p resolution' },
            { name: 'portability', exists: 'true', detail: 'lightweight and compact' },
            { name: 'battery', exists: 'partial', detail: 'battery life claimed at 1 hour' },
          ],
          score: 80,
          why_ranked: 'Excellent autofocus and image quality, but slightly over budget.',
        },
        {
          device_name: 'Nikon Z50',
          type: 'mirrorless camera',
          price: { amount: 599, currency: 'EUR', price_note: 'street' },
          over_budget_by: 99,
          specs: {
            gpu: 'unknown',
            cpu: 'EXPEED 6',
            ram_gb: null,
            storage_gb: null,
            display: {
              size_inches: 3.2,
              resolution: '1920x1080',
              refresh_hz: null,
              panel_type: 'unknown',
            },
            weight_kg: 0.396,
            thickness_mm: 73,
            battery_wh: 11.5,
            claimed_hours: 1,
            ports_note: 'USB-C, HDMI',
            release_year: 2019,
          },
          parameters_check: [
            { name: 'screen', exists: 'partial', detail: '3.2-inch display, 1080p resolution' },
            { name: 'portability', exists: 'true', detail: 'lightweight and compact' },
            { name: 'battery', exists: 'partial', detail: 'battery life claimed at 1 hour' },
          ],
          score: 75,
          why_ranked: 'Good performance but exceeds budget significantly.',
        },
        {
          device_name: 'Fujifilm X-T200',
          type: 'mirrorless camera',
          price: { amount: 499, currency: 'EUR', price_note: 'msrp' },
          over_budget_by: null,
          specs: {
            gpu: 'unknown',
            cpu: 'X-Processor Pro',
            ram_gb: null,
            storage_gb: null,
            display: {
              size_inches: 3.5,
              resolution: '1920x1080',
              refresh_hz: null,
              panel_type: 'unknown',
            },
            weight_kg: 0.332,
            thickness_mm: 83.7,
            battery_wh: 10.4,
            claimed_hours: 1,
            ports_note: 'USB-C, HDMI',
            release_year: 2020,
          },
          parameters_check: [
            { name: 'screen', exists: 'partial', detail: '3.5-inch display, 1080p resolution' },
            { name: 'portability', exists: 'true', detail: 'very lightweight' },
            { name: 'battery', exists: 'partial', detail: 'battery life claimed at 1 hour' },
          ],
          score: 70,
          why_ranked: 'Lightweight and affordable, but performance is not as strong.',
        },
      ],
      overall_conclusion:
        'The Canon EOS M50 Mark II is the best fit for photography within the budget, offering excellent performance, portability, and a good display for capturing high-quality images.',
    };
  }

  // Basic laptop mock
  return {
    query: {
      device_type: productType,
      use_case: purpose,
      budget_eur: budget,
      important_params: parameters,
    },
    results: [
      {
        device_name: 'ASUS ROG Zephyrus G14',
        type: 'laptop',
        price: { amount: budget, currency: 'EUR', price_note: 'msrp' },
      },
      {
        device_name: 'Razer Blade 15',
        type: 'laptop',
        price: { amount: budget, currency: 'EUR', price_note: 'street' },
      },
      {
        device_name: 'MSI GS66 Stealth',
        type: 'laptop',
        price: { amount: budget, currency: 'EUR', price_note: 'msrp' },
      },
      {
        device_name: 'Dell Alienware m15 R6',
        type: 'laptop',
        price: { amount: budget, currency: 'EUR', price_note: 'street' },
      },
    ],
  };
}
