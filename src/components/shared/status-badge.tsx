'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type StatusVariant = 'order' | 'payment' | 'invoice' | 'user';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
  label?: string;
  variant?: StatusVariant;
}

const getStatusConfig = (status: string | undefined | null, variant: StatusVariant = 'order') => {
  const s = (status ?? 'unknown').toLowerCase();
  if (s === 'pending') return { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' };
  if (s === 'approved' || s === 'completed' || s === 'active') return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  if (s === 'cancelled' || s === 'failed' || s === 'inactive') return { bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-500' };
  if (s === 'processing' || s === 'shipped') return { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' };
  return { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' };
};

export function StatusBadge({ status, variant = 'order', className, ...props }: StatusBadgeProps) {
  const config = getStatusConfig(status, variant);

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.bg,
        config.text,
        className
      )}
      {...props}
    >
      <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', config.dot)} aria-hidden="true" />
      {(status ?? 'Unknown').charAt(0).toUpperCase() + (status ?? 'unknown').slice(1)}
    </div>
  );
}
