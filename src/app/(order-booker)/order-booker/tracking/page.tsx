'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { CheckCircle2, Circle, Clock, Truck, Package } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrderTrackingPage() {
  const activeOrders = MOCK_ORDERS.filter((o: any) => ['Pending', 'Processing'].includes(o.status));

  const steps = [
    { label: 'Placed', icon: Clock },
    { label: 'Approved', icon: CheckCircle2 },
    { label: 'Processing', icon: Package },
    { label: 'Dispatched', icon: Truck },
    { label: 'Delivered', icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Active Tracking</h1>
      </div>

      <div className="grid gap-6">
        {activeOrders.map((order: any) => (
          <Card key={order.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                  <h3 className="font-bold text-lg">{order.customerName}</h3>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{formatCurrency(order.totalAmount)}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(order.date)}</p>
                </div>
              </div>

              <div className="relative pt-2">
                <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-200 -z-10" />
                <div className="flex justify-between">
                  {steps.map((step, idx) => {
                    let isCompleted = false;
                    let isCurrent = false;
                    
                    if (order.status === 'Pending') {
                      isCompleted = idx === 0;
                      isCurrent = idx === 0;
                    } else if (order.status === 'Processing') {
                      isCompleted = idx <= 2;
                      isCurrent = idx === 2;
                    }

                    const Icon = step.icon;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 bg-white">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white
                          ${isCompleted ? 'bg-green-600' : 'bg-slate-200'}
                          ${isCurrent ? 'ring-4 ring-green-100' : ''}
                        `}>
                          {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3 text-slate-400" />}
                        </div>
                        <span className={`text-[10px] md:text-xs font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6 bg-slate-50 rounded-lg p-3 text-sm flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" /> Expected delivery: Tomorrow, 2:00 PM
              </div>
            </CardContent>
          </Card>
        ))}
        {activeOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No active orders to track.
          </div>
        )}
      </div>
    </div>
  );
}
