'use client';

import { useSearchParams } from 'next/navigation';
import { useRecommendationResultsStore } from '@/lib/stores/use-recommendation-results';
import { Typography } from '@/components/ui/Typography';
import DeviceCard, { type DeviceResult } from './DeviceCard';

export const ResultsLayout = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('recommendationId') || '';
  type RecommendationJSON = {
    query?: {
      device_type?: string;
      use_case?: string;
      budget_eur?: number;
      important_params?: string[];
    };
    results?: DeviceResult[];
    overall_conclusion?: string;
  };

  const data = useRecommendationResultsStore((s) => s.get(id)) as RecommendationJSON | undefined;

  if (!id) {
    return <Typography variant="body1">No recommendation id provided.</Typography>;
  }

  if (!data) {
    return (
      <Typography variant="body2" color="secondary">
        No cached results found. Re-run the recommendation or wait for history support.
      </Typography>
    );
  }

  const results = Array.isArray(data.results) ? data.results : [];
  const [best, ...rest] = results;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left rail: inputs */}
      <aside className="space-y-4 rounded-2xl bg-gray-800/50 p-5 ring-1 ring-gray-700/50 lg:col-span-1">
        <Typography variant="h3">Your Inputs</Typography>
        <div className="space-y-2 text-sm text-gray-300">
          <div>
            <span className="text-gray-400">Device:</span> {data.query?.device_type ?? '—'}
          </div>
          <div>
            <span className="text-gray-400">Purpose:</span> {data.query?.use_case ?? '—'}
          </div>
          <div>
            <span className="text-gray-400">Budget:</span> {data.query?.budget_eur ?? '—'} EUR
          </div>
          <div>
            <span className="text-gray-400">Params:</span>{' '}
            {(data.query?.important_params || []).join(', ')}
          </div>
        </div>
      </aside>

      {/* Main content: Top pick & conclusion */}
      <section className="space-y-6 lg:col-span-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {best ? <DeviceCard device={best} rank={1} highlight /> : null}
          </div>
          <div className="rounded-2xl bg-gray-800/50 p-5 ring-1 ring-gray-700/50">
            <Typography variant="h3" className="mb-2">
              Overall Conclusion
            </Typography>
            <Typography variant="body2" color="secondary">
              {data.overall_conclusion ?? '—'}
            </Typography>
          </div>
        </div>

        {/* Other picks */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {rest.map((d, i) => (
            <DeviceCard key={`${d.device_name}-${i}`} device={d} rank={i + 2} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultsLayout;
