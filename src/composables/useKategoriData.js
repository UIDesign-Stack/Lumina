function generateMoreExpenseCategories() {
  const names = ['Perjalanan Dinas', 'Asuransi', 'Perlengkapan Kantor', 'Konsultan', 'Pajak', 'Sewa Gudang', 'Listrik & Air', 'Internet & Telepon', 'Pelatihan Karyawan', 'Lainnya']
  return names.map((name, i) => ({
    id: 100 + i,
    name,
    type: 'Pengeluaran',
    description: `Biaya terkait ${name.toLowerCase()}`,
    transactions: Math.max(1, 12 - i),
    icon: 'dots',
    color: 'gray',
  }))
}

export function useKategoriData() {
  const summaryCards = [
    { key: 'total', label: 'Total Kategori', value: '24', note: '18 Pengeluaran • 6 Pemasukan', icon: 'wallet', color: 'purple' },
    { key: 'active', label: 'Kategori Aktif', value: '24', note: '100% dari total kategori', icon: 'wallet', color: 'purple' },
    { key: 'inactive', label: 'Kategori Nonaktif', value: '0', note: '0% dari total kategori', icon: 'wallet', color: 'purple' },
    { key: 'top', label: 'Kategori Terbanyak', value: 'Operasional', note: '8 transaksi bulan ini', icon: 'pie', color: 'purple' },
  ]

  const tabs = ['Kategori Pengeluaran', 'Kategori Pemasukan']

  const expenseCategories = [
    { id: 1, name: 'Operasional', type: 'Pengeluaran', description: 'Biaya operasional sehari-hari perusahaan', transactions: 126, icon: 'wallet', color: 'purple' },
    { id: 2, name: 'Pemasaran', type: 'Pengeluaran', description: 'Biaya pemasaran dan promosi', transactions: 84, icon: 'megaphone', color: 'indigo' },
    { id: 3, name: 'SDM & GA', type: 'Pengeluaran', description: 'Gaji, tunjangan, dan keperluan umum', transactions: 72, icon: 'users', color: 'amber' },
    { id: 4, name: 'IT & Sistem', type: 'Pengeluaran', description: 'Biaya teknologi informasi dan sistem', transactions: 38, icon: 'chat', color: 'blue' },
    { id: 5, name: 'Keuangan', type: 'Pengeluaran', description: 'Biaya keuangan dan perbankan', transactions: 25, icon: 'bank', color: 'emerald' },
    { id: 6, name: 'Transportasi', type: 'Pengeluaran', description: 'Biaya transportasi dan perjalanan dinas', transactions: 19, icon: 'car', color: 'indigo' },
    { id: 7, name: 'Hiburan & Konsumsi', type: 'Pengeluaran', description: 'Biaya makan, minum, dan hiburan', transactions: 16, icon: 'coffee', color: 'pink' },
    { id: 8, name: 'Pemeliharaan', type: 'Pengeluaran', description: 'Biaya perawatan dan pemeliharaan aset', transactions: 14, icon: 'wrench', color: 'amber' },
    ...generateMoreExpenseCategories(),
  ]

  const incomeCategories = [
    { id: 201, name: 'Pendapatan Jasa', type: 'Pemasukan', description: 'Pendapatan dari jasa yang diberikan', transactions: 45, icon: 'wallet', color: 'emerald' },
    { id: 202, name: 'Penjualan', type: 'Pemasukan', description: 'Pendapatan dari penjualan produk', transactions: 38, icon: 'chat', color: 'blue' },
    { id: 203, name: 'Pendapatan Lainnya', type: 'Pemasukan', description: 'Pendapatan di luar operasional utama', transactions: 12, icon: 'pie', color: 'indigo' },
    { id: 204, name: 'Pendapatan Bunga', type: 'Pemasukan', description: 'Pendapatan bunga bank/investasi', transactions: 8, icon: 'bank', color: 'amber' },
    { id: 205, name: 'Sewa', type: 'Pemasukan', description: 'Pendapatan dari penyewaan aset', transactions: 5, icon: 'wrench', color: 'pink' },
    { id: 206, name: 'Lainnya', type: 'Pemasukan', description: 'Pendapatan lain-lain', transactions: 3, icon: 'dots', color: 'gray' },
  ]

  const categorySplit = [
    { label: 'Pengeluaran', count: 18, percent: 75, color: '#a855f7' },
    { label: 'Pemasukan', count: 6, percent: 25, color: '#6366f1' },
  ]
  const totalCategories = 24

  const topCategories = [
    { key: 'operasional', name: 'Operasional', transactions: 126, icon: 'wallet', color: 'purple' },
    { key: 'pemasaran', name: 'Pemasaran', transactions: 84, icon: 'megaphone', color: 'indigo' },
    { key: 'sdm', name: 'SDM & GA', transactions: 72, icon: 'users', color: 'amber' },
    { key: 'it', name: 'IT & Sistem', transactions: 38, icon: 'chat', color: 'blue' },
    { key: 'keuangan', name: 'Keuangan', transactions: 25, icon: 'bank', color: 'emerald' },
  ]

  const tip = {
    text: 'Gunakan kategori yang spesifik untuk memudahkan analisis laporan keuangan.',
    linkText: 'Pelajari lebih lanjut',
  }

  return {
    summaryCards,
    tabs,
    expenseCategories,
    incomeCategories,
    categorySplit,
    totalCategories,
    topCategories,
    tip,
  }
}