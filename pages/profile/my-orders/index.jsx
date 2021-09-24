import axios from 'axios'
import { getSession, useSession } from 'next-auth/client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import moment from 'moment'
import NumberFormat from 'react-number-format'

const index = ({ user, session }) => {
    const [input, setInput] = useState('')
    const [filtered, setFiltered] = useState([])
    const [status, setStatus] = useState('')

    const ref = useRef(null)

    useEffect(() => {
        import('@lottiefiles/lottie-player')
    })

    useEffect(async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?user=${session.id}${input}${status}&_sort=createdAt:DESC`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        })
        setFiltered(data)
    }, [status, input])

    const handleInputSearch = async (e) => {
        const temp = await filtered.filter((transaction) => transaction.code.includes(e.target.value.toUpperCase()))
        setInput('&code_contains=' + e.target.value.toUpperCase())
        setFiltered(temp)
    }

    return (
        <Layout title='Pesanan Saya'>
            <div className='container mx-auto px-4 2xl:px-0 md:my-4 xl:my-5 2xl:my-6 flex flex-col md:space-y-4 xl:space-y-5 2xl:space-y-6'>
                <div className='text-blueGray-800 font-extrabold leading-loose md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>Pesanan saya</div>
                <div className='rounded-lg w-full'>
                    <div className='relative'>
                        <Image src='/images/account/member.png' className='rounded-lg shadow' layout='responsive' width={1680} height={295} priority objectFit='cover' />
                        <div className='absolute md:top-5 md:left-8 xl:top-8 xl:left-8 2xl:top-12 2xl:left-12'>
                            <div className='flex items-center space-x-8'>
                                {!session.user.image && (
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${session.user.name}`}
                                        className='rounded-full md:w-20 xl:w-40 2xl:w-44 md:h-20 xl:h-40 2xl:h-44 shadow'
                                    />
                                )}
                                {session.user.image && <img src={session.user.image} className='rounded-full md:w-20 xl:w-40 2xl:w-44 md:h-20 xl:h-40 2xl:h-44 shadow' />}
                                <div className='flex flex-col md:space-y-2 xl:space-y-6 2xl:space-y-8 h-full'>
                                    <div className='flex space-x-4 items-center'>
                                        <span className='lg:text-xl xl:text-2xl font-bold text-white'>{user.name}</span>
                                        <div className='flex space-x-2 items-center px-2 py-1 rounded bg-blue-500 bg-opacity-50'>
                                            <span className='text-white text-xs'>Terverifikasi</span>
                                            <lottie-player
                                                src='https://assets2.lottiefiles.com/packages/lf20_bvjhz66u.json'
                                                id='verified'
                                                ref={ref}
                                                autoplay
                                                mode='normal'
                                                style={{ width: '1.25rem', height: '1.25rem' }}
                                            ></lottie-player>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:space-y-1 xl:space-y-2'>
                                        <div className='text-sm text-blueGray-200'>Keuntungan</div>
                                        <div className='flex space-x-4'>
                                            <div className='rounded md:p-1 xl:p-2 bg-gradient-to-tr from-blue-500 to-indigo-500'>
                                                <h3 className='md:text-sm lg:text-lg xl:text-xl font-bold text-white'>SELECTA20</h3>
                                                <span className='hidden lg:block text-blueGray-200 text-xs'>Gratis biaya pengiriman</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='absolute md:top-4 md:right-8 xl:top-9 xl:right-8 2xl:top-14 2xl:right-12'>
                            <div className='flex flex-col md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-8 justify-between items-center'>
                                <div className='md:w-20 md:h-20 xl:h-24 xl:w-24'>
                                    <lottie-player
                                        id='medal'
                                        ref={ref}
                                        autoplay
                                        mode='normal'
                                        src='https://assets1.lottiefiles.com/packages/lf20_BCXrjU.json'
                                        style={{ width: 'auto', height: 'auto' }}
                                    ></lottie-player>
                                </div>
                                <h2 className='md:hidden lg:block lg:text-lg xl:text-xl font-bold text-orange-500'>Member Gold</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-4'>
                    <div className='w-2/12'>
                        <ul className='flex flex-col space-y-2'>
                            <li className='p-2 bg-blueGray-100 rounded text-blueGray-500'>
                                <Link href='/profile/my-account'>Akun</Link>
                            </li>
                            <li className='p-2 bg-blueGray-100 rounded font-semibold text-blueGray-500'>
                                <Link href='/profile/my-orders'>Pesanan saya</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-10/12 flex flex-col space-y-2'>
                        <div className='flex space-x-4 items-center'>
                            <div onClick={() => setStatus('')} className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}>
                                Semua
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus_in=UNPAID&paymentStatus_in=ACTIVE&paymentStatus_in=PENDING')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Belum dibayar
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus=SENT')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Diproses
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus_in=SUCCESS&paymentStatus_in=SUCCEEDED&paymentStatus_in=PAID&paymentStatus_in=COMPLETED')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Selesai
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus=CANCELED')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Dibatalkan
                            </div>
                        </div>
                        <input
                            type='text'
                            name='transaction-code'
                            id='transaction-code'
                            onChange={handleInputSearch}
                            placeholder='Cari berdasarkan Kode Transaksi'
                            className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-200 rounded-md'
                        />
                        {filtered.map((transaction, i) => {
                            return (
                                <div key={i} className='flex flex-col space-y-2 rounded p-4 shadow-sm bg-white border border-blueGray-200'>
                                    <div className='flex justify-between w-full items-center'>
                                        <span className='text-xs text-blueGray-600'>{transaction.code}</span>
                                        <span className='text-xs text-blueGray-600'>{moment(transaction.createdAt).format('DD MMMM YYYY - HH:mm')}</span>
                                    </div>
                                    <div className='flex space-x-2 w-full items-center'>
                                        <span
                                            className={`text-xs px-2 py-1 rounded w-max text-white ${
                                                (transaction.paymentStatus == 'PENDING' && 'bg-red-400') || (transaction.paymentStatus == 'ACTIVE' && 'bg-red-400')
                                            } ${
                                                (transaction.paymentStatus == 'SUCCESS' && 'bg-green-400') ||
                                                (transaction.paymentStatus == 'SUCCEEDED' && 'bg-green-400') ||
                                                (transaction.paymentStatus == 'COMPLETED' && 'bg-green-400') ||
                                                (transaction.paymentStatus == 'PAID' && 'bg-green-400')
                                            }`}
                                        >
                                            {(transaction.paymentStatus == 'SUCCESS' && 'LUNAS') ||
                                                (transaction.paymentStatus == 'SUCCEEDED' && 'LUNAS') ||
                                                (transaction.paymentStatus == 'COMPLETED' && 'LUNAS') ||
                                                (transaction.paymentStatus == 'PAID' && 'LUNAS') ||
                                                (transaction.paymentStatus == 'PENDING' && 'MENUNGGU PEMBAYARAN') ||
                                                (transaction.paymentStatus == 'ACTIVE' && 'MENUNGGU PEMBAYARAN')}
                                        </span>
                                        <p className={`text-base p-2 rounded w-max text-blueGray-800 font-bold`}>{transaction.paymentMethod.toUpperCase().replace('ID_', '')}</p>
                                    </div>
                                    <div className='flex justify-between items-start'>
                                        <div className='md:w-8/12 xl:w-full flex space-x-2 items-start'>
                                            <div className='w-20 h-20'>
                                                <Image
                                                    src={`${transaction.products[0].product.images[0].url}`}
                                                    layout='responsive'
                                                    className='rounded'
                                                    objectFit='cover'
                                                    width={1}
                                                    height={1}
                                                    priority
                                                />
                                            </div>
                                            <div className='flex flex-col space-y-2'>
                                                <span className='md:text-base xl:text-lg font-semibold'>{transaction.products[0].product.name}</span>
                                                <span className='text-sm text-blue-400 cursor-pointer'>
                                                    {transaction.productsOrigin.length > 1 && <span>{transaction.productsOrigin.length - 1} produk lainnya</span>}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='md:w-4/12 xl:w-full flex items-end flex-col space-y-2'>
                                            <span className='text-sm text-blueGray-400'>Total Harga</span>
                                            <NumberFormat
                                                value={transaction.totalPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Rp. '}
                                                className='md:text-lg xl:text-2xl 2xl:text-3xl font-extrabold text-blue-500'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession({ ctx })

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permament: false,
            },
        }
    }

    const getUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })
    const user = await getUser.data

    const getTransactionByUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?_sort=createdAt:DESC`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })
    const transactions = await getTransactionByUser.data

    return {
        props: {
            user,
            transactions,
            session,
        },
    }
}

export default index
