import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import Hero from '@/components/layout/Hero'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'
import kaldera from '../public/images/banner/kaldera.jpg'
import banner from '../public/images/banner/banner.png'
import { setOrder } from '@/redux/orderSlice'

const Home = ({ products, promo, recommended }) => {
    const [session, loading] = useSession()

    const dispatch = useDispatch()

    if (session) {
        const setLocalStorageCart = async () => {
            const { data } = await axios.get('/api/cart')
            !data ? dispatch(setOrder([])) : dispatch(setOrder(data))
        }

        setLocalStorageCart()
    }

    return (
        <>
            <Layout title='Liburan seru bareng Lokaloka.id'>
                {/* Hero */}
                <Hero />

                {/* Product Section */}
                <HighlightedSection sectionTitle='Promo' href='#' data={promo} bgColor='bg-white' />

                {/* Promo Campaign */}
                <div className='container mx-auto px-4 2xl:px-0 md:my-5 xl:my-6'>
                    <div className='rounded-md bg-blueGray-200 lg:p-4 2xl:p-6 h-auto flex justify-between space-x-6 items-center'>
                        <div className='w-full h-full bg-blueGray-600 rounded-md'>
                            <Image src={banner} alt='Promo' placeholder='blur' layout='responsive' width={1319} priority quality={100} height={250} />
                        </div>
                    </div>
                </div>

                <HighlightedSection sectionTitle='Rekomendasi' href='#' data={recommended} />

                <div className='container mx-auto px-4 2xl:px-0 md:my-5 xl:my-6'>
                    <div className='rounded-md bg-blueGray-200 h-auto flex justify-between space-x-6 items-center'>
                        <div className='w-full h-full bg-blueGray-600 rounded-md'>
                            <Image src={kaldera} alt='campaign' placeholder='blur' className='rounded-md' layout='responsive' width={3000} height={1500} priority quality={100} />
                        </div>
                    </div>
                </div>

                {/* Just For You */}
                <JustForYou sectionTitle='Hanya Untukmu' href='#' data={products} />
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
