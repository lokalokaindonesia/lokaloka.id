import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'
import kaldera from '../public/images/banner/kaldera.jpg'
import banner from '../public/images/promo/12-15-21.jpg'
import { setOrder } from '@/redux/orderSlice'
import { Fragment } from 'react'
import Category from '@/components/layout/Category'
import Carousel from '@/components/layout/Carousel'
import Script from 'next/script'

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
    console.log(products)

    return (
        <Fragment>
            <Layout title='Lokaloka - Belanja oleh-oleh online'>
                {/* Hero */}
                {/* <Hero /> */}
                <Carousel />

                <Category />
                {/* End Category */}
                {/* Product Section */}
                {promo.length != 0 && <HighlightedSection sectionTitle='Promo' href='/specials/promo' data={promo} bgColor='bg-white' />}
                {/* Promo Campaign */}
                {/* <div
                    className='cursor-pointer drop-shadow-md my-4 md:mt-8 md:mb-4 px-4 md:px-12 lg:px-16 container mx-auto'
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
                </div> */}

                <HighlightedSection sectionTitle='Rekomendasi' href='/specials/recommended' data={recommended} />

                {/* <div className='my-4 md:mt-8 md:mb-4 px-4 md:px-12 lg:px-16 drop-shadow-lg container mx-auto'>
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
                </div> */}

                {/* Just For You */}
                <JustForYou sectionTitle='Hanya Untukmu' href='#' data={products} />
            </Layout>
        </Fragment>
    )
}

export const getServerSideProps = async ({ req, res }) => {
    const { data } = await axios.get(`${process.env.NEXT_URL}/api/products`)
    const shuffledProducts = await data.sort(() => Math.random() - 0.5)
    const products = await shuffledProducts.splice(0, 42)

    const { data: getPromo } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?discount_gt=0`)
    const promo = await getPromo.splice(0, 12)

    const { data: getRecommended } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?isRecommended=true`)
    const recommended = await getRecommended.splice(0, 12)

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products, promo, recommended },
    }
}

export default Home
