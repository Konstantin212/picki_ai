import { useApiMutation } from '@/hooks/use-mutation';

type RecommendPayload = {
  productType: string;
  purpose: string;
  budget: number | null;
  parameters: string[] | null;
  customPurpose?: string | null | undefined;
};

type RecommendResponse = {
  id: string;
  recommendations?: unknown;
  message?: string;
};

export function useRecommendMutation() {
  return useApiMutation<RecommendResponse, RecommendPayload>(async (payload) => {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to get recommendations');
    }
    return res.json();
  });
}
