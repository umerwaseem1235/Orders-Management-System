"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type SidebarNavSection, type UserRoleType, ROLE_CONFIGS } from "@/lib/constants";
import { MoreVertical } from "lucide-react";

interface SidebarProps {
  forceMobile?: boolean;
  role?: UserRoleType;
  sections?: SidebarNavSection[];
  userName?: string;
  userInitials?: string;
  userRole?: string;
}

const roleUsers: Record<UserRoleType, { name: string; initials: string; role: string }> = {
  super_admin: { name: "Ahsan Khan", initials: "AK", role: "Administrator" },
  main_office: { name: "Ali Raza", initials: "AR", role: "Main Office" },
  order_booker: { name: "Usman Haider", initials: "UH", role: "Order Booker" },
  accounts: { name: "Fatima Zahra", initials: "FZ", role: "Accounts" },
};

export function Sidebar({
  forceMobile = false,
  role = "super_admin",
  sections,
  userName,
  userInitials,
  userRole,
}: SidebarProps) {
  const pathname = usePathname();
  const config = ROLE_CONFIGS[role];
  const navSections = sections ?? config.sections;
  const user = roleUsers[role];

  return (
    <aside
      className={cn(
        "flex flex-col w-64 bg-brand-900 text-white h-screen shrink-0 border-r border-brand-800",
        forceMobile ? "flex" : "hidden md:flex"
      )}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center font-bold text-lg shadow-sm border border-brand-700 shrink-0">
          AT
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-wide">ALI TRADERS</span>
          <span className="text-xs text-brand-200">Distribution Suite</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 sidebar-scroll">
        <nav className="space-y-6 px-3">
          {navSections.map((section: any) => (
            <div key={section.label}>
              <h3 className="text-[10px] font-semibold text-brand-400 uppercase tracking-widest mb-2 px-3">
                {section.label}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item: any) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== config.basePath && pathname.startsWith(`${item.href}/`));
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                          isActive
                            ? "bg-brand-700 text-white shadow-sm"
                            : "text-brand-100 hover:bg-brand-800 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={cn(
                              "w-[18px] h-[18px] shrink-0",
                              isActive
                                ? "text-white"
                                : "text-brand-300 group-hover:text-brand-100"
                            )}
                          />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-brand-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer — System Status */}
      <div className="p-4 border-t border-brand-800 space-y-3">
        <div className="flex items-center gap-2.5 px-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-brand-100 font-medium leading-none">
              System operational
            </span>
            <span className="text-[10px] text-brand-400 mt-0.5">
              Last synced 2 min ago
            </span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between bg-brand-800/60 p-2.5 rounded-lg border border-brand-700/40 hover:bg-brand-800 transition-colors cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold shrink-0">
              {userInitials ?? user.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">{userName ?? user.name}</span>
              <span className="text-[10px] text-brand-300 mt-1">{userRole ?? user.role}</span>
            </div>
          </div>
          <MoreVertical className="w-4 h-4 text-brand-400 hover:text-brand-200 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
