// ============================================================
// Ali Traders — Sales Management System
// Complete TypeScript Type Definitions
// ============================================================

// ── Common Types ──────────────────────────────────────────────

export type ID = string;
export type DateString = string;
export type Currency = number;

export type SortDirection = "asc" | "desc";
export type ViewMode = "table" | "grid" | "kanban";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
}

// ── Status Types ──────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "approved"
  | "processing"
  | "dispatched"
  | "delivered"
  | "rejected"
  | "cancelled";

export type PaymentStatus = "paid" | "partial" | "unpaid" | "overdue";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export type UserRole = "super_admin" | "main_office" | "order_booker" | "accounts";

export type UserStatus = "active" | "inactive" | "suspended";

export type StockLevel = "in_stock" | "low_stock" | "out_of_stock";

// ── Status Config ─────────────────────────────────────────────

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  dotColor: string;
}

// ── User & Auth ───────────────────────────────────────────────

export interface User {
  id: ID;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  area?: string;
  createdAt: DateString;
  lastLogin?: DateString;
}

export interface Permission {
  id: ID;
  module: string;
  action: "view" | "create" | "edit" | "delete" | "export" | "approve";
  allowed: boolean;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// ── Customer ──────────────────────────────────────────────────

export interface Customer {
  id: ID;
  code: string;
  name: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  area: string;
  type: "retail" | "wholesale" | "distributor";
  status: "active" | "inactive" | "blocked";
  creditLimit: Currency;
  currentBalance: Currency;
  outstandingAmount: Currency;
  assignedBooker?: string;
  createdAt: DateString;
  lastOrderDate?: DateString;
  totalOrders: number;
  totalRevenue: Currency;
}

// ── Product & Category ────────────────────────────────────────

export interface Category {
  id: ID;
  name: string;
  description?: string;
  parentId?: ID;
  productCount: number;
  status: "active" | "inactive";
  createdAt: DateString;
}

export interface Product {
  id: ID;
  code: string;
  name: string;
  description?: string;
  categoryId: ID;
  categoryName: string;
  unit: string;
  basePrice: Currency;
  retailPrice: Currency;
  wholesalePrice: Currency;
  taxRate: number;
  sku: string;
  barcode?: string;
  image?: string;
  status: "active" | "inactive" | "discontinued";
  currentStock: number;
  minStock: number;
  maxStock: number;
  stockLevel: StockLevel;
  warehouseId?: ID;
  createdAt: DateString;
}

export interface PricingTier {
  id: ID;
  productId: ID;
  customerType: "retail" | "wholesale" | "distributor";
  minQty: number;
  maxQty: number;
  price: Currency;
  discount: number;
  effectiveFrom: DateString;
  effectiveTo?: DateString;
}

// ── Warehouse & Stock ─────────────────────────────────────────

export interface Warehouse {
  id: ID;
  name: string;
  code: string;
  address: string;
  city: string;
  manager: string;
  phone: string;
  capacity: number;
  currentOccupancy: number;
  status: "active" | "inactive";
  createdAt: DateString;
}

export interface StockMovement {
  id: ID;
  productId: ID;
  productName: string;
  warehouseId: ID;
  warehouseName: string;
  type: "in" | "out" | "transfer" | "adjustment";
  quantity: number;
  previousStock: number;
  newStock: number;
  reference: string;
  notes?: string;
  createdBy: string;
  createdAt: DateString;
}

// ── Order ─────────────────────────────────────────────────────

export interface OrderItem {
  id: ID;
  productId: ID;
  productName: string;
  productCode: string;
  unit: string;
  quantity: number;
  unitPrice: Currency;
  discount: number;
  tax: Currency;
  total: Currency;
}

export interface Order {
  id: ID;
  orderNumber: string;
  customerId: ID;
  customerName: string;
  customerArea: string;
  orderBookerId: ID;
  orderBookerName: string;
  items: OrderItem[];
  subtotal: Currency;
  totalDiscount: Currency;
  totalTax: Currency;
  totalAmount: Currency;
  itemCount: number;
  status: OrderStatus;
  notes?: string;
  createdAt: DateString;
  approvedAt?: DateString;
  approvedBy?: string;
  dispatchedAt?: DateString;
  deliveredAt?: DateString;
  rejectionReason?: string;
}

// ── Invoice ───────────────────────────────────────────────────

export interface Invoice {
  id: ID;
  invoiceNumber: string;
  orderId: ID;
  orderNumber: string;
  customerId: ID;
  customerName: string;
  items: OrderItem[];
  subtotal: Currency;
  totalDiscount: Currency;
  totalTax: Currency;
  totalAmount: Currency;
  paidAmount: Currency;
  balanceDue: Currency;
  status: InvoiceStatus;
  dueDate: DateString;
  issuedAt: DateString;
  paidAt?: DateString;
}

// ── Payment & Ledger ──────────────────────────────────────────

export interface Payment {
  id: ID;
  reference: string;
  date: DateString;
  description: string;
  customerId: ID;
  customerName: string;
  invoiceId?: ID;
  invoiceNumber?: string;
  type: "invoice" | "payment_received" | "credit_note" | "debit_note";
  method: "cash" | "bank_transfer" | "cheque" | "online";
  debit: Currency;
  credit: Currency;
  balance: Currency;
  notes?: string;
  createdBy: string;
  createdAt: DateString;
}

export interface LedgerEntry {
  id: ID;
  date: DateString;
  reference: string;
  description: string;
  debit: Currency;
  credit: Currency;
  balance: Currency;
  type: "invoice" | "payment" | "credit_note" | "opening_balance";
}

export interface AgingBucket {
  label: string;
  amount: Currency;
  count: number;
  percentage: number;
}

// ── Audit Log ─────────────────────────────────────────────────

export interface AuditLog {
  id: ID;
  userId: ID;
  userName: string;
  userRole: UserRole;
  action: string;
  module: string;
  entityType: string;
  entityId: ID;
  description: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ipAddress: string;
  timestamp: DateString;
}

// ── Reports ───────────────────────────────────────────────────

export interface ReportConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "sales" | "customer" | "product" | "financial" | "operational";
  filters: string[];
}

// ── Dashboard KPIs ────────────────────────────────────────────

export interface KPICard {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  prefix?: string;
  suffix?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface DashboardStats {
  totalSales: Currency;
  totalOrders: number;
  pendingOrders: number;
  activeCustomers: number;
  lowStockItems: number;
  totalReceivables: Currency;
  collectionRate: number;
  avgOrderValue: Currency;
}

// ── Notification ──────────────────────────────────────────────

export interface Notification {
  id: ID;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  module: string;
  read: boolean;
  actionUrl?: string;
  createdAt: DateString;
}

// ── Sidebar Navigation ───────────────────────────────────────

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

// ── Component Props ───────────────────────────────────────────

export interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: any[];
  searchKey?: string;
  searchPlaceholder?: string;
  filterOptions?: Record<string, FilterOption[]>;
  isLoading?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
}

export interface EmptyStateProps {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
