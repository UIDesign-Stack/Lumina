function generateMoreReports() {
  const names = ['Laporan Laba Rugi', 'Neraca Keuangan', 'Laporan Arus Kas', 'Catatan atas Laporan Keuangan', 'Laporan Perubahan Ekuitas']
  const periods = ['April 2024', 'Maret 2024', 'Februari 2024', 'Januari 2024']
  const rows = []
  let id = 100
  periods.forEach((period) => {
    names.forEach((name) => {
      rows.push({
        id: id++,
        name,
        period,
        createdAt: `2${Math.floor(Math.random() * 8) + 1} ${period.split(' ')[0]} 2024 ${10 + (id % 8)}:${(id % 6) * 10 || '00'}`,
        createdBy: 'Fajar Ardiansyah',
        format: 'PDF',
      })
    })
  })
  return rows
}

export function useLaporanKeuanganData() {
  const summaryCards = [
    { key: 'assets', label: 'Total Aset', value: 'Rp 56.750.000.000', note: '+8.6% dari periode lalu', icon: 'wallet', color: 'purple' },
    { key: 'liabilities', label: 'Total Liabilitas', value: 'Rp 18.250.000.000', note: '+5.2% dari periode lalu', icon: 'trend', color: 'purple' },
    { key: 'equity', label: 'Total Ekuitas', value: 'Rp 38.500.000.000', note: '+10.3% dari periode lalu', icon: 'clock', color: 'purple' },
    { key: 'revenue', label: 'Total Pendapatan', value: 'Rp 12.450.000.000', note: '+12.7% dari periode lalu', icon: 'dollar', color: 'purple' },
    { key: 'profit', label: 'Laba Bersih', value: 'Rp 2.350.000.000', note: '+15.4% dari periode lalu', icon: 'trend', color: 'purple' },
  ]

  const tabs = ['Ringkasan', 'Laba Rugi', 'Neraca', 'Arus Kas', 'Perubahan Ekuitas', 'Catatan atas Laporan Keuangan']

  const period = '01 Mei 2024 - 31 Mei 2024'
  const compareOptions = ['April 2024', 'Maret 2024', 'Mei 2023']

  const trend = {
    labels: ['01 Mei', '06 Mei', '11 Mei', '16 Mei', '21 Mei', '26 Mei', '31 Mei'],
    revenue: [8500000, 9800000, 10200000, 11500000, 10800000, 12200000, 13200000].map((v) => v * 1000),
    expense: [6200000, 6800000, 7100000, 6900000, 6500000, 7600000, 7900000].map((v) => v * 1000),
    profit: [2300000, 3000000, 3100000, 4600000, 4300000, 4600000, 5300000].map((v) => v * 1000),
  }

  const revenueBreakdown = [
    { label: 'Penjualan Produk', value: 6250000000, percent: 50.2, color: '#a855f7' },
    { label: 'Jasa Layanan', value: 3150000000, percent: 25.3, color: '#10b981' },
    { label: 'Sewa & Properti', value: 1750000000, percent: 14.1, color: '#f97316' },
    { label: 'Pendapatan Lainnya', value: 1300000000, percent: 10.4, color: '#ec4899' },
  ]
  const revenueTotal = 'Rp 12,45 M'

  const reportRows = [
    { id: 1, name: 'Laporan Laba Rugi', period: 'Mei 2024', createdAt: '31 Mei 2024 14:30', createdBy: 'Fajar Ardiansyah', format: 'PDF' },
    { id: 2, name: 'Neraca Keuangan', period: 'Mei 2024', createdAt: '31 Mei 2024 14:25', createdBy: 'Fajar Ardiansyah', format: 'PDF' },
    { id: 3, name: 'Laporan Arus Kas', period: 'Mei 2024', createdAt: '31 Mei 2024 14:20', createdBy: 'Fajar Ardiansyah', format: 'PDF' },
    { id: 4, name: 'Catatan atas Laporan Keuangan', period: 'Mei 2024', createdAt: '31 Mei 2024 14:15', createdBy: 'Fajar Ardiansyah', format: 'PDF' },
    { id: 5, name: 'Laporan Perubahan Ekuitas', period: 'Mei 2024', createdAt: '31 Mei 2024 14:10', createdBy: 'Fajar Ardiansyah', format: 'PDF' },
    ...generateMoreReports(),
  ]

  const recentReports = [
    { id: 1, name: 'Laporan Laba Rugi', period: 'Mei 2024', date: '31 Mei 2024', format: 'PDF', icon: 'doc', color: 'purple' },
    { id: 2, name: 'Neraca Keuangan', period: 'Mei 2024', date: '31 Mei 2024', format: 'PDF', icon: 'doc', color: 'blue' },
    { id: 3, name: 'Laporan Arus Kas', period: 'Mei 2024', date: '31 Mei 2024', format: 'PDF', icon: 'doc', color: 'amber' },
    { id: 4, name: 'Catatan atas Laporan Keuangan', period: 'Mei 2024', date: '31 Mei 2024', format: 'PDF', icon: 'doc', color: 'emerald' },
    { id: 5, name: 'Laporan Perubahan Ekuitas', period: 'Mei 2024', date: '31 Mei 2024', format: 'PDF', icon: 'doc', color: 'pink' },
  ]

  const insights = [
    { id: 1, text: 'Laba bersih meningkat 15.4% dibandingkan periode sebelumnya.', icon: 'trend', color: 'emerald' },
    { id: 2, text: 'Pendapatan dari Penjualan Produk berkontribusi 50.2% dari total pendapatan.', icon: 'pie', color: 'amber' },
    { id: 3, text: 'Rasio lancar berada pada kondisi sehat di angka 2.45.', icon: 'check', color: 'blue' },
  ]

  return {
    summaryCards,
    tabs,
    period,
    compareOptions,
    trend,
    revenueBreakdown,
    revenueTotal,
    reportRows,
    recentReports,
    insights,
  }
}