'use client';

import { PageHeader } from '@/components/layout/page-header';
import { KpiCard } from '@/components/shared/kpi-card';
import { ChartCard } from '@/components/shared/chart-card';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle } from 'lucide-react';

const agingData = [
  { name: '0-30 days', amount: 150000, color: '#16a34a' },
  { name: '31-60 days', amount: 85000, color: '#eab308' },
  { name: '61-90 days', amount: 62000, color: '#f97316' },
  { name: '90+ days', amount: 150000, color: '#dc2626' },
];

const mockOutstanding = [
  { id: '1', customer: 'ABC Corporation', total: 150000, d0_30: 0, d31_60: 0, d61_90: 0, d90plus: 150000 },
  { id: '2', customer: 'Global Tech', total: 85000, d0_30: 0, d31_60: 85000, d61_90: 0, d90plus: 0 },
  { id: '3', customer: 'Nexus Ltd', total: 62000, d0_30: 0, d31_60: 62000, d61_90: 0, d90plus: 0 },
  { id: '4', customer: 'Prime Industries', total: 45000, d0_30: 45000, d31_60: 0, d61_90: 0, d90plus: 0 },
];

export default function OutstandingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Outstanding Analysis" description="Analyze overdue payments and outstanding balances." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Outstanding" value={formatCurrency(447000)} icon={<AlertCircle className="w-4 h-4 text-rose-600" />} />
        <KpiCard title="Overdue >30 Days" value={formatCurrency(297000)} icon={<AlertTriangle className="w-4 h-4 text-amber-600" />} />
        <KpiCard title="Overdue >60 Days" value={formatCurrency(150000)} icon={<AlertTriangle className="w-4 h-4 text-orange-600" />} />
        <KpiCard title="Overdue >90 Days" value={formatCurrency(150000)} icon={<AlertCircle className="w-4 h-4 text-red-600" />} />
      </div>

      <ChartCard title="Aging Analysis">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `Rs \${value / 1000}k`} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {agingData.map((entry, index) => (
                  <Cell key={`cell-\${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="rounded-md border bg-card">
        <div className="p-4 border-b">
          <h3 className="font-medium">Customer-wise Outstanding</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
            <tr>
              <th className="p-4">CUSTOMER</th>
              <th className="p-4">TOTAL DUE</th>
              <th className="p-4 text-green-600">0-30 DAYS</th>
              <th className="p-4 text-amber-600">31-60 DAYS</th>
              <th className="p-4 text-orange-600">61-90 DAYS</th>
              <th className="p-4 text-red-600">90+ DAYS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {mockOutstanding.map((row: any) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 font-medium">{row.customer}</td>
                <td className="p-4 font-semibold">{formatCurrency(row.total)}</td>
                <td className="p-4">{row.d0_30 > 0 ? formatCurrency(row.d0_30) : '-'}</td>
                <td className="p-4">{row.d31_60 > 0 ? formatCurrency(row.d31_60) : '-'}</td>
                <td className="p-4">{row.d61_90 > 0 ? formatCurrency(row.d61_90) : '-'}</td>
                <td className="p-4">{row.d90plus > 0 ? formatCurrency(row.d90plus) : '-'}</td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm">Send Reminder</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
