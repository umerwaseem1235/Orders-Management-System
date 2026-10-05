'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_CUSTOMERS, MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Search, Plus, Minus, Check, ArrowRight, Save, Trash2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewOrderPage() {
  const [step, setStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  
  const [cart, setCart] = useState<{product: any, quantity: number}[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [notes, setNotes] = useState('');

  const filteredCustomers = useMemo(() => {
    return MOCK_CUSTOMERS.filter((c: any) => c.name.toLowerCase().includes(customerSearch.toLowerCase()));
  }, [customerSearch]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p: any) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
  }, [productSearch]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map((item: any) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map((item: any) => {
        if (item.product.id === productId) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ > 0 ? newQ : 0 };
        }
        return item;
      }).filter((item: any) => item.quantity > 0);
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)] max-w-3xl mx-auto w-full relative pb-24">
      <div className="p-4 md:p-6 pb-0">
        <div className="flex items-center gap-2 mb-6">
          {step > 1 && (
            <Button variant="ghost" size="icon" onClick={() => setStep(s => s - 1)} className="-ml-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold tracking-tight">
            {step === 1 && "Select Customer"}
            {step === 2 && "Add Products"}
            {step === 3 && "Review Order"}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((i: any) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-green-600' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 md:px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search customer..." 
                  className="pl-9"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                {filteredCustomers.map((customer: any) => (
                  <Card 
                    key={customer.id} 
                    className={`cursor-pointer transition-colors ${selectedCustomer?.id === customer.id ? 'border-green-600 bg-green-50' : 'hover:border-green-200'}`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.area || 'Unknown'}</p>
                      </div>
                      {selectedCustomer?.id === customer.id && <Check className="h-5 w-5 text-green-600" />}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                {filteredProducts.map((product: any) => {
                  const cartItem = cart.find(item => item.product.id === product.id);
                  return (
                    <Card key={product.id}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                          <div className="flex gap-2 items-center text-sm">
                            <span className="text-primary font-medium">{formatCurrency(product.price)}</span>
                            <span className="text-muted-foreground text-xs">Stock: {product.stock}</span>
                          </div>
                        </div>
                        
                        {cartItem ? (
                          <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={() => updateQuantity(product.id, -1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold w-6 text-center">{cartItem.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={() => updateQuantity(product.id, 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" className="shrink-0" onClick={() => addToCart(product)}>
                            Add
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Customer</h3>
                <Card>
                  <CardContent className="p-4">
                    <p className="font-bold text-lg">{selectedCustomer?.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer?.area}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Order Summary</h3>
                <Card>
                  <CardContent className="p-0 divide-y">
                    {cart.map((item: any) => (
                      <div key={item.product.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">{item.quantity} x {formatCurrency(item.product.price)}</p>
                        </div>
                        <p className="font-bold">{formatCurrency(item.quantity * item.product.price)}</p>
                      </div>
                    ))}
                    {cart.length === 0 && <div className="p-4 text-center text-muted-foreground">Cart is empty</div>}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Notes (Optional)</h3>
                <Input 
                  placeholder="Add any special instructions..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-[64px] md:bottom-0 left-0 right-0 bg-white border-t p-4 md:px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 md:static md:mt-auto">
        <div className="max-w-3xl mx-auto w-full">
          {step > 1 && (
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-muted-foreground">Total Amount</span>
              <span className="text-xl font-bold text-green-700">{formatCurrency(totalAmount)}</span>
            </div>
          )}
          <div className="flex gap-3">
            {step === 1 && (
              <Button 
                className="w-full bg-green-700 hover:bg-green-800" 
                size="lg" 
                disabled={!selectedCustomer}
                onClick={() => setStep(2)}
              >
                Continue to Products <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            
            {step === 2 && (
              <Button 
                className="w-full bg-green-700 hover:bg-green-800" 
                size="lg" 
                disabled={cart.length === 0}
                onClick={() => setStep(3)}
              >
                Review Order <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}

            {step === 3 && (
              <>
                <Button variant="outline" size="lg" className="flex-1">
                  <Save className="h-4 w-4 mr-2" /> Draft
                </Button>
                <Button className="flex-1 bg-green-700 hover:bg-green-800" size="lg">
                  <Check className="h-4 w-4 mr-2" /> Submit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
