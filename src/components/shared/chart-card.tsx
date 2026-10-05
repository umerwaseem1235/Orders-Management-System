'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6 pt-0 flex-1">
        {children}
      </div>
    </div>
  );
}
