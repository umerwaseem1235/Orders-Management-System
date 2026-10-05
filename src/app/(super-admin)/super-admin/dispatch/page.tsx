'use client';

import { PageHeader } from '@/components/layout/page-header';
import { KpiCard } from '@/components/shared/kpi-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Package, Truck, CheckCircle2, TrendingUp, Search, Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// Mock Dispatch Data
const DISPATCH_DATA = [
  { id: '1', orderNo: 'ORD-2023-1101', customer: 'Alpha Traders', area: 'North District', items: 12, status: 'in-transit', dispatchedAt: '2023-11-28T09:30:00Z', vehicle: 'Van-01 / John' },
  { id: '2', orderNo: 'ORD-2023-1105', customer: 'Beta Mart', area: 'East Zone', items: 5, status: 'delivered', dispatchedAt: '2023-11-28T08:15:00Z', vehicle: 'Truck-02 / Mike' },
  { id: '3', orderNo: 'ORD-2023-1110', customer: 'Gamma Wholesalers', area: 'South District', items: 45, status: 'ready', dispatchedAt: null, vehicle: 'Pending' },
  { id: '4', orderNo: 'ORD-2023-1112', customer: 'Delta Stores', area: 'West Zone', items: 8, status: 'in-transit', dispatchedAt: '2023-11-28T11:00:00Z', vehicle: 'Van-03 / Sarah' },
  { id: '5', orderNo: 'ORD-2023-1115', customer: 'Epsilon Retail', area: 'Central', items: 3, status: 'ready', dispatchedAt: null, vehicle: 'Pending' },
];

export default function DispatchPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return <StatusBadge status="pending" label="Ready" />;
      case 'in-transit': return <StatusBadge status="processing" label="In Transit" />;
      case 'delivered': return <StatusBadge status="completed" label="Delivered" />;
      default: return <StatusBadge status="pending" label={status} />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dispatch Management"
        description="Manage order dispatch and delivery tracking."
        breadcrumbs={[
          { label: 'Administrator', href: '/dashboard' },
          { label: 'Dispatch' },
        ]}
        items={
          <Button className="bg-green-800 hover:bg-green-700 gap-2">
            <Plus className="h-4 w-4" />
            New Dispatch
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Ready to Dispatch"
          value="12"
          icon={<Package className="h-5 w-5 text-amber-500" />}
        />
        <KpiCard
          title="In Transit"
          value="8"
          icon={<Truck className="h-5 w-5 text-blue-500" />}
        />
        <KpiCard
          title="Delivered Today"
          value="24"
          icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
        />
        <KpiCard
          title="Delivery Rate"
          value="96%"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="rounded-lg border bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders or vehicles..."
              className="w-full rounded-md border border-gray-300 p-2 pl-8 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="block w-full sm:w-auto rounded-md border border-gray-300 p-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
              <option>All Areas</option>
              <option>North District</option>
              <option>South District</option>
              <option>East Zone</option>
              <option>West Zone</option>
            </select>
            <select className="block w-full sm:w-auto rounded-md border border-gray-300 p-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
              <option>All Statuses</option>
              <option>Ready</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">ORDER #</th>
                <th className="px-4 py-3 font-medium">CUSTOMER</th>
                <th className="px-4 py-3 font-medium">AREA</th>
                <th className="px-4 py-3 text-center font-medium">ITEMS</th>
                <th className="px-4 py-3 font-medium">STATUS</th>
                <th className="px-4 py-3 font-medium">DISPATCHED AT</th>
                <th className="px-4 py-3 font-medium">VEHICLE/ROUTE</th>
                <th className="px-4 py-3 text-center font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {DISPATCH_DATA.map((dispatch: any) => (
                <tr key={dispatch.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600 hover:underline cursor-pointer">
                    {dispatch.orderNo}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{dispatch.customer}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {dispatch.area}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{dispatch.items}</td>
                  <td className="px-4 py-3">{getStatusBadge(dispatch.status)}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {dispatch.dispatchedAt ? formatDate(dispatch.dispatchedAt) : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{dispatch.vehicle}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="outline" size="sm" className="h-8">Update</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
