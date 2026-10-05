'use client'

import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { ActionMenu } from '@/components/shared/action-menu'
import { MOCK_CUSTOMERS } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Plus, Eye, Edit, History } from 'lucide-react'

export default function CustomersPage() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="CODE" />,
      cell: ({ row }) => <span className="font-medium text-gray-500">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="NAME" />,
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'area',
      header: ({ column }) => <DataTableColumnHeader column={column} title="AREA" />,
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => <DataTableColumnHeader column={column} title="PHONE" />,
    },
    {
      accessorKey: 'balance',
      header: ({ column }) => <DataTableColumnHeader column={column} title="OUTSTANDING" />,
      cell: ({ row }) => {
        const bal = parseFloat(row.getValue('balance') as string)
        return <span className={bal > 0 ? "text-red-600 font-medium" : "text-gray-900"}>{formatCurrency(bal)}</span>
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
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
              label: 'Edit',
              icon: <Edit className="h-4 w-4" />,
              onClick: () => console.log('Edit', row.original.id),
            },
            {
              label: 'Order History',
              icon: <History className="h-4 w-4" />,
              onClick: () => console.log('History', row.original.id),
            }
          ]}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Customers' }
        ]}
        title="Customer Management" 
        description="View and manage customer accounts and balances."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </PageHeader>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <DataTable columns={columns} data={MOCK_CUSTOMERS} searchKey="name" searchPlaceholder="Search customers..." />
      </div>
    </div>
  )
}
