function calcChange(current, previous) {
  const change = current - previous
  const changePercent = previous !== 0 ? ((change / previous) * 100).toFixed(2) : '0.00'
  return { change, changePercent }
}
function row(label, current, previous) {
  return { label, current, previous, ...calcChange(current, previous) }
}

export function useNeracaData() {
  const summaryCards = [
    { key: 'assets', label: 'Total Aset', value: 'Rp 56.750.000.000', note: '+8.6% dari periode lalu', icon: 'wallet', color: 'purple' },
    { key: 'liabilities', label: 'Total Liabilitas', value: 'Rp 18.250.000.000', note: '+5.2% dari periode lalu', icon: 'shield', color: 'purple' },
    { key: 'equity', label: 'Total Ekuitas', value: 'Rp 38.500.000.000', note: '+10.3% dari periode lalu', icon: 'chart', color: 'purple' },
    { key: 'ratio', label: 'Rasio Liabilitas terhadap Aset', value: '32.1%', note: '↓ -1.6% dari periode lalu', icon: 'scale', color: 'purple' },
    { key: 'netAssets', label: 'Total Aset Bersih', value: 'Rp 38.500.000.000', note: '+10.3% dari periode lalu', icon: 'pie', color: 'purple' },
  ]

  const period = '31 Mei 2024'
  const compareOptions = ['April 2024', 'Maret 2024', 'Mei 2023']

  // Panel Aset
  const assetGroups = [
    {
      key: 'current',
      label: 'Aset Lancar',
      total: row('Aset Lancar', 24350000000, 22100000000),
      items: [
        row('Kas dan Setara Kas', 8750000000, 7850000000),
        row('Piutang Usaha', 6200000000, 5450000000),
        row('Persediaan', 5800000000, 5200000000),
        row('Biaya Dibayar Dimuka', 1600000000, 1600000000),
      ],
    },
    {
      key: 'noncurrent',
      label: 'Aset Tidak Lancar',
      total: row('Aset Tidak Lancar', 32400000000, 30650000000),
      items: [
        row('Aset Tetap', 25000000000, 24000000000),
        row('Akumulasi Penyusutan', -6500000000, -5900000000),
        row('Aset Tidak Berwujud', 2400000000, 2100000000),
        row('Aset Lainnya', 1500000000, 1400000000),
      ],
    },
  ]
  const assetTotal = row('Total Aset', 56750000000, 52750000000)

  // Panel Liabilitas & Ekuitas
  const liabilityEquityGroups = [
    {
      key: 'short-term',
      label: 'Liabilitas Jangka Pendek',
      total: row('Liabilitas Jangka Pendek', 9250000000, 8150000000),
      items: [
        row('Utang Usaha', 4250000000, 3800000000),
        row('Utang Bank Jangka Pendek', 3000000000, 2500000000),
        row('Beban yang Masih Harus Dibayar', 1100000000, 950000000),
        row('Utang Pajak', 900000000, 900000000),
      ],
    },
    {
      key: 'long-term',
      label: 'Liabilitas Jangka Panjang',
      total: row('Liabilitas Jangka Panjang', 9000000000, 8300000000),
      items: [
        row('Utang Bank Jangka Panjang', 7500000000, 6900000000),
        row('Liabilitas Imbalan Kerja', 1500000000, 1400000000),
      ],
    },
    {
      key: 'equity',
      label: 'Ekuitas',
      total: row('Ekuitas', 38500000000, 36300000000),
      items: [
        row('Modal Disetor', 20000000000, 20000000000),
        row('Laba Ditahan', 18500000000, 16300000000),
      ],
    },
  ]
  const liabilityEquityTotal = row('Total Liabilitas & Ekuitas', 56750000000, 52750000000)

  const isBalanced = true

  const assetStructure = [
    { label: 'Aset Lancar', value: 24350000000, percent: 42.9, color: '#a855f7' },
    { label: 'Aset Tetap', value: 25000000000, percent: 44.0, color: '#ec4899' },
    { label: 'Aset Tidak Berwujud', value: 3400000000, percent: 6.1, color: '#f472b6' },
    { label: 'Aset Lainnya', value: 4000000000, percent: 7.0, color: '#3b82f6' },
  ]
  const assetStructureTotal = 'Rp 56,75 M'

  const liabilityEquityStructure = [
    { label: 'Liabilitas Jangka Pendek', value: 9250000000, percent: 16.3, color: '#a855f7' },
    { label: 'Liabilitas Jangka Panjang', value: 9000000000, percent: 15.9, color: '#ec4899' },
    { label: 'Ekuitas', value: 38500000000, percent: 67.8, color: '#3b82f6' },
  ]
  const liabilityEquityStructureTotal = 'Rp 56,75 M'

  const recentReports = [
    { id: 1, name: 'Laporan Neraca - Mei 2024', period: '31 Mei 2024', date: '31 Mei 2024', format: 'PDF', color: 'purple' },
    { id: 2, name: 'Laporan Neraca - April 2024', period: '30 April 2024', date: '30 April 2024', format: 'PDF', color: 'blue' },
    { id: 3, name: 'Laporan Neraca - Maret 2024', period: '31 Maret 2024', date: '31 Maret 2024', format: 'PDF', color: 'amber' },
  ]

  return {
    summaryCards,
    period,
    compareOptions,
    assetGroups,
    assetTotal,
    liabilityEquityGroups,
    liabilityEquityTotal,
    isBalanced,
    assetStructure,
    assetStructureTotal,
    liabilityEquityStructure,
    liabilityEquityStructureTotal,
    recentReports,
  }
}