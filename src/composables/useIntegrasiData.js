export function useIntegrasiData() {
  const tabs = ['Semua Integrasi', 'Terhubung', 'Tersedia']

  const statCards = [
    { key: 'total', label: 'Total Integrasi', value: '6', note: 'Semua integrasi yang tersedia', icon: 'grid', color: 'purple' },
    { key: 'connected', label: 'Terhubung', value: '4', note: 'Integrasi aktif dan berjalan', icon: 'check', color: 'emerald' },
    { key: 'action', label: 'Perlu Tindakan', value: '1', note: 'Integrasi perlu konfigurasi', icon: 'clock', color: 'amber' },
    { key: 'disconnected', label: 'Tidak Terhubung', value: '1', note: 'Integrasi belum diaktifkan', icon: 'ban', color: 'gray' },
  ]

  const connected = [
    {
      key: 'quickbooks', name: 'QuickBooks Online', category: 'Akuntansi', logo: 'qb', color: 'emerald',
      description: 'Sinkronisasi data transaksi, akun, dan kontak.',
      since: '15 Jan 2024', lastSync: '31 Mei 2024 14:30',
    },
    {
      key: 'excel', name: 'Microsoft Excel', category: 'Spreadsheet', logo: 'xl', color: 'emerald',
      description: 'Ekspor dan impor data ke dalam format Excel.',
      since: '10 Jan 2024', lastSync: '31 Mei 2024 10:15',
    },
    {
      key: 'gdrive', name: 'Google Drive', category: 'Penyimpanan', logo: 'gd', color: 'blue',
      description: 'Simpan dan kelola file laporan keuangan di Google Drive.',
      since: '05 Jan 2024', lastSync: '31 Mei 2024 09:45',
    },
    {
      key: 'mailchimp', name: 'Mailchimp', category: 'Email Marketing', logo: 'mc', color: 'amber',
      description: 'Kirim laporan dan ringkasan keuangan melalui email otomatis.',
      since: '20 Feb 2024', lastSync: '30 Mei 2024 16:20',
    },
  ]

  const actionNeeded = [
    {
      key: 'bca', name: 'BCA Virtual Account', category: 'Perbankan', logo: 'bca', color: 'blue',
      description: 'Tarik mutasi rekening dan cocokkan transaksi secara otomatis.',
      warning: 'Perlu otentikasi ulang', expiresAt: 'Kadaluarsa pada 02 Jun 2024',
    },
  ]

  const notConnected = [
    {
      key: 'xero', name: 'Xero', category: 'Akuntansi', logo: 'xero', color: 'sky',
      description: 'Integrasikan data keuangan dengan Xero Accounting.',
    },
  ]

  const categories = [
    { key: 'all', label: 'Semua Integrasi', count: 6 },
    { key: 'accounting', label: 'Akuntansi', count: 2 },
    { key: 'banking', label: 'Perbankan', count: 1 },
    { key: 'storage', label: 'Penyimpanan', count: 1 },
    { key: 'spreadsheet', label: 'Spreadsheet', count: 1 },
    { key: 'email', label: 'Email Marketing', count: 1 },
  ]

  const recentActivity = [
    { key: 'quickbooks', title: 'QuickBooks Online', description: 'Sinkronisasi berhasil', date: '31 Mei 2024 14:30', logo: 'qb', color: 'emerald', status: 'success' },
    { key: 'gdrive', title: 'Google Drive', description: 'File berhasil diunggah', date: '31 Mei 2024 09:45', logo: 'gd', color: 'blue', status: 'success' },
    { key: 'mailchimp', title: 'Mailchimp', description: 'Email laporan terkirim', date: '30 Mei 2024 16:20', logo: 'mc', color: 'amber', status: 'success' },
    { key: 'bca', title: 'BCA Virtual Account', description: 'Otentikasi kadaluarsa', date: '30 Mei 2024 08:15', logo: 'bca', color: 'blue', status: 'warning' },
  ]

  const infoBanner = {
    text: 'Integrasi membantu Anda mengelola data dengan lebih efisien dan otomatis.',
    linkText: 'Pelajari lebih lanjut',
  }

  return {
    tabs,
    statCards,
    connected,
    actionNeeded,
    notConnected,
    categories,
    recentActivity,
    infoBanner,
  }
}