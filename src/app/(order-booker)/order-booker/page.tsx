'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Users, FileText, MapPin, ChevronRight, Clock, Box } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MOCK_CUSTOMERS, MOCK_ORDERS } from '@/lib/mock-data';
import Link from 'next/link';

export default function OrderBookerDashboard() {
  const [target] = useState(150000);
  const [achieved] = useState(98500);
  const progress = (achieved / target) * 100;
  
  const todayCustomers = MOCK_CUSTOMERS.slice(0, 3);
  const recentOrders = MOCK_ORDERS.slice(0, 5);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Good morning, Usman</h1>
        <p className="text-muted-foreground">{formatDate(new Date().toISOString())}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">To Visit</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <Box className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Orders</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="p-4 flex flex-col gap-3 justify-center h-full">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="text-lg font-bold">{formatCurrency(target)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Achieved</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(achieved)}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">{progress.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <Link href="/order-booker/new-order" className="contents">
          <Button className="h-auto py-4 flex flex-col gap-2 bg-green-700 hover:bg-green-800">
            <Plus className="h-5 w-5" />
            <span className="text-xs md:text-sm">New Order</span>
          </Button>
        </Link>
        <Link href="/order-booker/customers" className="contents">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <Users className="h-5 w-5" />
            <span className="text-xs md:text-sm">Customers</span>
          </Button>
        </Link>
        <Link href="/order-booker/drafts" className="contents">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-xs md:text-sm">Drafts</span>
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Today's Route</h2>
            <Link href="/order-booker/map">
              <Button variant="ghost" size="sm" className="text-primary">
                View Map <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {todayCustomers.map((customer, index) => (
              <Card key={customer.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <MapPin className="h-3 w-3" />
                        {customer.area || 'Unknown Area'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Clock className="h-3 w-3" />
                    {9 + index}:00 AM
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/order-booker/history">
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentOrders.map((order: any) => (
              <Card key={order.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(order.totalAmount)}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.date)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
