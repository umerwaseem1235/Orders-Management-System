'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  AlertTriangle, 
  Download, 
  Calendar,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

import { KpiCard } from '@/components/shared/kpi-card';
import { ChartCard } from '@/components/shared/chart-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency } from '@/lib/utils';
import { 
  MOCK_SALES_CHART_DATA, 
  MOCK_CATEGORY_CHART_DATA, 
  MOCK_ORDERS, 
  MOCK_STOCK_ALERTS 
} from '@/lib/mock-data';

// Pie chart colors matching the forest green brand theme and supporting colors
const PIE_COLORS = ['#14532D', '#16A34A', '#86EFAC', '#FCD34D', '#F87171'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Ahsan. Here's what's happening today.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              This month
              <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="text-gray-600">Pending</span>
          <span className="font-semibold text-gray-900">42</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-gray-600">Approved</span>
          <span className="font-semibold text-gray-900">28</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span className="text-gray-600">Processing</span>
          <span className="font-semibold text-gray-900">15</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span className="text-gray-600">Dispatched</span>
          <span className="font-semibold text-gray-900">12</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-gray-600">Delivered</span>
          <span className="font-semibold text-gray-900">245</span>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* KPI Cards Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard 
            title="Total Sales" 
            value={formatCurrency(2450000)} 
            change="+12.5%" 
            changeType="positive"
            icon={<TrendingUp className="w-6 h-6 text-green-700" />}
          />
          <KpiCard 
            title="Pending Orders" 
            value="42" 
            change="-2.4%" 
            changeType="negative"
            icon={<ShoppingCart className="w-6 h-6 text-amber-600" />}
          />
          <KpiCard 
            title="Active Customers" 
            value="1,204" 
            change="+5.2%" 
            changeType="positive"
            icon={<Users className="w-6 h-6 text-blue-600" />}
          />
          <KpiCard 
            title="Low Stock Items" 
            value="18" 
            change="+12" 
            changeType="negative"
            icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          />
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend Area Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ChartCard title="Revenue Trend" subtitle="Monthly revenue for the current year">
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={MOCK_SALES_CHART_DATA}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14532D" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#14532D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `Rs ${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                      labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#14532D" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </motion.div>

          {/* Sales by Category Pie Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <ChartCard title="Sales by Category" subtitle="Revenue distribution by product type">
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_CATEGORY_CHART_DATA}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {MOCK_CATEGORY_CHART_DATA.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      formatter={(value) => <span className="text-gray-600 text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <a href="#" className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors">
                View all
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Order Booker</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_ORDERS.slice(0, 5).map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                      <td className="px-6 py-4 text-gray-500">{order.orderBooker}</td>
                      <td className="px-6 py-4 text-gray-600">{order.itemsCount}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(order.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Low Stock Alerts */}
          <motion.div variants={itemVariants} className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Low Stock Alerts
              </h3>
            </div>
            <div className="p-2 flex-1 overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {MOCK_STOCK_ALERTS.map((item: any, index: number) => (
                  <li key={index} className="p-4 hover:bg-gray-50 transition-colors rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${item.currentStock <= item.minStock / 2 ? 'text-red-600' : 'text-amber-600'}`}>
                          {item.currentStock} left
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Min: {item.minStock}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
