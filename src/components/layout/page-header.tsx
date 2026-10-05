import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8", className)}>
      <div className="space-y-1 sm:space-y-1.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center text-sm text-gray-500 mb-2">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={index} className="flex items-center">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-gray-900 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={cn(isLast ? "text-gray-900 font-medium" : "")}>
                      {item.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
                </div>
              );
            })}
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && <p className="text-gray-500 text-sm sm:text-base">{description}</p>}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
