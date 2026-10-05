import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

import { PageTransition } from '@/components/shared/page-transition';

export default function OrderBookerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role="order_booker" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header role="order_booker" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
