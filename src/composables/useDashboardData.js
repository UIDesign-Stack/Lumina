export function useDashboardData() {
  const statCards = [
    {
      key: 'income',
      title: 'Total Pemasukan',
      value: 'Rp 1.250.000.000',
      change: '12.5%',
      changeLabel: 'dari bulan lalu',
      trend: 'up',
      color: 'emerald',
      sparkline: [20, 28, 24, 35, 30, 42, 38, 48, 45, 55, 52, 62],
    },
    {
      key: 'expense',
      title: 'Total Pengeluaran',
      value: 'Rp 820.000.000',
      change: '8.7%',
      changeLabel: 'dari bulan lalu',
      trend: 'up',
      color: 'rose',
      sparkline: [30, 25, 35, 28, 40, 32, 45, 38, 42, 36, 48, 40],
    },
    {
      key: 'profit',
      title: 'Laba Bersih',
      value: 'Rp 430.000.000',
      change: '18.3%',
      changeLabel: 'dari bulan lalu',
      trend: 'up',
      color: 'blue',
      sparkline: [15, 22, 18, 28, 24, 32, 28, 38, 34, 44, 40, 50],
    },
    {
      key: 'cash',
      title: 'Saldo Kas',
      value: 'Rp 2.350.000.000',
      change: '9.4%',
      changeLabel: 'dari bulan lalu',
      trend: 'up',
      color: 'amber',
      sparkline: [40, 38, 44, 40, 48, 44, 52, 48, 56, 52, 60, 58],
    },
  ]

  const cashFlow = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    income: [850000000, 920000000, 1100000000, 980000000, 1150000000, 1250000000],
    expense: [680000000, 750000000, 720000000, 800000000, 780000000, 820000000],
  }

  const expenseCategories = [
    { label: 'Operasional', value: 246000000, percent: 30, color: '#3b82f6' },
    { label: 'Gaji & Tunjangan', value: 205000000, percent: 25, color: '#8b5cf6' },
    { label: 'Pemasaran', value: 123000000, percent: 15, color: '#f59e0b' },
    { label: 'Sewa & Utilitas', value: 82000000, percent: 10, color: '#10b981' },
    { label: 'Transportasi', value: 65000000, percent: 8, color: '#ec4899' },
    { label: 'Lainnya', value: 99000000, percent: 12, color: '#a78bfa' },
  ]
  const expenseTotal = 'Rp 820.000.000'

  const recentTransactions = [
    {
      id: 1,
      title: 'Pembayaran Klien A',
      subtitle: 'Pemasukan • Transfer',
      amount: '+ Rp 150.000.000',
      time: 'Hari ini',
      type: 'income',
      icon: 'arrow-down',
    },
    {
      id: 2,
      title: 'Pembelian ATK',
      subtitle: 'Pengeluaran • Operasional',
      amount: '- Rp 2.350.000',
      time: 'Hari ini',
      type: 'expense',
      icon: 'cart',
    },
    {
      id: 3,
      title: 'Pembayaran Klien B',
      subtitle: 'Pemasukan • Transfer',
      amount: '+ Rp 75.000.000',
      time: 'Kemarin',
      type: 'income',
      icon: 'arrow-down',
    },
    {
      id: 4,
      title: 'Gaji Karyawan',
      subtitle: 'Pengeluaran • Gaji',
      amount: '- Rp 45.000.000',
      time: '2 hari lalu',
      type: 'expense',
      icon: 'user',
    },
    {
      id: 5,
      title: 'Sewa Kantor',
      subtitle: 'Pengeluaran • Sewa',
      amount: '- Rp 20.000.000',
      time: '3 hari lalu',
      type: 'expense',
      icon: 'building',
    },
  ]

  const budgetSummary = [
    { category: 'Operasional', budget: 300000000, actual: 246000000, remaining: 54000000, progress: 82 },
    { category: 'Gaji & Tunjangan', budget: 250000000, actual: 205000000, remaining: 45000000, progress: 82 },
    { category: 'Pemasaran', budget: 150000000, actual: 123000000, remaining: 27000000, progress: 82 },
    { category: 'Sewa & Utilitas', budget: 100000000, actual: 82000000, remaining: 18000000, progress: 82 },
    { category: 'Transportasi', budget: 80000000, actual: 65000000, remaining: 15000000, progress: 81 },
  ]

  const accounts = [
    { id: 1, name: 'Kas Utama', bank: 'Bank BCA', number: '1234 5678 9000', balance: 'Rp 1.250.000.000', icon: 'wallet', color: 'purple' },
    { id: 2, name: 'Bank Mandiri', bank: 'Mandiri', number: '9876 5432 1000', balance: 'Rp 850.000.000', icon: 'bank', color: 'blue' },
    { id: 3, name: 'Bank BNI', bank: 'BNI', number: '1122 3344 5566', balance: 'Rp 450.000.000', icon: 'bank', color: 'orange' },
    { id: 4, name: 'E-Wallet', bank: 'GoPay', number: '0812 3456 7890', balance: 'Rp 120.000.000', icon: 'device', color: 'teal' },
  ]

  return {
    statCards,
    cashFlow,
    expenseCategories,
    expenseTotal,
    recentTransactions,
    budgetSummary,
    accounts,
  }
}