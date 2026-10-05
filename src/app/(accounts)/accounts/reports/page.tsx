'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart, PieChart, TrendingUp, AlertTriangle, Wallet, Activity } from 'lucide-react';

const reports = [
  {
    title: 'Collection Summary',
    description: 'Overview of payments collected grouped by date, method, and customer over a specific period.',
    icon: <Wallet className="w-8 h-8 text-emerald-600 mb-4" />,
  },
  {
    title: 'Outstanding Analysis',
    description: 'Detailed breakdown of all outstanding invoices, highlighting critically overdue accounts.',
    icon: <AlertTriangle className="w-8 h-8 text-rose-600 mb-4" />,
  },
  {
    title: 'Customer Aging',
    description: 'Standard aging report classifying customer receivables into standard time buckets.',
    icon: <PieChart className="w-8 h-8 text-amber-500 mb-4" />,
  },
  {
    title: 'Payment Performance',
    description: 'Analysis of customer payment habits, average days to pay, and historical reliability.',
    icon: <Activity className="w-8 h-8 text-blue-600 mb-4" />,
  },
  {
    title: 'Cash Flow Statement',
    description: 'Summary of cash inflows from operations, investments, and financing over time.',
    icon: <TrendingUp className="w-8 h-8 text-forest-green mb-4" />,
  },
  {
    title: 'Receivables Forecast',
    description: 'Predictive report estimating incoming cash flow based on due dates and historical payment data.',
    icon: <FileBarChart className="w-8 h-8 text-purple-600 mb-4" />,
  },
];

export default function FinancialReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Financial Reports" description="Generate and export comprehensive financial and operational reports." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              {report.icon}
              <CardTitle>{report.title}</CardTitle>
              <CardDescription className="h-16">{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-forest-green hover:bg-forest-green/90 text-white">Generate Report</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
