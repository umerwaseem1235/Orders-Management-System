'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/status-badge';
import { Search, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MOCK_ORDERS } from '@/lib/mock-data';

export default function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrders = MOCK_ORDERS.filter((order: any) => 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search order # or customer..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background max-w-[130px]">
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-2">
        {filteredOrders.map((order: any) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{order.customerName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.id}</p>
                </div>
                <StatusBadge status={order.status as any} />
              </div>
              <div className="bg-slate-50 px-4 py-3 flex justify-between items-center border-t">
                <span className="text-sm text-muted-foreground">{formatDate(order.date)}</span>
                <span className="font-bold text-primary">{formatCurrency(order.totalAmount)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
