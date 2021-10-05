import { useState } from 'react'
import NumberFormat from 'react-number-format'

const Mandiri = ({ transaction }) => {
    const [via, setVia] = useState('mBanking')

    return (
        <div className='flex flex-col space-y-2 xl:space-y-4'>
            <div className='shadow-md p-2 md:p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col space-y-2 xl:space-y-4'>
                <div className='flex md:flex-row md:justify-between md:items-center flex-col space-y-2'>
                    <div className='flex flex-col'>
                        <span className='text-xs md:text-base text-blueGray-200'>{transaction.code}</span>
                        <h1 className='text-sm md:text-lg lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold'>{transaction.paymentMethod}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs md:text-base text-blueGray-200'>Total Pembayaran</span>
                        <NumberFormat
                            className='text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold'
                            value={transaction.shouldPayAmount}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                        />
                    </div>
                </div>
                <div className='flex flex-col space-y-2 md:flex-row md:justify-between md:items-center'>
                    <div>
                        <span className='text-xs md:text-base text-blueGray-200'>No Rekening</span>
                        <div className='font-semibold text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl'>{transaction.bankNumber} / Lokaloka</div>
                    </div>
                    <div>
                        <span className='text-xs md:text-base text-blueGray-200'>Bayar tagihan sebelum </span>
                        <div className='font-medium text-sm md:text-lg xl:text-xl'>08:00 | 10 September 2021</div>
                    </div>
                </div>
            </div>
            <br />
            <h1 className='text-base md:text-lg text-blueGray-500'>Instruksi Pembayaran</h1>
            <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 lg:space-x-4'>
                <div className='flex w-full flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:w-2/12'>
                    <h3
                        onClick={() => setVia('mBanking')}
                        className={`cursor-pointer shadow-sm text-sm px-2 xl:px-4 py-1 border border-blueGray-300 rounded-md ${
                            via == 'mBanking' && 'bg-blue-500 text-white border-blue-500'
                        }`}
                    >
                        M-Banking
                    </h3>
                    <h3
                        onClick={() => setVia('iBanking')}
                        className={`cursor-pointer shadow-sm text-sm px-2 xl:px-4 py-1 border border-blueGray-300 rounded-md ${
                            via == 'iBanking' && 'bg-blue-500 text-white border-blue-500'
                        }`}
                    >
                        ATM
                    </h3>
                    <h3
                        onClick={() => setVia('atm')}
                        className={`cursor-pointer shadow-sm text-sm px-2 xl:px-4 py-1 border border-blueGray-300 rounded-md ${
                            via == 'atm' && 'bg-blue-500 text-white border-blue-500'
                        }`}
                    >
                        Internet Banking
                    </h3>
                </div>
                <div className='w-full'>
                    {via == 'mBanking' && (
                        <div className='shadow-sm border border-gray-200 w-full rounded-md p-4 flex flex-col space-y-2'>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 1: Masuk Ke Akun Anda</div>
                            <div className='font-sans font-light text-base'>1. Buka aplikasi Mandiri Online, masukkan USERNAME dan PASSWORD anda</div>
                            <div className='font-sans font-light text-base'>2. Pilih "Bayar"</div>
                            <div className='font-sans font-light text-base'>3. Pilih "Multipayment"</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 2: Detail Pembayaran</div>
                            <div className='font-sans font-light text-base'>1. Pilih 88608 XENDIT sebagai penyedia jasa</div>
                            <div className='font-sans font-light text-base'>
                                2. Masukkan Nomor Virtual Account <span className='font-bold text-primary'>{transaction.bankNumber}</span>
                            </div>
                            <div className='font-sans font-light text-base'>3. Tekan Lanjut</div>
                            <div className='font-sans font-light text-base'>4. Tinjau dan konfirmasi detail transaksi anda, lalu tekan Konfirmasi</div>
                            <div className='font-sans font-light text-base'>5. Selesaikan transaksi dengan memasukkan MPIN anda</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 3: Transaksi Berhasil</div>
                            <div className='font-sans font-light text-base'>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</div>
                            <div className='font-sans font-light text-base'>2. Invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit</div>
                        </div>
                    )}

                    {via == 'iBanking' && (
                        <div className='shadow-sm border border-gray-200 w-full rounded-md p-4 flex flex-col space-y-2'>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 1: Masuk Ke Akun Anda</div>
                            <div className='font-sans font-light text-base'>
                                1. Buka situs Mandiri Internet Banking
                                <a href='https://ibank.bankmandiri.co.id' target='_blank' className='font-semibold text-primary'>
                                    https://ibank.bankmandiri.co.id
                                </a>
                            </div>
                            <div className='font-sans font-light text-base'>2. Masuk menggunakan USER ID dan PASSWORD anda</div>
                            <div className='font-sans font-light text-base'>3. Buka halaman beranda, kemudian pilih "Pembayaran"</div>
                            <div className='font-sans font-light text-base'>4. Pilih "Multi Payment"</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 2: Detail Pembayaran</div>
                            <div className='font-sans font-light text-base'>1. Pilih 88608 XENDIT sebagai penyedia jasa</div>
                            <div className='font-sans font-light text-base'>
                                2. Masukkan Nomor Virtual Account <span className='font-bold text-primary'>{transaction.bankNumber}</span>
                            </div>
                            <div className='font-sans font-light text-base'>3. Lalu pilih Lanjut</div>
                            <div className='font-sans font-light text-base'>4. Apabila semua detail benar tekan "KONFIRMASI"</div>
                            <div className='font-sans font-light text-base'>5. Masukkan PIN / Challenge Code Token</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 3: Transaksi Berhasil</div>
                            <div className='font-sans font-light text-base'>1. Setelah transaksi pembayaran Anda selesai, simpan bukti pembayaran</div>
                            <div className='font-sans font-light text-base'>2. Invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit</div>
                        </div>
                    )}

                    {via == 'atm' && (
                        <div className='shadow-sm border border-gray-200 w-full rounded-md p-4 flex flex-col space-y-2'>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 1: Temukan ATM Terdekat</div>
                            <div className='font-sans font-light text-base'>1. Masukkan ATM dan tekan "Bahasa Indonesia"</div>
                            <div className='font-sans font-light text-base'>2. Masukkan PIN, lalu tekan "Benar"</div>
                            <div className='font-sans font-light text-base'>3. Pilih "Pembayaran", lalu pilih "Multi Payment"</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 2: Detail Pembayaran</div>
                            <div className='font-sans font-light text-base'>1. Masukkan kode perusahaan '88608' (88608 XENDIT), lalu tekan 'BENAR'</div>
                            <div className='font-sans font-light text-base'>
                                2. Masukkan Nomor Virtual Account <span className='font-bold text-primary'>{transaction.bankNumber}</span>, lalu tekan 'BENAR'
                            </div>
                            <div className='font-sans font-light text-base'>3. Masukkan nominal yang ingin di transfer, lalu tekan "BENAR"</div>
                            <div className='font-sans font-light text-base'>
                                4. Informasi pelanggan akan ditampilkan, pilih nomor 1 sesuai dengan nominal pembayaran kemudian tekan "YA"
                            </div>
                            <div className='font-sans font-light text-base'>5. Konfirmasi pembayaran akan muncul, tekan "YES", untuk melanjutkan</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 3: Transaksi Berhasil</div>
                            <div className='font-sans font-light text-base'>1. Simpan bukti transaksi anda</div>
                            <div className='font-sans font-light text-base'>2. Transaksi anda berhasil</div>
                            <div className='font-sans font-light text-base'>
                                3. Setelah transaksi anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Mandiri
