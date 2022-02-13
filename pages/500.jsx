import Head from 'next/head'
import Link from 'next/link'

const Custom505 = () => {
    return (
        <div>
            <Head>
                <title>Server sedang bermasalah!</title>
            </Head>
            <div className='flex items-center justify-center w-screen h-screen'>
                <div className='px-4 lg:py-12'>
                    <div className='lg:gap-4 lg:flex'>
                        <div className='flex flex-col items-center justify-center md:py-24 lg:py-32'>
                            <h1 className='font-bold text-blue-600 text-9xl'>404</h1>
                            <p className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
                                <span className='text-red-500'>Oops!</span> Server Error.
                            </p>
                            <p className='mb-8 text-center text-gray-500 md:text-lg'>Maaf atas kendalanya. 🙏</p>
                            <Link href='/'>
                                <button className='px-6 py-2 rounded text-sm font-semibold text-blue-600 bg-blue-100'>He Halaman Utama</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Custom505
