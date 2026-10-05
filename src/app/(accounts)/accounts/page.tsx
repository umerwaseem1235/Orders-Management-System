'use client';

import { PageHeader } from '@/components/layout/page-header';
import { KpiCard } from '@/components/shared/kpi-card';
import { ChartCard } from '@/components/shared/chart-card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calculator, Wallet, AlertCircle, Percent } from 'lucide-react';

const agingData = [
  { name: '0-30 days', amount: 350000, color: '#16a34a' },
  { name: '31-60 days', amount: 200000, color: '#eab308' },
  { name: '61-90 days', amount: 105000, color: '#f97316' },
  { name: '90+ days', amount: 235000, color: '#dc2626' },
];

const topOutstanding = [
  { id: '1', customer: 'ABC Corporation', amount: 150000, status: 'Overdue' },
  { id: '2', customer: 'Global Tech', amount: 85000, status: 'Critical' },
  { id: '3', customer: 'Nexus Ltd', amount: 62000, status: 'Overdue' },
  { id: '4', customer: 'Prime Industries', amount: 45000, status: 'Current' },
  { id: '5', customer: 'Star Enterprises', amount: 38000, status: 'Overdue' },
];

const recentTransactions = [
  { id: '1', date: '2023-11-01', type: 'Payment', ref: 'REC-101', customer: 'Prime Industries', amount: 25000 },
  { id: '2', date: '2023-10-30', type: 'Invoice', ref: 'INV-2045', customer: 'Nexus Ltd', amount: -15000 },
  { id: '3', date: '2023-10-29', type: 'Payment', ref: 'REC-100', customer: 'ABC Corporation', amount: 50000 },
];

export default function AccountsDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts Dashboard"
        description="Overview of financials, receivables, and collections."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Receivables"
          value={formatCurrency(890000)}
          icon={<Calculator className="w-4 h-4 text-emerald-600" />}
          trend={{ value: 5.2, label: "from last month", isPositive: true }}
        />
        <KpiCard
          title="This Month Collection"
          value={formatCurrency(450000)}
          icon={<Wallet className="w-4 h-4 text-emerald-600" />}
          trend={{ value: 12.5, label: "from last month", isPositive: true }}
        />
        <KpiCard
          title="Overdue Amount"
          value={formatCurrency(235000)}
          icon={<AlertCircle className="w-4 h-4 text-rose-600" />}
          trend={{ value: 2.1, label: "from last month", isPositive: false }}
        />
        <KpiCard
          title="Collection Rate"
          value="78.5%"
          icon={<Percent className="w-4 h-4 text-blue-600" />}
          trend={{ value: 3.4, label: "from last month", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Aging Distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `Rs ${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Outstanding Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topOutstanding.map((customer: any) => (
                  <div key={customer.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{customer.customer}</p>
                      <p className="text-xs text-muted-foreground">{customer.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatCurrency(customer.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx: any) => (
                  <div key={tx.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sm">{tx.customer}</p>
                      <p className="text-xs text-muted-foreground">{tx.ref} • {formatDate(tx.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm \${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
