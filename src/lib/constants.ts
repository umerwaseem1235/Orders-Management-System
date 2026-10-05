import {
  LayoutDashboard,
  BookOpen,
  AlertCircle,
  Package,
  DollarSign,
  Warehouse,
  CreditCard,
  BarChart3,
  Users,
  ScrollText,
  Settings,
  ShoppingCart,
  FileText,
  Truck,
  ClipboardList,
  CheckCircle,
  XCircle,
  Bell,
  MapPin,
  Smartphone,
  WifiOff,
  Clock,
  Receipt,
  Wallet,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

// ── Sidebar Navigation Types ──────────────────────────────────

export interface SidebarNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface SidebarNavSection {
  label: string;
  items: SidebarNavItem[];
}

export type UserRoleType = "super_admin" | "main_office" | "order_booker" | "accounts";

export interface RoleConfig {
  key: UserRoleType;
  label: string;
  shortLabel: string;
  basePath: string;
  sections: SidebarNavSection[];
}

// ── Super Admin Navigation ────────────────────────────────────

const SUPER_ADMIN_SECTIONS: SidebarNavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "ACCOUNTS",
    items: [
      { name: "Customer Ledger", href: "/super-admin/customer-ledger", icon: BookOpen },
      { name: "Outstanding", href: "/super-admin/outstanding", icon: AlertCircle },
    ],
  },
  {
    label: "CATALOG & STOCK",
    items: [
      { name: "Products", href: "/super-admin/products", icon: Package },
      { name: "Pricing / Rates", href: "/super-admin/pricing", icon: DollarSign },
      { name: "Inventory", href: "/super-admin/inventory", icon: Warehouse, badge: "8" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { name: "Orders", href: "/super-admin/orders", icon: ShoppingCart },
      { name: "Invoices", href: "/super-admin/invoices", icon: FileText },
      { name: "Payments", href: "/super-admin/payments", icon: CreditCard },
      { name: "Dispatch", href: "/super-admin/dispatch", icon: Truck },
      { name: "Reports", href: "/super-admin/reports", icon: BarChart3 },
      { name: "Users & Roles", href: "/super-admin/users", icon: Users },
      { name: "Audit Logs", href: "/super-admin/audit-logs", icon: ScrollText },
      { name: "Settings", href: "/super-admin/settings", icon: Settings },
    ],
  },
];

// ── Main Office Navigation ────────────────────────────────────

const MAIN_OFFICE_SECTIONS: SidebarNavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/main-office", icon: LayoutDashboard },
    ],
  },
  {
    label: "ORDER MANAGEMENT",
    items: [
      { name: "Incoming Orders", href: "/main-office/incoming-orders", icon: ClipboardList, badge: "12" },
      { name: "Order Verification", href: "/main-office/verification", icon: CheckCircle },
      { name: "Approved Orders", href: "/main-office/approved", icon: CheckCircle },
      { name: "Rejected Orders", href: "/main-office/rejected", icon: XCircle },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { name: "Invoice Generation", href: "/main-office/invoices", icon: FileText },
      { name: "Dispatch Management", href: "/main-office/dispatch", icon: Truck },
      { name: "Customers", href: "/main-office/customers", icon: Users },
      { name: "Products & Stock", href: "/main-office/products", icon: Package },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      { name: "Reports", href: "/main-office/reports", icon: BarChart3 },
      { name: "Notifications", href: "/main-office/notifications", icon: Bell },
    ],
  },
];

// ── Order Booker Navigation (Mobile-First) ────────────────────

const ORDER_BOOKER_SECTIONS: SidebarNavSection[] = [
  {
    label: "HOME",
    items: [
      { name: "Dashboard", href: "/order-booker", icon: LayoutDashboard },
    ],
  },
  {
    label: "CUSTOMERS",
    items: [
      { name: "My Customers", href: "/order-booker/customers", icon: Users },
      { name: "Customer Map", href: "/order-booker/map", icon: MapPin },
    ],
  },
  {
    label: "ORDERS",
    items: [
      { name: "New Order", href: "/order-booker/new-order", icon: ShoppingCart },
      { name: "Draft Orders", href: "/order-booker/drafts", icon: FileText, badge: "3" },
      { name: "Order History", href: "/order-booker/history", icon: Clock },
      { name: "Order Tracking", href: "/order-booker/tracking", icon: Truck },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { name: "Offline Sync", href: "/order-booker/sync", icon: WifiOff },
      { name: "Notifications", href: "/order-booker/notifications", icon: Bell },
    ],
  },
];

// ── Accounts Navigation ───────────────────────────────────────

const ACCOUNTS_SECTIONS: SidebarNavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/accounts", icon: LayoutDashboard },
    ],
  },
  {
    label: "RECEIVABLES",
    items: [
      { name: "Customer Ledger", href: "/accounts/ledger", icon: BookOpen },
      { name: "Payment Collection", href: "/accounts/collections", icon: Wallet },
      { name: "Receivables", href: "/accounts/receivables", icon: Receipt },
      { name: "Outstanding", href: "/accounts/outstanding", icon: AlertCircle },
    ],
  },
  {
    label: "REPORTS",
    items: [
      { name: "Aging Reports", href: "/accounts/aging", icon: CalendarDays },
      { name: "Transaction History", href: "/accounts/transactions", icon: ScrollText },
      { name: "Financial Reports", href: "/accounts/reports", icon: BarChart3 },
    ],
  },
];

// ── All Roles Configuration ───────────────────────────────────

export const ROLE_CONFIGS: Record<UserRoleType, RoleConfig> = {
  super_admin: {
    key: "super_admin",
    label: "Super Admin",
    shortLabel: "Admin",
    basePath: "/super-admin",
    sections: SUPER_ADMIN_SECTIONS,
  },
  main_office: {
    key: "main_office",
    label: "Main Office",
    shortLabel: "Office",
    basePath: "/main-office",
    sections: MAIN_OFFICE_SECTIONS,
  },
  order_booker: {
    key: "order_booker",
    label: "Order Booker",
    shortLabel: "Booker",
    basePath: "/order-booker",
    sections: ORDER_BOOKER_SECTIONS,
  },
  accounts: {
    key: "accounts",
    label: "Accounts",
    shortLabel: "Accounts",
    basePath: "/accounts",
    sections: ACCOUNTS_SECTIONS,
  },
};

// ── Backward compatibility ────────────────────────────────────
export const SIDEBAR_SECTIONS = SUPER_ADMIN_SECTIONS;

// ── Status Filter Options ─────────────────────────────────────

export const ORDER_STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Processing", value: "processing" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Delivered", value: "delivered" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
];

export const PAYMENT_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Partial", value: "partial" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Overdue", value: "overdue" },
];

export const USER_ROLE_OPTIONS = [
  { label: "Super Admin", value: "super_admin" },
  { label: "Main Office", value: "main_office" },
  { label: "Order Booker", value: "order_booker" },
  { label: "Accounts", value: "accounts" },
];

export const DATE_RANGE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "This month", value: "this_month" },
  { label: "Last month", value: "last_month" },
  { label: "This quarter", value: "this_quarter" },
  { label: "This year", value: "this_year" },
  { label: "Custom range", value: "custom" },
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const EXPORT_OPTIONS = [
  { label: "Export as CSV", value: "csv" },
  { label: "Export as PDF", value: "pdf" },
  { label: "Export as Excel", value: "excel" },
];
