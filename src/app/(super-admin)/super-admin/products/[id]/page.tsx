'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const mockProduct = {
  id: 'PRD-102',
  name: 'Premium Cooking Oil 5L',
  sku: 'PCO-5L',
  category: 'Groceries',
  unit: 'Carton',
  description: 'High quality premium cooking oil, 5 Liters bottle packing.',
  pricing: {
    basePrice: 2000,
    retailPrice: 2500,
    wholesalePrice: 2200,
    margin: '10%'
  },
  stock: {
    current: 1500,
    min: 200,
    max: 5000,
    warehouse: 'Main Warehouse, Lahore'
  }
};

const mockStockHistory = [
  { id: 1, date: '2026-10-01', type: 'In', qty: 500, ref: 'PO-9912', notes: 'Supplier Delivery' },
  { id: 2, date: '2026-09-30', type: 'Out', qty: 50, ref: 'SO-2045', notes: 'Order Dispatch' },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title={mockProduct.name} 
        breadcrumbs={[{ label: 'Super Admin' }, { label: 'Products', href: '/super-admin/products' }, { label: mockProduct.name }]}
      />
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Product Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Name</p><p className="font-semibold">{mockProduct.name}</p></div>
              <div><p className="text-gray-500">SKU</p><p className="font-semibold">{mockProduct.sku}</p></div>
              <div><p className="text-gray-500">Category</p><p>{mockProduct.category}</p></div>
              <div><p className="text-gray-500">Unit</p><p>{mockProduct.unit}</p></div>
              <div className="col-span-2"><p className="text-gray-500">Description</p><p>{mockProduct.description}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Base Price</p><p className="font-semibold">{formatCurrency(mockProduct.pricing.basePrice)}</p></div>
              <div><p className="text-gray-500">Retail Price</p><p className="font-semibold text-forest-green-700">{formatCurrency(mockProduct.pricing.retailPrice)}</p></div>
              <div><p className="text-gray-500">Wholesale Price</p><p className="font-semibold">{formatCurrency(mockProduct.pricing.wholesalePrice)}</p></div>
              <div><p className="text-gray-500">Margin %</p><p>{mockProduct.pricing.margin}</p></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Stock Info</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Current Stock</p><p className="font-bold text-xl">{mockProduct.stock.current}</p></div>
              <div><p className="text-gray-500">Warehouse</p><p>{mockProduct.stock.warehouse}</p></div>
              <div><p className="text-gray-500">Min Stock</p><p>{mockProduct.stock.min}</p></div>
              <div><p className="text-gray-500">Max Stock</p><p>{mockProduct.stock.max}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Stock Movement</CardTitle></CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4">DATE</th>
                    <th className="py-3 px-4">TYPE</th>
                    <th className="py-3 px-4 text-right">QTY</th>
                    <th className="py-3 px-4">REF</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockStockHistory.map((h: any) => (
                    <tr key={h.id}>
                      <td className="py-3 px-4">{h.date}</td>
                      <td className={`py-3 px-4 font-medium ${h.type === 'In' ? 'text-forest-green-600' : 'text-red-600'}`}>{h.type}</td>
                      <td className="py-3 px-4 text-right">{h.qty}</td>
                      <td className="py-3 px-4 text-gray-500">{h.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
