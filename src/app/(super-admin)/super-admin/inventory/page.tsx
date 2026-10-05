'use client';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, AlertCircle, CheckCircle, Package } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'sku',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <span className="font-medium text-gray-900">{row.original.sku}</span>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="PRODUCT" />,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CATEGORY" />,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CURRENT STOCK" />,
    cell: ({ row }) => <span className="font-medium">{row.original.currentStock || row.original.currentStock || 0}</span>,
  },
  {
    accessorKey: 'minStock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MIN STOCK" />,
    cell: ({ row }) => <span className="text-gray-500">{row.original.minStock || 10}</span>,
  },
  {
    accessorKey: 'maxStock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MAX STOCK" />,
    cell: ({ row }) => <span className="text-gray-500">{row.original.maxStock || 100}</span>,
  },
  {
    accessorKey: 'stockLevel',
    header: ({ column }) => <DataTableColumnHeader column={column} title="STOCK LEVEL" />,
    cell: ({ row }) => {
      const stock = row.original.currentStock || row.original.currentStock || 0;
      const minStock = row.original.minStock || 10;
      let status = 'In Stock';
      if (stock === 0) status = 'Out of Stock';
      else if (stock <= minStock) status = 'Low Stock';
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: 'warehouse',
    header: ({ column }) => <DataTableColumnHeader column={column} title="WAREHOUSE" />,
    cell: ({ row }) => <span>{row.original.warehouse || 'Main Warehouse'}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionMenu items={[
          { label: 'Adjust Stock', onClick: () => {} },
          { label: 'Transfer Stock', onClick: () => {} },
          { label: 'View History', onClick: () => {} }
        ]} 
      />
    ),
  },
];

export default function InventoryPage() {
  const totalProducts = MOCK_PRODUCTS?.length || 0;
  const lowStock = (MOCK_PRODUCTS || []).filter((p: any) => (p.currentStock || p.currentStock || 0) <= (p.minStock || 10) && (p.currentStock || p.currentStock || 0) > 0).length;
  const outOfStock = (MOCK_PRODUCTS || []).filter((p: any) => (p.currentStock || p.currentStock || 0) === 0).length;

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Inventory"
        description="Track and manage stock levels."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Inventory', href: '/inventory' },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalProducts}</h3>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
            <h3 className="text-2xl font-bold text-gray-900">{lowStock}</h3>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-full">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Out of Stock</p>
            <h3 className="text-2xl font-bold text-gray-900">{outOfStock}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Inventory register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_PRODUCTS?.length || 0} of {MOCK_PRODUCTS?.length || 0} items • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_PRODUCTS || []} searchKey="sku" />
      </div>
    </div>
  );
}
