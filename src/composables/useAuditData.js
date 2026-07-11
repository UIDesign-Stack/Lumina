function avatar(name, bg) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&bold=true`
}

export function useAuditData() {
  const statCards = [
    { key: 'total', label: 'Total Aktivitas', value: '1.248', note: 'Semua aktivitas dalam periode', icon: 'activity', color: 'purple' },
    { key: 'success', label: 'Aktivitas Berhasil', value: '842', note: '67.6% dari total aktivitas', icon: 'check', color: 'emerald' },
    { key: 'failed', label: 'Aktivitas Gagal', value: '32', note: '2.6% dari total aktivitas', icon: 'warning', color: 'amber' },
    { key: 'active-users', label: 'Pengguna Aktif', value: '18', note: 'Dalam periode terpilih', icon: 'users', color: 'indigo' },
  ]

  const moduleColorMap = {
    'Laporan Keuangan': 'purple',
    'Akun & Rekening': 'blue',
    'Pengeluaran': 'red',
    'Kategori': 'pink',
    'Buku Besar': 'sky',
    'Pengaturan': 'gray',
    'Pemasukan': 'emerald',
    'Proyek': 'amber',
    'Transfer': 'teal',
    'Integrasi': 'indigo',
  }

  const rawLogs = [
    { name: 'Fajar Ardiansyah', email: 'fajar.ardiansyah@lumina.id', module: 'Laporan Keuangan', action: 'Export Laporan', description: 'Mengekspor Laporan Neraca - Mei 2024', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 14:30:15' },
    { name: 'Anita Wulandari', email: 'anita.wulandari@lumina.id', module: 'Akun & Rekening', action: 'Update Akun', description: 'Memperbarui akun Kas dan Setara Kas', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 14:15:22' },
    { name: 'Rudi Hartono', email: 'rudi.hartono@lumina.id', module: 'Pengeluaran', action: 'Buat Pengeluaran', description: 'Menambahkan pengeluaran PT Maju Jaya - Proyek A', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 13:45:09' },
    { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@lumina.id', module: 'Kategori', action: 'Delete Kategori', description: 'Menghapus kategori Perjalanan Dinas', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 13:20:33' },
    { name: 'Budi Santoso', email: 'budi.santoso@lumina.id', module: 'Buku Besar', action: 'View Data', description: 'Melihat data buku besar akun Peralatan', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 12:58:11' },
    { name: 'Dwi Prasetyo', email: 'dwi.prasetyo@lumina.id', module: 'Pengaturan', action: 'Update Pengaturan', description: 'Mengubah pengaturan format angka', ip: '103.15.230.45', status: 'gagal', note: 'Akses ditolak', date: '31 Mei 2024 12:40:07' },
    { name: 'Mega Putri', email: 'mega.putri@lumina.id', module: 'Pemasukan', action: 'Buat Pemasukan', description: 'Menambahkan pemasukan dari PT Sentosa', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 11:55:50' },
    { name: 'Agus Setiawan', email: 'agus.setiawan@lumina.id', module: 'Proyek', action: 'Update Proyek', description: 'Memperbarui anggaran proyek Proyek B', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 11:20:18' },
    { name: 'Anita Wulandari', email: 'anita.wulandari@lumina.id', module: 'Transfer', action: 'Approve Transfer', description: 'Menyetujui transfer ke BCA - 1234', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 10:45:33' },
    { name: 'Fajar Ardiansyah', email: 'fajar.ardiansyah@lumina.id', module: 'Integrasi', action: 'Sync Data', description: 'Sinkronisasi data QuickBooks Online', ip: '103.15.230.45', status: 'berhasil', date: '31 Mei 2024 10:12:44' },
  ]

  const avatarBg = { berhasil: '7c3aed', gagal: 'ef4444' }

  const logs = rawLogs.map((l, i) => ({
    key: `log-${i + 1}`,
    ...l,
    moduleColor: moduleColorMap[l.module] || 'gray',
    avatar: avatar(l.name, '7c3aed'),
  }))

  const userOptions = ['Semua Pengguna', 'Fajar Ardiansyah', 'Anita Wulandari', 'Rudi Hartono', 'Siti Nurhaliza', 'Budi Santoso', 'Dwi Prasetyo', 'Mega Putri', 'Agus Setiawan']
  const moduleOptions = ['Semua Modul', ...Object.keys(moduleColorMap)]
  const actionOptions = ['Semua Aksi', 'Export Laporan', 'Update Akun', 'Buat Pengeluaran', 'Delete Kategori', 'View Data', 'Update Pengaturan', 'Buat Pemasukan', 'Update Proyek', 'Approve Transfer', 'Sync Data']
  const statusOptions = ['Semua Status', 'Berhasil', 'Gagal']

  const dateRange = '11 Mei 2024 - 31 Mei 2024'

  const activitySummary = {
    total: 1248,
    periodLabel: dateRange,
    segments: [
      { key: 'success', label: 'Berhasil', value: 842, percent: 67.6, color: '#34d399' },
      { key: 'failed', label: 'Gagal', value: 32, percent: 2.6, color: '#f59e0b' },
      { key: 'view', label: 'View', value: 312, percent: 25.0, color: '#a78bfa' },
      { key: 'other', label: 'Lainnya', value: 62, percent: 4.8, color: '#9ca3af' },
    ],
  }

  const aboutAuditLog = {
    title: 'Tentang Audit Log',
    text: 'Audit log mencatat semua aktivitas penting dalam sistem untuk keamanan dan kepatuhan.',
    linkText: 'Pelajari lebih lanjut',
  }

  const pagination = {
    perPage: 10,
    totalData: 1248,
    totalPages: 125,
  }

  return {
    statCards,
    logs,
    userOptions,
    moduleOptions,
    actionOptions,
    statusOptions,
    dateRange,
    activitySummary,
    aboutAuditLog,
    pagination,
  }
}