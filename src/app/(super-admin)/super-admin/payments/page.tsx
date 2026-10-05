'use client';
import React from 'react';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_PAYMENTS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="DATE" />,
    cell: ({ row }) => <span>{formatDate(row.original.date || new Date())}</span>,
  },
  {
    accessorKey: 'reference',
    header: ({ column }) => <DataTableColumnHeader column={column} title="REFERENCE" />,
    cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.reference}</span>,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="DESCRIPTION" />,
  },
  {
    accessorKey: 'debit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="DEBIT" />,
    cell: ({ row }) => (
      <span className={row.original.debit > 0 ? "text-red-600 font-medium" : "text-gray-400"}>
        {row.original.debit > 0 ? formatCurrency(row.original.debit) : '-'}
      </span>
    ),
  },
  {
    accessorKey: 'credit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CREDIT" />,
    cell: ({ row }) => (
      <span className={row.original.credit > 0 ? "text-green-600 font-medium" : "text-gray-400"}>
        {row.original.credit > 0 ? formatCurrency(row.original.credit) : '-'}
      </span>
    ),
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader column={column} title="BALANCE" />,
    cell: ({ row }) => <span className="font-medium">{formatCurrency(row.original.balance || 0)}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionMenu items={[
          { label: 'View Details', onClick: () => {} },
          { label: 'Print Receipt', onClick: () => {} }
        ]} 
      />
    ),
  },
];

export default function PaymentsPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Payments"
        description="View and manage payments for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Payments', href: '/payments' },
        ]}
        items={
          <div className="flex items-center gap-2">
            <Button onClick={() => setDrawerOpen(true)} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setDrawerOpen(true)} className="bg-green-800 hover:bg-green-900 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add new
            </Button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg border shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Payments register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_PAYMENTS?.length || 0} of {MOCK_PAYMENTS?.length || 0} payments • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_PAYMENTS || []} searchKey="reference" />
      </div>
    </div>
  );
}
