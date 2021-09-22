import axios from 'axios'
import { getSession, useSession } from 'next-auth/client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { setTransaction } from '@/redux/transactionSlice'
import { useDispatch, useSelector } from 'react-redux'
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
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?user=${session.id}${input}${status}`, {
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
        <Layout title='My order'>
            <div className='container mx-auto my-6 flex flex-col space-y-6'>
                <div className='text-blueGray-800 font-extrabold leading-loose text-3xl'>My Orders</div>
                <div className='rounded-lg w-full'>
                    <div className='relative'>
                        <Image src='/images/account/member.png' className='rounded-lg shadow' layout='responsive' width={1680} height={295} priority objectFit='cover' />
                        <div className='absolute top-12 left-12'>
                            <div className='flex items-center space-x-8'>
                                {!session.user.image && <img src={`https://ui-avatars.com/api/?name=${session.user.name}`} className='rounded-full w-44 h-44 shadow' />}
                                {session.user.image && <img src={session.user.image} className='rounded-full w-44 h-44 shadow' />}
                                <div className='flex flex-col space-y-8 h-full'>
                                    <div className='flex space-x-4 items-center'>
                                        <span className='text-2xl font-bold text-white'>{user.name}</span>
                                        <div className='flex space-x-2 items-center px-2 py-1 rounded bg-blue-500 bg-opacity-50'>
                                            <span className='text-white text-xs'>Verified</span>
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
                                    <div className='flex flex-col space-y-2'>
                                        <div className='text-sm text-blueGray-200'>Weekly Benefit</div>
                                        <div className='flex space-x-4'>
                                            <div className='rounded p-2 shadow-sm bg-gradient-to-tr from-blue-500 to-indigo-500'>
                                                <h3 className='text-xl font-bold text-white'>SELECTA20</h3>
                                                <span className='text-blueGray-200 text-xs'>Free Shipping Fee</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='absolute top-14 right-12'>
                            <div className='flex flex-col space-y-8 justify-between items-center'>
                                <div className='h-28 w-28'>
                                    <lottie-player
                                        id='medal'
                                        ref={ref}
                                        autoplay
                                        mode='normal'
                                        src='https://assets1.lottiefiles.com/packages/lf20_BCXrjU.json'
                                        style={{ width: 'auto', height: 'auto' }}
                                    ></lottie-player>
                                </div>
                                <h2 className='text-xl font-bold text-orange-500'>Gold Member</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-4'>
                    <div className='w-2/12'>
                        <ul className='flex flex-col space-y-2'>
                            <li className='p-2 bg-blueGray-100 rounded text-blueGray-500'>
                                <Link href='/profile/my-account'>My Account</Link>
                            </li>
                            <li className='p-2 bg-blueGray-100 rounded font-semibold text-blueGray-500'>
                                <Link href='/profile/my-orders'>My Order</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-10/12 flex flex-col space-y-2'>
                        <div className='flex space-x-4 items-center'>
                            <div onClick={() => setStatus('')} className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}>
                                All
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus_in=UNPAID&paymentStatus_in=ACTIVE&paymentStatus_in=PENDING')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Unpaid
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus=PACKED')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Packed
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus=SENT')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Sent
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus_in=SUCCESS&paymentStatus_in=SUCCEEDED&paymentStatus_in=PAID&paymentStatus_in=COMPLETED')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Finished
                            </div>
                            <div
                                onClick={() => setStatus('&paymentStatus=CANCELED')}
                                className={`cursor-pointer rounded px-8 py-2 text-sm text-blueGray-600 border border-blueGray-200`}
                            >
                                Canceled
                            </div>
                        </div>
                        <input
                            type='text'
                            name='transaction-code'
                            id='transaction-code'
                            onChange={handleInputSearch}
                            placeholder='Search by Transaction Code'
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
                                            {(transaction.paymentStatus == 'SUCCESS' && 'PAID') ||
                                                (transaction.paymentStatus == 'SUCCEEDED' && 'PAID') ||
                                                (transaction.paymentStatus == 'COMPLETED' && 'PAID') ||
                                                (transaction.paymentStatus == 'PAID' && 'PAID')}
                                        </span>
                                        <p className={`text-base p-2 rounded w-max text-blueGray-800 font-bold`}>{transaction.paymentMethod.toUpperCase().replace('ID_', '')}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex space-x-2 items-start'>
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
                                                <span className='text-lg font-semibold'>{transaction.products[0].product.name}</span>
                                                <span className='text-sm text-blue-400 cursor-pointer'>
                                                    {transaction.productsOrigin.length > 1 && <span>{transaction.productsOrigin.length - 1} more item(s)</span>}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-2'>
                                            <span className='text-sm text-blueGray-400'>Total Price</span>
                                            <NumberFormat
                                                value={transaction.totalPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Rp. '}
                                                className='text-3xl font-extrabold text-blue-500'
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

    const getTransactionByUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
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
