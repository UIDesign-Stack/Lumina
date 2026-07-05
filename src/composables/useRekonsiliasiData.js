function generateUnmatchedRows(count) {
  const templates = [
    { desc: 'Pembayaran ATK', category: 'Operasional', amount: -125000000, bankDesc: 'Pembelian Alat Tulis', bankAmount: -125000000 },
    { desc: 'Transfer ke PT Maju Bersama', category: 'Transfer', amount: -150000000, bankDesc: null, bankAmount: null },
    { desc: 'Pendapatan Jasa', category: 'Pendapatan', amount: 75000000, bankDesc: 'TRF FR PT Sejahtera Abadi', bankAmount: 75000000 },
    { desc: 'Biaya Listrik & Air', category: 'Operasional', amount: -3200000, bankDesc: 'PLN/1234567890', bankAmount: -3250000 },
    { desc: 'Pembelian Bahan Baku', category: 'Operasional', amount: -45000000, bankDesc: null, bankAmount: null },
    { desc: 'Penjualan Produk A', category: 'Pendapatan', amount: 110000000, bankDesc: 'CR TRF XYZ Corp', bankAmount: 110000000 },
  ]
  const categoryColor = { Operasional: 'blue', Transfer: 'purple', Pendapatan: 'emerald' }
  const months = 'Mei 2024'

  const rows = []
  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length]
    const selisih = t.bankAmount === null ? t.amount : t.bankAmount - t.amount
    rows.push({
      id: i + 1,
      companyDate: `${28 - (i % 28)} ${months}`,
      companyDesc: t.desc,
      category: t.category,
      categoryColor: categoryColor[t.category],
      companyAmount: t.amount,
      bankDate: t.bankDesc ? `${26 - (i % 26)} ${months}` : null,
      bankDesc: t.bankDesc,
      bankAmount: t.bankAmount,
      selisih,
      type: t.bankAmount === null ? 'company' : selisih !== 0 ? 'selisih' : 'matched-candidate',
    })
  }
  return rows
}

function generateTrendData() {

  const raw = [
    2000000, 5500000, 5500000, 5500000, 2500000, 4000000, 6000000, 4000000, 3000000, 7250000,
    5000000, 3000000, 1000000, -1000000, -6000000, 500000, -3100000, 1500000, 3500000, 5500000,
    3500000, 1000000, -2000000, 500000, 2000000, 4000000, 8000000, 6000000, 3000000, 500000, 4500000,
  ]
  const labels = raw.map((_, i) => `${i + 1} Mei`)
  return { labels, data: raw }
}

export function useRekonsiliasiData() {
  const summaryCards = {
    companyBalance: { label: 'Saldo Perusahaan', value: 'Rp 1.250.000.000', asOf: 'Per 31 Mei 2024', icon: 'chart', color: 'teal' },
    bankBalance: { label: 'Saldo Bank', value: 'Rp 1.245.500.000', asOf: 'Per 31 Mei 2024', icon: 'bank', color: 'blue' },
    difference: { label: 'Selisih', value: 'Rp 4.500.000', note: '0,36% dari saldo perusahaan', icon: 'warning', color: 'amber' },
  }

  const matchStatus = { percent: 88, matched: 176, discrepancy: 18, unmatched: 6, total: 200 }

  const tabs = ['Transaksi Belum Dicocokkan', 'Transaksi Dicocokkan', 'Ringkasan Rekonsiliasi']

  const unmatchedRows = generateUnmatchedRows(24)

  const filterCounts = {
    Semua: unmatchedRows.length,
    Perusahaan: unmatchedRows.filter((r) => r.type === 'company').length,
    Bank: unmatchedRows.filter((r) => r.bankDesc && r.type !== 'selisih').length,
    Selisih: unmatchedRows.filter((r) => r.type === 'selisih').length,
  }

  const trend = generateTrendData()
  const trendStats = {
    total: 'Rp 4.500.000',
    biggest: { value: 'Rp 7.250.000', date: '10 Mei 2024' },
    smallest: { value: '-Rp 3.100.000', date: '17 Mei 2024' },
  }

  const progress = {
    period: '01 Mei 2024 - 31 Mei 2024',
    percent: 88,
    matched: 176,
    discrepancy: 18,
    unmatched: 6,
    total: 200,
  }

  const tasks = [
    { id: 1, title: 'Review transaksi selisih', subtitle: '18 transaksi', icon: 'warning', color: 'amber', done: false },
    { id: 2, title: 'Cocokkan transaksi bank', subtitle: '6 transaksi', icon: 'link', color: 'blue', done: false },
    { id: 3, title: 'Import mutasi bank', subtitle: 'Bank BCA · 3 hari lalu', icon: 'upload', color: 'emerald', done: true },
  ]

  const activities = [
    { id: 1, text: 'Mutasi bank BCA berhasil diimpor', time: '31 Mei 2024, 09:30', icon: 'upload' },
    { id: 2, text: 'Rekonsiliasi Mei 2024 dibuat', time: '31 Mei 2024, 09:15', icon: 'document' },
    { id: 3, text: '42 transaksi berhasil dicocokkan', time: '30 Mei 2024, 16:45', icon: 'check' },
    { id: 4, text: 'Transaksi selisih diperbarui', time: '30 Mei 2024, 14:20', icon: 'refresh' },
  ]

  const tip = {
    text: 'Lakukan rekonsiliasi secara rutin untuk memastikan data keuangan selalu akurat.',
    linkText: 'Pelajari lebih lanjut',
  }

  return {
    summaryCards,
    matchStatus,
    tabs,
    unmatchedRows,
    filterCounts,
    trend,
    trendStats,
    progress,
    tasks,
    activities,
    tip,
  }
}