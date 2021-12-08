import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Hero from '@/components/layout/Hero'
import HighlightedSection from '@/components/layout/HighlightedSection'
import JustForYou from '@/components/layout/JustForYou'
import Layout from '@/components/layout/Layout'
import kaldera from '../public/images/banner/kaldera.jpg'
import banner from '../public/images/banner/banner.png'
import { setOrder } from '@/redux/orderSlice'
import { Fragment } from 'react'
import Category from '@/components/layout/Category'
import Carousel from '@/components/layout/Carousel'

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
        <Fragment>
            <Layout title='Liburan seru bareng Lokaloka.id'>
                {/* Hero */}
                {/* <Hero /> */}
                <Carousel />

                <Category />
                {/* End Category */}
                {/* Product Section */}
                {promo.length != 0 && <HighlightedSection sectionTitle='Promo' href='/specials/promo' data={promo} bgColor='bg-white' />}
                {/* Promo Campaign */}
                <div className='container mx-auto px-4 2xl:px-0 mb-4 mt-8' id='scrollToHere'>
                    <div className='rounded-md bg-blueGray-200 lg:p-4 2xl:p-6 h-auto flex justify-between space-x-6 items-center'>
                        <Link href='/specials/promo'>
                            <div className='w-full h-full cursor-pointer bg-blueGray-600 rounded-md'>
                                <Image src={banner} alt='Promo' placeholder='blur' layout='responsive' width={1319} priority quality={100} height={250} />
                            </div>
                        </Link>
                    </div>
                </div>

                <HighlightedSection sectionTitle='Rekomendasi' href='/specials/recommended' data={recommended} />

                <div className='container mx-auto px-4 2xl:px-0 mb-4 mt-8'>
                    <div className='rounded-md bg-blueGray-200 lg:p-4 2xl:p-6 h-auto flex justify-between space-x-6 items-center'>
                        <div className='w-full h-full cursor-pointer bg-blueGray-600 rounded-md'>
                            <a target='_blank' href='https://kalderaadventure.com'>
                                <Image src={kaldera} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' priority quality={100} width={3000} height={1500} />
                            </a>
                        </div>
                    </div>
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
