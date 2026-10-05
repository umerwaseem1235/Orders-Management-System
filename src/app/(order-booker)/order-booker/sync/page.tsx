'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CloudOff, RefreshCw, CheckCircle2, Database, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function OfflineSyncPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toISOString());
  
  const pendingItems = 3;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date().toISOString());
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 pb-24 md:pb-6 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Offline Sync</h1>
      </div>

      <Card className="border-t-4 border-t-amber-500">
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className={`p-4 rounded-full ${pendingItems > 0 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
            {pendingItems > 0 ? <CloudOff className="h-8 w-8" /> : <CheckCircle2 className="h-8 w-8" />}
          </div>
          
          <div>
            <h2 className="text-xl font-bold">
              {pendingItems > 0 ? `${pendingItems} Items Pending Sync` : 'All Data Synced'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Last synced: {formatDate(lastSync)} at {new Date(lastSync).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>

          <Button 
            className="w-full mt-2 bg-primary hover:bg-primary/90" 
            size="lg"
            disabled={isSyncing || pendingItems === 0}
            onClick={handleSync}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold px-1">Pending Items</h3>
        <Card>
          <CardContent className="p-0 divide-y">
            <div className="p-4 flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-md">
                <Database className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Draft Orders</p>
                <p className="text-xs text-muted-foreground">2 items ready to upload</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="bg-purple-100 text-purple-600 p-2 rounded-md">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Customer Updates</p>
                <p className="text-xs text-muted-foreground">1 location update</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Offline Storage Usage</span>
          <span className="font-medium">12.5 MB / 50 MB</span>
        </div>
        <Progress value={25} className="h-2" />
      </div>
    </div>
  );
}
