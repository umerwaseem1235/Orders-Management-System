'use client'

import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { ActionMenu } from '@/components/shared/action-menu'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { FileText, Eye } from 'lucide-react'

export default function ApprovedOrdersPage() {
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
      accessorKey: 'totalAmount',
      header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('totalAmount'))}</span>,
    },
    {
      accessorKey: 'salesRepName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="APPROVED BY" />,
      cell: ({ row }) => row.original.salesRepName || 'Admin',
    },
    {
      accessorKey: 'date',
      header: ({ column }) => <DataTableColumnHeader column={column} title="APPROVED DATE" />,
      cell: ({ row }) => formatDate(row.getValue('date')),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="INVOICE STATUS" />,
      cell: () => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Pending Invoice
        </span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: 'View Order',
              icon: <Eye className="h-4 w-4" />,
              onClick: () => console.log('View', row.original.id),
            },
            {
              label: 'Generate Invoice',
              icon: <FileText className="h-4 w-4" />,
              onClick: () => console.log('Generate Invoice', row.original.id),
              className: "text-blue-600"
            }
          ]}
        />
      ),
    },
  ]

  const data = MOCK_ORDERS.filter((o: any) => o.status === 'Processing' || o.status === 'Approved')

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Approved Orders' }
        ]}
        title="Approved Orders" 
        description="View approved orders and generate invoices."
      >
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Bulk Generate Invoices
        </Button>
      </PageHeader>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <DataTable columns={columns} data={data} searchKey="customerName" searchPlaceholder="Search approved orders..." />
      </div>
    </div>
  )
}
