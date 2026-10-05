'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { KpiCard } from '@/components/shared/kpi-card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Download, FileText, Search, User, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Customers
const CUSTOMERS = [
  { id: '1', name: 'Alpha Traders' },
  { id: '2', name: 'Zeta Supermarket' },
  { id: '3', name: 'Metro Distributors' },
];

// Mock Ledger Data
const LEDGER_DATA = [
  {
    id: 'L001',
    date: '2023-11-01T10:00:00Z',
    reference: 'OPENING-BAL',
    description: 'Opening Balance',
    debit: 5000,
    credit: 0,
    balance: 5000,
  },
  {
    id: 'L002',
    date: '2023-11-05T14:30:00Z',
    reference: 'INV-1024',
    description: 'Sales Invoice #1024',
    debit: 12500,
    credit: 0,
    balance: 17500,
  },
  {
    id: 'L003',
    date: '2023-11-10T09:15:00Z',
    reference: 'RCP-5011',
    description: 'Payment Received - Bank Transfer',
    debit: 0,
    credit: 10000,
    balance: 7500,
  },
  {
    id: 'L004',
    date: '2023-11-15T16:45:00Z',
    reference: 'INV-1035',
    description: 'Sales Invoice #1035',
    debit: 8200,
    credit: 0,
    balance: 15700,
  },
  {
    id: 'L005',
    date: '2023-11-20T11:20:00Z',
    reference: 'CRN-042',
    description: 'Credit Note - Damaged Goods',
    debit: 0,
    credit: 1200,
    balance: 14500,
  },
  {
    id: 'L006',
    date: '2023-11-28T15:00:00Z',
    reference: 'RCP-5023',
    description: 'Payment Received - Cheque',
    debit: 0,
    credit: 14500,
    balance: 0,
  },
];

export default function CustomerLedgerPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate totals
  const totalDebit = LEDGER_DATA.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = LEDGER_DATA.reduce((sum, item) => sum + item.credit, 0);
  const openingBalance = LEDGER_DATA[0]?.balance || 0;
  const closingBalance = LEDGER_DATA[LEDGER_DATA.length - 1]?.balance || 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Ledger"
        description="View and manage customer ledger for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/dashboard' },
          { label: 'Customer Ledger' },
        ]}
        items={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        }
      />

      {/* Customer Selection & Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="w-full sm:max-w-xs">
            <label className="mb-1 block text-sm font-medium text-gray-700">Select Customer</label>
            <select
              className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              {CUSTOMERS.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block sm:h-10 sm:border-l sm:border-gray-200" />
          <div className="w-full sm:max-w-xs">
            <label className="mb-1 block text-sm font-medium text-gray-700">Date Range</label>
            <select className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
              <option>Custom Range...</option>
            </select>
          </div>
        </div>
        <div className="flex items-end gap-2 sm:mt-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reference..."
              className="w-full rounded-md border border-gray-300 p-2 pl-8 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Opening Balance"
          value={formatCurrency(openingBalance)}
          icon={<User className="h-5 w-5 text-gray-500" />}
        />
        <KpiCard
          title="Total Debit"
          value={formatCurrency(totalDebit)}
          icon={<ArrowUpRight className="h-5 w-5 text-red-500" />}
          valueClassName="text-red-600"
        />
        <KpiCard
          title="Total Credit"
          value={formatCurrency(totalCredit)}
          icon={<ArrowDownRight className="h-5 w-5 text-green-500" />}
          valueClassName="text-green-600"
        />
        <KpiCard
          title="Closing Balance"
          value={formatCurrency(closingBalance)}
          icon={<User className="h-5 w-5 text-gray-500" />}
          valueClassName={closingBalance > 0 ? "text-red-600" : "text-green-600"}
        />
      </div>

      {/* Ledger Table */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">DATE</th>
                <th className="px-4 py-3 font-medium">REFERENCE</th>
                <th className="px-4 py-3 font-medium">DESCRIPTION</th>
                <th className="px-4 py-3 text-right font-medium">DEBIT</th>
                <th className="px-4 py-3 text-right font-medium">CREDIT</th>
                <th className="px-4 py-3 text-right font-medium">BALANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {LEDGER_DATA.map((entry: any) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    {entry.reference}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {entry.description}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">
                    {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-green-600">
                    {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                    {formatCurrency(entry.balance)}
                    <span className="ml-1 text-xs text-gray-500">
                      {entry.balance > 0 ? 'Dr' : entry.balance < 0 ? 'Cr' : ''}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-medium">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right">Totals:</td>
                <td className="px-4 py-3 text-right text-red-600">{formatCurrency(totalDebit)}</td>
                <td className="px-4 py-3 text-right text-green-600">{formatCurrency(totalCredit)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(closingBalance)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
