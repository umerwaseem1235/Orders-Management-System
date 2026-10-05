'use client';

import { PageHeader } from '@/components/layout/page-header';
import { MOCK_REPORT_CONFIGS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Reports"
        description="View and manage reports for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Reports', href: '/reports' },
        ]}
        items={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(MOCK_REPORT_CONFIGS || [
          { title: 'Sales summary', description: 'Comprehensive overview of sales performance.' },
          { title: 'Customer performance', description: 'Metrics and analytics for top customers.' },
          { title: 'Monthly trend', description: 'Month-over-month growth and trend analysis.' },
          { title: 'Area analysis', description: 'Geographic breakdown of sales and operations.' },
          { title: 'Invoice register', description: 'Detailed log of all issued invoices.' },
          { title: 'Order booker performance', description: 'Performance tracking for sales staff.' }
        ]).map((report: any, idx: any) => (
          <div key={idx} className="bg-white rounded-lg border shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-700">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{report.title || report.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{report.description}</p>
              </div>
            </div>
            <div className="mt-auto pt-4 flex justify-end">
              <Button className="bg-green-800 hover:bg-green-900 text-white w-full sm:w-auto">
                Generate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
