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

const index = ({ transaction }) => {
    const router = useRouter()

    const getTransactionStatus = async () => {
        const { data } = await axios.get(`/api/transactions/check/${transaction.id}`)

        if (data.paymentStatus == 'SETTLED' || data.paymentStatus == 'PAID' || data.paymentStatus == 'COMPLETED' || data.paymentStatus == 'SUCCESS') {
            return router.push('/')
        }
    }

    setInterval(() => {
        getTransactionStatus()
    }, 10000)

    return (
        <Layout title='Payment'>
            <div className='container mx-auto my-6 flex flex-col space-y-6'>
                <h1 className='text-blueGray-800 font-extrabold text-3xl'>Payment</h1>
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

    const transaction = getTransaction.data[0]

    if (!transaction) return { redirect: { destination: '/', permanent: false } }

    return {
        props: {
            transaction,
        },
    }
}

export default index
