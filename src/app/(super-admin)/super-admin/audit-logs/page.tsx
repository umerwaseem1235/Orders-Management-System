'use client';

import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/shared/data-table';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { MOCK_AUDIT_LOGS } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'timestamp',
    header: ({ column }) => <DataTableColumnHeader column={column} title="TIMESTAMP" />,
    cell: ({ row }) => <span className="whitespace-nowrap">{formatDate(row.original.timestamp || new Date())}</span>,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => <DataTableColumnHeader column={column} title="USER" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.userName}</span>
        <span className="text-xs text-muted-foreground">{row.original.userRole}</span>
      </div>
    ),
  },
  {
    accessorKey: 'action',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ACTION" />,
    cell: ({ row }) => <span className="font-medium">{row.original.action}</span>,
  },
  {
    accessorKey: 'module',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MODULE" />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="DESCRIPTION" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.description}</span>,
  },
  {
    accessorKey: 'ipAddress',
    header: ({ column }) => <DataTableColumnHeader column={column} title="IP ADDRESS" />,
    cell: ({ row }) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{row.original.ipAddress}</span>,
  },
];

export default function AuditLogsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Audit Logs"
        description="View and manage audit logs for Ali Traders."
        breadcrumbs={[
          { label: 'Administrator', href: '/' },
          { label: 'Audit Logs', href: '/audit-logs' },
        ]}
        items={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg border shadow-sm flex flex-col w-full overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Audit logs register</h2>
            <p className="text-sm text-gray-500">Showing 1-{MOCK_AUDIT_LOGS?.length || 0} of {MOCK_AUDIT_LOGS?.length || 0} logs • Updated just now</p>
          </div>
        </div>
        <DataTable columns={columns} data={MOCK_AUDIT_LOGS || []} searchKey="action" />
      </div>
    </div>
  );
}
