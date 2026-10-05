'use client';
import React from 'react';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_CUSTOMERS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CODE" />,
    cell: ({ row }) => <span className="font-medium">{row.original.code}</span>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="NAME" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.area}</span>
      </div>
    ),
  },
  {
    accessorKey: 'contactPerson',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CONTACT" />,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title="PHONE" />,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="TYPE" />,
    cell: ({ row }) => <StatusBadge status={row.original.type} />,
  },
  {
    accessorKey: 'outstandingBalance',
    header: ({ column }) => <DataTableColumnHeader column={column} title="OUTSTANDING" />,
    cell: ({ row }) => <span className="text-red-600 font-medium">{formatCurrency(row.original.outstandingBalance || 0)}</span>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionMenu items={[
          { label: 'View Profile', onClick: () => {} },
          { label: 'Edit Customer', onClick: () => {} },
          { label: 'View Ledger', onClick: () => {} }
        ]} 
      />
    ),
  },
];

export default function CustomersPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Customers"
        description="Manage your customer directory."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Customers', href: '/customers' },
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
            <h2 className="text-lg font-semibold text-gray-900">Customers register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_CUSTOMERS?.length || 0} of {MOCK_CUSTOMERS?.length || 0} customers • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_CUSTOMERS || []} searchKey="name" />
      </div>
    </div>
  );
}
