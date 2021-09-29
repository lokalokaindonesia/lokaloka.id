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
import food from '../public/images/category/food.jpg'
import fashion from '../public/images/category/fashion.jpg'
import craft from '../public/images/category/craft.jpg'
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

                {/* Category */}
                <div className='container mx-auto px-4 md:hidden flex space-x-4 py-4 bg-blue-100 justify-between items-center'>
                    <Link href='/makanan-dan-minuman'>
                        <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-blue-400 h-auto rounded-md relative'>
                            <Image src={food} alt='kategori makanan dan minuman' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={3} />
                            <span className='absolute bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                                Makanan & Minuman
                            </span>
                        </div>
                    </Link>
                    <Link href='/kerajinan'>
                        <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-blue-400 h-auto rounded-md relative'>
                            <Image src={craft} alt='kategori kerajinan' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={3} />
                            <span className='absolute bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                                Kerajinan
                            </span>
                        </div>
                    </Link>
                    <Link href='/fashion'>
                        <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-blue-400 h-auto rounded-md relative'>
                            <Image src={fashion} alt='kategori fashion' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={3} />
                            <span className='absolute bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                                Fashion
                            </span>
                        </div>
                    </Link>
                </div>
                {/* End Category */}

                {/* Product Section */}
                {promo.length != 0 && <HighlightedSection sectionTitle='Promo' href='#' data={promo} bgColor='bg-white' />}
                {/* Promo Campaign */}
                <div className='container mx-auto px-4 2xl:px-0 my-4 md:my-5 xl:my-6'>
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
