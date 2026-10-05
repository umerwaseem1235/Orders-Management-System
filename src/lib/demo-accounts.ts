import type { UserRoleType } from "@/lib/constants";

export interface DemoAccount {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
  roleLabel: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    name: "Ahsan Khan",
    email: "ahsan@alitraders.com",
    password: "Admin@123",
    role: "super_admin",
    roleLabel: "Super Admin",
    description: "Full system access",
  },
  {
    name: "Ali Raza",
    email: "ali@alitraders.com",
    password: "Office@123",
    role: "main_office",
    roleLabel: "Main Office",
    description: "Orders, invoices, dispatch",
  },
  {
    name: "Fatima Zahra",
    email: "fatima@alitraders.com",
    password: "Accounts@123",
    role: "accounts",
    roleLabel: "Accounts",
    description: "Payments, ledger, receivables",
  },
  {
    name: "Usman Haider",
    email: "usman@alitraders.com",
    password: "Booker@123",
    role: "order_booker",
    roleLabel: "Order Booker",
    description: "Field orders and customers",
  },
];


