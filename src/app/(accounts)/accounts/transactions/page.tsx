'use client';

import { PageHeader } from '@/components/layout/page-header';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Download, Filter } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';

const mockTransactions = [
  { id: '1', date: '2023-11-20', type: 'Payment', ref: 'REC-102', customer: 'Prime Industries', debit: 0, credit: 15000, balance: 30000 },
  { id: '2', date: '2023-11-19', type: 'Invoice', ref: 'INV-2051', customer: 'Prime Industries', debit: 45000, credit: 0, balance: 45000 },
  { id: '3', date: '2023-11-18', type: 'Credit Note', ref: 'CN-004', customer: 'Global Tech', debit: 0, credit: 5000, balance: 80000 },
  { id: '4', date: '2023-11-15', type: 'Payment', ref: 'REC-098', customer: 'Nexus Ltd', debit: 0, credit: 62000, balance: 0 },
  { id: '5', date: '2023-11-10', type: 'Invoice', ref: 'INV-2045', customer: 'Global Tech', debit: 85000, credit: 0, balance: 85000 },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Transaction History" description="Comprehensive log of all financial transactions." />
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
      </div>

      <div className="rounded-md border bg-card">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="relative w-full sm:w-auto flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="search" placeholder="Search by reference or customer..." className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex h-9 w-full sm:w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
              <option value="">All Types</option>
              <option value="Invoice">Invoice</option>
              <option value="Payment">Payment</option>
              <option value="Credit Note">Credit Note</option>
            </select>
            <Button variant="outline" size="sm" className="h-9"><Filter className="w-4 h-4 mr-2" /> More Filters</Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
              <tr>
                <th className="p-4">DATE</th>
                <th className="p-4">TYPE</th>
                <th className="p-4">REFERENCE</th>
                <th className="p-4">CUSTOMER</th>
                <th className="p-4 text-right">DEBIT</th>
                <th className="p-4 text-right">CREDIT</th>
                <th className="p-4 text-right">BALANCE</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((row: any) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4">{formatDate(row.date)}</td>
                  <td className="p-4">
                    <StatusBadge status={row.type === 'Invoice' ? 'default' : row.type === 'Payment' ? 'success' : 'warning'}>
                      {row.type}
                    </StatusBadge>
                  </td>
                  <td className="p-4 font-medium">{row.ref}</td>
                  <td className="p-4">{row.customer}</td>
                  <td className="p-4 text-right text-red-600">{row.debit > 0 ? formatCurrency(row.debit) : '-'}</td>
                  <td className="p-4 text-right text-green-600">{row.credit > 0 ? formatCurrency(row.credit) : '-'}</td>
                  <td className="p-4 text-right font-medium">{formatCurrency(row.balance)}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
