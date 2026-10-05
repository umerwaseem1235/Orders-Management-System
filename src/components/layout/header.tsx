"use client";

import { Search, Shield, Bell, Menu, LogOut } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type UserRoleType, ROLE_CONFIGS } from "@/lib/constants";

interface HeaderProps {
  role?: UserRoleType;
}

export function Header({ role = "super_admin" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const router = useRouter();
  const currentConfig = ROLE_CONFIGS[role];

  const switchRole = (newRole: UserRoleType) => {
    setRoleMenuOpen(false);
    router.push(ROLE_CONFIGS[newRole].basePath);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-700"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, customers, invoices..."
            className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-1.5 py-0.5 bg-gray-100 text-gray-400 text-[10px] font-mono rounded border border-gray-200">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Shield className="w-4 h-4 text-brand-600" />
            {currentConfig.label}
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {roleMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setRoleMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                {(Object.keys(ROLE_CONFIGS) as UserRoleType[]).map((roleKey: any) => {
                  const config = ROLE_CONFIGS[roleKey];
                  return (
                    <button
                      key={roleKey}
                      onClick={() => switchRole(roleKey)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        roleKey === role
                          ? "bg-brand-50 text-brand-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          {role === "super_admin" ? "AK" : role === "main_office" ? "AR" : role === "order_booker" ? "UH" : "FZ"}
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </form>
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} role={role} />
    </header>
  );
}
