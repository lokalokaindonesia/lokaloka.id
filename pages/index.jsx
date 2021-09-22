import Hero from '@/components/layout/Hero'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'
import Promo from '@/components/ui/Promo'
import { setOrder } from '@/redux/orderSlice'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'

const Home = ({ products, promo, recommended }) => {
    const [session, loading] = useSession()

    const dispatch = useDispatch()

    if (session) {
        const setLocalStorageCart = async () => {
            const { data } = await axios.get('/api/cart')
            dispatch(setOrder(data))
        }

        setLocalStorageCart()
    }

    return (
        <>
            <Layout title='Liburan seru bareng Lokaloka.id'>
                {/* Hero */}
                <Hero />

                {/* Category */}
                <div className='container mx-auto my-10'>
                    <div className='rounded bg-blueGray-200 p-6 h-72 flex justify-between space-x-6 items-center'>
                        <div className='w-1/2 h-full bg-blueGray-600 rounded'></div>
                        <div className='w-1/2 h-full flex flex-col space-y-6 items-center justify-between'>
                            <div className='w-full h-full bg-blueGray-600 rounded'></div>
                            <div className='w-full h-full bg-blueGray-600 rounded'></div>
                        </div>
                    </div>
                </div>

                {/* Product Section */}
                <HighlightedSection sectionTitle='Promo' href='#' data={promo} bgColor='bg-white' />
                <HighlightedSection sectionTitle='Recommended' href='#' data={recommended} />
                {/* Promo Campaign */}
                <Promo />
                {/* Just For You */}
                <JustForYou sectionTitle='Just For You' href='#' data={products} />
            </Layout>
        </>
    )
}

export const getStaticProps = async () => {
    const getProducts = await axios.get(`${process.env.NEXT_URL}/api/products`)
    const products = await getProducts.data.splice(0, 42)

    const getPromo = await products.filter((item) => item.discount != 0)
    const promo = await getPromo.splice(0, 12)
    const getRecommended = await products.filter((item) => item.isRecommended == true)
    const recommended = await getRecommended.splice(0, 12)

    if (!products) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products, promo, recommended, revalidate: 1 },
    }
}

export default Home
