function generateMoreAccounts() {
  const names = ['Piutang Karyawan', 'Sewa Dibayar Dimuka', 'Kendaraan', 'Modal Saham', 'Laba Ditahan', 'Utang Bank', 'Utang Pajak', 'Perlengkapan Kantor', 'Akumulasi Depresiasi', 'Investasi Jangka Panjang']
  const types = ['Aset', 'Aset', 'Aset', 'Ekuitas', 'Ekuitas', 'Liabilitas', 'Liabilitas', 'Aset', 'Aset', 'Aset']
  const categories = ['Piutang', 'Aset Lancar', 'Aset Tetap', 'Modal', 'Modal', 'Hutang Jangka Panjang', 'Hutang Jangka Pendek', 'Aset Lancar', 'Aset Tetap', 'Investasi']

  return names.map((name, i) => ({
    id: 100 + i,
    name,
    code: `${3000 + i * 10}`,
    type: types[i],
    category: categories[i],
    balance: (i + 1) * 75000000 * (types[i] === 'Liabilitas' ? -1 : 1),
    status: 'Aktif',
    icon: 'wallet',
  }))
}

export function useAkunData() {
  const summaryCards = [
    { key: 'total', label: 'Total Akun', value: '56', note: 'Semua akun terdaftar', icon: 'wallet', color: 'purple' },
    { key: 'active', label: 'Akun Aktif', value: '54', note: '96.4% dari total akun', icon: 'check', color: 'purple' },
    { key: 'balance', label: 'Total Saldo (Semua Rekening)', value: 'Rp 12.750.500.000', note: 'Saldo gabungan semua rekening', icon: 'dollar', color: 'purple' },
    { key: 'top', label: 'Akun Terbanyak', value: 'Kas & Bank', note: '18 akun', icon: 'clock', color: 'purple' },
  ]

  const tabs = ['Akun', 'Rekening']

  const accounts = [
    { id: 1, name: 'Kas', code: '1000', type: 'Aset', category: 'Kas & Setara Kas', balance: 325000000, status: 'Aktif', icon: 'wallet' },
    { id: 2, name: 'Bank BCA - 1234', code: '1100', type: 'Aset', category: 'Kas & Setara Kas', balance: 2450000000, status: 'Aktif', icon: 'bank' },
    { id: 3, name: 'Bank Mandiri - 5678', code: '1101', type: 'Aset', category: 'Kas & Setara Kas', balance: 1850000000, status: 'Aktif', icon: 'bank' },
    { id: 4, name: 'Piutang Usaha', code: '1200', type: 'Aset', category: 'Piutang', balance: 1200000000, status: 'Aktif', icon: 'receipt' },
    { id: 5, name: 'Persediaan Barang', code: '1300', type: 'Aset', category: 'Persediaan', balance: 2300000000, status: 'Aktif', icon: 'box' },
    { id: 6, name: 'Tanah', code: '1400', type: 'Aset', category: 'Aset Tetap', balance: 5000000000, status: 'Aktif', icon: 'land' },
    { id: 7, name: 'Peralatan Kantor', code: '1410', type: 'Aset', category: 'Aset Tetap', balance: 850000000, status: 'Aktif', icon: 'device' },
    { id: 8, name: 'Hutang Usaha', code: '2000', type: 'Liabilitas', category: 'Hutang Jangka Pendek', balance: -1150000000, status: 'Aktif', icon: 'card' },
    ...generateMoreAccounts(),
  ]

  const rekeningList = accounts.filter((a) => a.icon === 'bank' || a.icon === 'wallet').map((a) => ({
    ...a,
    number: a.icon === 'bank' ? `**** ${a.code}` : '-',
  }))

  const accountSplit = [
    { label: 'Aset', count: 36, percent: 64.3, color: '#a855f7' },
    { label: 'Liabilitas', count: 12, percent: 21.4, color: '#818cf8' },
    { label: 'Ekuitas', count: 8, percent: 14.3, color: '#6366f1' },
  ]
  const totalAccounts = 56

  const balanceByType = [
    { key: 'asset', label: 'Aset', amount: 'Rp 10.625.000.000', percent: 83.3, icon: 'wallet', color: 'purple' },
    { key: 'liability', label: 'Liabilitas', amount: 'Rp 1.750.000.000', percent: 13.7, icon: 'card', color: 'rose' },
    { key: 'equity', label: 'Ekuitas', amount: 'Rp 375.500.000', percent: 3.0, icon: 'box', color: 'amber' },
  ]

  const tip = {
    text: 'Kelola akun dan rekening dengan terstruktur untuk laporan keuangan yang akurat dan analisis yang lebih baik.',
    linkText: 'Pelajari lebih lanjut',
  }

  return {
    summaryCards,
    tabs,
    accounts,
    rekeningList,
    accountSplit,
    totalAccounts,
    balanceByType,
    tip,
  }
}