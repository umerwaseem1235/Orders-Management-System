'use client';

import { PageHeader } from '@/components/layout/page-header';
import { ChartCard } from '@/components/shared/chart-card';
import { formatCurrency } from '@/lib/utils';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const agingData = [
  { name: 'Current', value: 150000, color: '#16a34a' },
  { name: '1-30 Days', value: 250000, color: '#84cc16' },
  { name: '31-60 Days', value: 85000, color: '#eab308' },
  { name: '61-90 Days', value: 62000, color: '#f97316' },
  { name: '90+ Days', value: 150000, color: '#dc2626' },
];

const reportData = [
  { id: '1', customer: 'Global Tech', current: 0, d1_30: 0, d31_60: 85000, d61_90: 0, d90plus: 0, total: 85000 },
  { id: '2', customer: 'ABC Corporation', current: 0, d1_30: 0, d31_60: 0, d61_90: 0, d90plus: 150000, total: 150000 },
  { id: '3', customer: 'Nexus Ltd', current: 0, d1_30: 0, d31_60: 62000, d61_90: 0, d90plus: 0, total: 62000 },
  { id: '4', customer: 'Prime Industries', current: 45000, d1_30: 0, d31_60: 0, d61_90: 0, d90plus: 0, total: 45000 },
];

export default function AgingReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Aging Reports" description="Detailed aging analysis of customer accounts." />
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> PDF</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChartCard title="Aging Distribution">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={agingData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {agingData.map((entry, index) => (
                      <Cell key={`cell-\${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Current</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(150000)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total 1-30 Days</p>
            <p className="text-2xl font-bold text-lime-600">{formatCurrency(250000)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total 31-60 Days</p>
            <p className="text-2xl font-bold text-yellow-600">{formatCurrency(85000)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total 61-90 Days</p>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(62000)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total 90+ Days</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(150000)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card bg-slate-50 dark:bg-slate-900">
            <p className="text-sm text-muted-foreground mb-1">Total Receivables</p>
            <p className="text-2xl font-bold">{formatCurrency(697000)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <div className="p-4 border-b">
          <h3 className="font-medium">Detailed Aging Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
              <tr>
                <th className="p-4">CUSTOMER</th>
                <th className="p-4">CURRENT</th>
                <th className="p-4">1-30 DAYS</th>
                <th className="p-4">31-60 DAYS</th>
                <th className="p-4">61-90 DAYS</th>
                <th className="p-4">90+ DAYS</th>
                <th className="p-4 font-bold text-black dark:text-white">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row: any) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{row.customer}</td>
                  <td className="p-4 text-green-600/90">{row.current > 0 ? formatCurrency(row.current) : '-'}</td>
                  <td className="p-4 text-lime-600/90">{row.d1_30 > 0 ? formatCurrency(row.d1_30) : '-'}</td>
                  <td className="p-4 bg-yellow-50/50 dark:bg-yellow-900/10 text-yellow-700/90 dark:text-yellow-500">{row.d31_60 > 0 ? formatCurrency(row.d31_60) : '-'}</td>
                  <td className="p-4 bg-orange-50/50 dark:bg-orange-900/10 text-orange-700/90 dark:text-orange-500">{row.d61_90 > 0 ? formatCurrency(row.d61_90) : '-'}</td>
                  <td className="p-4 bg-red-50/80 dark:bg-red-900/20 text-red-700 font-medium dark:text-red-500">{row.d90plus > 0 ? formatCurrency(row.d90plus) : '-'}</td>
                  <td className="p-4 font-bold">{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
