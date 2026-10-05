import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Class Name Utility ────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Currency Formatter ────────────────────────────────────────
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "Rs 0";
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 10000000) return `Rs ${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `Rs ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `Rs ${(amount / 1000).toFixed(1)}K`;
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

// ── Date Formatter ────────────────────────────────────────────
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;
  return formatDate(date);
}

// ── Number Formatter ──────────────────────────────────────────
export function formatNumber(num: number): string {
  return num.toLocaleString("en-PK");
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ── String Utilities ──────────────────────────────────────────
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n: any) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Status Helpers ────────────────────────────────────────────
export function getOrderStatusConfig(status: string) {
  const configs: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    pending:    { label: "Pending",    color: "text-amber-700",   bg: "bg-amber-50",   dot: "bg-amber-500" },
    approved:   { label: "Approved",   color: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    processing: { label: "Processing", color: "text-blue-700",    bg: "bg-blue-50",    dot: "bg-blue-500" },
    dispatched: { label: "Dispatched", color: "text-purple-700",  bg: "bg-purple-50",  dot: "bg-purple-500" },
    delivered:  { label: "Delivered",  color: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    rejected:   { label: "Rejected",   color: "text-red-700",     bg: "bg-red-50",     dot: "bg-red-500" },
    cancelled:  { label: "Cancelled",  color: "text-slate-700",   bg: "bg-slate-50",   dot: "bg-slate-400" },
  };
  return configs[status] ?? configs.pending;
}

export function getPaymentStatusConfig(status: string) {
  const configs: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    paid:    { label: "Paid",    color: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    partial: { label: "Partial", color: "text-amber-700",   bg: "bg-amber-50",   dot: "bg-amber-500" },
    unpaid:  { label: "Unpaid",  color: "text-red-700",     bg: "bg-red-50",     dot: "bg-red-500" },
    overdue: { label: "Overdue", color: "text-red-700",     bg: "bg-red-50",     dot: "bg-red-500" },
  };
  return configs[status] ?? configs.unpaid;
}

// ── Pagination Helpers ────────────────────────────────────────
export function getPaginationRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const result: (number | "...")[] = [];

  if (current <= 3) {
    result.push(1, 2, 3, 4, "...", total);
  } else if (current >= total - 2) {
    result.push(1, "...", total - 3, total - 2, total - 1, total);
  } else {
    result.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return result;
}

// ── Export Helpers ─────────────────────────────────────────────
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns: { key: keyof T; header: string }[]
) {
  const headers = columns.map((c: any) => c.header).join(",");
  const rows = data
    .map((row: any) =>
      columns.map((c: any) => {
        const val = row[c.key];
        const strVal = String(val ?? "");
        return strVal.includes(",") ? `"${strVal}"` : strVal;
      }).join(",")
    )
    .join("\n");

  const csv = `${headers}\n${rows}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ── Debounce ──────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
