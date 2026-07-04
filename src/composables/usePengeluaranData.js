function generateExpenseRows(count) {
  const categories = [
    { label: 'Operasional', color: 'rose' },
    { label: 'Gaji & Tunjangan', color: 'blue' },
    { label: 'Pemasaran', color: 'purple' },
  ]
  const accounts = ['Bank BCA', 'Bank Mandiri', 'E-Wallet', 'Kartu Kredit']
  const creators = ['Fajar A.', 'Dinda P.', 'Raka P.', 'Arif H.']
  const descriptions = [
    'Pembelian ATK', 'Gaji Karyawan Mei 2024', 'Sewa Kantor Mei 2024', 'Biaya Iklan Facebook',
    'Pembelian Printer', 'Langganan Office 365', 'Transportasi Dinas', 'Biaya Listrik & Air',
    'Pembelian Furnitur', 'Konsumsi Rapat',
  ]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']
  const statuses = ['Selesai', 'Selesai', 'Selesai', 'Selesai', 'Selesai', 'Menunggu']

  const rows = []
  for (let i = 0; i < count; i++) {
    const cat = categories[i % categories.length]
    rows.push({
      id: i + 1,
      date: `${(i % 27) + 1} ${months[i % months.length]} 2024`,
      description: descriptions[i % descriptions.length],
      category: cat.label,
      categoryColor: cat.color,
      account: accounts[i % accounts.length],
      amount: (Math.floor(Math.random() * 20) + 2) * 5000000,
      status: statuses[i % statuses.length],
      createdBy: creators[i % creators.length],
    })
  }
  return rows
}

export function usePengeluaranData() {
  const summaryCards = [
    {
      key: 'total',
      label: 'Total Pengeluaran',
      value: 'Rp 820.000.000',
      change: '8.7%',
      changeLabel: 'dari periode lalu',
      trend: 'down',
      icon: 'wallet',
      color: 'rose',
    },
    {
      key: 'average',
      label: 'Rata-rata per Bulan',
      value: 'Rp 136.666.667',
      change: '6.3%',
      changeLabel: 'dari periode lalu',
      trend: 'down',
      icon: 'calendar',
      color: 'purple',
    },
    {
      key: 'transactions',
      label: 'Total Transaksi',
      value: '62 Transaksi',
      change: null,
      changeLabel: '100% dari total transaksi',
      trend: null,
      icon: 'document',
      color: 'blue',
    },
    {
      key: 'biggest',
      label: 'Pengeluaran Terbesar',
      value: 'Rp 125.000.000',
      highlight: 'Pembelian ATK',
      icon: 'trend',
      color: 'amber',
    },
  ]

  const trend = {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'Mei 2024', 'Jun 2024'],
    data: [110000000, 210000000, 165000000, 235000000, 175000000, 210000000],
    average: 136666667,
  }

  const categoryBreakdown = [
    { label: 'Operasional', value: 287000000, percent: 35, color: '#f43f5e' },
    { label: 'Pembelian Barang', value: 205000000, percent: 25, color: '#f97316' },
    { label: 'Gaji & Tunjangan', value: 164000000, percent: 20, color: '#3b82f6' },
    { label: 'Pemasaran', value: 82000000, percent: 10, color: '#a855f7' },
    { label: 'Lainnya', value: 82000000, percent: 10, color: '#10b981' },
  ]
  const categoryTotal = 'Rp 820.000.000'

  const biggestExpenses = [
    { title: 'Pembelian ATK', category: 'Operasional', amount: 'Rp 125.000.000', date: '15 Mei 2024', icon: 'cart', color: 'rose' },
    { title: 'Gaji Karyawan', category: 'Gaji & Tunjangan', amount: 'Rp 110.000.000', date: '25 Mei 2024', icon: 'user', color: 'blue' },
    { title: 'Sewa Kantor', category: 'Operasional', amount: 'Rp 75.000.000', date: '5 Mei 2024', icon: 'building', color: 'amber' },
    { title: 'Biaya Iklan Facebook', category: 'Pemasaran', amount: 'Rp 50.000.000', date: '18 Mei 2024', icon: 'megaphone', color: 'purple' },
    { title: 'Langganan Software', category: 'Operasional', amount: 'Rp 45.000.000', date: '30 Mei 2024', icon: 'package', color: 'emerald' },
  ]

  const budgetSummary = [
    { key: 'week', label: 'Minggu Ini', value: 'Rp 210.500.000', icon: 'calendar', color: 'purple' },
    { key: 'month', label: 'Bulan Ini', value: 'Rp 820.000.000', icon: 'wallet', color: 'rose' },
    { key: 'year', label: 'Tahun Ini', value: 'Rp 5.120.000.000', icon: 'chart', color: 'blue' },
    { key: 'remaining', label: 'Sisa Anggaran', value: 'Rp 1.230.000.000', icon: 'clock', color: 'emerald', progress: 67 },
  ]

  const insight = {
    title: 'Pengeluaran Anda meningkat 8.7%',
    description: 'Dibandingkan periode sebelumnya.',
  }

  const tableRows = generateExpenseRows(62)

  return {
    summaryCards,
    trend,
    categoryBreakdown,
    categoryTotal,
    biggestExpenses,
    budgetSummary,
    insight,
    tableRows,
  }
}