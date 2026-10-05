'use client';

import { PageHeader } from '@/components/layout/page-header';
import { KpiCard } from '@/components/shared/kpi-card';
import { ChartCard } from '@/components/shared/chart-card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { AlertTriangle, Clock, TrendingUp, CheckCircle2, MoreHorizontal, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Outstanding Data
const OUTSTANDING_DATA = [
  { id: '1', customer: 'Alpha Traders', totalDue: 45000, overdue: 15000, lastPayment: '2023-11-15T00:00:00Z', daysOutstanding: 45, status: 'overdue' },
  { id: '2', customer: 'Beta Mart', totalDue: 12000, overdue: 0, lastPayment: '2023-11-20T00:00:00Z', daysOutstanding: 15, status: 'current' },
  { id: '3', customer: 'Gamma Wholesalers', totalDue: 85000, overdue: 85000, lastPayment: '2023-09-10T00:00:00Z', daysOutstanding: 95, status: 'critical' },
  { id: '4', customer: 'Delta Stores', totalDue: 34000, overdue: 10000, lastPayment: '2023-10-25T00:00:00Z', daysOutstanding: 50, status: 'overdue' },
  { id: '5', customer: 'Epsilon Retail', totalDue: 8000, overdue: 0, lastPayment: '2023-11-28T00:00:00Z', daysOutstanding: 5, status: 'current' },
];

const AGING_DATA = [
  { name: '0-30 Days', amount: 45000, fill: '#22c55e' },
  { name: '31-60 Days', amount: 25000, fill: '#f59e0b' },
  { name: '61-90 Days', amount: 15000, fill: '#ef4444' },
  { name: '90+ Days', amount: 85000, fill: '#991b1b' },
];

export default function OutstandingPage() {
  const getSeverityColor = (days: number) => {
    if (days < 30) return 'text-green-600 bg-green-50';
    if (days <= 60) return 'text-amber-600 bg-amber-50';
    if (days <= 90) return 'text-red-600 bg-red-50';
    return 'text-red-700 bg-red-100 font-bold';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Outstanding"
        description="Track outstanding receivables and overdue payments."
        breadcrumbs={[
          { label: 'Administrator', href: '/dashboard' },
          { label: 'Outstanding' },
        ]}
        items={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Outstanding"
          value={formatCurrency(184000)}
          icon={<Clock className="h-5 w-5 text-gray-500" />}
        />
        <KpiCard
          title="Overdue (>30 days)"
          value={formatCurrency(110000)}
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          valueClassName="text-red-600"
          trend={{ value: 12, isPositive: false }}
        />
        <KpiCard
          title="This Month Collection"
          value={formatCurrency(45000)}
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          trend={{ value: 5, isPositive: true }}
        />
        <KpiCard
          title="Collection Rate"
          value="78%"
          icon={<CheckCircle2 className="h-5 w-5 text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Aging Analysis Chart */}
        <div className="lg:col-span-1">
          <ChartCard title="Aging Analysis" description="Outstanding amounts by age bucket">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AGING_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `Rs ${value / 1000}k`} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <RechartsTooltip formatter={(value: any) => formatCurrency(value)} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {AGING_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Outstanding Table */}
        <div className="lg:col-span-2 rounded-lg border bg-white shadow-sm flex flex-col">
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Outstanding by Customer</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">CUSTOMER</th>
                  <th className="px-4 py-3 text-right font-medium">TOTAL DUE</th>
                  <th className="px-4 py-3 text-right font-medium">OVERDUE</th>
                  <th className="px-4 py-3 font-medium">LAST PAYMENT</th>
                  <th className="px-4 py-3 text-center font-medium">DAYS OUTSTANDING</th>
                  <th className="px-4 py-3 text-center font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {OUTSTANDING_DATA.map((row: any) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.customer}</td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(row.totalDue)}</td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium">
                      {row.overdue > 0 ? formatCurrency(row.overdue) : '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(row.lastPayment)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${getSeverityColor(row.daysOutstanding)}`}>
                        {row.daysOutstanding} Days
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
