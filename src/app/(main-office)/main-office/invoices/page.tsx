'use client'

import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { ActionMenu } from '@/components/shared/action-menu'
import { MOCK_INVOICES } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Plus, Download, Eye, Send } from 'lucide-react'

export default function InvoicesPage() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="INVOICE #" />,
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'orderId',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ORDER #" />,
      cell: ({ row }) => <span className="text-gray-500">{row.getValue('orderId')}</span>,
    },
    {
      accessorKey: 'customerName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('amount'))}</span>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
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
              label: 'View Invoice',
              icon: <Eye className="h-4 w-4" />,
              onClick: () => console.log('View', row.original.id),
            },
            {
              label: 'Download PDF',
              icon: <Download className="h-4 w-4" />,
              onClick: () => console.log('Download', row.original.id),
            },
            {
              label: 'Send to Customer',
              icon: <Send className="h-4 w-4" />,
              onClick: () => console.log('Send', row.original.id),
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
          { label: 'Invoices' }
        ]}
        title="Invoices" 
        description="Manage generated invoices and track payments."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Invoice
        </Button>
      </PageHeader>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <DataTable columns={columns} data={MOCK_INVOICES} searchKey="customerName" searchPlaceholder="Search invoices..." />
      </div>
    </div>
  )
}
