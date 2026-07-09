function generateMoreLedgerRows(startBalance) {
  const accounts = ['Kas dan Setara Kas', 'Piutang Usaha', 'Persediaan', 'Beban Gaji', 'Beban Operasional', 'Beban Sewa', 'Beban Utilitas', 'Pendapatan Jasa']
  const categories = { 'Kas dan Setara Kas': 'Pemasukan', 'Piutang Usaha': 'Pemasukan', 'Persediaan': 'Pengeluaran', 'Beban Gaji': 'Pengeluaran', 'Beban Operasional': 'Pengeluaran', 'Beban Sewa': 'Pengeluaran', 'Beban Utilitas': 'Pengeluaran', 'Pendapatan Jasa': 'Pemasukan' }
  const descriptions = [
    'Penerimaan dari Klien', 'Pembayaran Vendor', 'Pembelian Perlengkapan', 'Pembayaran Cicilan',
    'Penerimaan Piutang', 'Pembayaran Komisi', 'Biaya Perjalanan Dinas', 'Pendapatan Konsultasi',
  ]
  const projects = ['Proyek A', 'Proyek B', 'Proyek C', '-']
  const months = ['Mei', 'Jun']

  const rows = []
  let balance = startBalance
  for (let i = 0; i < 240; i++) {
    const account = accounts[i % accounts.length]
    const isDebit = i % 3 !== 0
    const amount = (Math.floor(Math.random() * 20) + 2) * 100000000
    const debit = isDebit ? amount : 0
    const credit = isDebit ? 0 : amount
    balance = balance + debit - credit
    rows.push({
      id: 100 + i,
      date: `${(i % 27) + 1} ${months[i % months.length]} 2024`,
      voucherNo: `BKT-2405${String(100 + i).padStart(4, '0')}`,
      description: descriptions[i % descriptions.length],
      account,
      category: categories[account],
      project: projects[i % projects.length],
      debit,
      credit,
      balance,
    })
  }
  return rows
}

export function useBukuBesarData() {
  const summaryCards = [
    { key: 'openingBalance', label: 'Total Saldo Awal', value: 'Rp 150.000.000.000', note: '', icon: 'wallet', color: 'purple' },
    { key: 'totalDebit', label: 'Total Debit', value: 'Rp 245.750.000.000', note: '+12.5% dari periode lalu', icon: 'shield', color: 'purple' },
    { key: 'totalCredit', label: 'Total Kredit', value: 'Rp 245.750.000.000', note: '+12.5% dari periode lalu', icon: 'scale', color: 'purple' },
    { key: 'closingBalance', label: 'Saldo Akhir', value: 'Rp 150.000.000.000', note: '+5.2% dari periode lalu', icon: 'wallet', color: 'purple' },
  ]

  const period = '11 Mei 2024 - 31 Mei 2024'
  const accountOptions = ['Semua Akun', 'Kas dan Setara Kas', 'Piutang Usaha', 'Persediaan', 'Beban Gaji', 'Beban Operasional', 'Beban Sewa', 'Beban Utilitas', 'Pendapatan Jasa']
  const categoryOptions = ['Semua Kategori', 'Pemasukan', 'Pengeluaran']
  const projectOptions = ['Semua Proyek', 'Proyek A', 'Proyek B', 'Proyek C']

  const rows = [
    { id: 1, date: '01 Mei 2024', voucherNo: 'BKT-24050001', description: 'Saldo Awal', account: 'Kas dan Setara Kas', category: null, project: null, debit: null, credit: null, balance: 150000000000 },
    { id: 2, date: '02 Mei 2024', voucherNo: 'BKT-24050002', description: 'Penerimaan dari PT Maju Jaya', account: 'Kas dan Setara Kas', category: 'Pemasukan', project: 'Proyek A', debit: 25000000000, credit: 0, balance: 175000000000 },
    { id: 3, date: '02 Mei 2024', voucherNo: 'BKT-24050003', description: 'Pembayaran Gaji Karyawan', account: 'Beban Gaji', category: 'Pengeluaran', project: null, debit: 0, credit: 8250000000, balance: 166750000000 },
    { id: 4, date: '03 Mei 2024', voucherNo: 'BKT-24050004', description: 'Pembelian Perlengkapan Kantor', account: 'Beban Operasional', category: 'Pengeluaran', project: null, debit: 0, credit: 2150000000, balance: 164600000000 },
    { id: 5, date: '05 Mei 2024', voucherNo: 'BKT-24050005', description: 'Pelunasan Piutang – CV Sejahtera', account: 'Kas dan Setara Kas', category: 'Pemasukan', project: 'Proyek B', debit: 12500000000, credit: 0, balance: 177100000000 },
    { id: 6, date: '06 Mei 2024', voucherNo: 'BKT-24050006', description: 'Pembayaran Sewa Kantor', account: 'Beban Sewa', category: 'Pengeluaran', project: null, debit: 0, credit: 3500000000, balance: 173600000000 },
    { id: 7, date: '07 Mei 2024', voucherNo: 'BKT-24050007', description: 'Pembelian Bahan Baku', account: 'Persediaan', category: 'Pengeluaran', project: 'Proyek A', debit: 0, credit: 14750000000, balance: 158850000000 },
    { id: 8, date: '08 Mei 2024', voucherNo: 'BKT-24050008', description: 'Penerimaan Retur Penjualan', account: 'Kas dan Setara Kas', category: 'Pemasukan', project: 'Proyek A', debit: 1750000000, credit: 0, balance: 160600000000 },
    { id: 9, date: '09 Mei 2024', voucherNo: 'BKT-24050009', description: 'Pembayaran Listrik & Internet', account: 'Beban Utilitas', category: 'Pengeluaran', project: null, debit: 0, credit: 1250000000, balance: 159350000000 },
    { id: 10, date: '10 Mei 2024', voucherNo: 'BKT-24050010', description: 'Pendapatan Jasa Konsultasi', account: 'Pendapatan Jasa', category: 'Pemasukan', project: 'Proyek C', debit: 18500000000, credit: 0, balance: 177850000000 },
    ...generateMoreLedgerRows(177850000000),
  ]

  const totalPeriod = { debit: 245750000000, credit: 245750000000, balance: 150000000000 }

  const accountSummary = [
    { key: 'cash', name: 'Kas dan Setara Kas', amount: 'Rp 98.250.000.000', icon: 'wallet', color: 'purple' },
    { key: 'receivable', name: 'Piutang Usaha', amount: 'Rp 25.400.000.000', icon: 'document', color: 'blue' },
    { key: 'inventory', name: 'Persediaan', amount: 'Rp 14.750.000.000', icon: 'archive', color: 'amber' },
    { key: 'fixedAsset', name: 'Aset Tetap', amount: 'Rp 75.000.000.000', icon: 'building', color: 'emerald' },
    { key: 'payable', name: 'Hutang Usaha', amount: 'Rp 22.100.000.000', icon: 'document', color: 'rose' },
  ]

  const activities = [
    { id: 1, title: 'Pembayaran Pajak PPh', voucherNo: 'BKT-24050011', amount: 'Rp 5.000.000.000', time: '11 Mei 2024 14:30' },
    { id: 2, title: 'Penerimaan dari PT Sentosa', voucherNo: 'BKT-24050012', amount: 'Rp 17.500.000.000', time: '11 Mei 2024 11:15' },
    { id: 3, title: 'Pembayaran Asuransi', voucherNo: 'BKT-24050013', amount: 'Rp 2.750.000.000', time: '10 Mei 2024 16:45' },
    { id: 4, title: 'Pembelian Software License', voucherNo: 'BKT-24050014', amount: 'Rp 3.600.000.000', time: '10 Mei 2024 09:20' },
  ]

  const infoText = 'Buku besar menampilkan semua transaksi keuangan perusahaan secara kronologis berdasarkan akun. Gunakan filter untuk mencari transaksi tertentu atau export data untuk keperluan analisis lebih lanjut.'

  return {
    summaryCards,
    period,
    accountOptions,
    categoryOptions,
    projectOptions,
    rows,
    totalPeriod,
    accountSummary,
    activities,
    infoText,
  }
}