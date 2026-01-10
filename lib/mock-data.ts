
// Existing data...
export const CATEGORIES = [
  { id: 'games', name: 'Games', slug: 'games' },
  { id: 'pulsa', name: 'Pulsa & Data', slug: 'pulsa' },
  { id: 'voucher', name: 'Voucher', slug: 'voucher' },
];

export const PRODUCTS = [
  {
    id: 'mlbb',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    category: 'games',
    image: '/images/mlbb.jpg', 
    developer: 'Moonton',
    status: 'ACTIVE',
    provider: 'DIGIFLAZZ',
    nominals: [
      { id: 'ml-1', name: '5 Diamonds', price: 1500 },
      { id: 'ml-2', name: '10 Diamonds', price: 2900 },
      { id: 'ml-3', name: '50 Diamonds', price: 14000 },
      { id: 'ml-4', name: '100 Diamonds', price: 28000 },
    ],
  },
  {
    id: 'ff',
    name: 'Free Fire',
    slug: 'free-fire',
    category: 'games',
    image: '/images/ff.jpg',
    developer: 'Garena',
    status: 'ACTIVE',
    provider: 'VIPRES',
    nominals: [
      { id: 'ff-1', name: '5 Diamonds', price: 1000 },
      { id: 'ff-2', name: '12 Diamonds', price: 2000 },
      { id: 'ff-3', name: '70 Diamonds', price: 10000 },
      { id: 'ff-4', name: '140 Diamonds', price: 20000 },
    ],
  },
  {
    id: 'pubgm',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    category: 'games',
    image: '/images/pubgm.jpg',
    developer: 'Tencent',
    status: 'MAINTENANCE',
    provider: 'DIGIFLAZZ',
    nominals: [
      { id: 'pubg-1', name: '60 UC', price: 15000 },
      { id: 'pubg-2', name: '325 UC', price: 75000 },
    ],
  },
];

export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', fee: 0, icon: 'qr', status: 'ACTIVE' },
  { id: 'va_bca', name: 'BCA Virtual Account', fee: 2000, icon: 'bank', status: 'ACTIVE' },
  { id: 'ewallet_gopay', name: 'GoPay', fee: 1000, icon: 'wallet', status: 'MAINTENANCE' },
];

export const PROVIDERS = [
    { id: 'DIGIFLAZZ', name: 'Digiflazz', balance: 500000, status: 'ONLINE', apiKey: 'prod-*************' },
    { id: 'VIPRES', name: 'VIP Reseller', balance: 1250000, status: 'ONLINE', apiKey: 'vip-*************' },
    { id: 'APIGAMES', name: 'API Games', balance: 0, status: 'MAINTENANCE', apiKey: 'api-*************' },
];

export const MOCK_TRANSACTIONS = [
  {
    invoiceId: 'INV-20240101-001',
    productId: 'mlbb',
    productName: 'Mobile Legends',
    nominalName: '50 Diamonds',
    price: 14000,
    paymentMethod: 'QRIS',
    status: 'SUCCESS',
    date: '2024-01-01T10:00:00Z',
    userId: '12345678',
    logs: [
        { time: '10:00:00', message: 'Transaction created' },
        { time: '10:00:05', message: 'Payment confirmed via QRIS' },
        { time: '10:00:07', message: 'Processing to Provider DIGIFLAZZ' },
        { time: '10:00:10', message: 'Provider Success: SN/12398123' },
        { time: '10:00:10', message: 'Transaction Completed' },
    ]
  },
  {
    invoiceId: 'INV-20240101-002',
    productId: 'ff',
    productName: 'Free Fire',
    nominalName: '140 Diamonds',
    price: 20000,
    paymentMethod: 'GoPay',
    status: 'PENDING',
    date: '2024-01-01T11:30:00Z',
    userId: '87654321',
    logs: [
        { time: '11:30:00', message: 'Transaction created' },
        { time: '11:30:00', message: 'Waiting for payment' },
    ]
  },
  {
    invoiceId: 'INV-20240101-003',
    productId: 'pubgm',
    productName: 'PUBG Mobile',
    nominalName: '60 UC',
    price: 15000,
    paymentMethod: 'BCA Virtual Account',
    status: 'FAILED',
    date: '2024-01-01T09:00:00Z',
    userId: '99887766',
    logs: [
         { time: '09:00:00', message: 'Transaction created' },
         { time: '09:05:00', message: 'Payment confirmed' },
         { time: '09:05:02', message: 'Processing to Provider DIGIFLAZZ' },
         { time: '09:05:05', message: 'Provider Error: Connection Timeout' },
         { time: '09:05:05', message: 'Transaction Failed' },
    ]
  },
];

export const SYSTEM_LOGS = [
    { id: 1, type: 'INFO', message: 'System Started', timestamp: '2024-01-01T00:00:00Z' },
    { id: 2, type: 'INFO', message: 'Cron Job: Sync Product Success', timestamp: '2024-01-01T01:00:00Z' },
    { id: 3, type: 'ERROR', message: 'Callback Failed: INV-20240101-003 - Timeout', timestamp: '2024-01-01T09:05:05Z' },
    { id: 4, type: 'WARNING', message: 'Provider APIGAMES low balance', timestamp: '2024-01-01T12:00:00Z' },
    { id: 5, type: 'INFO', message: 'Admin Login: admin', timestamp: '2024-01-01T14:00:00Z' },
];

export const ADMIN_STATS = {
  totalTransactions: 150,
  totalRevenue: 2500000,
  successRate: 98,
  pendingTransactions: 2,
};
