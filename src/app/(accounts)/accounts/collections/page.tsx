'use client';

import { PageHeader } from '@/components/layout/page-header';
import { KpiCard } from '@/components/shared/kpi-card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Search } from 'lucide-react';

const mockCollections = [
  { id: '1', date: '2023-11-20', customer: 'Global Tech', amount: 85000, method: 'Bank Transfer', ref: 'TRX-9938', receivedBy: 'Ahmed Ali' },
  { id: '2', date: '2023-11-20', customer: 'Nexus Ltd', amount: 30000, method: 'Cheque', ref: 'CHQ-5542', receivedBy: 'Ahmed Ali' },
  { id: '3', date: '2023-11-19', customer: 'Prime Industries', amount: 15000, method: 'Cash', ref: 'REC-102', receivedBy: 'Sara Khan' },
  { id: '4', date: '2023-11-18', customer: 'ABC Corporation', amount: 50000, method: 'Bank Transfer', ref: 'TRX-9901', receivedBy: 'Ahmed Ali' },
];

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payment Collections" description="Record new payments and view collection history." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Today's Collection" value={formatCurrency(115000)} icon={<Wallet className="w-4 h-4 text-emerald-600" />} />
        <KpiCard title="This Week" value={formatCurrency(450000)} icon={<Wallet className="w-4 h-4 text-emerald-600" />} />
        <KpiCard title="This Month" value={formatCurrency(1850000)} icon={<Wallet className="w-4 h-4 text-emerald-600" />} />
      </div>

      <Card>
        <CardHeader><CardTitle>Record New Payment</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>Select Customer</option>
                <option>ABC Corporation</option>
                <option>Global Tech</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <input type="number" placeholder="0.00" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Method</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>Cash</option>
                <option>Cheque</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reference</label>
              <input type="text" placeholder="Ref/Cheque No" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />
            </div>
            <Button className="w-full bg-forest-green hover:bg-forest-green/90 text-white">Record Payment</Button>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-card">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium">Recent Collections</h3>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="search" placeholder="Search..." className="flex h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
            <tr>
              <th className="p-4">DATE</th>
              <th className="p-4">CUSTOMER</th>
              <th className="p-4">AMOUNT</th>
              <th className="p-4">METHOD</th>
              <th className="p-4">REFERENCE</th>
              <th className="p-4">RECEIVED BY</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {mockCollections.map((row: any) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4">{formatDate(row.date)}</td>
                <td className="p-4 font-medium">{row.customer}</td>
                <td className="p-4 font-medium text-emerald-600">{formatCurrency(row.amount)}</td>
                <td className="p-4">{row.method}</td>
                <td className="p-4">{row.ref}</td>
                <td className="p-4">{row.receivedBy}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">Print Receipt</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
