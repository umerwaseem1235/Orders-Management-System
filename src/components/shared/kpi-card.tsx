'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  valueClassName?: string;
  trend?: { value: number; isPositive: boolean };
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  subtitle,
  className,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
            {change && (
              <span
                className={cn(
                  'flex items-center text-sm font-medium',
                  changeType === 'positive' && 'text-emerald-600',
                  changeType === 'negative' && 'text-rose-600',
                  changeType === 'neutral' && 'text-slate-600'
                )}
              >
                {changeType === 'positive' && <ArrowUpIcon className="mr-1 h-4 w-4" />}
                {changeType === 'negative' && <ArrowDownIcon className="mr-1 h-4 w-4" />}
                {changeType === 'neutral' && <MinusIcon className="mr-1 h-4 w-4" />}
                {change}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-700">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
