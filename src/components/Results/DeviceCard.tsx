'use client';

import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type DevicePrice = { amount: number | null; currency: string; price_note: string };

export type DeviceSpecs = {
  gpu?: string | null;
  cpu?: string | null;
  ram_gb?: number | null;
  storage_gb?: number | null;
  display?: {
    size_inches?: number | null;
    resolution?: string | null;
    refresh_hz?: number | null;
    panel_type?: string | null;
  };
  weight_kg?: number | null;
  thickness_mm?: number | null;
  battery_wh?: number | null;
  claimed_hours?: number | null;
  ports_note?: string | null;
  release_year?: number | null;
};

export type ParameterCheck = {
  name: 'screen' | 'portability' | 'battery' | string;
  exists: 'true' | 'partial' | 'false' | 'unknown' | string;
  detail: string | null;
};

export type DeviceResult = {
  device_name: string;
  type: string;
  price?: DevicePrice;
  over_budget_by?: number | null;
  specs?: DeviceSpecs;
  parameters_check?: ParameterCheck[];
  score?: number;
  why_ranked?: string;
};

interface DeviceCardProps {
  device: DeviceResult;
  rank: number;
  highlight?: boolean;
  deviceTypeGuess?: string; // e.g., 'laptop' | 'smartphone' | 'smartwatch' | 'camera'
  priorities?: string[]; // from query.important_params
}

const badge = (state?: string) => {
  switch (state) {
    case 'true':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'partial':
      return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
    case 'false':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    default:
      return 'bg-gray-700/50 text-gray-300 border-gray-600/60';
  }
};

export const DeviceCard = ({
  device,
  rank,
  highlight = false,
  deviceTypeGuess,
  priorities = [],
}: DeviceCardProps) => {
  const specs = device.specs || {};
  const display = specs.display || {};
  const price = device.price;
  const deviceType = (deviceTypeGuess || device.type || '').toLowerCase();
  const isCamera = deviceType.includes('camera');

  // collapsed/expanded swap state (hover for desktop; click for mobile)
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={cn(
        'group rounded-2xl bg-gray-800/50 p-5 ring-1 ring-gray-700/50',
        highlight && 'bg-gray-800/70 shadow-2xl'
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-sm font-semibold text-blue-300 ring-1 ring-blue-500/30">
            {rank}
          </span>
          <Typography variant="h3" className="text-xl">
            {device.device_name}
          </Typography>
        </div>
        <div className="text-right">
          {price ? (
            <Typography variant="h4" className="text-lg">
              {price.amount !== null ? `${price.amount} ${price.currency}` : '—'}
            </Typography>
          ) : null}
          {device.over_budget_by ? (
            <span
              className="ml-auto mt-1 inline-flex rounded-full bg-red-600/20 px-2 py-0.5 text-xs text-red-300 ring-1 ring-red-500/30"
              title={`€${device.over_budget_by} over budget (allowed if overall score high)`}
            >
              +{device.over_budget_by} EUR
            </span>
          ) : null}
        </div>
      </div>

      {/* Collapsed: priorities + why */}
      <CollapsedSection
        why={device.why_ranked ?? undefined}
        priorities={priorities}
        checks={device.parameters_check || []}
      />

      {/* Expanded: spec grid (device-type aware) */}
      {expanded ? <ExpandedSpecs isCamera={isCamera} specs={specs} display={display} /> : null}

      <div className="mt-3 flex gap-3">
        <Button size="sm">Select</Button>
        <Button variant="outline" size="sm">
          Details
        </Button>
      </div>
    </div>
  );
};

const fmt = (n?: number | null, unit?: string) =>
  n === null || n === undefined ? '—' : `${n}${unit ? ` ${unit}` : ''}`;

const Spec = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <Typography variant="overline" className="text-gray-400">
      {label}
    </Typography>
    <Typography variant="body2">{value ?? '—'}</Typography>
  </div>
);

export default DeviceCard;

// Collapsed section content
function CollapsedSection({
  why,
  priorities,
  checks,
}: {
  why?: string | undefined;
  priorities: string[];
  checks: ParameterCheck[];
}) {
  const chips = priorities
    .slice(0, 3)
    .map((name) => ({ name, check: checks.find((c) => c.name === name) }))
    .filter(Boolean) as { name: string; check?: ParameterCheck }[];

  return (
    <div>
      {why ? (
        <Typography variant="body2" color="secondary" className="mb-2 line-clamp-2">
          {why}
        </Typography>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {chips.map(({ name, check }) => (
          <span
            key={name}
            className={cn('rounded-full border px-2 py-1 text-xs', badge(check?.exists))}
          >
            {renderChip(name, check)}
          </span>
        ))}
      </div>
    </div>
  );
}

function renderChip(name: string, check?: ParameterCheck) {
  if (!check) return name;
  const detail = check.detail ?? '';
  return detail ? `${name}: ${detail}` : `${name}`;
}

function ExpandedSpecs({
  isCamera,
  specs,
  display,
}: {
  isCamera: boolean;
  specs: DeviceSpecs;
  display: DeviceSpecs['display'];
}) {
  // Build 4-5 spec lines depending on device type. Hide unknown/empty.
  const rows: Array<{ label: string; value?: string | null | undefined }> = [];

  if (isCamera) {
    // Sensor, Video, Weight, Screen, Battery
    // For mocks where camera-specific fields aren't present, gracefully omit
    rows.push({ label: 'Sensor', value: undefined });
    rows.push({ label: 'Video', value: undefined });
    rows.push({ label: 'Weight', value: fmt(specs.weight_kg, 'kg') });
    rows.push({ label: 'Screen', value: display ? `${display.size_inches ?? '—'}"` : undefined });
    rows.push({
      label: 'Battery',
      value: specs.claimed_hours ? `${specs.claimed_hours} shots` : fmt(specs.battery_wh, 'Wh'),
    });
  } else {
    rows.push({ label: 'GPU', value: specs.gpu || undefined });
    rows.push({ label: 'CPU', value: specs.cpu || undefined });
    rows.push({ label: 'RAM', value: fmt(specs.ram_gb, 'GB') });
    rows.push({ label: 'Storage', value: fmt(specs.storage_gb, 'GB') });
    rows.push({
      label: 'Display',
      value: display ? `${display.size_inches ?? '—'}" ${display.resolution ?? ''}` : undefined,
    });
  }

  const visible = rows
    .filter(
      (r) => r.value !== undefined && r.value !== 'unknown' && r.value !== '—' && r.value !== ''
    )
    .slice(0, 5);

  return (
    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3">
      {visible.map((r) => (
        <Spec key={r.label} label={r.label} value={(r.value ?? null) as string | null} />
      ))}
    </div>
  );
}
