import { useRouter } from 'next/router'
import axios from 'axios'
import { getSession } from 'next-auth/client'
import Layout from '@/components/layout/Layout'
import Bni from '@/components/payment/instruction/Bni'
import Bri from '@/components/payment/instruction/Bri'
import Mandiri from '@/components/payment/instruction/Mandiri'
import Permata from '@/components/payment/instruction/Permata'
import Ovo from '@/components/payment/instruction/Ovo'
import Qris from '@/components/payment/instruction/Qris'
import RetailOutlet from '@/components/payment/instruction/RetailOutlet'
import Gopay from '@/components/payment/instruction/Gopay'
import { useState } from 'react'

const index = ({ transaction }) => {
    const router = useRouter()
    const [paid, setPaid] = useState(false)

    const getTransactionStatus = async () => {
        const { data } = await axios.get(`/api/transactions/check/${transaction.id}`)

        if (
            data.paymentStatus == 'SETTLED' ||
            data.paymentStatus == 'PAID' ||
            data.paymentStatus == 'COMPLETED' ||
            data.paymentStatus == 'SUCCESS' ||
            data.paymentStatus == 'SUCEEDED'
        ) {
            setPaid(true)
            return router.push('/')
        }
        setPaid(false)
        return
    }

    if (!paid) {
        setInterval(() => {
            getTransactionStatus()
        }, 10000)
    }

    return (
        <Layout title='Selesaikan Pembayaran'>
            <div className='container mx-auto px-4 2xl:px-0 md:my-4 xl:my-5 2xl:my-6 flex flex-col md:space-y-4 xl:space-y-5 2xl:space-y-6'>
                <h1 className='text-blueGray-800 font-extrabold md:text-xl xl:text-2xl 2xl:text-3xl'>Pembayaran</h1>
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
        },
    }
}

export default index
