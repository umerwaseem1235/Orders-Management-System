import type {
  Customer,
  Product,
  Category,
  Order,
  Payment,
  Invoice,
  User,
  AuditLog,
  Warehouse,
  Notification,
  DashboardStats,
  ReportConfig,
  
  
} from '@/types';

export const MOCK_CUSTOMERS: any =  [
  { id: 'C-001', name: 'Al-Madina General Store', area: 'North Nazimabad', contactPerson: 'Hussain', phone: '0300-1234567', email: 'almadina@example.com', creditLimit: 200000, outstandingBalance: 45000, status: 'active', address: 'Shop 1, Block H, North Nazimabad' },
  { id: 'C-002', name: 'Bin Hashim Mart', area: 'Gulshan-e-Iqbal', contactPerson: 'Hashim', phone: '0311-2345678', email: 'binhashim@example.com', creditLimit: 500000, outstandingBalance: 120000, status: 'active', address: 'Block 13-C, Gulshan-e-Iqbal' },
  { id: 'C-003', name: 'Rehmat Super Store', area: 'Nazimabad', contactPerson: 'Rehmat', phone: '0321-3456789', email: 'rehmat@example.com', creditLimit: 150000, outstandingBalance: 30000, status: 'active', address: 'No. 2, Nazimabad' },
  { id: 'C-004', name: 'New Karachi Traders', area: 'New Karachi', contactPerson: 'Salman', phone: '0333-4567890', email: 'newkhi@example.com', creditLimit: 100000, outstandingBalance: 85000, status: 'inactive', address: 'Sector 5-C, New Karachi' },
  { id: 'C-005', name: 'City Cash & Carry', area: 'F.B. Area', contactPerson: 'Kamran', phone: '0345-5678901', email: 'citycash@example.com', creditLimit: 300000, outstandingBalance: 5000, status: 'active', address: 'Block 4, F.B. Area' },
  { id: 'C-006', name: 'Bismillah General Store', area: 'Saddar', contactPerson: 'Ahmed', phone: '0301-6789012', email: 'bismillah@example.com', creditLimit: 50000, outstandingBalance: 12000, status: 'active', address: 'Zainab Market, Saddar' },
  { id: 'C-007', name: 'Khan Brothers', area: 'Korangi', contactPerson: 'Tariq Khan', phone: '0312-7890123', email: 'khanbros@example.com', creditLimit: 250000, outstandingBalance: 190000, status: 'active', address: 'Korangi Industrial Area' },
  { id: 'C-008', name: 'Unique Traders', area: 'SITE Area', contactPerson: 'Faisal', phone: '0322-8901234', email: 'uniquetraders@example.com', creditLimit: 400000, outstandingBalance: 250000, status: 'active', address: 'SITE Area, Karachi' },
  { id: 'C-009', name: 'Medina Mart', area: 'Malir', contactPerson: 'Usman', phone: '0334-9012345', email: 'medinamart@example.com', creditLimit: 80000, outstandingBalance: 0, status: 'active', address: 'Malir Cantt' },
  { id: 'C-010', name: 'Siddiqui & Sons', area: 'Clifton', contactPerson: 'Bilal Siddiqui', phone: '0346-0123456', email: 'siddiquisons@example.com', creditLimit: 350000, outstandingBalance: 40000, status: 'active', address: 'Block 2, Clifton' }
];

export const MOCK_CATEGORIES: any =  [
  { id: 'CAT-01', name: 'Beverages', productCount: 45, status: 'active' },
  { id: 'CAT-02', name: 'Cooking Oil', productCount: 12, status: 'active' },
  { id: 'CAT-03', name: 'Rice', productCount: 8, status: 'active' },
  { id: 'CAT-04', name: 'Tea', productCount: 15, status: 'active' },
  { id: 'CAT-05', name: 'Detergent', productCount: 22, status: 'active' },
  { id: 'CAT-06', name: 'Personal Care', productCount: 30, status: 'active' },
  { id: 'CAT-07', name: 'Snacks', productCount: 50, status: 'active' },
  { id: 'CAT-08', name: 'Dairy', productCount: 18, status: 'active' }
];

export const MOCK_PRODUCTS: any =  [
  { id: 'P-001', name: 'Premium Tea 1kg', category: 'Tea', price: 1500, stock: 120, minStock: 50, sku: 'TEA-PR-1KG', status: 'active' },
  { id: 'P-002', name: 'Basmati Rice 5kg', category: 'Rice', price: 2100, stock: 45, minStock: 20, sku: 'RICE-BS-5KG', status: 'active' },
  { id: 'P-003', name: 'Cooking Oil 1L', category: 'Cooking Oil', price: 650, stock: 200, minStock: 100, sku: 'OIL-CK-1L', status: 'active' },
  { id: 'P-004', name: 'Detergent Powder 500g', category: 'Detergent', price: 280, stock: 350, minStock: 100, sku: 'DET-PW-500G', status: 'active' },
  { id: 'P-005', name: 'Cola 1.5L', category: 'Beverages', price: 160, stock: 500, minStock: 200, sku: 'BEV-CL-1.5L', status: 'active' },
  { id: 'P-006', name: 'Lemon Lime Soda 1.5L', category: 'Beverages', price: 150, stock: 480, minStock: 200, sku: 'BEV-LL-1.5L', status: 'active' },
  { id: 'P-007', name: 'Potato Chips Salted 100g', category: 'Snacks', price: 100, stock: 15, minStock: 50, sku: 'SNK-PC-100G', status: 'active' },
  { id: 'P-008', name: 'Beauty Soap 150g', category: 'Personal Care', price: 120, stock: 600, minStock: 150, sku: 'PC-BS-150G', status: 'active' },
  { id: 'P-009', name: 'Shampoo 400ml', category: 'Personal Care', price: 550, stock: 90, minStock: 40, sku: 'PC-SH-400ML', status: 'active' },
  { id: 'P-010', name: 'Milk UHT 1L', category: 'Dairy', price: 220, stock: 25, minStock: 100, sku: 'DRY-ML-1L', status: 'active' },
  { id: 'P-011', name: 'Canola Oil 5L', category: 'Cooking Oil', price: 3100, stock: 60, minStock: 30, sku: 'OIL-CN-5L', status: 'active' },
  { id: 'P-012', name: 'Dishwash Bar 250g', category: 'Detergent', price: 70, stock: 400, minStock: 150, sku: 'DET-DW-250G', status: 'active' },
  { id: 'P-013', name: 'Chocolate Biscuits 12s', category: 'Snacks', price: 150, stock: 8, minStock: 50, sku: 'SNK-CB-12S', status: 'active' },
  { id: 'P-014', name: 'Green Tea Bags 50s', category: 'Tea', price: 400, stock: 130, minStock: 40, sku: 'TEA-GR-50S', status: 'active' },
  { id: 'P-015', name: 'Mango Juice 1L', category: 'Beverages', price: 200, stock: 110, minStock: 50, sku: 'BEV-MJ-1L', status: 'active' }
];

export const MOCK_ORDERS: any = [
  { id: 'AT-250184', customerName: 'Al-Madina General Store', customerId: 'C-001', date: '2025-08-15', status: 'pending', totalAmount: 31750, itemsCount: 7, orderBooker: 'Usman Haider' },
  { id: 'AT-250183', customerName: 'Bin Hashim Mart', customerId: 'C-002', date: '2025-08-14', status: 'approved', totalAmount: 128900, itemsCount: 22, orderBooker: 'Saad Ahmed' },
  { id: 'AT-250182', customerName: 'Rehmat Super Store', customerId: 'C-003', date: '2025-08-14', status: 'processing', totalAmount: 45000, itemsCount: 12, orderBooker: 'Adeel Khan' },
  { id: 'AT-250181', customerName: 'City Cash & Carry', customerId: 'C-005', date: '2025-08-13', status: 'dispatched', totalAmount: 89500, itemsCount: 18, orderBooker: 'Usman Haider' },
  { id: 'AT-250180', customerName: 'Bismillah General Store', customerId: 'C-006', date: '2025-08-12', status: 'delivered', totalAmount: 54000, itemsCount: 9, orderBooker: 'Saad Ahmed' },
  { id: 'AT-250179', customerName: 'Khan Brothers', customerId: 'C-007', date: '2025-08-10', status: 'delivered', totalAmount: 76000, itemsCount: 14, orderBooker: 'Adeel Khan' },
  { id: 'AT-250178', customerName: 'Unique Traders', customerId: 'C-008', date: '2025-08-09', status: 'pending', totalAmount: 112000, itemsCount: 20, orderBooker: 'Usman Haider' },
  { id: 'AT-250177', customerName: 'Medina Mart', customerId: 'C-009', date: '2025-08-08', status: 'approved', totalAmount: 38500, itemsCount: 8, orderBooker: 'Saad Ahmed' },
  { id: 'AT-250176', customerName: 'Siddiqui & Sons', customerId: 'C-010', date: '2025-08-05', status: 'processing', totalAmount: 64200, itemsCount: 15, orderBooker: 'Adeel Khan' },
  { id: 'AT-250175', customerName: 'Al-Madina General Store', customerId: 'C-001', date: '2025-08-01', status: 'delivered', totalAmount: 42000, itemsCount: 10, orderBooker: 'Usman Haider' }
];

export const MOCK_PAYMENTS: any = [
  { id: 'PAY-001', reference: 'INV-0184', date: '2025-08-16', type: 'invoice', amount: 31750, description: 'Invoice — Al-Madina General Store', balance: 45000, status: 'completed' },
  { id: 'PAY-002', reference: 'REC-091', date: '2025-08-15', type: 'payment', amount: 31750, description: 'Payment received — Bank', balance: 13250, status: 'completed' },
  { id: 'PAY-003', reference: 'INV-0183', date: '2025-08-14', type: 'invoice', amount: 128900, description: 'Invoice — Bin Hashim Mart', balance: 120000, status: 'completed' },
  { id: 'PAY-004', reference: 'REC-090', date: '2025-08-13', type: 'payment', amount: 50000, description: 'Payment received — Cash', balance: -8900, status: 'completed' },
  { id: 'PAY-005', reference: 'INV-0182', date: '2025-08-14', type: 'invoice', amount: 45000, description: 'Invoice — Rehmat Super Store', balance: 30000, status: 'completed' },
  { id: 'PAY-006', reference: 'INV-0181', date: '2025-08-13', type: 'invoice', amount: 89500, description: 'Invoice — City Cash & Carry', balance: 5000, status: 'completed' },
  { id: 'PAY-007', reference: 'REC-089', date: '2025-08-12', type: 'payment', amount: 89500, description: 'Payment received — Cheque', balance: -84500, status: 'completed' },
  { id: 'PAY-008', reference: 'INV-0180', date: '2025-08-12', type: 'invoice', amount: 54000, description: 'Invoice — Bismillah General Store', balance: 12000, status: 'completed' }
];

export const MOCK_INVOICES: any = [
  { id: 'INV-0184', orderId: 'AT-250184', customerName: 'Al-Madina General Store', date: '2025-08-15', dueDate: '2025-08-30', amount: 31750, status: 'unpaid' },
  { id: 'INV-0183', orderId: 'AT-250183', customerName: 'Bin Hashim Mart', date: '2025-08-14', dueDate: '2025-08-29', amount: 128900, status: 'partial' },
  { id: 'INV-0182', orderId: 'AT-250182', customerName: 'Rehmat Super Store', date: '2025-08-14', dueDate: '2025-08-29', amount: 45000, status: 'unpaid' },
  { id: 'INV-0181', orderId: 'AT-250181', customerName: 'City Cash & Carry', date: '2025-08-13', dueDate: '2025-08-28', amount: 89500, status: 'paid' },
  { id: 'INV-0180', orderId: 'AT-250180', customerName: 'Bismillah General Store', date: '2025-08-12', dueDate: '2025-08-27', amount: 54000, status: 'paid' },
  { id: 'INV-0179', orderId: 'AT-250179', customerName: 'Khan Brothers', date: '2025-08-10', dueDate: '2025-08-25', amount: 76000, status: 'paid' },
  { id: 'INV-0178', orderId: 'AT-250178', customerName: 'Unique Traders', date: '2025-08-09', dueDate: '2025-08-24', amount: 112000, status: 'unpaid' },
  { id: 'INV-0177', orderId: 'AT-250177', customerName: 'Medina Mart', date: '2025-08-08', dueDate: '2025-08-23', amount: 38500, status: 'paid' }
];

export const MOCK_USERS: any = [
  { id: 'U-001', name: 'Ahsan Khan', email: 'ahsan@alitraders.com', role: 'super_admin', status: 'active', department: 'Management' },
  { id: 'U-002', name: 'Usman Haider', email: 'usman@alitraders.com', role: 'order_booker', status: 'active', department: 'Sales' },
  { id: 'U-003', name: 'Saad Ahmed', email: 'saad@alitraders.com', role: 'order_booker', status: 'active', department: 'Sales' },
  { id: 'U-004', name: 'Adeel Khan', email: 'adeel@alitraders.com', role: 'order_booker', status: 'active', department: 'Sales' },
  { id: 'U-005', name: 'Fatima Zahra', email: 'fatima@alitraders.com', role: 'accounts', status: 'active', department: 'Finance' },
  { id: 'U-006', name: 'Ali Raza', email: 'ali@alitraders.com', role: 'admin', status: 'active', department: 'Main Office' }
];

export const MOCK_AUDIT_LOGS: any = [
  { id: 'AL-001', action: 'Login', user: 'Ahsan Khan', date: '2025-08-16T09:00:00Z', details: 'User logged in successfully' },
  { id: 'AL-002', action: 'Create Order', user: 'Usman Haider', date: '2025-08-15T14:30:00Z', details: 'Order AT-250184 created for Al-Madina General Store' },
  { id: 'AL-003', action: 'Approve Order', user: 'Ali Raza', date: '2025-08-15T15:00:00Z', details: 'Order AT-250183 approved' },
  { id: 'AL-004', action: 'Update Stock', user: 'Ahsan Khan', date: '2025-08-15T16:45:00Z', details: 'Stock updated for Premium Tea 1kg' },
  { id: 'AL-005', action: 'Receive Payment', user: 'Fatima Zahra', date: '2025-08-14T11:20:00Z', details: 'Payment REC-091 received from Bank' },
  { id: 'AL-006', action: 'Create Invoice', user: 'Fatima Zahra', date: '2025-08-14T12:00:00Z', details: 'Invoice INV-0183 generated' },
  { id: 'AL-007', action: 'Add Customer', user: 'Saad Ahmed', date: '2025-08-13T10:15:00Z', details: 'New customer Siddiqui & Sons added' },
  { id: 'AL-008', action: 'Dispatch Order', user: 'Ali Raza', date: '2025-08-13T14:00:00Z', details: 'Order AT-250181 dispatched' },
  { id: 'AL-009', action: 'Logout', user: 'Adeel Khan', date: '2025-08-12T18:30:00Z', details: 'User logged out' },
  { id: 'AL-010', action: 'Update Profile', user: 'Ahsan Khan', date: '2025-08-12T09:10:00Z', details: 'Admin profile updated' }
];

export const MOCK_WAREHOUSES: any = [
  { id: 'W-01', name: 'SITE Area Main Warehouse', location: 'SITE Area, Karachi', capacity: 50000, status: 'active' },
  { id: 'W-02', name: 'Korangi Distribution Center', location: 'Korangi Industrial Area, Karachi', capacity: 35000, status: 'active' },
  { id: 'W-03', name: 'FB Area Hub', location: 'Federal B Area, Karachi', capacity: 15000, status: 'active' }
];

export const MOCK_NOTIFICATIONS: any = [
  { id: 'N-001', title: 'Low Stock Alert', message: 'Milk UHT 1L is below minimum stock level.', type: 'warning', date: '2025-08-16T08:30:00Z', read: false },
  { id: 'N-002', title: 'New Order Received', message: 'Order AT-250184 has been placed by Usman Haider.', type: 'info', date: '2025-08-15T14:35:00Z', read: true },
  { id: 'N-003', title: 'Payment Confirmed', message: 'Payment REC-091 of Rs 31,750 confirmed.', type: 'success', date: '2025-08-15T12:00:00Z', read: true },
  { id: 'N-004', title: 'System Update', message: 'System maintenance scheduled for tonight at 2 AM.', type: 'info', date: '2025-08-14T10:00:00Z', read: false },
  { id: 'N-005', title: 'Order Dispatched', message: 'Order AT-250181 has been dispatched.', type: 'success', date: '2025-08-13T14:05:00Z', read: true }
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalSales: 2450000,
  totalOrders: 342,
  pendingOrders: 42,
  activeCustomers: 1204,
  lowStockItems: 18,
  totalReceivables: 890000,
  collectionRate: 78.5,
  avgOrderValue: 7164
};

export const MOCK_SALES_CHART_DATA = [
  { month: 'Jan', sales: 1800000 },
  { month: 'Feb', sales: 1950000 },
  { month: 'Mar', sales: 2100000 },
  { month: 'Apr', sales: 2050000 },
  { month: 'May', sales: 2200000 },
  { month: 'Jun', sales: 2350000 },
  { month: 'Jul', sales: 2500000 },
  { month: 'Aug', sales: 2450000 },
  { month: 'Sep', sales: 2600000 },
  { month: 'Oct', sales: 2750000 },
  { month: 'Nov', sales: 2900000 },
  { month: 'Dec', sales: 3100000 }
];

export const MOCK_CATEGORY_CHART_DATA = [
  { name: 'Beverages', value: 35 },
  { name: 'Personal Care', value: 20 },
  { name: 'Detergent', value: 15 },
  { name: 'Snacks', value: 12 },
  { name: 'Tea', value: 8 },
  { name: 'Dairy', value: 5 },
  { name: 'Cooking Oil', value: 3 },
  { name: 'Rice', value: 2 }
];

export const MOCK_REPORT_CONFIGS: any = [
  { id: 'RPT-01', title: 'Sales Summary', description: 'Detailed operational analysis with filters and export options.', icon: 'BarChart2', category: 'Sales' },
  { id: 'RPT-02', title: 'Customer Performance', description: 'Detailed operational analysis with filters and export options.', icon: 'Users', category: 'Customers' },
  { id: 'RPT-03', title: 'Monthly Trend', description: 'Detailed operational analysis with filters and export options.', icon: 'TrendingUp', category: 'Analytics' },
  { id: 'RPT-04', title: 'Area Analysis', description: 'Detailed operational analysis with filters and export options.', icon: 'Map', category: 'Geography' },
  { id: 'RPT-05', title: 'Invoice Register', description: 'Detailed operational analysis with filters and export options.', icon: 'FileText', category: 'Finance' },
  { id: 'RPT-06', title: 'Order Booker Performance', description: 'Detailed operational analysis with filters and export options.', icon: 'Award', category: 'HR' }
];

export const MOCK_STOCK_ALERTS: any = [
  { id: 'SA-01', productId: 'P-007', productName: 'Potato Chips Salted 100g', currentStock: 15, minStock: 50, status: 'critical' },
  { id: 'SA-02', productId: 'P-010', productName: 'Milk UHT 1L', currentStock: 25, minStock: 100, status: 'critical' },
  { id: 'SA-03', productId: 'P-013', productName: 'Chocolate Biscuits 12s', currentStock: 8, minStock: 50, status: 'critical' },
  { id: 'SA-04', productId: 'P-002', productName: 'Basmati Rice 5kg', currentStock: 45, minStock: 20, status: 'warning' },
  { id: 'SA-05', productId: 'P-011', productName: 'Canola Oil 5L', currentStock: 60, minStock: 30, status: 'warning' }
];

export const MOCK_RECENT_ACTIVITIES: any =  [
  { id: 'RA-01', action: 'Order Placed', entity: 'AT-250184', user: 'Usman Haider', time: '2 hours ago', icon: 'ShoppingCart' },
  { id: 'RA-02', action: 'Payment Received', entity: 'Rs 31,750', user: 'Fatima Zahra', time: '5 hours ago', icon: 'DollarSign' },
  { id: 'RA-03', action: 'Stock Alert', entity: 'Milk UHT 1L', user: 'System', time: '1 day ago', icon: 'AlertTriangle' },
  { id: 'RA-04', action: 'Order Delivered', entity: 'AT-250180', user: 'Ali Raza', time: '1 day ago', icon: 'CheckCircle' },
  { id: 'RA-05', action: 'New Customer', entity: 'Siddiqui & Sons', user: 'Saad Ahmed', time: '2 days ago', icon: 'UserPlus' },
  { id: 'RA-06', action: 'Invoice Generated', entity: 'INV-0183', user: 'Fatima Zahra', time: '2 days ago', icon: 'FileText' },
  { id: 'RA-07', action: 'Order Approved', entity: 'AT-250183', user: 'Ahsan Khan', time: '3 days ago', icon: 'ThumbsUp' },
  { id: 'RA-08', action: 'System Backup', entity: 'Database', user: 'System', time: '4 days ago', icon: 'Database' }
];
