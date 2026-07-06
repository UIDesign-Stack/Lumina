function generateMorePartners() {
  const vendors = ['PT Sumber Rejeki', 'CV Karya Abadi', 'PT Sentosa Jaya', 'Toko Bangunan Makmur', 'PT Distribusi Nusantara']
  const customers = ['PT Cahaya Terang', 'CV Mitra Utama', 'PT Bintang Sejahtera', 'Koperasi Sejahtera Bersama']
  const consultants = ['Budi Santoso, S.E', 'Rina Wulandari', 'Ahmad Fauzi']
  const others = ['PDAM Kota', 'Telkom Indonesia', 'BPJS Ketenagakerjaan']

  const rows = []
  let id = 200
  vendors.forEach((name, i) => rows.push({ id: id++, name, type: 'Vendor', subtitle: 'Vendor', contact: '-', email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@vendor.co.id`, totalTransaction: (5 - i) * 250000000, transactionCount: (5 - i) * 3, status: 'Aktif' }))
  customers.forEach((name, i) => rows.push({ id: id++, name, type: 'Pelanggan', subtitle: 'Pelanggan', contact: '-', email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@email.com`, totalTransaction: (4 - i) * 180000000, transactionCount: (4 - i) * 2, status: 'Aktif' }))
  consultants.forEach((name, i) => rows.push({ id: id++, name, type: 'Konsultan', subtitle: 'Konsultan', contact: name, email: `${name.toLowerCase().split(' ')[0]}@email.com`, totalTransaction: (3 - i) * 90000000, transactionCount: (3 - i) * 2, status: 'Aktif' }))
  others.forEach((name, i) => rows.push({ id: id++, name, type: 'Lainnya', subtitle: 'Instansi', contact: '-', email: `info@${name.toLowerCase().replace(/[^a-z]/g, '')}.co.id`, totalTransaction: (3 - i) * 70000000, transactionCount: (3 - i) * 2, status: i === 2 ? 'Nonaktif' : 'Aktif' }))

  return rows
}

export function usePihakKetigaData() {
  const summaryCards = [
    { key: 'total', label: 'Total Pihak Ketiga', value: '128', note: 'Semua pihak ketiga', icon: 'users', color: 'purple' },
    { key: 'active', label: 'Pihak Ketiga Aktif', value: '112', note: '87.5% dari total pihak ketiga', icon: 'check', color: 'purple' },
    { key: 'payment', label: 'Total Pembayaran', value: 'Rp 45.670.000.000', note: 'YTD (Semua pihak ketiga)', icon: 'folder', color: 'purple' },
    { key: 'average', label: 'Rata-rata Pembayaran', value: 'Rp 357.578.125', note: 'Per pihak ketiga', icon: 'trend', color: 'purple' },
    { key: 'late', label: 'Pembayaran Terlambat', value: '8', note: 'Perlu ditindaklanjuti', icon: 'clock', color: 'purple' },
  ]

  const tabs = ['Semua Pihak Ketiga', 'Vendor', 'Pelanggan', 'Konsultan', 'Lainnya']

  const partners = [
    { id: 1, name: 'PT. Maju Bersama', type: 'Vendor', subtitle: 'Vendor', contact: 'Fajar Ardiansyah', email: 'fajar@majubersama.co.id', totalTransaction: 5250000000, transactionCount: 24, status: 'Aktif' },
    { id: 2, name: 'CV. Sejahtera Abadi', type: 'Vendor', subtitle: 'Vendor', contact: 'Dinda Ayu', email: 'info@sejahteraabadi.co.id', totalTransaction: 4870000000, transactionCount: 18, status: 'Aktif' },
    { id: 3, name: 'Bank Mandiri', type: 'Lainnya', subtitle: 'Instansi Keuangan', contact: '-', email: 'corporate@bankmandiri.co.id', totalTransaction: 3750000000, transactionCount: 12, status: 'Aktif' },
    { id: 4, name: 'Andi Pratama', type: 'Konsultan', subtitle: 'Konsultan', contact: 'Andi Pratama', email: 'andi.pratama@email.com', totalTransaction: 2650000000, transactionCount: 15, status: 'Aktif' },
    { id: 5, name: 'PT. Global Solusi', type: 'Vendor', subtitle: 'Vendor', contact: 'Dinda Ayu', email: 'contact@globalsolusi.co.id', totalTransaction: 2150000000, transactionCount: 9, status: 'Aktif' },
    { id: 6, name: 'Toko Sukses Jaya', type: 'Vendor', subtitle: 'Vendor', contact: 'Budi Santoso', email: 'toko.suksesjaya@email.com', totalTransaction: 1980000000, transactionCount: 14, status: 'Aktif' },
    { id: 7, name: 'PT. Prima Utama', type: 'Pelanggan', subtitle: 'Pelanggan', contact: 'Siti Rahma', email: 'siti.rahma@primautama.co.id', totalTransaction: 1750000000, transactionCount: 8, status: 'Aktif' },
    { id: 8, name: 'Listrik PLN', type: 'Lainnya', subtitle: 'Instansi', contact: '-', email: 'info@pln.co.id', totalTransaction: 980000000, transactionCount: 6, status: 'Nonaktif' },
    ...generateMorePartners(),
  ]

  const typeSplit = [
    { label: 'Vendor', count: 68, percent: 53.1, color: '#a855f7' },
    { label: 'Pelanggan', count: 32, percent: 25.0, color: '#6366f1' },
    { label: 'Konsultan', count: 15, percent: 11.7, color: '#f97316' },
    { label: 'Lainnya', count: 13, percent: 10.2, color: '#3b82f6' },
  ]
  const totalPartners = 128

  const topPartners = [
    { rank: 1, name: 'PT. Maju Bersama', amount: 'Rp 5.250.000.000', count: '24 trx', percent: 100, color: 'purple' },
    { rank: 2, name: 'CV. Sejahtera Abadi', amount: 'Rp 4.870.000.000', count: '18 trx', percent: 93, color: 'blue' },
    { rank: 3, name: 'Bank Mandiri', amount: 'Rp 3.750.000.000', count: '12 trx', percent: 71, color: 'amber' },
    { rank: 4, name: 'Andi Pratama', amount: 'Rp 2.650.000.000', count: '15 trx', percent: 50, color: 'rose' },
    { rank: 5, name: 'PT. Global Solusi', amount: 'Rp 2.150.000.000', count: '9 trx', percent: 41, color: 'emerald' },
  ]

  const tip = {
    text: 'Pastikan data pihak ketiga selalu diperbarui untuk kelancaran transaksi dan pelaporan keuangan yang akurat.',
    linkText: 'Pelajari lebih lanjut',
  }

  return {
    summaryCards,
    tabs,
    partners,
    typeSplit,
    totalPartners,
    topPartners,
    tip,
  }
}