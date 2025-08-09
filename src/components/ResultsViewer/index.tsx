'use client';

import { useSearchParams } from 'next/navigation';
import { useRecommendationResultsStore } from '@/lib/stores/use-recommendation-results';
import { Typography } from '@/components/ui/Typography';

export const ResultsViewer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('recommendationId') || '';
  const data = useRecommendationResultsStore((s) => s.get(id));

  if (!id) {
    return <Typography variant="body1">No recommendation id provided.</Typography>;
  }

  if (!data) {
    return (
      <Typography variant="body2" color="secondary">
        No cached results found. If this is a refresh, the server will soon expose a history
        endpoint.
      </Typography>
    );
  }

  return (
    <pre className="max-h-[60vh] overflow-auto rounded-md bg-gray-900/80 p-4 text-sm text-gray-300">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default ResultsViewer;
