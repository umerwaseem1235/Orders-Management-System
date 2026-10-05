'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/status-badge';

const mockCustomer = {
  name: 'Al-Madina General Store',
  code: 'CUS-001',
  area: 'Gulberg, Lahore',
  contactPerson: 'Haji Aslam',
  phone: '+92 300 1234567',
  email: 'almadina@example.com',
  address: 'Shop 12, Main Market, Gulberg, Lahore',
  creditLimit: 500000,
  outstanding: 125000,
  totalOrders: 45,
  totalAmount: 2500000,
  lastOrderDate: '2026-09-28',
};

const mockLedger = [
  { id: 1, date: '2026-09-28', ref: 'INV-2045', desc: 'Sales Invoice', debit: 45000, credit: 0, balance: 125000 },
  { id: 2, date: '2026-09-25', ref: 'RCP-102', desc: 'Payment Received', debit: 0, credit: 50000, balance: 80000 },
];

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title={mockCustomer.name} 
        breadcrumbs={[{ label: 'Super Admin' }, { label: 'Customers', href: '/super-admin/customers' }, { label: mockCustomer.name }]}
      />
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-6">
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div><p className="text-gray-500 text-sm">Customer Code</p><p className="font-semibold">{mockCustomer.code}</p></div>
            <div><p className="text-gray-500 text-sm">Contact Person</p><p className="font-semibold">{mockCustomer.contactPerson}</p></div>
            <div><p className="text-gray-500 text-sm">Phone</p><p className="font-semibold">{mockCustomer.phone}</p></div>
            <div><p className="text-gray-500 text-sm">Area</p><p className="font-semibold">{mockCustomer.area}</p></div>
            <div className="md:col-span-2"><p className="text-gray-500 text-sm">Address</p><p className="font-medium text-sm">{mockCustomer.address}</p></div>
            <div><p className="text-gray-500 text-sm">Credit Limit</p><p className="font-semibold text-forest-green-700">{formatCurrency(mockCustomer.creditLimit)}</p></div>
            <div><p className="text-gray-500 text-sm">Outstanding</p><p className="font-semibold text-red-600">{formatCurrency(mockCustomer.outstanding)}</p></div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="ledger">Ledger</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card><CardContent className="p-6"><p className="text-gray-500 text-sm">Total Orders</p><p className="text-2xl font-bold">{mockCustomer.totalOrders}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-gray-500 text-sm">Total Amount</p><p className="text-2xl font-bold text-forest-green-800">{formatCurrency(mockCustomer.totalAmount)}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-gray-500 text-sm">Outstanding</p><p className="text-2xl font-bold text-red-600">{formatCurrency(mockCustomer.outstanding)}</p></CardContent></Card>
              <Card><CardContent className="p-6"><p className="text-gray-500 text-sm">Last Order Date</p><p className="text-2xl font-bold">{mockCustomer.lastOrderDate}</p></CardContent></Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ledger">
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-right">Debit</th>
                      <th className="py-3 px-4 text-right">Credit</th>
                      <th className="py-3 px-4 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockLedger.map((entry: any) => (
                      <tr key={entry.id}>
                        <td className="py-3 px-4">{entry.date}</td>
                        <td className="py-3 px-4">{entry.ref}</td>
                        <td className="py-3 px-4">{entry.desc}</td>
                        <td className="py-3 px-4 text-right text-red-600">{entry.debit > 0 ? formatCurrency(entry.debit) : '-'}</td>
                        <td className="py-3 px-4 text-right text-forest-green-600">{entry.credit > 0 ? formatCurrency(entry.credit) : '-'}</td>
                        <td className="py-3 px-4 text-right font-medium">{formatCurrency(entry.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders"><Card><CardContent className="p-6 text-center text-gray-500">Orders history...</CardContent></Card></TabsContent>
          <TabsContent value="payments"><Card><CardContent className="p-6 text-center text-gray-500">Payments history...</CardContent></Card></TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
