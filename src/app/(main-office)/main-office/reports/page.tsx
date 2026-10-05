'use client'

import { PageHeader } from '@/components/layout/page-header'
import { MOCK_REPORT_CONFIGS } from '@/lib/mock-data'
import { FileText, BarChart2, PieChart, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ReportsPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'file-text': return <FileText className="h-6 w-6 text-forest-600" />
      case 'bar-chart': return <BarChart2 className="h-6 w-6 text-blue-600" />
      case 'pie-chart': return <PieChart className="h-6 w-6 text-purple-600" />
      case 'trending-up': return <TrendingUp className="h-6 w-6 text-emerald-600" />
      default: return <FileText className="h-6 w-6 text-gray-600" />
    }
  }

  // Filter to just show 4 relevant reports for main office
  const reports = MOCK_REPORT_CONFIGS.slice(0, 4)

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Reports' }
        ]}
        title="Reports" 
        description="View and generate operational reports."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report: any) => (
          <Link href={`/main-office/reports/${report.id}`} key={report.id} className="block group">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-forest-200 transition-all h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-forest-50 transition-colors">
                  {getIcon(report.icon)}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-forest-700">{report.title}</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{report.description}</p>
              <div className="text-sm font-medium text-forest-600 group-hover:text-forest-700 flex items-center">
                Generate Report →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
