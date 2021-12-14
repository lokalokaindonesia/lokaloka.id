import { useState } from 'react'
import NumberFormat from 'react-number-format'

const Bni = ({ transaction }) => {
    const [via, setVia] = useState('mBanking')

    return (
        <div className='flex flex-col space-y-2 xl:space-y-4'>
            <div className='shadow-md p-2 md:p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col space-y-2 xl:space-y-4'>
                <div className='flex md:flex-row md:justify-between md:items-center flex-col space-y-2'>
                    <div className='flex flex-col'>
                        <span className='text-xs md:text-base text-slate-200'>{transaction.code}</span>
                        <h1 className='text-sm md:text-lg lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold'>{transaction.paymentMethod}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs md:text-base text-slate-200'>Total Pembayaran</span>
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
                        <span className='text-xs md:text-base text-slate-200'>No Rekening</span>
                        <div className='font-semibold text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl'>{transaction.bankNumber} / Lokaloka</div>
                    </div>
                    <div>
                        <span className='text-xs md:text-base text-slate-200'>*Tagihan hanya berlaku selama 24 Jam</span>
                    </div>
                </div>
            </div>
            <br />
            <h1 className='text-base md:text-lg text-slate-500'>Instruksi Pembayaran</h1>
            <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 lg:space-x-4'>
                <div className='flex w-full flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:w-2/12'>
                    <h3
                        onClick={() => setVia('mBanking')}
                        className={`cursor-pointer shadow-sm text-sm px-2 xl:px-4 py-1 border border-slate-300 rounded-md ${
                            via == 'mBanking' && 'bg-orange-500 text-white border-orange-500'
                        }`}
                    >
                        M-Banking
                    </h3>
                    <h3
                        onClick={() => setVia('iBanking')}
                        className={`cursor-pointer shadow-sm text-sm px-2 xl:px-4 py-1 border border-slate-300 rounded-md ${
                            via == 'iBanking' && 'bg-orange-500 text-white border-orange-500'
                        }`}
                    >
                        ATM
                    </h3>
                    <h3
                        onClick={() => setVia('atm')}
                        className={`cursor-pointer shadow-sm text-sm px-2 xl:px-4 py-1 border border-slate-300 rounded-md ${
                            via == 'atm' && 'bg-orange-500 text-white border-orange-500'
                        }`}
                    >
                        Internet Banking
                    </h3>
                </div>
                <div className='w-full'>
                    {via == 'mBanking' && (
                        <div className='shadow-sm border border-gray-200 w-full rounded-md p-4 flex flex-col space-y-2'>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 1: Masuk Ke Akun Anda</div>
                            <div className='font-sans font-light text-base'>1. Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN anda</div>
                            <div className='font-sans font-light text-base'>2. Pilih "Pembayaran" dan pilih "Briva"</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 2: Detail Pembayaran</div>
                            <div className='font-sans font-light text-base'>
                                1. Masukkan Nomor Virtual Account anda
                                <span className='font-bold text-primary'>{transaction.bankNumber}</span> dan jumlah yang ingin anda bayarkan
                            </div>
                            <div className='font-sans font-light text-base'>2. Masukkan PIN Mobile Banking BRI</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 3: Transaksi Berhasil</div>
                            <div className='font-sans font-light text-base'>
                                1. Setelah transaksi anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit
                            </div>
                        </div>
                    )}

                    {via == 'iBanking' && (
                        <div className='shadow-sm border border-gray-200 w-full rounded-md p-4 flex flex-col space-y-2'>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 1: Masuk Ke Akun Anda</div>
                            <div className='font-sans font-light text-base'>
                                1. Buka situs{' '}
                                <a href='https://ibank.bni.co.id' target='_blank' className='font-semibold text-primary'>
                                    https://ibank.bni.co.id
                                </a>
                            </div>
                            <div className='font-sans font-light text-base'>2. Masukkan User ID dan Password</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 2: Detail Pembayaran</div>
                            <div className='font-sans font-light text-base'>1. Pilih menu "Transfer"</div>
                            <div className='font-sans font-light text-base'>2. Pilih menu "Virtual Account Billing"</div>
                            <div className='font-sans font-light text-base'>
                                3. Masukkan Nomor Virtual Account <span className='font-bold text-primary'>{transaction.bankNumber}</span>
                            </div>
                            <div className='font-sans font-light text-base'>4. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan "Lanjut"</div>
                            <div className='font-sans font-light text-base'>5. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</div>
                            <div className='font-sans font-light text-base'>6. Masukkan Kode Otentikasi Token</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 3: Transaksi Berhasil</div>
                            <div className='font-sans font-light text-base'>1. Transaksi Anda telah selesai</div>
                            <div className='font-sans font-light text-base'>
                                2. Setelah transaksi Anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit
                            </div>
                        </div>
                    )}

                    {via == 'atm' && (
                        <div className='shadow-sm border border-gray-200 w-full rounded-md p-4 flex flex-col space-y-2'>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 1: Temukan ATM Terdekat</div>
                            <div className='font-sans font-light text-base'>1. Masukkan kartu ATM Anda</div>
                            <div className='font-sans font-light text-base'>2. Pilih bahasa</div>
                            <div className='font-sans font-light text-base'>3. Masukkan PIN ATM Anda</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 2: Detail Pembayaran</div>
                            <div className='font-sans font-light text-base'>1. Pilih "Menu Lainnya"</div>
                            <div className='font-sans font-light text-base'>2. Pilih "Transfer"</div>
                            <div className='font-sans font-light text-base'>3. Pilih jenis rekening yang akan Anda gunakan (contoh: "Dari Rekening Tabungan")</div>
                            <div className='font-sans font-light text-base'>4. Pilih "Virtual Account Billing"</div>
                            <div className='font-sans font-light text-base'>
                                5. Masukkan Nomor Virtual Account Anda <span className='font-bold text-primary'>{transaction.bankNumber}</span>
                            </div>
                            <div className='font-sans font-light text-base'>6. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</div>
                            <div className='font-sans font-light text-base'>7. Konfirmasi, apabila telah sesuai, lanjutkan transaksi</div>
                            <div className='font-sans font-bold text-base text-gray-500 uppercase'>Langkah 3: Transaksi Berhasil</div>
                            <div className='font-sans font-light text-base'>1. Transaksi Anda telah selesai</div>
                            <div className='font-sans font-light text-base'>
                                2. Setelah transaksi Anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Bni
