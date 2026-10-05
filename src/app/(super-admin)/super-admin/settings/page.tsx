'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const tabs = ['General', 'Notifications', 'Security', 'Billing'];

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Settings"
        description="View and manage settings for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Settings', href: '/settings' },
        ]}
        items={
          <div className="flex items-center gap-2">
            <Button className="bg-green-800 hover:bg-green-900 text-white">
              Save Changes
            </Button>
          </div>
        }
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab: any) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-left rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-green-50 text-green-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex-1 bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">{activeTab} Settings</h2>
          
          {activeTab === 'General' && (
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <input type="text" className="w-full p-2 border rounded-md" defaultValue="Ali Traders" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Support Email</label>
                <input type="email" className="w-full p-2 border rounded-md" defaultValue="support@alitraders.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Asia/Karachi (PKT)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-gray-500">Receive daily summary emails</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-green-600" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Low Stock Warnings</p>
                  <p className="text-sm text-gray-500">Get notified when products fall below minimum stock</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-green-600" defaultChecked />
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium">Require Two-Factor Authentication</label>
                <p className="text-sm text-gray-500 mb-2">Force all users to use 2FA</p>
                <input type="checkbox" className="h-4 w-4 text-green-600" />
              </div>
              <div className="space-y-2 mt-6">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Force All Users to Re-login</Button>
              </div>
            </div>
          )}
          
          {activeTab === 'Billing' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-medium text-lg mb-2">Enterprise Plan</h3>
                <p className="text-sm text-gray-600 mb-4">You are currently on the Enterprise plan. Billed annually.</p>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
