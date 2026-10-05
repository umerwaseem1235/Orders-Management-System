'use client'

import { KpiCard } from '@/components/shared/kpi-card'
import { PageHeader } from '@/components/layout/page-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { ChartCard } from '@/components/shared/chart-card'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  ClipboardList, 
  CheckCircle2, 
  Truck, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import Link from 'next/link'

export default function MainOfficeDashboard() {
  const chartData = [
    { name: 'Mon', pending: 12, approved: 15, rejected: 2 },
    { name: 'Tue', pending: 8, approved: 18, rejected: 1 },
    { name: 'Wed', pending: 15, approved: 12, rejected: 3 },
    { name: 'Thu', pending: 10, approved: 20, rejected: 0 },
    { name: 'Fri', pending: 14, approved: 16, rejected: 2 },
  ]

  const recentOrders = MOCK_ORDERS.slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office' }
        ]}
        title="Main Office Dashboard" 
        description="Overview of incoming orders, verification status, and dispatch."
      >
        <div className="flex gap-2">
          <Link href="/main-office/incoming-orders">
            <Button><ClipboardList className="mr-2 h-4 w-4" /> Incoming Orders</Button>
          </Link>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Incoming Orders Today"
          value="12"
          icon={<ClipboardList className="h-5 w-5 text-blue-600" />}
          trend={{ value: "+2", label: "from yesterday", isPositive: true }}
        />
        <KpiCard
          title="Pending Verification"
          value="8"
          icon={<Clock className="h-5 w-5 text-amber-600" />}
        />
        <KpiCard
          title="Approved Today"
          value="15"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
          trend={{ value: "+5", label: "from yesterday", isPositive: true }}
        />
        <KpiCard
          title="Dispatched Today"
          value="6"
          icon={<Truck className="h-5 w-5 text-purple-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Orders by Status"
            description="Last 5 days"
          >
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f3f4f6' }}
                  />
                  <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-3">
              <Link href="/main-office/verification" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-forest-700 transition-colors">Verify Orders</p>
                    <p className="text-sm text-gray-500">8 pending verification</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-forest-700 transition-colors" />
              </Link>
              <Link href="/main-office/invoices" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-forest-700 transition-colors">Generate Invoice</p>
                    <p className="text-sm text-gray-500">15 ready for invoicing</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-forest-700 transition-colors" />
              </Link>
              <Link href="/main-office/dispatch" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-forest-700 transition-colors">Manage Dispatch</p>
                    <p className="text-sm text-gray-500">20 orders ready</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-forest-700 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Recent Incoming Orders</h3>
          <Link href="/main-office/incoming-orders" className="text-sm font-medium text-forest-600 hover:text-forest-700 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50 uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Order #</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(order.date)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
