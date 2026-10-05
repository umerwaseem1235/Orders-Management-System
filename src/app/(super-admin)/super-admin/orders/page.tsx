'use client';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.orderNumber}</span>
        <span className="text-xs text-muted-foreground">{formatDate(row.original.timestamp || row.original.date || new Date())}</span>
      </div>
    ),
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.customerName}</span>
        <span className="text-xs text-muted-foreground">{row.original.customerArea}</span>
      </div>
    ),
  },
  {
    accessorKey: 'orderBooker',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER BOOKER" />,
  },
  {
    accessorKey: 'items',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ITEMS" />,
    cell: ({ row }) => <span>{row.original.itemsCount || row.original.items}</span>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
    cell: ({ row }) => <span>{formatCurrency(row.original.amount || 0)}</span>,
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
          { label: 'View Details', onClick: () => {} },
          { label: 'Edit Order', onClick: () => {} },
          { label: 'Cancel Order', onClick: () => {}, variant: 'destructive' }
        ]} 
      />
    ),
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Orders"
        description="View and manage orders for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Orders', href: '/orders' },
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
            <h2 className="text-lg font-semibold text-gray-900">Orders register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_ORDERS?.length || 0} of {MOCK_ORDERS?.length || 0} orders • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_ORDERS || []} searchKey="orderNumber" />
      </div>
    </div>
  );
}
