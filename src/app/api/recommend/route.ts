import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

function buildOpenAiPrompt(args: {
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
- For numeric fields (ram_gb, storage_gb, display.size_inches, display.refresh_hz, weight_kg, thickness_mm, battery_wh, claimed_hours, release_year, score, over_budget_by, price.amount) use null when unknown (do NOT write the word unknown for numbers).
- Return ONLY the JSON object, nothing else.`;
}
export async function POST(request: NextRequest) {
  try {
    // Get user session (optional)
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Parse request body
    const body = await request.json();
    const { productType, purpose, budget, parameters, customPurpose } = body;

    // Validate required fields
    if (!productType || !purpose || !budget || !parameters || parameters.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate budget
    if (typeof budget !== 'number' || budget <= 0) {
      return NextResponse.json({ error: 'Invalid budget' }, { status: 400 });
    }

    // Validate parameters
    if (!Array.isArray(parameters) || parameters.length > 3) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Build OpenAI prompt
    const prompt = buildOpenAiPrompt({
      device_type: productType,
      use_case: customPurpose || purpose,
      budget_eur: budget,
      important_params: parameters,
    });

    // Decide whether to mock OpenAI response
    const useMock =
      process.env.NEXT_PUBLIC_MOCK_OPENAI === 'true' || process.env.OPEN_AI_KEY === 'mock';

    let parsed: unknown;
    if (useMock) {
      const isCamera = String(productType).toLowerCase() === 'camera';
      if (isCamera) {
        // Camera mock provided by user
        parsed = {
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
        } as unknown;
      } else {
        // Default laptop mock tailored to provided inputs
        parsed = {
          query: {
            device_type: productType,
            use_case: customPurpose || purpose,
            budget_eur: budget,
            important_params: parameters,
          },
          results: [
            {
              device_name: 'ASUS ROG Zephyrus G14',
              type: 'laptop',
              price: { amount: Math.min(budget, 1999), currency: 'EUR', price_note: 'msrp' },
              parameters: [
                { name: 'screen', exists: 'true', detail: '14-inch QHD 120Hz' },
                { name: 'portability', exists: 'true', detail: 'Lightweight and compact' },
                { name: 'battery', exists: 'true', detail: 'Up to 10 hours' },
              ],
            },
            {
              device_name: 'Razer Blade 15',
              type: 'laptop',
              price: { amount: budget, currency: 'EUR', price_note: 'street' },
              parameters: [
                { name: 'screen', exists: 'true', detail: '15.6-inch 144Hz' },
                { name: 'portability', exists: 'true', detail: 'Slim, lightweight' },
                { name: 'battery', exists: 'unknown', detail: 'unknown' },
              ],
            },
            {
              device_name: 'MSI GS66 Stealth',
              type: 'laptop',
              price: { amount: Math.round(budget * 1.05), currency: 'EUR', price_note: 'msrp' },
              parameters: [
                { name: 'screen', exists: 'true', detail: '15.6-inch QHD 240Hz' },
                { name: 'portability', exists: 'true', detail: 'Thin and portable' },
                { name: 'battery', exists: 'unknown', detail: 'unknown' },
              ],
            },
            {
              device_name: 'Dell Alienware m15 R6',
              type: 'laptop',
              price: { amount: budget, currency: 'EUR', price_note: 'street' },
              parameters: [
                { name: 'screen', exists: 'true', detail: '165Hz Full HD' },
                { name: 'portability', exists: 'false', detail: 'Heavier chassis' },
                { name: 'battery', exists: 'unknown', detail: 'unknown' },
              ],
            },
          ],
        } as unknown;
      }
    } else {
      // Call OpenAI (Responses are JSON only per prompt)
      const apiKey = process.env.OPEN_AI_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
      }

      let content = '{}';
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
        });
        content = completion.choices?.[0]?.message?.content ?? '{}';
      } catch (e) {
        console.error('OpenAI SDK error:', e);
        return NextResponse.json(
          { error: 'AI generation failed', message: (e as Error).message },
          { status: 502 }
        );
      }

      try {
        // Some models may emit bare unknown for numeric fields. Normalize to null.
        const sanitize = (s: string) => s.replace(/:\s*unknown(\s*[,\}])/g, ': null$1');
        const normalized = sanitize(content);
        parsed = JSON.parse(normalized);
      } catch {
        const match = content.match(/\{[\s\S]*\}/);
        if (match) {
          const normalized = match[0].replace(/:\s*unknown(\s*[,\}])/g, ': null$1');
          parsed = JSON.parse(normalized);
        } else {
          parsed = null;
        }
      }
    }

    // Save recommendation to database (optional)
    let recommendation: { id?: string } | null = null;
    if (user?.id) {
      const { data, error: dbError } = await supabase
        .from('recommendations')
        .insert({
          user_id: user.id,
          product_type: productType,
          purpose: purpose,
          budget: budget,
          parameters: parameters,
          custom_purpose: customPurpose,
          recommendations: parsed,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
      }
      recommendation = data;
    }

    return NextResponse.json({
      id: recommendation?.id || 'ai-generated',
      recommendations: parsed,
      message: 'Recommendations generated successfully',
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 }
    );
  }
}

// Mock generator removed; now using OpenAI exclusively

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Implement logic to fetch user's previous recommendations
    return NextResponse.json({ message: 'Recommendation history endpoint' });
  } catch (error) {
    console.error('Recommendation history API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
