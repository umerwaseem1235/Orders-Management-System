'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { MOCK_NOTIFICATIONS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { Bell, Package, AlertCircle, FileText, Settings, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Orders' | 'Dispatch' | 'System'>('All')

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="h-5 w-5 text-blue-500" />
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'system': return <Settings className="h-5 w-5 text-gray-500" />
      case 'invoice': return <FileText className="h-5 w-5 text-purple-500" />
      default: return <Bell className="h-5 w-5 text-forest-500" />
    }
  }

  const filteredNotifications = MOCK_NOTIFICATIONS.filter((n: any) => {
    if (filter === 'All') return true
    if (filter === 'Unread') return !n.read
    if (filter === 'Orders') return n.type === 'order'
    if (filter === 'System') return n.type === 'system' || n.type === 'alert'
    if (filter === 'Dispatch') return false // Add dispatch type if available in mock data
    return true
  })

  return (
    <div className="space-y-6">
      <PageHeader 
        breadcrumbs={[
          { label: 'Main Office', href: '/main-office' },
          { label: 'Notifications' }
        ]}
        title="Notifications" 
        description="Stay updated with system alerts and order statuses."
      >
        <Button variant="outline">
          <Check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </PageHeader>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 p-2 flex gap-2 overflow-x-auto">
          {['All', 'Unread', 'Orders', 'Dispatch', 'System'].map((f: any) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-forest-50 text-forest-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications found for this filter.
            </div>
          ) : (
            filteredNotifications.map((notification: any) => (
              <div 
                key={notification.id} 
                className={`p-5 flex gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className={`p-2 rounded-full h-fit flex-shrink-0 ${!notification.read ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0 self-center">
                    <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
