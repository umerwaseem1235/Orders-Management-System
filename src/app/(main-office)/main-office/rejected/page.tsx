'use client'

import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { ActionMenu } from '@/components/shared/action-menu'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { RotateCcw, Eye } from 'lucide-react'

export default function RejectedOrdersPage() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER #" />,
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'customerName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    },
    {
      accessorKey: 'totalAmount',
      header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('totalAmount'))}</span>,
    },
    {
      accessorKey: 'salesRepName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="REJECTED BY" />,
      cell: () => 'System/Admin',
    },
    {
      id: 'reason',
      header: ({ column }) => <DataTableColumnHeader column={column} title="REASON" />,
      cell: () => <span className="text-sm text-gray-500">Credit limit exceeded</span>,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => <DataTableColumnHeader column={column} title="DATE" />,
      cell: ({ row }) => formatDate(row.getValue('date')),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: 'View Details',
              icon: <Eye className="h-4 w-4" />,
              onClick: () => console.log('View', row.original.id),
            },
            {
              label: 'Re-review Order',
              icon: <RotateCcw className="h-4 w-4" />,
              onClick: () => console.log('Review', row.original.id),
              className: "text-amber-600"
            }
          ]}
        />
      ),
    },
  ]

  const data = MOCK_ORDERS.filter((o: any) => o.status === 'Cancelled')

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Rejected Orders' }
        ]}
        title="Rejected Orders" 
        description="View and manage rejected or cancelled orders."
      />

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <DataTable columns={columns} data={data} searchKey="customerName" searchPlaceholder="Search rejected orders..." />
      </div>
    </div>
  )
}
