function generateMoreCashFlowRows() {
  const categories = ['Operasional', 'Investasi', 'Pendanaan']
  const descriptions = {
    Operasional: ['Penerimaan dari Penjualan', 'Pembayaran Gaji Karyawan', 'Pembayaran ke Vendor', 'Pembayaran Sewa Kantor', 'Penerimaan Piutang'],
    Investasi: ['Penjualan Aset Tetap', 'Pembelian Peralatan', 'Pembelian Kendaraan', 'Investasi Saham'],
    Pendanaan: ['Penerimaan Pinjaman Bank', 'Pembayaran Cicilan Pinjaman', 'Setoran Modal', 'Pembayaran Dividen'],
  }
  const months = ['Mei', 'Jun']
  const rows = []
  let saldo = 8750000000
  for (let i = 0; i < 37; i++) {
    const category = categories[i % categories.length]
    const desc = descriptions[category][i % descriptions[category].length]
    const isInflow = !desc.toLowerCase().includes('pembayaran')
    const amount = (Math.floor(Math.random() * 15) + 3) * 100000000
    const cashIn = isInflow ? amount : 0
    const cashOut = isInflow ? 0 : amount
    saldo = saldo + cashIn - cashOut
    rows.push({
      id: 100 + i,
      date: `${(i % 27) + 1} ${months[i % months.length]} 2024`,
      description: desc,
      category,
      cashIn,
      cashOut,
      netCashFlow: cashIn - cashOut,
      balance: saldo,
    })
  }
  return rows
}

export function useArusKasData() {
  const summaryCards = [
    { key: 'opening', label: 'Saldo Kas Awal', value: 'Rp 8.750.000.000', note: 'Per 01 Mei 2024', icon: 'wallet', color: 'purple' },
    { key: 'inflow', label: 'Total Kas Masuk', value: 'Rp 25.450.000.000', note: '+12.4% dari periode lalu', icon: 'arrowDown', color: 'purple' },
    { key: 'outflow', label: 'Total Kas Keluar', value: 'Rp 18.230.000.000', note: '+9.2% dari periode lalu', icon: 'arrowUp', color: 'purple' },
    { key: 'net', label: 'Arus Kas Bersih', value: 'Rp 7.220.000.000', note: '+21.6% dari periode lalu', icon: 'trend', color: 'purple' },
    { key: 'closing', label: 'Saldo Kas Akhir', value: 'Rp 15.970.000.000', note: 'Per 31 Mei 2024', icon: 'wallet', color: 'purple' },
  ]

  const period = '01 Mei 2024 - 31 Mei 2024'
  const compareOptions = ['April 2024', 'Maret 2024', 'Mei 2023']

  const trend = {
    labels: ['01 Mei', '06 Mei', '11 Mei', '16 Mei', '21 Mei', '26 Mei', '31 Mei'],
    cashIn: [6500000, 7200000, 7800000, 8500000, 7900000, 8600000, 9200000].map((v) => v * 1000),
    cashOut: [4200000, 5100000, 5600000, 6200000, 5400000, 6100000, 7000000].map((v) => v * 1000),
    netCashFlow: [1200000, 1800000, 1600000, 2400000, 2000000, 2500000, 3000000].map((v) => v * 1000),
  }

  const summaryBreakdown = [
    { label: 'Kas Masuk', value: 25450000000, percent: 58.3, color: '#a855f7' },
    { label: 'Kas Keluar', value: 18230000000, percent: 41.7, color: '#f43f5e' },
    { label: 'Arus Kas Bersih', value: 7220000000, percent: 16.6, color: '#3b82f6' },
  ]
  const summaryTotalLabel = 'Arus Kas Bersih'
  const summaryTotal = 'Rp 7,22 M'

  const activities = [
    { key: 'operating', label: 'Aktivitas Operasional', value: 'Rp 9.850.000.000', percent: 68.4, isNegative: false },
    { key: 'investing', label: 'Aktivitas Investasi', value: '-Rp 3.450.000.000', percent: 23.9, isNegative: true },
    { key: 'financing', label: 'Aktivitas Pendanaan', value: 'Rp 800.000.000', percent: 5.6, isNegative: false },
  ]

  const tabs = ['Semua', 'Operasional', 'Investasi', 'Pendanaan']

  const rows = [
    { id: 1, date: '01 Mei 2024', description: 'Saldo Kas Awal', category: 'Saldo Awal', cashIn: null, cashOut: null, netCashFlow: null, balance: 8750000000 },
    { id: 2, date: '02 Mei 2024', description: 'Penerimaan dari Penjualan', category: 'Operasional', cashIn: 3250000000, cashOut: 0, netCashFlow: 3250000000, balance: 12000000000 },
    { id: 3, date: '03 Mei 2024', description: 'Pembayaran Gaji Karyawan', category: 'Operasional', cashIn: 0, cashOut: 850000000, netCashFlow: -850000000, balance: 11150000000 },
    { id: 4, date: '06 Mei 2024', description: 'Pembayaran ke Vendor', category: 'Operasional', cashIn: 0, cashOut: 1250000000, netCashFlow: -1250000000, balance: 9900000000 },
    { id: 5, date: '08 Mei 2024', description: 'Penjualan Aset Tetap', category: 'Investasi', cashIn: 1800000000, cashOut: 0, netCashFlow: 1800000000, balance: 11700000000 },
    { id: 6, date: '10 Mei 2024', description: 'Pembelian Peralatan', category: 'Investasi', cashIn: 0, cashOut: 2600000000, netCashFlow: -2600000000, balance: 9100000000 },
    { id: 7, date: '15 Mei 2024', description: 'Penerimaan Pinjaman Bank', category: 'Pendanaan', cashIn: 5000000000, cashOut: 0, netCashFlow: 5000000000, balance: 14100000000 },
    { id: 8, date: '20 Mei 2024', description: 'Pembayaran Cicilan Pinjaman', category: 'Pendanaan', cashIn: 0, cashOut: 500000000, netCashFlow: -500000000, balance: 13600000000 },
    ...generateMoreCashFlowRows(),
  ]

  const projection = {
    labels: ['01 Jun', '08 Jun', '15 Jun', '22 Jun', '29 Jun'],
    cashIn: [4500000, 6200000, 5800000, 7100000, 8200000].map((v) => v * 1000),
    cashOut: [3200000, 4100000, 3900000, 4800000, 5200000].map((v) => v * 1000),
    balance: [8000000, 10500000, 12200000, 14500000, 17500000].map((v) => v * 1000),
  }

  const tip = {
    text: 'Arus kas operasional positif dan menjadi sumber utama likuiditas perusahaan. Pertahankan efisiensi pengeluaran untuk menjaga arus kas tetap sehat.',
    linkText: 'Lihat Analisis Lengkap',
  }

  return {
    summaryCards,
    period,
    compareOptions,
    trend,
    summaryBreakdown,
    summaryTotalLabel,
    summaryTotal,
    activities,
    tabs,
    rows,
    projection,
    tip,
  }
}