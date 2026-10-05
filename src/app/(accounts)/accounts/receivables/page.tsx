'use client';

import { PageHeader } from '@/components/layout/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

const mockReceivables = [
  { id: '1', customer: 'Global Tech', invoice: 'INV-2045', amount: 85000, dueDate: '2023-10-15', daysOverdue: 35, status: 'Overdue' },
  { id: '2', customer: 'ABC Corporation', invoice: 'INV-2048', amount: 150000, dueDate: '2023-09-10', daysOverdue: 70, status: 'Critical' },
  { id: '3', customer: 'Prime Industries', invoice: 'INV-2051', amount: 45000, dueDate: '2023-11-25', daysOverdue: 0, status: 'Current' },
  { id: '4', customer: 'Nexus Ltd', invoice: 'INV-2053', amount: 62000, dueDate: '2023-10-30', daysOverdue: 20, status: 'Overdue' },
  { id: '5', customer: 'Star Enterprises', invoice: 'INV-2055', amount: 38000, dueDate: '2023-11-30', daysOverdue: 0, status: 'Current' },
];

export default function ReceivablesPage() {
  const totalOutstanding = mockReceivables.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Receivables" description="Track all outstanding customer invoices." />
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export to CSV</Button>
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-muted/20">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="search" placeholder="Search invoices or customers..." className="flex h-9 w-72 rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Total Outstanding:</span>
            <span className="text-lg font-bold text-rose-600">{formatCurrency(totalOutstanding)}</span>
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="border-b bg-muted/50 font-medium text-muted-foreground">
            <tr>
              <th className="p-4">CUSTOMER</th>
              <th className="p-4">INVOICE #</th>
              <th className="p-4">AMOUNT DUE</th>
              <th className="p-4">DUE DATE</th>
              <th className="p-4">DAYS OVERDUE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {mockReceivables.map((row: any) => {
              let daysColor = '';
              if (row.daysOverdue === 0) daysColor = 'text-green-600';
              else if (row.daysOverdue <= 30) daysColor = 'text-amber-600';
              else daysColor = 'text-red-600 font-bold';

              let badgeStatus: 'success' | 'warning' | 'destructive' = 'success';
              if (row.status === 'Overdue') badgeStatus = 'warning';
              if (row.status === 'Critical') badgeStatus = 'destructive';

              return (
                <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{row.customer}</td>
                  <td className="p-4 text-muted-foreground">{row.invoice}</td>
                  <td className="p-4 font-semibold">{formatCurrency(row.amount)}</td>
                  <td className="p-4">{formatDate(row.dueDate)}</td>
                  <td className={`p-4 \${daysColor}`}>{row.daysOverdue}</td>
                  <td className="p-4">
                    <StatusBadge status={badgeStatus}>{row.status}</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">Send Reminder</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
