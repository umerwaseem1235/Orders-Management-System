'use client';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_INVOICES } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="INVOICE #" />,
    cell: ({ row }) => <span className="font-medium text-gray-900">{row.original.invoiceNumber}</span>,
  },
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER #" />,
    cell: ({ row }) => <span className="text-gray-600">{row.original.orderNumber}</span>,
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    cell: ({ row }) => <span className="font-medium">{row.original.customerName}</span>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
    cell: ({ row }) => <span>{formatCurrency(row.original.amount || 0)}</span>,
  },
  {
    accessorKey: 'paid',
    header: ({ column }) => <DataTableColumnHeader column={column} title="PAID" />,
    cell: ({ row }) => <span className="text-green-600">{formatCurrency(row.original.paid || 0)}</span>,
  },
  {
    accessorKey: 'balanceDue',
    header: ({ column }) => <DataTableColumnHeader column={column} title="BALANCE DUE" />,
    cell: ({ row }) => <span className="font-medium text-red-600">{formatCurrency(row.original.balanceDue || 0)}</span>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="DUE DATE" />,
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.dueDate || new Date())}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionMenu items={[
          { label: 'View Invoice', onClick: () => {} },
          { label: 'Record Payment', onClick: () => {} },
          { label: 'Download PDF', onClick: () => {} }
        ]} 
      />
    ),
  },
];

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Invoices"
        description="Manage invoices and billing."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Invoices', href: '/invoices' },
        ]}
        items={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-green-800 hover:bg-green-900 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add new
            </Button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg border shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Invoices register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_INVOICES?.length || 0} of {MOCK_INVOICES?.length || 0} invoices • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_INVOICES || []} searchKey="invoiceNumber" />
      </div>
    </div>
  );
}
