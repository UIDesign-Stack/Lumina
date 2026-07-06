function generateMoreProjects() {
  const names = [
    'Peremajaan Gudang', 'Migrasi Server', 'Kampanye Rebranding', 'Ekspansi Cabang Surabaya',
    'Digitalisasi Arsip', 'Pelatihan Sales Nasional', 'Renovasi Lobby Kantor', 'Pengadaan Kendaraan Operasional',
    'Audit Internal Q3', 'Pengembangan Aplikasi Mobile', 'Sertifikasi ISO', 'Optimasi Rantai Pasok',
    'Program CSR Tahunan', 'Peningkatan Keamanan Data', 'Studi Kelayakan Cabang Baru', 'Otomasi Gudang',
  ]
  const clients = ['PT. Maju Bersama', 'CV. Sukses Mandiri', 'PT. Inovasi Digital', 'Bank Mandiri', 'PT. Global Solusi', 'Internal']
  const managers = ['Fajar A.', 'Dinda A.', 'Andi P.', 'Siti R.']
  const statuses = ['Aktif', 'Aktif', 'Selesai', 'Ditunda']

  return names.map((name, i) => {
    const budget = (Math.floor(Math.random() * 30) + 10) * 100000000
    const progress = [30, 45, 60, 75, 90, 100][i % 6]
    return {
      id: 100 + i,
      name,
      code: `PRJ-${String(9 + i).padStart(4, '0')}`,
      client: clients[i % clients.length],
      manager: managers[i % managers.length],
      budget,
      realization: Math.round(budget * (progress / 100)),
      progress,
      status: statuses[i % statuses.length],
      icon: 'briefcase',
      color: 'purple',
    }
  })
}

export function useProyekData() {
  const summaryCards = [
    { key: 'total', label: 'Total Proyek', value: '24', note: '18 Aktif • 6 Selesai', icon: 'folder', color: 'purple' },
    { key: 'budget', label: 'Total Anggaran', value: 'Rp 18.750.000.000', note: 'Semua proyek', icon: 'check', color: 'purple' },
    { key: 'realization', label: 'Total Realisasi', value: 'Rp 12.450.000.000', note: '66.4% dari total anggaran', icon: 'trend', color: 'purple' },
    { key: 'progress', label: 'Rata-rata Progress', value: '68.7%', note: 'Semua proyek aktif', icon: 'trend', color: 'purple' },
    { key: 'profit', label: 'Total Profit', value: 'Rp 2.350.000.000', note: '18.9% dari total realisasi', icon: 'dollar', color: 'purple' },
  ]

  const tabs = ['Semua Proyek', 'Proyek Aktif', 'Proyek Selesai', 'Proyek Ditunda']

  const projects = [
    { id: 1, name: 'Pembangunan Gedung Kantor', code: 'PRJ-0001', client: 'PT. Maju Bersama', manager: 'Fajar A.', budget: 5000000000, realization: 3250000000, progress: 65, status: 'Aktif', icon: 'building', color: 'purple' },
    { id: 2, name: 'Pengembangan Sistem ERP', code: 'PRJ-0002', client: 'PT. Sejahtera Abadi', manager: 'Dinda A.', budget: 3200000000, realization: 2080000000, progress: 65, status: 'Aktif', icon: 'building', color: 'blue' },
    { id: 3, name: 'Renovasi Gedung Warehouse', code: 'PRJ-0003', client: 'CV. Sukses Mandiri', manager: 'Andi P.', budget: 2500000000, realization: 1875000000, progress: 75, status: 'Aktif', icon: 'box', color: 'amber' },
    { id: 4, name: 'Kampanye Digital Marketing', code: 'PRJ-0004', client: 'PT. Inovasi Digital', manager: 'Siti R.', budget: 1500000000, realization: 1125000000, progress: 75, status: 'Aktif', icon: 'building', color: 'purple' },
    { id: 5, name: 'Pembangunan Pabrik Baru', code: 'PRJ-0005', client: 'PT. Makmur Sejahtera', manager: 'Fajar A.', budget: 4000000000, realization: 2000000000, progress: 50, status: 'Aktif', icon: 'building', color: 'purple' },
    { id: 6, name: 'Implementasi CRM System', code: 'PRJ-0006', client: 'PT. Global Solusi', manager: 'Dinda A.', budget: 1250000000, realization: 750000000, progress: 60, status: 'Ditunda', icon: 'building', color: 'emerald' },
    { id: 7, name: 'Penyediaan Infrastruktur IT', code: 'PRJ-0007', client: 'Bank Mandiri', manager: 'Andi P.', budget: 1800000000, realization: 1800000000, progress: 100, status: 'Selesai', icon: 'check', color: 'blue' },
    { id: 8, name: 'Audit & Konsultasi Keuangan', code: 'PRJ-0008', client: 'PT. Prima Utama', manager: 'Siti R.', budget: 1500000000, realization: 1500000000, progress: 100, status: 'Selesai', icon: 'check', color: 'rose' },
    ...generateMoreProjects(),
  ]

  const trend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    budget: [1000000, 1500000, 2000000, 2400000, 2800000, 3200000, 3600000, 4000000, 4300000, 4600000, 4800000, 5000000].map((v) => v * 1000),
    realization: [700000, 1100000, 1300000, 1900000, 2000000, 2600000, 2800000, 3100000, 3400000, 3900000, 4200000, 4600000].map((v) => v * 1000),
  }

  const categoryBreakdown = [
    { label: 'Konstruksi', value: 9000000000, percent: 48, color: '#1e293b' },
    { label: 'IT & Sistem', value: 4700000000, percent: 25, color: '#3b82f6' },
    { label: 'Marketing', value: 2000000000, percent: 11, color: '#f59e0b' },
    { label: 'Lainnya', value: 3050000000, percent: 16, color: '#a855f7' },
  ]
  const categoryTotal = 'Rp 18.750.000.000'

  const statusSplit = [
    { label: 'Aktif', count: 18, percent: 75, color: '#a855f7' },
    { label: 'Selesai', count: 4, percent: 16.7, color: '#3b82f6' },
    { label: 'Ditunda', count: 2, percent: 8.3, color: '#f97316' },
  ]
  const totalProjects = 24

  const topProjects = [
    { rank: 1, name: 'Pembangunan Gedung Kantor', amount: 'Rp 3.250.000.000', percent: 65, icon: 'building', color: 'purple' },
    { rank: 2, name: 'Pengembangan Sistem ERP', amount: 'Rp 2.080.000.000', percent: 65, icon: 'building', color: 'blue' },
    { rank: 3, name: 'Renovasi Gedung Warehouse', amount: 'Rp 1.875.000.000', percent: 75, icon: 'box', color: 'amber' },
    { rank: 4, name: 'Pembangunan Pabrik Baru', amount: 'Rp 2.000.000.000', percent: 50, icon: 'building', color: 'rose' },
    { rank: 5, name: 'Implementasi CRM System', amount: 'Rp 750.000.000', percent: 60, icon: 'building', color: 'emerald' },
  ]

  const tip = {
    text: 'Pantau setiap proyek secara real-time untuk memastikan anggaran dan target tercapai sesuai rencana.',
    linkText: 'Pelajari lebih lanjut',
  }

  return {
    summaryCards,
    tabs,
    projects,
    trend,
    categoryBreakdown,
    categoryTotal,
    statusSplit,
    totalProjects,
    topProjects,
    tip,
  }
}