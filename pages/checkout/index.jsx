import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Layout from '@/components/layout/Layout'
import { setOrder } from '@/redux/orderSlice'
import axios from 'axios'

const index = ({ session }) => {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order.value)

    // Get Order Data
    const getOrder = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?user_eq=${session.id}`)
        dispatch(setOrder(data[0]))
    }

    // Call Get Order Func
    getOrder()

    const router = useRouter()

    return (
        <Layout title='Select Payment Method'>
            <div className='container mx-auto'>
                <h1>Payment Methods</h1>
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
