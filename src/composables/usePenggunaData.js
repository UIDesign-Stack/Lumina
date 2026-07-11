function avatar(name, bg) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&bold=true`
}

export function usePenggunaData() {
  const tabs = ['Pengguna', 'Peran']

  const statCards = [
    { key: 'total', label: 'Total Pengguna', value: '12', note: 'Semua pengguna terdaftar', icon: 'users', color: 'purple' },
    { key: 'active', label: 'Pengguna Aktif', value: '9', note: 'Akun aktif dan dapat login', icon: 'user-check', color: 'emerald' },
    { key: 'inactive', label: 'Pengguna Nonaktif', value: '2', note: 'Akun dinonaktifkan', icon: 'user-x', color: 'amber' },
    { key: 'roles', label: 'Peran', note: 'Peran akses tersedia', value: '4', icon: 'shield', color: 'indigo' },
  ]

  const roleColorMap = {
    'Finance Manager': 'purple',
    'Accountant': 'blue',
    'Finance Staff': 'teal',
    'Viewer': 'gray',
    'Auditor': 'pink',
  }

  const rawUsers = [
    { name: 'Fajar Ardiansyah', email: 'fajar.ardiansyah@lumina.id', role: 'Finance Manager', department: 'Finance', status: 'aktif', lastActive: '31 Mei 2024 14:30' },
    { name: 'Anita Wulandari', email: 'anita.wulandari@lumina.id', role: 'Accountant', department: 'Finance', status: 'aktif', lastActive: '31 Mei 2024 10:15' },
    { name: 'Rudi Hartono', email: 'rudi.hartono@lumina.id', role: 'Finance Staff', department: 'Finance', status: 'aktif', lastActive: '31 Mei 2024 09:45' },
    { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@lumina.id', role: 'Viewer', department: 'Finance', status: 'aktif', lastActive: '30 Mei 2024 16:20' },
    { name: 'Budi Santoso', email: 'budi.santoso@lumina.id', role: 'Finance Manager', department: 'Finance', status: 'nonaktif', lastActive: '20 Mei 2024 11:05' },
    { name: 'Dwi Prasetyo', email: 'dwi.prasetyo@lumina.id', role: 'Finance Staff', department: 'Finance', status: 'aktif', lastActive: '31 Mei 2024 08:30' },
    { name: 'Mega Putri', email: 'mega.putri@lumina.id', role: 'Accountant', department: 'Finance', status: 'aktif', lastActive: '30 Mei 2024 15:50' },
    { name: 'Agus Setiawan', email: 'agus.setiawan@lumina.id', role: 'Viewer', department: 'Finance', status: 'nonaktif', lastActive: null },
    { name: 'Rina Marlina', email: 'rina.marlina@lumina.id', role: 'Finance Staff', department: 'Finance', status: 'aktif', lastActive: '29 Mei 2024 13:10' },
    { name: 'Yusuf Maulana', email: 'yusuf.maulana@lumina.id', role: 'Accountant', department: 'Finance', status: 'aktif', lastActive: '29 Mei 2024 09:05' },
    { name: 'Lestari Handayani', email: 'lestari.handayani@lumina.id', role: 'Viewer', department: 'Finance', status: 'aktif', lastActive: '28 Mei 2024 17:40' },
    { name: 'Hendra Gunawan', email: 'hendra.gunawan@lumina.id', role: 'Viewer', department: 'Finance', status: 'aktif', lastActive: '28 Mei 2024 08:55' },
  ]

  const avatarBgByRole = {
    'Finance Manager': '7c3aed',
    'Accountant': '2563eb',
    'Finance Staff': '0d9488',
    'Viewer': '6b7280',
  }

  const users = rawUsers.map((u, i) => ({
    key: `user-${i + 1}`,
    ...u,
    roleColor: roleColorMap[u.role] || 'gray',
    avatar: avatar(u.name, avatarBgByRole[u.role] || '6b7280'),
  }))

  const roleOptions = ['Semua Peran', 'Finance Manager', 'Accountant', 'Finance Staff', 'Viewer']
  const statusOptions = ['Semua Status', 'Aktif', 'Nonaktif']

  const popularRoles = [
    { key: 'finance-manager', name: 'Finance Manager', color: 'purple', count: 2, percent: 50 },
    { key: 'accountant', name: 'Accountant', color: 'blue', count: 3, percent: 75 },
    { key: 'finance-staff', name: 'Finance Staff', color: 'teal', count: 3, percent: 75 },
    { key: 'viewer', name: 'Viewer', color: 'gray', count: 4, percent: 100 },
    { key: 'auditor', name: 'Auditor', color: 'pink', count: 0, percent: 4 },
  ]

  const recentActivity = [
    {
      key: 'act-1', type: 'added', title: 'Pengguna baru ditambahkan',
      subject: 'Anita Wulandari', date: '31 Mei 2024 10:15',
    },
    {
      key: 'act-2', type: 'role-changed', title: 'Peran pengguna diubah',
      subject: 'Rudi Hartono', date: '30 Mei 2024 16:20',
    },
    {
      key: 'act-3', type: 'deactivated', title: 'Pengguna dinonaktifkan',
      subject: 'Budi Santoso', date: '20 Mei 2024 11:05',
    },
    {
      key: 'act-4', type: 'invited', title: 'Undangan dikirim',
      subject: 'mega.putri@lumina.id', date: '19 Mei 2024 09:40',
    },
  ]

  const securityBanner = {
    title: 'Kelola Akses dengan Aman',
    text: 'Pastikan setiap pengguna memiliki peran yang sesuai dengan tanggung jawabnya untuk menjaga keamanan data perusahaan.',
    linkText: 'Pelajari Lebih Lanjut',
  }

  const pagination = {
    perPage: 8,
    totalData: users.length,
  }

  return {
    tabs,
    statCards,
    users,
    roleOptions,
    statusOptions,
    popularRoles,
    recentActivity,
    securityBanner,
    pagination,
  }
}