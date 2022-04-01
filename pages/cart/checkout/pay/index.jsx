import { useRouter } from 'next/router'
import axios from 'axios'
import { getSession, useSession } from 'next-auth/client'
import Layout from '@/components/layout/Layout'
import Bni from '@/components/payment/instruction/Bni'
import Bri from '@/components/payment/instruction/Bri'
import Mandiri from '@/components/payment/instruction/Mandiri'
import Permata from '@/components/payment/instruction/Permata'
import Ovo from '@/components/payment/instruction/Ovo'
import Qris from '@/components/payment/instruction/Qris'
import RetailOutlet from '@/components/payment/instruction/RetailOutlet'
import Gopay from '@/components/payment/instruction/Gopay'
import { useEffect, useState } from 'react'

const index = ({ transaction, session }) => {
    const router = useRouter()
    const [paid, setPaid] = useState(false)

    // const debbounceInterval = useDebounceInterval(paid, 10000)

    useEffect(() => {
        const getTransaction = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`, {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            })
            if (
                data.paymentStatus == 'SETTLED' ||
                data.paymentStatus == 'SETTLEMENT' ||
                data.paymentStatus == 'PAID' ||
                data.paymentStatus == 'PROCESSED' ||
                data.paymentStatus == 'COMPLETED' ||
                data.paymentStatus == 'SUCCESS' ||
                data.paymentStatus == 'SUCCEEDED'
            ) {
                setPaid(true)
            } else {
                setPaid(false)
            }
        }
        const handler = setInterval(() => {
            getTransaction()
        }, 5000)
        return () => {
            clearInterval(handler)
            router.push('/')
        }
    }, [paid])

    return (
        <Layout title='Selesaikan Pembayaran'>
            <div className='container mx-auto px-4 md:px-12 lg:px-16 my-4 md:my-5 2xl:my-6 flex flex-col space-y-2 md:space-y-4 xl:space-y-5 2xl:space-y-6'>
                <h1 className='text-slate-800 font-extrabold text-lg md:text-xl xl:text-2xl 2xl:text-3xl'>Pembayaran</h1>
                {transaction.paymentMethod == 'BNI' && <Bni transaction={transaction} />}
                {transaction.paymentMethod == 'BRI' && <Bri transaction={transaction} />}
                {transaction.paymentMethod == 'MANDIRI' && <Mandiri transaction={transaction} />}
                {transaction.paymentMethod == 'PERMATA' && <Permata transaction={transaction} />}
                {transaction.paymentMethod == 'ID_OVO' && <Ovo transaction={transaction} />}
                {transaction.paymentMethod == 'QRCODE' && <Qris transaction={transaction} />}
                {transaction.paymentMethod == 'ALFAMART' && <RetailOutlet transaction={transaction} />}
                {transaction.paymentMethod == 'INDOMARET' && <RetailOutlet transaction={transaction} />}
                {transaction.paymentMethod == 'GOPAY' && <Gopay transaction={transaction} />}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: { destination: '/', permanent: false },
        }
    }

    const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?user=${session.id}&paymentStatus=PENDING&paymentStatus=ACTIVE`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })

    const transaction = await getTransaction.data[0]

    if (!transaction) return { redirect: { destination: '/', permanent: false } }

    return {
        props: {
            transaction,
            session,
        },
    }
}

export default index
