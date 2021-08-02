import { useSelector } from 'react-redux'
import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

const index = ({ session }) => {
    const order = useSelector((state) => state.order.value)

    const router = useRouter()

    return (
        <Layout title='Select Payment Method'>
            <div className='container mx-auto'>
                <h1>Payment Methods</h1>
                {JSON.stringify(order)}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (contex) => {
    const session = await getSession(contex)
    if (!session) {
        return { notFound: true }
    }

    return {
        props: {
            session,
        },
    }
}

export default index
