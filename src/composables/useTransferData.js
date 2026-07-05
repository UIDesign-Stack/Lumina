export function useTransferData() {
  // Kontak favorit untuk quick-select di bagian atas
  const quickFavorites = [
    { id: 1, name: 'PT. Maju Bersama', bank: 'BNI', account: '1233 5678 9012 3456', logo: 'BNI', color: 'orange' },
    { id: 2, name: 'Andi Pratama', bank: 'BCA', account: '1234 5678 9012 3456', logo: 'BCA', color: 'blue' },
    { id: 3, name: 'CV. Sejahtera Abadi', bank: 'Mandiri', account: '1230 9876 5432 1098', logo: 'Mandiri', color: 'amber' },
    { id: 4, name: 'Dinda Ayu', bank: 'OVO', account: '0812 3456 7890', logo: 'OVO', color: 'purple' },
  ]

  // Rekening milik user sendiri
  const myAccounts = [
    { id: 1, name: 'Kas Utama', bank: 'Bank BCA', number: '1234 5678 9000', balance: 'Rp 1.250.000.000', logo: 'BCA', color: 'blue' },
    { id: 2, name: 'Bank Mandiri', bank: '', number: '9876 5432 1000', balance: 'Rp 850.000.000', logo: 'Mandiri', color: 'amber' },
    { id: 3, name: 'Bank BNI', bank: '', number: '1122 3344 5566', balance: 'Rp 450.000.000', logo: 'BNI', color: 'orange' },
    { id: 4, name: 'E-Wallet', bank: 'GoPay', number: '0812 3456 7890', balance: 'Rp 120.000.000', logo: 'GoPay', color: 'teal' },
  ]

  // Daftar favorit lengkap untuk sidebar kanan (termasuk status starred)
  const allFavorites = [
    { id: 1, name: 'PT. Maju Bersama', bank: 'Bank BNI', number: '1233 5678 9012 3456', logo: 'BNI', color: 'orange', starred: true },
    { id: 2, name: 'Andi Pratama', bank: 'Bank BCA', number: '1234 5678 9012 3456', logo: 'BCA', color: 'blue', starred: true },
    { id: 3, name: 'CV. Sejahtera Abadi', bank: 'Bank Mandiri', number: '1230 9876 5432 1098', logo: 'Mandiri', color: 'amber', starred: true },
    { id: 4, name: 'Dinda Ayu', bank: 'OVO', number: '0812 3456 7890', logo: 'OVO', color: 'purple', starred: true },
    { id: 5, name: 'Bayu Kurniawan', bank: 'Bank BRI', number: '1122 3344 5566 7788', logo: 'BRI', color: 'sky', starred: false },
  ]

  // Riwayat transfer terbaru
  const recentTransfers = [
    { id: 1, name: 'PT. Maju Bersama', bank: 'Bank BNI', number: '1233 5678 9012 3456', amount: 'Rp 150.000.000', date: '25 Mei 2024', status: 'Berhasil', logo: 'BNI', color: 'orange' },
    { id: 2, name: 'Andi Pratama', bank: 'Bank BCA', number: '1234 5678 9012 3456', amount: 'Rp 50.000.000', date: '24 Mei 2024', status: 'Berhasil', logo: 'BCA', color: 'blue' },
    { id: 3, name: 'CV. Sejahtera Abadi', bank: 'Bank Mandiri', number: '1230 9876 5432 1098', amount: 'Rp 75.000.000', date: '23 Mei 2024', status: 'Berhasil', logo: 'Mandiri', color: 'amber' },
    { id: 4, name: 'Dinda Ayu', bank: 'OVO', number: '0812 3456 7890', amount: 'Rp 200.000', date: '23 Mei 2024', status: 'Berhasil', logo: 'OVO', color: 'purple' },
    { id: 5, name: 'Bayu Kurniawan', bank: 'Bank BRI', number: '1122 3344 5566 7788', amount: 'Rp 125.000.000', date: '22 Mei 2024', status: 'Berhasil', logo: 'BRI', color: 'sky' },
  ]

  const tabs = ['Transfer Dana', 'Transfer Terjadwal', 'Riwayat Transfer', 'Rekening Tersimpan']
  const transferMethods = ['Rekening Bank', 'E-Wallet', 'Virtual Account', 'Transfer Internasional']

  return {
    quickFavorites,
    myAccounts,
    allFavorites,
    recentTransfers,
    tabs,
    transferMethods,
  }
}