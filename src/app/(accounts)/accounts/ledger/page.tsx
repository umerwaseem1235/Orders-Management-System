'use client';

import { PageHeader } from '@/components/layout/page-header';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const mockLedger = [
  { id: '1', date: '2023-11-01', ref: 'INV-2045', desc: 'Product Purchase', debit: 150000, credit: 0, balance: 150000 },
  { id: '2', date: '2023-11-05', ref: 'REC-101', desc: 'Cash Payment', debit: 0, credit: 50000, balance: 100000 },
  { id: '3', date: '2023-11-10', ref: 'INV-2050', desc: 'Service Charges', debit: 25000, credit: 0, balance: 125000 },
  { id: '4', date: '2023-11-15', ref: 'REC-105', desc: 'Bank Transfer', debit: 0, credit: 125000, balance: 0 },
];

export default function CustomerLedgerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Customer Ledger" description="View detailed transaction history and balance for customers." />
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
      </div>

      <div className="flex gap-4 items-center">
        <select className="flex h-10 w-full md:w-64 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option>Select Customer</option>
          <option>ABC Corporation</option>
          <option>Global Tech</option>
          <option>Nexus Ltd</option>
        </select>
        <select className="flex h-10 w-full md:w-48 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Opening Balance</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatCurrency(0)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Debit</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-red-600">{formatCurrency(175000)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Credit</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-green-600">{formatCurrency(175000)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Closing Balance</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{formatCurrency(0)}</p></CardContent>
        </Card>
      </div>

      <div className="rounded-md border bg-card">
        <table className="w-full text-sm text-left">
          <thead className="border-b bg-muted/50 font-medium">
            <tr>
              <th className="p-4">DATE</th>
              <th className="p-4">REFERENCE</th>
              <th className="p-4">DESCRIPTION</th>
              <th className="p-4 text-right">DEBIT</th>
              <th className="p-4 text-right">CREDIT</th>
              <th className="p-4 text-right">BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {mockLedger.map((row: any) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4">{formatDate(row.date)}</td>
                <td className="p-4">{row.ref}</td>
                <td className="p-4">{row.desc}</td>
                <td className="p-4 text-right text-red-600">{row.debit > 0 ? formatCurrency(row.debit) : '-'}</td>
                <td className="p-4 text-right text-green-600">{row.credit > 0 ? formatCurrency(row.credit) : '-'}</td>
                <td className="p-4 text-right font-medium">{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
