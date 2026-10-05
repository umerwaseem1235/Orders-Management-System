'use client';
import React from 'react';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { ActionMenu } from '@/components/shared/action-menu';
import { MOCK_USERS } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download, Plus, MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="NAME" />,
    cell: ({ row }) => {
      const initials = row.original.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-medium text-xs">
            {initials}
          </div>
          <span className="font-medium">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="EMAIL" />,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROLE" />,
    cell: ({ row }) => <StatusBadge status={row.original.role} />,
  },
  {
    accessorKey: 'area',
    header: ({ column }) => <DataTableColumnHeader column={column} title="AREA" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => <DataTableColumnHeader column={column} title="LAST LOGIN" />,
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.lastLogin || new Date())}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionMenu items={[
          { label: 'Edit User', onClick: () => {} },
          { label: 'Reset Password', onClick: () => {} },
          { label: 'Deactivate', onClick: () => {}, variant: 'destructive' }
        ]} 
      />
    ),
  },
];

export default function UsersPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Users & Roles"
        description="View and manage users & roles for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Users & Roles', href: '/users' },
        ]}
        items={
          <div className="flex items-center gap-2">
            <Button onClick={() => setDrawerOpen(true)} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setDrawerOpen(true)} className="bg-green-800 hover:bg-green-900 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add new
            </Button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg border shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Users register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_USERS?.length || 0} of {MOCK_USERS?.length || 0} users • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_USERS || []} searchKey="name" />
      </div>
    </div>
  );
}
