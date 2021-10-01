import Layout from '@/components/layout/Layout'

const index = () => {
    return (
        <Layout title='Syarat dan Ketentuan | Lokaloka.id'>
            <div className='container mx-auto px-4 md:px-0 flex justify-start space-x-4 my-4 md:my-5 lg:my-6'>
                <div className='flex flex-col space-y-4'>
                    <h1 className='text-2xl font-bold'>Syarat dan Ketentuan Lokaloka</h1>
                    <hr />
                    <span className='text-xl font-medium'> A. Ketentuan Umum </span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li className=''>
                            Dengan menggunakan, berbelanja dan/atau mendaftarkan diri Anda di lokaloka.id, berarti Anda setuju untuk terikat dan patuh pada syarat dan ketentuan
                            yang berlaku.
                        </li>
                        <li className=''>Syarat dan ketentuan ini dapat berubah sewaktu-waktu sesuai kebutuhan dan dapat dipertanggung jawabkan</li>
                        <li className=''>
                            Syarat dan ketentuan ini kami buat untuk kepentingan bersama, untuk menjaga hak dan kewajiban masing-masing pihak, dan tidak dimaksudkan untuk merugikan
                            salah satu pihak.
                        </li>
                    </ol>
                    <span className='text-xl font-medium'>B. Informasi Produk </span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li className=''>
                            Dengan melakukan transaksi pemesanan secara online di lokaloka.id, Anda kami anggap telah mengerti informasi produk yang akan Anda beli.
                        </li>
                        <li className=''>
                            Produk yang tersedia di lokaloka.id sesuai dengan katalog online. Kami berusaha menyajikan data seakurat mungkin tanpa rekayasa agar Anda selaku pembeli
                            tidak dirugikan.
                        </li>
                        <li className=''>Informasi produk kami peroleh secara resmi dari pihak yang telah bekerjasama dengan kami.</li>
                        <li className=''>
                            Perbedaan warna dalam foto/gambar produk yang kami tampilkan di lokaloka.id bisa diakibatkan oleh faktor pencahayaan dan setting/resolusi monitor
                            komputer, dan karena itu tidak dapat dijadikan acuan yang bersifat mutlak.
                        </li>
                        <li className=''>
                            Harga produk dalam situs ini adalah benar pada saat dicantumkan. Harga yang tercantum adalah harga produk semata, tidak termasuk ongkos kirim. Ongkos
                            kirim dihitung otomatis (berdasarkan harga dari jasa kurir) sesuai dengan alamat pengiriman yang Anda berikan pada saat transaksi pemesanan.
                        </li>
                    </ol>
                    <span className='text-xl font-medium'>C. Pemesanan dan Pembatalan </span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li className=''>
                            Pemesanan bisa Anda lakukan untuk tujuan pengiriman ke seluruh wilayah yang terlayani oleh pihak kurir yang kami tunjuk. Untuk mempercepat proses
                            pemesanan, silakan konfirmasi ke Customer Service kami setelah Anda melakukan pemesanan.
                        </li>
                        <li className=''>
                            Kami memberikan batas waktu pembayaran selama 1x24 jam sejak Anda menyelesaikan transaksi pembelian. Apabila Anda belum melakukan pembayaran setelah
                            batas waktu tersebut, maka pembelian akan dibatalkan secara otomatis.
                        </li>
                        <li className=''>Pembatalan pesanan dapat Anda lakukan sebelum pembayaran. Jika Anda telah melakukan pembayaran, pesanan tidak dapat Anda batalkan.</li>
                    </ol>
                    <span className='text-xl font-medium'>D. Pembayaran</span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li>Mata uang yang dipakai untuk pembayaran adalah Rupiah (IDR).</li>
                        <li>Pembayaran bisa melalui OVO, LinkAja, Dana, Shopeepay, Qris dan Virtual Account dengan syarat yang telah ditetapkan.</li>
                        <li>Pembayaran dianggap lunas jika uang telah kami terima sesuai dengan jumlah yang harus dibayarkan.</li>
                        <li>Biaya administrasi diluar tagihan pembayaran ditanggung oleh pembeli.</li>
                        <li>Keterlambatan proses transfer antarbank bukan menjadi tanggung jawab kami.</li>
                        <li>Kelalaian penulisan rekening dan informasi lainnya atau kelalaian pihak bank pada saat Anda melakukan pembayaran bukan menjadi tanggung jawab kami.</li>
                    </ol>
                    <span className='text-xl font-medium'>E. Pengiriman</span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li>Pesanan Anda akan kami kirim segera setelah pembayaran lunas. Status pengiriman akan kami informasikan melalui data kontak Anda (email/whatsapp).</li>
                        <li>Pesanan Anda akan kami kirim ke alamat yang Anda cantumkan saat transaksi pemesanan.</li>
                        <li>
                            Kesalahan Anda dalam mencantumkan alamat pengiriman sehingga menyebabkan paket kiriman tidak sampai atau tidak Anda terima bukan menjadi tanggung jawab
                            kami.
                        </li>
                        <li>Pengiriman dilakukan oleh pihak kurir yang kami tunjuk. Biaya pengiriman ditanggung oleh pembeli.</li>
                        <li>
                            Lama waktu pengiriman menyesuaikan jumlah/ukuran barang yang Anda pilih saat transaksi pemesanan. Jaminan kepastian waktu pengiriman sepenuhnya menjadi
                            tanggung jawab pihak kami. Kompensasi atas keterlambatan dan atau kehilangan barang sepenuhnya menjadi tanggung jawab kami.
                        </li>
                        <li>Anda dapat memantau status pengiriman melalui website maupun Customer Service yang telah tersedia.</li>
                        <li>Setelah barang pembelian Anda terima, segera konfirmasi untuk menyelesaikan transaksi.</li>
                    </ol>
                    <span className='text-xl font-medium'>F. Retur Produk</span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li>
                            Kami pastikan pesanan Anda telah kami cek ulang sesuai data pesanan serta kami kemas dengan baik sebelum kami kirim. Pada saat menerima paket kiriman,
                            Anda wajib melakukan pengecekan terhadap kondisi produk.
                        </li>
                        <li>
                            Jika produk yang Anda terima tidak sesuai data pesanan atau terdapat kerusakan, maka produk tersebut dapat ditukarkan dengan produk yang sama kepada
                            kami sesuai dengan ketentuan dan telah terverifikasi.
                        </li>
                        <li>Biaya pengiriman/pengembalian produk yang dinyatakan rusak atau tidak sesuai pesanan ditanggung oleh kami.</li>
                        <li>
                            Pemberitahuan penerimaan produk tidak sesuai pesanan atau rusak kami layani paling lambat 1 (hari) hari sejak produk Anda terima di jam operasional.
                            Jika dalam batas waktu tersebut tidak ada pemberitahuan, maka produk yang kami kirimkan dianggap telah sesuai dengan data pesanan Anda dan tidak rusak.
                        </li>
                        <li>Produk yang Anda beli di luar lokaloka.id tidak dapat dikembalikan/ditukarkan kepada kami.</li>
                    </ol>
                    <span className='text-xl font-medium'>G. Pengembalian Uang (Refund)</span>
                    <ol className='text-base font-medium ml-10 list-decimal'>
                        <li>Pengembalian uang (refund) hanya berlaku apabila terjadi kesalahan proses transaksi pada pihak kami dan telah disetujui oleh kedua belah pihak.</li>
                        <li>Pengembalian uang dilakukan maksimal dalam waktu 3 x 24 jam, terhitung sejak tanggal kesepakatan refund.</li>
                        <li>Besarnya uang yang dikembalikan sesuai dengan jumlah transaksi yang tertera pada tagihan pembelian.</li>
                        <li>Pengembalian uang dilakukan melalui transfer ke rekening Anda.</li>
                        <li>Kami akan memberikan konfirmasi kepada Anda dalam bentuk email/whatsapp bahwa pengembalian uang telah selesai dilakukan.</li>
                    </ol>
                </div>
            </div>
        </Layout>
    )
}

export default index
