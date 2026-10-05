'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2, XCircle, Target, UserPlus, Check } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import { MOCK_NOTIFICATIONS } from '@/lib/mock-data';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map((n: any) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map((n: any) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order_approved': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'order_rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'target_reminder': return <Target className="h-5 w-5 text-blue-600" />;
      case 'new_customer': return <UserPlus className="h-5 w-5 text-purple-600" />;
      default: return <Bell className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 pb-24 md:pb-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary text-xs h-8">
          <Check className="h-4 w-4 mr-1" /> Mark all read
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((notification: any) => (
          <Card 
            key={notification.id} 
            className={`transition-colors ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4 flex gap-4">
              <div className="shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className={`font-semibold text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                    {formatRelativeTime(notification.date)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="shrink-0 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}
