'use client';
import React from 'react';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'sku',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <span className="font-medium text-gray-900">{row.original.sku}</span>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="PRODUCT NAME" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CATEGORY" />,
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="UNIT" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="PRICE" />,
    cell: ({ row }) => <span>{formatCurrency(row.original.price || 0)}</span>,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="STOCK" />,
    cell: ({ row }) => <span>{row.original.stock || row.original.currentStock || 0}</span>,
  },
  {
    accessorKey: 'stockLevel',
    header: ({ column }) => <DataTableColumnHeader column={column} title="STOCK LEVEL" />,
    cell: ({ row }) => {
      const stock = row.original.stock || row.original.currentStock || 0;
      const minStock = row.original.minStock || 10;
      let status = 'In Stock';
      if (stock === 0) status = 'Out of Stock';
      else if (stock <= minStock) status = 'Low Stock';
      return <StatusBadge status={status} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionMenu items={[
          { label: 'Edit Product', onClick: () => {} },
          { label: 'Update Stock', onClick: () => {} },
          { label: 'Delete', onClick: () => {}, variant: 'destructive' }
        ]} 
      />
    ),
  },
];

export default function ProductsPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Products"
        description="View and manage product catalog."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Products', href: '/products' },
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
            <h2 className="text-lg font-semibold text-gray-900">Products register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_PRODUCTS?.length || 0} of {MOCK_PRODUCTS?.length || 0} products • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_PRODUCTS || []} searchKey="name" />
      </div>
    </div>
  );
}
