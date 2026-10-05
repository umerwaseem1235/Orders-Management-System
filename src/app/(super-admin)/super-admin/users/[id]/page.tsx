'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Key, Ban } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';

const mockUser = {
  id: 'USR-042',
  name: 'Ahmad Khan',
  email: 'ahmad.khan@alitraders.com',
  role: 'Order Booker',
  status: 'Active',
  phone: '+92 300 9876543',
  activity: {
    lastLogin: '2026-10-02 09:15 AM',
    createdDate: '2025-01-15',
    totalOrdersBooked: 1245
  },
  assignedAreas: ['Gulberg', 'Model Town', 'DHA Phase 1'],
  recentLogs: [
    { id: 1, action: 'Booked Order AT-250184', date: '2026-10-02 10:30 AM' },
    { id: 2, action: 'Logged In', date: '2026-10-02 09:15 AM' },
    { id: 3, action: 'Booked Order AT-250183', date: '2026-10-01 04:45 PM' }
  ]
};

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();

  const initials = mockUser.name.split(' ').map((n: any) => n[0]).join('').substring(0, 2);

  return (
    <div className="space-y-6">
      <PageHeader 
        title={mockUser.name} 
        breadcrumbs={[{ label: 'Super Admin' }, { label: 'Users', href: '/super-admin/users' }, { label: mockUser.name }]}
      />
      
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
          <Button variant="outline"><Key className="w-4 h-4 mr-2" /> Reset Password</Button>
          <Button variant="outline" className="text-red-600"><Ban className="w-4 h-4 mr-2" /> Deactivate</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-forest-green-100 text-forest-green-800 flex items-center justify-center text-3xl font-bold mb-4">
                {initials}
              </div>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-gray-500 mb-4">{mockUser.email}</p>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">{mockUser.role}</span>
                <StatusBadge status={mockUser.status} />
              </div>
              <div className="w-full text-left text-sm space-y-2 mt-4 pt-4 border-t">
                <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span>{mockUser.phone}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Assigned Areas</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {mockUser.assignedAreas.map((area: any) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Activity Overview</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-forest-green-800">{mockUser.activity.totalOrdersBooked}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 text-sm mb-1">Last Login</p>
                <p className="font-medium text-sm mt-2">{mockUser.activity.lastLogin}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 text-sm mb-1">Member Since</p>
                <p className="font-medium text-sm mt-2">{mockUser.activity.createdDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUser.recentLogs.map((log: any) => (
                  <div key={log.id} className="flex justify-between border-b pb-2 last:border-0 last:pb-0 text-sm">
                    <span className="font-medium">{log.action}</span>
                    <span className="text-gray-500">{log.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
