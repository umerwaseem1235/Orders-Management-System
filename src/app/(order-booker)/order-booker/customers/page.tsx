'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Phone, Filter } from 'lucide-react';
import { MOCK_CUSTOMERS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const filteredCustomers = useMemo(() => {
    return MOCK_CUSTOMERS.filter((customer: any) => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (customer.area && customer.area.toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'outstanding') {
        const balA = a.balance || 0;
        const balB = b.balance || 0;
        return balB - balA;
      }
      return 0;
    });
  }, [searchTerm, sortBy]);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Customers</h1>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers or area..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background max-w-[140px]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="outstanding">Outstanding</option>
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer: any) => (
          <Card key={customer.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{customer.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {customer.area || 'N/A'}
                  </div>
                </div>
                {customer.balance && customer.balance > 0 ? (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className="font-bold text-red-600">{formatCurrency(customer.balance)}</p>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-bold text-green-600">Clear</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="text-xs text-muted-foreground">
                  Last visit: {customer.lastOrderDate ? formatDate(customer.lastOrderDate) : 'Unknown'}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Link href={`/order-booker/new-order?customer=${customer.id}`}>
                    <Button size="sm" className="h-8 bg-green-700 hover:bg-green-800">
                      Order
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No customers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
