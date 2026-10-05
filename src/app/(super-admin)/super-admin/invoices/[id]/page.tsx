'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, Download, Send, CreditCard } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency } from '@/lib/utils';

const mockInvoice = {
  id: 'INV-2026-891',
  date: '2026-10-01',
  dueDate: '2026-10-15',
  status: 'Unpaid',
  customer: {
    name: 'Al-Madina General Store',
    address: 'Shop 12, Main Market, Gulberg, Lahore, Pakistan',
    phone: '+92 300 1234567'
  },
  items: [
    { id: 1, item: 'Premium Cooking Oil 5L', qty: 10, rate: 2500, amount: 25000 },
    { id: 2, item: 'Basmati Rice 10kg', qty: 5, rate: 3200, amount: 16000 }
  ],
  subtotal: 41000,
  tax: 0,
  discount: 1000,
  grandTotal: 40000,
  paymentHistory: []
};

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Invoice ${mockInvoice.id}`} 
        breadcrumbs={[{ label: 'Super Admin' }, { label: 'Invoices', href: '/super-admin/invoices' }, { label: mockInvoice.id }]}
      />
      
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex gap-2">
          <Button variant="outline"><Printer className="w-4 h-4 mr-2" /> Print</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> PDF</Button>
          <Button variant="outline"><Send className="w-4 h-4 mr-2" /> Send</Button>
          <Button className="bg-forest-green-700 hover:bg-forest-green-800 text-white"><CreditCard className="w-4 h-4 mr-2" /> Record Payment</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="max-w-4xl mx-auto bg-white">
          <CardContent className="p-10 space-y-8">
            <div className="flex justify-between items-start border-b pb-8">
              <div>
                <h1 className="text-3xl font-bold text-forest-green-800 tracking-tight">INVOICE</h1>
                <p className="text-gray-500 mt-1">{mockInvoice.id}</p>
              </div>
              <div className="text-right space-y-1 text-sm">
                <StatusBadge status={mockInvoice.status} />
                <p className="mt-2"><span className="text-gray-500">Date:</span> {mockInvoice.date}</p>
                <p><span className="text-gray-500">Due Date:</span> {mockInvoice.dueDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-gray-500 font-medium mb-2">Bill To:</p>
                <p className="font-semibold text-base">{mockInvoice.customer.name}</p>
                <p className="text-gray-600 whitespace-pre-line">{mockInvoice.customer.address}</p>
                <p className="text-gray-600 mt-1">{mockInvoice.customer.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-medium mb-2">From:</p>
                <p className="font-semibold text-base">Ali Traders (Pvt) Ltd</p>
                <p className="text-gray-600">Industrial Estate, Kot Lakhpat<br/>Lahore, Pakistan</p>
              </div>
            </div>

            <div className="pt-4">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-t">
                  <tr>
                    <th className="py-3 px-4 font-semibold">ITEM DESCRIPTION</th>
                    <th className="py-3 px-4 font-semibold text-right">QTY</th>
                    <th className="py-3 px-4 font-semibold text-right">RATE</th>
                    <th className="py-3 px-4 font-semibold text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockInvoice.items.map((item: any) => (
                    <tr key={item.id}>
                      <td className="py-4 px-4">{item.item}</td>
                      <td className="py-4 px-4 text-right">{item.qty}</td>
                      <td className="py-4 px-4 text-right">{formatCurrency(item.rate)}</td>
                      <td className="py-4 px-4 text-right font-medium">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between py-1"><span className="text-gray-500">Subtotal</span><span>{formatCurrency(mockInvoice.subtotal)}</span></div>
                <div className="flex justify-between py-1"><span className="text-gray-500">Tax</span><span>{formatCurrency(mockInvoice.tax)}</span></div>
                <div className="flex justify-between py-1"><span className="text-gray-500">Discount</span><span className="text-red-600">-{formatCurrency(mockInvoice.discount)}</span></div>
                <div className="flex justify-between py-3 border-t font-bold text-lg"><span>Grand Total</span><span className="text-forest-green-800">{formatCurrency(mockInvoice.grandTotal)}</span></div>
              </div>
            </div>
            
            <div className="border-t pt-8 mt-8 text-center text-sm text-gray-500">
              <p>Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
