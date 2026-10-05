'use client'

import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { ActionMenu } from '@/components/shared/action-menu'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Eye } from 'lucide-react'

export default function ProductsPage() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'sku',
      header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
      cell: ({ row }) => <span className="text-gray-500 font-mono text-xs">{row.getValue('sku')}</span>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="PRODUCT" />,
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <DataTableColumnHeader column={column} title="CATEGORY" />,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <DataTableColumnHeader column={column} title="PRICE" />,
      cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('price'))}</span>,
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => <DataTableColumnHeader column={column} title="STOCK" />,
      cell: ({ row }) => {
        const stock = parseInt(row.getValue('stock') as string)
        return (
          <span className={`font-medium ${stock < 20 ? 'text-red-600' : 'text-emerald-600'}`}>
            {stock} units
          </span>
        )
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
              label: 'Edit Product',
              icon: <Edit className="h-4 w-4" />,
              onClick: () => console.log('Edit', row.original.id),
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
          { label: 'Products' }
        ]}
        title="Products & Stock" 
        description="Manage product catalog and monitor stock levels."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </PageHeader>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <DataTable columns={columns} data={MOCK_PRODUCTS} searchKey="name" searchPlaceholder="Search products..." />
      </div>
    </div>
  )
}
