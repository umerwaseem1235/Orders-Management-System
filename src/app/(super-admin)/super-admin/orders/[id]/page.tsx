'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, FileText, Check, X } from 'lucide-react';
import { StatusBadge } from '@/components/shared/status-badge';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const mockOrder = {
  id: 'AT-250184',
  date: '2026-10-02T10:30:00Z',
  status: 'Processing',
  customer: {
    name: 'Al-Madina General Store',
    area: 'Gulberg, Lahore',
    phone: '+92 300 1234567',
    creditLimit: 500000,
  },
  orderBooker: 'Ahmad Khan',
  items: [
    { id: 1, product: 'Premium Cooking Oil 5L', sku: 'PCO-5L', qty: 10, unitPrice: 2500, total: 25000 },
    { id: 2, product: 'Basmati Rice 10kg', sku: 'BR-10K', qty: 5, unitPrice: 3200, total: 16000 },
  ],
  subtotal: 41000,
  tax: 0,
  total: 41000,
  timeline: ['Placed', 'Approved', 'Processing', 'Dispatched', 'Delivered']
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Order ${mockOrder.id}`} 
        breadcrumbs={[{ label: 'Super Admin' }, { label: 'Orders', href: '/super-admin/orders' }, { label: mockOrder.id }]}
      />
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1 flex gap-2 justify-end">
          <Button variant="outline" className="text-forest-green-700"><Check className="w-4 h-4 mr-2" /> Approve</Button>
          <Button variant="outline" className="text-red-600"><X className="w-4 h-4 mr-2" /> Reject</Button>
          <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> Generate Invoice</Button>
          <Button className="bg-forest-green-700 hover:bg-forest-green-800 text-white"><Printer className="w-4 h-4 mr-2" /> Print</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Order Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><p className="text-gray-500">Order #</p><p className="font-semibold">{mockOrder.id}</p></div>
              <div><p className="text-gray-500">Date</p><p className="font-semibold">{new Date(mockOrder.date).toLocaleDateString()}</p></div>
              <div><p className="text-gray-500">Status</p><StatusBadge status={mockOrder.status} /></div>
              <div><p className="text-gray-500">Order Booker</p><p className="font-semibold">{mockOrder.orderBooker}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {mockOrder.timeline.map((step, idx) => {
                  const isPast = mockOrder.timeline.indexOf(mockOrder.status) >= idx;
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPast ? 'bg-forest-green-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {idx + 1}
                      </div>
                      <p className="mt-2 text-xs font-medium">{step}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Items</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-3 px-4 font-medium">PRODUCT</th>
                      <th className="py-3 px-4 font-medium">SKU</th>
                      <th className="py-3 px-4 font-medium text-right">QTY</th>
                      <th className="py-3 px-4 font-medium text-right">UNIT PRICE</th>
                      <th className="py-3 px-4 font-medium text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockOrder.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-3 px-4">{item.product}</td>
                        <td className="py-3 px-4 text-gray-500">{item.sku}</td>
                        <td className="py-3 px-4 text-right">{item.qty}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="py-3 px-4 text-right font-medium">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 space-y-2 text-sm max-w-sm ml-auto">
                <div className="flex justify-between py-1"><span className="text-gray-500">Subtotal</span><span>{formatCurrency(mockOrder.subtotal)}</span></div>
                <div className="flex justify-between py-1"><span className="text-gray-500">Tax</span><span>{formatCurrency(mockOrder.tax)}</span></div>
                <div className="flex justify-between py-2 border-t font-semibold text-lg"><span>Total</span><span className="text-forest-green-800">{formatCurrency(mockOrder.total)}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div><p className="text-gray-500">Name</p><p className="font-semibold">{mockOrder.customer.name}</p></div>
              <div><p className="text-gray-500">Area</p><p>{mockOrder.customer.area}</p></div>
              <div><p className="text-gray-500">Phone</p><p>{mockOrder.customer.phone}</p></div>
              <div><p className="text-gray-500">Credit Limit</p><p className="font-semibold text-forest-green-700">{formatCurrency(mockOrder.customer.creditLimit)}</p></div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
