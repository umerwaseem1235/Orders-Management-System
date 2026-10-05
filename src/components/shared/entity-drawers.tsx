"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";

// ── Customer Drawer ──────────────────────────────────────────

interface CustomerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: {
    id?: string;
    name?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    area?: string;
    address?: string;
    creditLimit?: number;
  };
}

export function CustomerDrawer({ open, onOpenChange, customer }: CustomerDrawerProps) {
  const isEditing = !!customer?.id;
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Customer" : "Add New Customer"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update customer information." : "Fill in the details to register a new customer."}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name *</Label>
            <Input id="name" placeholder="e.g. Al-Madina General Store" defaultValue={customer?.name} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person *</Label>
              <Input id="contact" placeholder="Full name" defaultValue={customer?.contactPerson} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" placeholder="03XX-XXXXXXX" defaultValue={customer?.phone} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" defaultValue={customer?.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Area *</Label>
            <Select defaultValue={customer?.area}>
              <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="North Nazimabad">North Nazimabad</SelectItem>
                <SelectItem value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</SelectItem>
                <SelectItem value="Nazimabad">Nazimabad</SelectItem>
                <SelectItem value="New Karachi">New Karachi</SelectItem>
                <SelectItem value="F.B. Area">F.B. Area</SelectItem>
                <SelectItem value="Saddar">Saddar</SelectItem>
                <SelectItem value="Korangi">Korangi</SelectItem>
                <SelectItem value="Clifton">Clifton</SelectItem>
                <SelectItem value="Malir">Malir</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Full address" defaultValue={customer?.address} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="creditLimit">Credit Limit (Rs)</Label>
            <Input id="creditLimit" type="number" placeholder="200,000" defaultValue={customer?.creditLimit} />
          </div>
        </div>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-brand-900 hover:bg-brand-800 text-white">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Update Customer" : "Add Customer"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ── Product Drawer ───────────────────────────────────────────

interface ProductDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: {
    id?: string;
    name?: string;
    sku?: string;
    category?: string;
    price?: number;
    unit?: string;
    description?: string;
  };
}

export function ProductDrawer({ open, onOpenChange, product }: ProductDrawerProps) {
  const isEditing = !!product?.id;
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); onOpenChange(false); }, 1000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Product" : "Add New Product"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update product details." : "Register a new product in the catalog."}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-2">
            <Label htmlFor="pname">Product Name *</Label>
            <Input id="pname" placeholder="e.g. Basmati Rice 5kg" defaultValue={product?.name} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" placeholder="e.g. P-001" defaultValue={product?.sku} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select defaultValue={product?.unit || "Piece"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Piece">Piece</SelectItem>
                  <SelectItem value="Pack">Pack</SelectItem>
                  <SelectItem value="Carton">Carton</SelectItem>
                  <SelectItem value="Dozen">Dozen</SelectItem>
                  <SelectItem value="Kg">Kg</SelectItem>
                  <SelectItem value="Liter">Liter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select defaultValue={product?.category}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Personal Care">Personal Care</SelectItem>
                <SelectItem value="Detergent">Detergent</SelectItem>
                <SelectItem value="Snacks">Snacks</SelectItem>
                <SelectItem value="Tea">Tea</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Cooking Oil">Cooking Oil</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs) *</Label>
            <Input id="price" type="number" placeholder="0" defaultValue={product?.price} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdesc">Description</Label>
            <Textarea id="pdesc" placeholder="Product description..." defaultValue={product?.description} rows={3} />
          </div>
        </div>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-brand-900 hover:bg-brand-800 text-white">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ── Payment Drawer ───────────────────────────────────────────

interface PaymentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDrawer({ open, onOpenChange }: PaymentDrawerProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); onOpenChange(false); }, 1000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Record Payment</SheetTitle>
          <SheetDescription>Record a new payment or collection from a customer.</SheetDescription>
        </SheetHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-2">
            <Label>Customer *</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="C-001">Al-Madina General Store</SelectItem>
                <SelectItem value="C-002">Bin Hashim Mart</SelectItem>
                <SelectItem value="C-003">Rehmat Super Store</SelectItem>
                <SelectItem value="C-005">City Cash & Carry</SelectItem>
                <SelectItem value="C-007">Khan Brothers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Rs) *</Label>
              <Input id="amount" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Method *</Label>
              <Select defaultValue="cash">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference Number</Label>
            <Input id="reference" placeholder="e.g. CHQ-123456" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payDate">Date *</Label>
            <Input id="payDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes..." rows={3} />
          </div>
        </div>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-brand-900 hover:bg-brand-800 text-white">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Record Payment
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ── User Drawer ──────────────────────────────────────────────

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
  };
}

export function UserDrawer({ open, onOpenChange, user }: UserDrawerProps) {
  const isEditing = !!user?.id;
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); onOpenChange(false); }, 1000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit User" : "Add New User"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update user details and permissions." : "Create a new user account."}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-2">
            <Label htmlFor="uname">Full Name *</Label>
            <Input id="uname" placeholder="e.g. Ahsan Khan" defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="uemail">Email *</Label>
            <Input id="uemail" type="email" placeholder="user@alitraders.pk" defaultValue={user?.email} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="uphone">Phone</Label>
              <Input id="uphone" placeholder="03XX-XXXXXXX" defaultValue={user?.phone} />
            </div>
            <div className="space-y-2">
              <Label>Role *</Label>
              <Select defaultValue={user?.role || "order_booker"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="main_office">Main Office</SelectItem>
                  <SelectItem value="order_booker">Order Booker</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="upassword">Temporary Password *</Label>
              <Input id="upassword" type="password" placeholder="Min 8 characters" />
            </div>
          )}
        </div>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-brand-900 hover:bg-brand-800 text-white">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Update User" : "Create User"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
