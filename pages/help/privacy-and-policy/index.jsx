import Layout from '@/components/layout/Layout'

const index = () => {
    return (
        <Layout title='Kebijakan Privasi | Lokaloka'>
            <div className='container mx-auto px-4 md:px-12 lg:px-16 flex justify-start space-x-4 my-4 md:mt-5 lg:my-6'>
                <div className='flex flex-col space-y-4'>
                    <h1 className='text-2xl font-bold'>Kebijakan Pribadi</h1>
                    <hr />
                    <p>
                        Perlindungan data adalah masalah kepercayaan dan privasi Anda sangat penting bagi kami. Kami hanya akan menggunakan nama Anda dan informasi yang berhubungan
                        dengan Anda sebagaimana yang dinyatakan dalam Kebijakan Privasi berikut.
                    </p>
                    <p>
                        Kami hanya akan mengumpulkan informasi yang kami perlukan dan relevan dengan transaksi di dalam platform{' '}
                        <a href='https://lokaloka.id' className='underline text-orange-500' target='_blank'>
                            lokaloka.id
                        </a>
                        . Anda dapat mengunjungi situs kami dan menjelajahinya tanpa harus memberikan informasi bersifat pribadi.
                    </p>
                    <p className='font-bold'>Pengumpulan Informasi Pribadi</p>
                    <p>
                        <a href='https://lokaloka.id' className='underline text-orange-500' target='_blank'>
                            lokaloka.id
                        </a>{' '}
                        tidak menjual, membagi atau memperjualbelikan informasi pribadi pelanggan yang dikumpulkan secara online melalui pihak manapun.
                    </p>
                    <p>
                        Informasi pribadi yang kami kumpulkan, ketika Anda membuat akun di{' '}
                        <a href='https://lokaloka.id' className='underline text-orange-500' target='_blank'>
                            lokaloka.id
                        </a>
                    </p>
                    <ul className='text-base font-medium ml-10 list-disc'>
                        <li>Nama</li>
                        <li>Alamat Pengiriman</li>
                        <li>Alamat Email</li>
                        <li>Nomor Telepon</li>
                    </ul>
                    <p>Informasi pribadi yang kami kumpulkan dari Anda akan digunakan untuk hal-hal seperti:</p>
                    <ul className='font-medium ml-10 list-disc'>
                        <li>
                            Untuk mengirimkan produk yang telah Anda beli di{' '}
                            <a href='https://lokaloka.id' className='underline text-orange-500' target='_blank'>
                                lokaloka.id
                            </a>
                        </li>
                        <li>Untuk menginformasikan Anda tentang pengiriman barang dan bantuan customer service</li>
                        <li>Untuk memberikan informasi produk kami.</li>
                        <li>
                            Untuk memproses pesanan dan memberikan layanan maupun informasi yang kami tawarkan di{' '}
                            <a href='https://lokaloka.id' className='underline text-orange-500' target='_blank'>
                                lokaloka.id
                            </a>
                            .
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default index
