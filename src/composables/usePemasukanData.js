function generateIncomeRows(count) {
  const categories = [
    { label: 'Pendapatan Jasa', color: 'emerald' },
    { label: 'Penjualan', color: 'blue' },
    { label: 'Pendapatan Lainnya', color: 'purple' },
  ]
  const sources = ['Klien A', 'Klien B', 'Klien C', 'Klien D', 'Klien E', 'Penyewa']
  const accounts = ['Bank BCA', 'Bank Mandiri', 'Bank BNI']
  const descriptions = [
    'Pembayaran Klien A', 'Penjualan Produk X', 'Pembayaran Proyek Y', 'Penjualan Produk Y',
    'Pendapatan Bunga', 'Sewa Gedung Dibayar', 'Pembayaran Klien E', 'Konsultasi Bulanan',
    'Penjualan Produk Z', 'Pembayaran Retainer',
  ]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']

  const rows = []
  for (let i = 0; i < count; i++) {
    const cat = categories[i % categories.length]
    rows.push({
      id: i + 1,
      date: `${(i % 27) + 1} ${months[i % months.length]} 2024`,
      description: descriptions[i % descriptions.length],
      category: cat.label,
      categoryColor: cat.color,
      source: sources[i % sources.length],
      account: accounts[i % accounts.length],
      amount: (Math.floor(Math.random() * 30) + 3) * 5000000,
      status: 'Selesai',
    })
  }
  return rows
}

export function usePemasukanData() {
  const summaryCards = [
    {
      key: 'total',
      label: 'Total Pemasukan',
      value: 'Rp 1.250.000.000',
      change: '12.5%',
      changeLabel: 'dari periode lalu',
      trend: 'up',
      icon: 'wallet',
      hasInfo: true,
    },
    {
      key: 'average',
      label: 'Rata-rata per Bulan',
      value: 'Rp 208.333.333',
      change: '8.7%',
      changeLabel: 'dari periode lalu',
      trend: 'up',
      icon: 'calendar',
      hasInfo: false,
    },
    {
      key: 'success',
      label: 'Transaksi Sukses',
      value: '48 Transaksi',
      change: null,
      changeLabel: '100% dari total transaksi',
      trend: null,
      icon: 'check',
      hasInfo: false,
    },
  ]

  const trend = {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'Mei 2024', 'Jun 2024'],
    data: [520000000, 780000000, 700000000, 1010000000, 1280000000, 1030000000],
    average: 208333333 * 4, // rata-rata garis referensi di chart (skala sama dengan data bulanan kumulatif contoh)
  }

  const categoryBreakdown = [
    { label: 'Pendapatan Jasa', value: 562500000, percent: 45, color: '#10b981' },
    { label: 'Penjualan', value: 375000000, percent: 30, color: '#3b82f6' },
    { label: 'Pendapatan Lainnya', value: 187500000, percent: 15, color: '#a855f7' },
    { label: 'Pendapatan Bunga', value: 125000000, percent: 10, color: '#f59e0b' },
  ]
  const categoryTotal = 'Rp 1.250.000.000'

  const topSources = [
    { name: 'Klien A', amount: 'Rp 320.000.000', percent: '25.6%' },
    { name: 'Klien B', amount: 'Rp 280.000.000', percent: '22.4%' },
    { name: 'Klien C', amount: 'Rp 205.000.000', percent: '16.4%' },
    { name: 'Klien D', amount: 'Rp 150.000.000', percent: '12.0%' },
    { name: 'Lainnya', amount: 'Rp 295.000.000', percent: '23.6%' },
  ]

  const insight = {
    title: 'Pemasukan Anda meningkat 12.5%',
    description: 'Dibandingkan periode sebelumnya, kinerja pemasukan perusahaan sedang baik.',
  }

  const tableRows = generateIncomeRows(48)

  return {
    summaryCards,
    trend,
    categoryBreakdown,
    categoryTotal,
    topSources,
    insight,
    tableRows,
  }
}