import { ref } from 'vue'

export function usePengaturanData() {
  const tabs = ['Umum', 'Perusahaan', 'Akun & Rekening', 'Pajak', 'Notifikasi', 'Keamanan', 'Ekspor Data']

  const generalPreferences = ref([
    {
      key: 'currency',
      icon: 'currency',
      label: 'Mata Uang Default',
      description: 'Pilih mata uang yang digunakan sebagai default di sistem.',
      value: 'IDR - Rupiah Indonesia',
      options: ['IDR - Rupiah Indonesia', 'USD - Dolar Amerika', 'SGD - Dolar Singapura', 'EUR - Euro'],
    },
    {
      key: 'numberFormat',
      icon: 'hash',
      label: 'Format Angka',
      description: 'Atur format tampilan angka dan pemisah ribuan.',
      value: '1.234.567,89 (Indonesia)',
      options: ['1.234.567,89 (Indonesia)', '1,234,567.89 (Internasional)'],
    },
    {
      key: 'timezone',
      icon: 'clock',
      label: 'Zona Waktu',
      description: 'Pilih zona waktu untuk menyesuaikan waktu sistem.',
      value: '(GMT+07:00) Jakarta',
      options: ['(GMT+07:00) Jakarta', '(GMT+08:00) Makassar', '(GMT+09:00) Jayapura'],
    },
    {
      key: 'fiscalYearStart',
      icon: 'calendar',
      label: 'Awal Periode Akuntansi',
      description: 'Tentukan bulan dimulainya tahun buku perusahaan.',
      value: 'Januari',
      options: ['Januari', 'April', 'Juli', 'Oktober'],
    },
    {
      key: 'pageSize',
      icon: 'list',
      label: 'Tampilan Data per Halaman',
      description: 'Atur jumlah baris data yang ditampilkan pada tabel.',
      value: '25',
      options: ['10', '25', '50', '100'],
    },
    {
      key: 'language',
      icon: 'globe',
      label: 'Bahasa',
      description: 'Pilih bahasa yang digunakan di aplikasi.',
      value: 'Bahasa Indonesia',
      options: ['Bahasa Indonesia', 'English'],
    },
  ])

  // Pengaturan tampilan (toggle)
  const displaySettings = ref([
    { key: 'darkMode', icon: 'moon', label: 'Mode Gelap', description: 'Aktifkan tema gelap di seluruh aplikasi.', enabled: true },
    { key: 'compactSidebar', icon: 'book', label: 'Sidebar Ringkas', description: 'Gunakan tampilan sidebar dalam mode ringkas.', enabled: false },
    { key: 'showTooltip', icon: 'info', label: 'Tampilkan Tooltip', description: 'Tampilkan bantuan singkat saat hover pada elemen.', enabled: true },
    { key: 'pageAnimation', icon: 'sparkles', label: 'Animasi Halaman', description: 'Aktifkan animasi transisi antar halaman.', enabled: true },
  ])

  // Pengaturan notifikasi (toggle)
  const notificationSettings = ref([
    { key: 'emailNotif', icon: 'mail', label: 'Notifikasi Email', description: 'Terima notifikasi melalui email untuk aktivitas penting.', enabled: true },
    { key: 'budgetReminder', icon: 'wallet', label: 'Pengingat Anggaran', description: 'Terima pengingat jika anggaran mendekati batas.', enabled: true },
    { key: 'transactionNotif', icon: 'bell', label: 'Notifikasi Transaksi', description: 'Terima notifikasi untuk setiap transaksi baru.', enabled: false },
    { key: 'dailySummary', icon: 'calendar', label: 'Ringkasan Harian', description: 'Terima ringkasan aktivitas harian melalui email.', enabled: true },
  ])

  const accountSettings = ref({
    rekeningDefault: 'Kas Utama',
    tampilkanSaldoDashboard: true,
    notifikasiSaldoRendah: true,
    batasSaldoMinimum: '5000000',
  })

  // TODO: ganti dengan daftar akun/rekening asli dari useAccountsData atau API
  const accountOptionsList = [
    'Kas Utama',
    'BCA - 1234567890',
    'Mandiri - 9876543210',
    'BNI - 5647382910',
  ]

  // Pengaturan Pajak (tab "Pajak")
  const taxSettings = ref({
    statusPKP: true,
    nomorPengukuhanPKP: 'S-1234/PKP/WPJ.07/2020',
    tarifPPNDefault: '11%',
    metodePajak: 'Tidak Termasuk Pajak (Exclusive)',
    pengingatJatuhTempo: true,
    hariSebelumJatuhTempo: '7',
  })

  // Pengaturan Notifikasi Lanjutan (tab "Notifikasi")
  const notificationChannels = ref([
    { key: 'email', icon: 'mail', label: 'Email', description: 'Kirim notifikasi ke alamat email terdaftar.', enabled: true },
    { key: 'pushBrowser', icon: 'bell', label: 'Push Browser', description: 'Tampilkan notifikasi langsung di browser.', enabled: true },
    { key: 'sms', icon: 'sms', label: 'SMS', description: 'Kirim notifikasi penting melalui SMS.', enabled: false },
  ])

  const moduleNotifications = ref([
    { key: 'transaksi', label: 'Transaksi', enabled: true },
    { key: 'laporanKeuangan', label: 'Laporan Keuangan', enabled: true },
    { key: 'integrasi', label: 'Integrasi', enabled: true },
    { key: 'penggunaPeran', label: 'Pengguna & Peran', enabled: false },
    { key: 'auditLog', label: 'Audit Log', enabled: false },
  ])

  const digestFrequency = ref('Harian')
  const digestFrequencyOptions = ['Harian', 'Mingguan', 'Bulanan', 'Tidak Pernah']

  const quietHours = ref({
    enabled: false,
    mulai: '22:00',
    selesai: '07:00',
  })

  // Kebijakan Keamanan Perusahaan (tab "Keamanan")
  const securityPolicy = ref({
    wajib2FA: false,
    panjangMinimalSandi: '8',
    wajibKombinasiSandi: true,
    masaBerlakuSandi: 'Tidak Pernah',
    batasPercobaanLogin: '5',
    durasiKunciAkun: '15 menit',
    waktuLogoutOtomatis: '1 jam',
    batasiAksesIP: false,
    daftarIPDiizinkan: '',
  })

  const masaBerlakuSandiOptions = ['30 hari', '60 hari', '90 hari', 'Tidak Pernah']
  const durasiKunciOptions = ['5 menit', '15 menit', '30 menit', '1 jam']
  const waktuLogoutOptions = ['15 menit', '30 menit', '1 jam', '4 jam', 'Tidak Pernah']

  const companyProfile = ref({
    logo: '',
    nama: 'PT Lumina Finansial Indonesia',
    npwp: '01.234.567.8-901.000',
    jenisUsaha: 'Jasa Keuangan',
    email: 'admin@luminafinance.com',
    telepon: '021-5551234',
    website: 'https://luminafinance.com',
    alamat: 'Jl. Sudirman Kav. 45, Jakarta Selatan, DKI Jakarta 12190',
  })

  const accountInfo = {
    name: 'FajarDev',
    role: 'Finance Manager',
    email: 'fajar.Dev@lumina.id',
    avatar: '',
  }

  const aboutApp = {
    name: 'Lumina Finance',
    version: 'Versi 1.0.0',
    description: 'Aplikasi manajemen keuangan perusahaan yang membantu Anda mengelola keuangan dengan lebih efisien dan akurat.',
  }

  const quickActions = [
    { key: 'backup', label: 'Cadangkan Data Sekarang', icon: 'download', danger: false },
    { key: 'restore', label: 'Pulihkan Data', icon: 'upload', danger: false },
    { key: 'clearCache', label: 'Bersihkan Cache', icon: 'trash', danger: false },
    { key: 'reset', label: 'Reset Pengaturan', icon: 'settings', danger: true },
  ]

  return {
    tabs,
    generalPreferences,
    displaySettings,
    notificationSettings,
    companyProfile,
    accountSettings,
    accountOptionsList,
    taxSettings,
    notificationChannels,
    moduleNotifications,
    digestFrequency,
    digestFrequencyOptions,
    quietHours,
    securityPolicy,
    masaBerlakuSandiOptions,
    durasiKunciOptions,
    waktuLogoutOptions,
    accountInfo,
    aboutApp,
    quickActions,
  }
}