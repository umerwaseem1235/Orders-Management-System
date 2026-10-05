'use client'

import { PageHeader } from '@/components/layout/page-header'
import { DataTable } from '@/components/shared/data-table'
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header'
import { KpiCard } from '@/components/shared/kpi-card'
import { ActionMenu } from '@/components/shared/action-menu'
import { StatusBadge } from '@/components/shared/status-badge'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { ColumnDef } from '@tanstack/react-table'
import { Truck, Map, CheckCircle2, TrendingUp, Navigation, Printer } from 'lucide-react'

export default function DispatchPage() {
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
      id: 'area',
      header: ({ column }) => <DataTableColumnHeader column={column} title="AREA" />,
      cell: () => 'Downtown',
    },
    {
      accessorKey: 'items',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ITEMS" />,
      cell: ({ row }) => `${row.original.items?.length || 0} items`,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
      cell: ({ row }) => {
        // Mock status for dispatch view
        const status = row.original.status === 'Completed' ? 'Delivered' : 
                      row.original.status === 'Processing' ? 'In Transit' : 'Ready'
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${status === 'Ready' ? 'bg-amber-100 text-amber-800' :
              status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
              'bg-emerald-100 text-emerald-800'}`}>
            {status}
          </span>
        )
      },
    },
    {
      id: 'vehicle',
      header: ({ column }) => <DataTableColumnHeader column={column} title="VEHICLE/DRIVER" />,
      cell: () => <span className="text-sm text-gray-600">Van-A (Ali)</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: 'Print Dispatch Note',
              icon: <Printer className="h-4 w-4" />,
              onClick: () => console.log('Print', row.original.id),
            },
            {
              label: 'Track Status',
              icon: <Navigation className="h-4 w-4" />,
              onClick: () => console.log('Track', row.original.id),
            }
          ]}
        />
      ),
    },
  ]

  const data = MOCK_ORDERS.filter((o: any) => ['Processing', 'Completed'].includes(o.status))

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Dispatch Management' }
        ]}
        title="Dispatch Management" 
        description="Monitor and manage outbound deliveries."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Ready to Dispatch"
          value="15"
          icon={<Truck className="h-5 w-5 text-amber-600" />}
        />
        <KpiCard
          title="In Transit"
          value="8"
          icon={<Map className="h-5 w-5 text-blue-600" />}
        />
        <KpiCard
          title="Delivered Today"
          value="24"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
          trend={{ value: "+12%", label: "vs yesterday", isPositive: true }}
        />
        <KpiCard
          title="Delivery Rate"
          value="98.5%"
          icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <DataTable columns={columns} data={data} searchKey="customerName" searchPlaceholder="Search dispatches..." />
      </div>
    </div>
  )
}
