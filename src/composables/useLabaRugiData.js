function calcChange(current, previous) {
  const change = current - previous
  const changePercent = previous !== 0 ? ((change / previous) * 100).toFixed(2) : '0.00'
  return { change, changePercent }
}

function row(label, current, previous) {
  return { label, current, previous, ...calcChange(current, previous) }
}

export function useLabaRugiData() {
  const summaryCards = [
    { key: 'revenue', label: 'Total Pendapatan', value: 'Rp 12.450.000.000', note: '+12.7% dari periode lalu', icon: 'dollar', color: 'purple' },
    { key: 'expense', label: 'Total Beban', value: 'Rp 10.100.000.000', note: '+8.3% dari periode lalu', icon: 'arrowDown', color: 'purple' },
    { key: 'gross', label: 'Laba Kotor', value: 'Rp 2.350.000.000', note: '+23.4% dari periode lalu', icon: 'wallet', color: 'purple' },
    { key: 'operating', label: 'Laba Operasional', value: 'Rp 1.550.000.000', note: '+18.9% dari periode lalu', icon: 'clock', color: 'purple' },
    { key: 'net', label: 'Laba Bersih', value: 'Rp 1.250.000.000', note: '+21.6% dari periode lalu', icon: 'trend', color: 'purple' },
  ]

  const period = '01 Mei 2024 - 31 Mei 2024'
  const compareOptions = ['April 2024', 'Maret 2024', 'Mei 2023']

  const trend = {
    labels: ['01 Mei', '06 Mei', '11 Mei', '16 Mei', '21 Mei', '26 Mei', '31 Mei'],
    revenue: [8200000, 9000000, 9500000, 10800000, 10200000, 11500000, 12450000].map((v) => v * 1000),
    expense: [5800000, 6500000, 6900000, 7800000, 7400000, 8600000, 9200000].map((v) => v * 1000),
    profit: [1500000, 1900000, 2100000, 2600000, 2300000, 2700000, 3000000].map((v) => v * 1000),
  }

  const summaryBreakdown = [
    { label: 'Pendapatan Usaha', value: 1850000000, percent: 95.2, color: '#a855f7' },
    { label: 'Pendapatan Lain-lain', value: 600000000, percent: 4.8, color: '#3b82f6' },
    { label: 'Beban Pokok Pendapatan', value: 6200000000, percent: 61.4, color: '#f43f5e' },
    { label: 'Beban Operasional', value: 2800000000, percent: 27.7, color: '#6366f1' },
    { label: 'Beban Lain-lain', value: 1100000000, percent: 10.9, color: '#f472b6' },
  ]
  const summaryTotal = 'Rp 1,25 M'

  const expenseStructure = [
    { key: 'cogs', name: 'Beban Pokok Pendapatan', amount: 'Rp 6.200.000.000', percent: 61.4, icon: 'server', color: 'purple' },
    { key: 'operating', name: 'Beban Operasional', amount: 'Rp 2.800.000.000', percent: 27.7, icon: 'building', color: 'pink' },
    { key: 'other', name: 'Beban Lain-lain', amount: 'Rp 1.100.000.000', percent: 10.9, icon: 'dots', color: 'blue' },
  ]


  const revenueSection = {
    key: 'revenue',
    label: 'Pendapatan',
    total: row('Pendapatan', 12450000000, 11040000000),
    items: [
      row('Pendapatan Usaha', 1850000000, 10530000000),
      row('Pendapatan Lain-lain', 600000000, 450000000),
    ],
  }

  const expenseSection = {
    key: 'expense',
    label: 'Beban',
    total: row('Beban', 10100000000, 9330000000),
    items: [
      row('Beban Pokok Pendapatan', 6200000000, 5740000000),
      row('Beban Operasional', 2800000000, 2530000000),
      row('Beban Lain-lain', 1100000000, 1060000000),
    ],
  }

  const sections = [revenueSection, expenseSection]

  const subtotals = [
    { ...row('Laba Kotor', 2350000000, 1710000000), hasDetail: true },
    { ...row('Laba Operasional', 1550000000, 1300000000), hasDetail: true },
  ]

  const netProfit = row('Laba Bersih', 1250000000, 1028000000)

  const tip = {
    text: 'Laba bersih perusahaan meningkat 21.6% dibandingkan periode sebelumnya. Peningkatan terutama didorong oleh efisiensi beban operasional dan pertumbuhan pendapatan usaha.',
    linkText: 'Lihat Analisis Lengkap',
  }

  return {
    summaryCards,
    period,
    compareOptions,
    trend,
    summaryBreakdown,
    summaryTotal,
    expenseStructure,
    sections,
    subtotals,
    netProfit,
    tip,
  }
}