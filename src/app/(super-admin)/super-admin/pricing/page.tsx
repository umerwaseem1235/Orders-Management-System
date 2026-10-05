'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { formatCurrency } from '@/lib/utils';
import { Search, Plus, Edit2, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Products with Tiers
const PRICING_DATA = [
  { id: '1', product: 'Premium Rice 50kg', sku: 'RICE-PR-50', basePrice: 4500, retail: 5200, wholesale: 4800, distributor: 4650, effectiveFrom: '2023-11-01' },
  { id: '2', product: 'Wheat Flour 20kg', sku: 'WHT-FL-20', basePrice: 1800, retail: 2100, wholesale: 1950, distributor: 1880, effectiveFrom: '2023-10-15' },
  { id: '3', product: 'Cooking Oil 5L', sku: 'OIL-CK-05', basePrice: 2200, retail: 2600, wholesale: 2400, distributor: 2300, effectiveFrom: '2023-11-10' },
  { id: '4', product: 'Sugar 50kg', sku: 'SGR-WH-50', basePrice: 5100, retail: 5800, wholesale: 5400, distributor: 5250, effectiveFrom: '2023-09-01' },
  { id: '5', product: 'Lentils 10kg', sku: 'LNT-YL-10', basePrice: 1500, retail: 1800, wholesale: 1650, distributor: 1580, effectiveFrom: '2023-11-20' },
];

type TabType = 'retail' | 'wholesale' | 'distributor';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('retail');
  const [searchQuery, setSearchQuery] = useState('');

  const renderTable = (tier: TabType) => {
    return (
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">PRODUCT</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 text-right font-medium">BASE PRICE</th>
                <th className="px-4 py-3 text-right font-medium">SELLING PRICE</th>
                <th className="px-4 py-3 text-right font-medium">MARGIN %</th>
                <th className="px-4 py-3 font-medium">EFFECTIVE FROM</th>
                <th className="px-4 py-3 text-center font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {PRICING_DATA.filter((item: any) => item.product.toLowerCase().includes(searchQuery.toLowerCase()) || item.sku.toLowerCase().includes(searchQuery.toLowerCase())).map((item: any) => {
                const sellingPrice = item[tier];
                const margin = ((sellingPrice - item.basePrice) / item.basePrice) * 100;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.product}</td>
                    <td className="px-4 py-3 text-gray-500">{item.sku}</td>
                    <td className="px-4 py-3 text-right text-gray-500">{formatCurrency(item.basePrice)}</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">{formatCurrency(sellingPrice)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{margin.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(item.effectiveFrom).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pricing / Rates"
        description="Manage product pricing and rate tiers."
        breadcrumbs={[
          { label: 'Administrator', href: '/dashboard' },
          { label: 'Pricing / Rates' },
        ]}
        items={
          <Button className="bg-green-800 hover:bg-green-700 gap-2">
            <Plus className="h-4 w-4" />
            Update Prices
          </Button>
        }
      />

      {/* Tabs and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('retail')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'retail' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Retail Prices
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'wholesale' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Wholesale Prices
          </button>
          <button
            onClick={() => setActiveTab('distributor')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'distributor' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Distributor Prices
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-md border border-gray-300 p-2 pl-8 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tab Content */}
      {renderTable(activeTab)}
    </div>
  );
}
