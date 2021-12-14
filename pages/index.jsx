import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'
import kaldera from '../public/images/banner/kaldera.jpg'
import banner from '../public/images/banner/banner.png'
import { setOrder } from '@/redux/orderSlice'
import { Fragment } from 'react'
import Category from '@/components/layout/Category'
import Carousel from '@/components/layout/Carousel'
import CarouselMobile from '@/components/layout/CarouselMobile'

const Home = ({ products, promo, recommended }) => {
    const [session, loading] = useSession()

    const dispatch = useDispatch()

    const router = useRouter()

    if (session) {
        const setLocalStorageCart = async () => {
            const { data } = await axios.get('/api/cart')
            !data ? dispatch(setOrder([])) : dispatch(setOrder(data))
        }

        setLocalStorageCart()
    }

    return (
        <Fragment>
            <Layout title='Liburan seru bareng Lokaloka.id'>
                {/* Hero */}
                {/* <Hero /> */}
                <Carousel />
                <CarouselMobile />

                <Category />
                {/* End Category */}
                {/* Product Section */}
                {promo.length != 0 && <HighlightedSection sectionTitle='Promo' href='/specials/promo' data={promo} bgColor='bg-white' />}
                {/* Promo Campaign */}
                <div
                    className='cursor-pointer my-4 md:mt-8 md:mb-4 px-4 2xl:px-0 container mx-auto'
                    onClick={() => {
                        router.push('/specials/promo')
                    }}
                >
                    <Image
                        src={banner}
                        alt='Promo'
                        className='rounded-md shadow shadow-slate-500/20'
                        placeholder='blur'
                        layout='responsive'
                        width={1319}
                        priority
                        quality={100}
                        height={250}
                    />
                </div>

                <HighlightedSection sectionTitle='Rekomendasi' href='/specials/recommended' data={recommended} />

                <div className='my-4 md:mt-8 md:mb-4 px-4 2xl:px-0 container mx-auto'>
                    <a target='_blank' href='https://kalderaadventure.com'>
                        <Image
                            src={kaldera}
                            alt='Promo'
                            className='rounded-md shadow shadow-slate-500/20'
                            placeholder='blur'
                            layout='responsive'
                            priority
                            quality={100}
                            width={3000}
                            height={1500}
                        />
                    </a>
                </div>

                {/* Just For You */}
                <JustForYou sectionTitle='Hanya Untukmu' href='#' data={products} />
            </Layout>
        </Fragment>
    )
}

export const getServerSideProps = async () => {
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
        props: { products, promo, recommended },
    }
}

export default Home
