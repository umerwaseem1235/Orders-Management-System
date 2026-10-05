'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, X, ChevronDown, ChevronUp, Package, MapPin, Phone, User } from 'lucide-react'

export default function VerificationPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const pendingOrders = MOCK_ORDERS.filter((o: any) => o.status === 'Pending')

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Order Verification' }
        ]}
        title="Order Verification" 
        description="Verify and approve pending orders."
      />

      <div className="space-y-4">
        {pendingOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm">
            No orders pending verification.
          </div>
        ) : (
          pendingOrders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex-1">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order #</p>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Customer</p>
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-medium text-gray-900">{formatDate(order.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Check className="h-4 w-4 mr-1" /> Verify
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  >
                    {expandedId === order.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              {expandedId === order.id && (
                <div className="border-t border-gray-100 bg-gray-50 p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-500" /> Order Items
                    </h4>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Item</th>
                            <th className="px-4 py-2 text-right font-medium">Qty</th>
                            <th className="px-4 py-2 text-right font-medium">Price</th>
                            <th className="px-4 py-2 text-right font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {order.items?.map((item: any, idx: number) => (
                            <tr key={idx}>
                              <td className="px-4 py-3 text-gray-900">{item.name}</td>
                              <td className="px-4 py-3 text-right">{item.quantity}</td>
                              <td className="px-4 py-3 text-right">{formatCurrency(item.price)}</td>
                              <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.quantity * item.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" /> Customer Details
                    </h4>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">Shop #12, Market Square, Downtown Area</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">+92 300 1234567</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-500 mb-1">Order Booker</p>
                        <p className="font-medium text-gray-900">{order.salesRepName || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
