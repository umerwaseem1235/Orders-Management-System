'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { MOCK_CUSTOMERS } from '@/lib/mock-data';

export default function CustomerMapPage() {
  const todayCustomers = MOCK_CUSTOMERS.slice(0, 5);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto w-full h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Today's Route</h1>
      </div>

      <div className="flex-1 min-h-[300px] bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center flex-col gap-4">
        <MapPin className="h-12 w-12 text-slate-400" />
        <p className="text-slate-500 font-medium">Interactive Map Integration Coming Soon</p>
      </div>

      <div className="space-y-3 shrink-0">
        <h2 className="font-semibold px-1">Route List</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {todayCustomers.map((customer, idx) => (
            <Card key={customer.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{customer.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{customer.area || 'Unknown Address'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium">{9 + idx}:00 AM</p>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-blue-600 p-0 hover:bg-transparent">
                    <Navigation className="h-3 w-3 mr-1" />
                    <span className="text-xs">Navigate</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
