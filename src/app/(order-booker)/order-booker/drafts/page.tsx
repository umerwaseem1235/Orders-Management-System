'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/empty-state';
import { FileText, Edit2, Trash2, Send } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MOCK_ORDERS } from '@/lib/mock-data';

export default function DraftOrdersPage() {
  // Use mock orders but pretend they are drafts for this view
  const draftOrders = MOCK_ORDERS.slice(0, 2).map((o: any) => ({...o, status: 'Draft'}));

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Draft Orders</h1>
      </div>

      {draftOrders.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {draftOrders.map((draft: any) => (
            <Card key={draft.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{draft.customerName}</h3>
                    <p className="text-sm text-muted-foreground">Saved on {formatDate(draft.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{formatCurrency(draft.totalAmount)}</p>
                    <p className="text-xs text-muted-foreground">4 Items</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1 text-blue-600 hover:text-blue-700">
                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                  <Button size="sm" className="flex-1 bg-green-700 hover:bg-green-800">
                    <Send className="h-4 w-4 mr-2" /> Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={FileText} 
          title="No draft orders" 
          description="Start a new order and save it as a draft to see it here." 
          actionLabel="Start New Order" 
          actionHref="/order-booker/new-order" 
        />
      )}
    </div>
  );
}
