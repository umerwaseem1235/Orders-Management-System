'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { ActionMenu } from '@/components/shared/action-menu'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Check, X, Eye } from 'lucide-react'

export default function IncomingOrdersPage() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Verified'>('All')

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER #" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'customerName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    },
    {
      accessorKey: 'orderBooker',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER BOOKER" />,
      cell: ({ row }) => row.original.salesRepName || 'N/A',
    },
    {
      accessorKey: 'items',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ITEMS" />,
      cell: ({ row }) => row.original.items?.length || 0,
    },
    {
      accessorKey: 'totalAmount',
      header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('totalAmount'))}</span>,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => <DataTableColumnHeader column={column} title="DATE" />,
      cell: ({ row }) => formatDate(row.getValue('date')),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        
        return (
          <ActionMenu
            items={[
              {
                label: 'View Details',
                icon: <Eye className="h-4 w-4" />,
                onClick: () => console.log('View', row.original.id),
              },
              ...(status === 'Pending' ? [
                {
                  label: 'Approve',
                  icon: <Check className="h-4 w-4" />,
                  onClick: () => console.log('Approve', row.original.id),
                  className: "text-emerald-600"
                },
                {
                  label: 'Reject',
                  icon: <X className="h-4 w-4" />,
                  onClick: () => console.log('Reject', row.original.id),
                  className: "text-red-600"
                }
              ] : [])
            ]}
          />
        )
      },
    },
  ]

  const data = MOCK_ORDERS.filter((order: any) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return order.status === 'Pending';
    if (filter === 'Verified') return order.status === 'Processing' || order.status === 'Approved' || order.status === 'Completed';
    return true;
  })

  const pendingCount = MOCK_ORDERS.filter((o: any) => o.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Incoming Orders' }
        ]}
        title="Incoming Orders" 
        description="Review and process new orders from Order Bookers."
      />

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-4 border-b border-gray-100 pb-4 mb-4">
          <button
            onClick={() => setFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'All' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('Pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              filter === 'Pending' 
                ? 'bg-amber-50 text-amber-700' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Pending Verification
            {pendingCount > 0 && (
              <Badge variant="secondary" className={filter === 'Pending' ? 'bg-amber-100 text-amber-800' : ''}>
                {pendingCount}
              </Badge>
            )}
          </button>
          <button
            onClick={() => setFilter('Verified')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'Verified' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Verified Orders
          </button>
        </div>

        <DataTable columns={columns} data={data} searchKey="customerName" searchPlaceholder="Search by customer name..." />
      </div>
    </div>
  )
}
