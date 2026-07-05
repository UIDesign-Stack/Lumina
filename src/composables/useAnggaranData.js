export function useAnggaranData() {
  const summaryCards = [
    { key: 'total', label: 'Total Anggaran', value: 'Rp 12.500.000.000', note: 'Tahun 2024', icon: 'wallet', color: 'purple' },
    { key: 'realization', label: 'Total Realisasi', value: 'Rp 7.250.000.000', note: '57.8% dari total anggaran', noteColor: 'purple', icon: 'trend', color: 'blue' },
    { key: 'remaining', label: 'Sisa Anggaran', value: 'Rp 5.250.000.000', note: '42.2% dari total anggaran', noteColor: 'pink', icon: 'pie', color: 'pink' },
    { key: 'percent', label: 'Persentase Realisasi', value: '57.8%', note: '+12.4% vs periode lalu', noteColor: 'emerald', icon: 'trend', color: 'emerald' },
  ]

  const tabs = ['Ringkasan', 'Anggaran per Kategori', 'Anggaran per Departemen', 'Anggaran per Proyek']

  const realizationChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    budget: [1000000000, 1200000000, 1500000000, 1800000000, 2000000000, 2600000000, 3000000000, 3000000000, 2900000000, 3100000000, 3100000000, 3100000000],
    realization: [300000000, 500000000, 700000000, 950000000, 1300000000, 1600000000, 2500000000, 2100000000, 1800000000, 1200000000, null, null],
  }

  const categoryBreakdown = [
    { label: 'Operasional', value: 3125000000, percent: 43.1, color: '#a855f7' },
    { label: 'Pemasaran', value: 1562000000, percent: 21.5, color: '#ec4899' },
    { label: 'SDM & GA', value: 1250000000, percent: 17.2, color: '#3b82f6' },
    { label: 'IT & Sistem', value: 875000000, percent: 12.1, color: '#8b5cf6' },
    { label: 'Lainnya', value: 438000000, percent: 6.1, color: '#6b7280' },
  ]
  const categoryTotal = 'Rp 7.250.000.000'

  const budgetRows = [
    { id: 1, name: 'Anggaran Operasional 2024', period: '01 Jan - 31 Des 2024', total: 4500000000, realization: 2790000000, remaining: 1710000000, percent: 62, status: 'Aktif' },
    { id: 2, name: 'Anggaran Pemasaran 2024', period: '01 Jan - 31 Des 2024', total: 2000000000, realization: 1100000000, remaining: 900000000, percent: 55, status: 'Aktif' },
    { id: 3, name: 'Anggaran SDM & GA 2024', period: '01 Jan - 31 Des 2024', total: 2500000000, realization: 1250000000, remaining: 1250000000, percent: 50, status: 'Aktif' },
    { id: 4, name: 'Anggaran IT & Sistem 2024', period: '01 Jan - 31 Des 2024', total: 1500000000, realization: 720000000, remaining: 780000000, percent: 48, status: 'Aktif' },
    { id: 5, name: 'Anggaran Keuangan 2024', period: '01 Jan - 31 Des 2024', total: 1000000000, realization: 600000000, remaining: 400000000, percent: 60, status: 'Aktif' },
    { id: 6, name: 'Anggaran Proyek Khusus', period: '01 Jan - 31 Des 2024', total: 1000000000, realization: 400000000, remaining: 600000000, percent: 40, status: 'Draft' },
  ]

  const departmentBreakdown = [
    { key: 'ops', name: 'Operasional', amount: 'Rp 4.500.000.000', percent: 62, icon: 'building', color: 'purple' },
    { key: 'marketing', name: 'Pemasaran', amount: 'Rp 2.000.000.000', percent: 55, icon: 'megaphone', color: 'pink' },
    { key: 'hr', name: 'SDM & GA', amount: 'Rp 2.500.000.000', percent: 50, icon: 'users', color: 'blue' },
    { key: 'it', name: 'IT & Sistem', amount: 'Rp 1.500.000.000', percent: 48, icon: 'server', color: 'indigo' },
    { key: 'finance', name: 'Keuangan', amount: 'Rp 1.000.000.000', percent: 60, icon: 'bank', color: 'teal' },
    { key: 'other', name: 'Lainnya', amount: 'Rp 1.000.000.000', percent: 40, icon: 'building', color: 'gray' },
  ]

  const budgetAlerts = [
    { key: 'marketing', name: 'Pemasaran', subtitle: '85% dari anggaran', percent: 85, severity: 'danger' },
    { key: 'ops', name: 'Operasional', subtitle: '80% dari anggaran', percent: 80, severity: 'warning' },
    { key: 'it', name: 'IT & Sistem', subtitle: '75% dari anggaran', percent: 75, severity: 'caution' },
  ]

  const insight = {
    title: 'Realisasi anggaran Anda meningkat 12.4%',
    description: 'Dibandingkan periode lalu.',
  }

  return {
    summaryCards,
    tabs,
    realizationChart,
    categoryBreakdown,
    categoryTotal,
    budgetRows,
    departmentBreakdown,
    budgetAlerts,
    insight,
  }
}