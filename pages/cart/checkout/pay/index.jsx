import axios from 'axios'
import { getSession } from 'next-auth/client'
import Layout from '@/components/layout/Layout'
import Bni from '@/components/payment/instruction/Bni'
import Bri from '@/components/payment/instruction/Bri'
import Mandiri from '@/components/payment/instruction/Mandiri'
import Permata from '@/components/payment/instruction/Permata'

const index = ({ transaction }) => {
    return (
        <Layout title='Payment'>
            <div className='container mx-auto my-6 flex flex-col space-y-6'>
                <h1 className='text-blueGray-800 font-extrabold text-3xl'>Payment</h1>
                {transaction.paymentMethod == 'BNI' && <Bni transaction={transaction} />}
                {transaction.paymentMethod == 'BRI' && <Bri transaction={transaction} />}
                {transaction.paymentMethod == 'MANDIRI' && <Mandiri transaction={transaction} />}
                {transaction.paymentMethod == 'PERMATA' && <Permata transaction={transaction} />}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?user=${session.id}&paymentStatus=PENDING`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })

    const transaction = getTransaction.data[0]

    if (!transaction) return { redirect: { destination: '/', permanent: flase } }

    return {
        props: {
            session,
            transaction,
        },
    }
}

export default index
