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
            <Script
                strategy='lazyOnload'
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(){var e=window,i=document,t="customerly",n="queue",o="load",r="settings",u=e[t]=e[t]||[];if(u.t){return void u.i("[customerly] SDK already initialized. Snippet included twice.")}u.t=!0;u.loaded=!1;u.o=["event","attribute","update","show","hide","open","close"];u[n]=[];u.i=function(t){e.console&&!u.debug&&console.error&&console.error(t)};u.u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(e),u[n].push(t),u}};u[o]=function(t){u[r]=t||{};if(u.loaded){return void u.i("[customerly] SDK already loaded. Use customerly.update to change settings.")}u.loaded=!0;var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://messenger.customerly.io/launcher.js";var n=i.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};u.o.forEach(function(t){u[t]=u.u(t)})}();
                        
                        customerly.load({
                            "app_id": "77d26414",
                            position: {
                                desktop: {  
                                    bottom: 50,
                                    side: 50
                                },
                                mobile: {
                                    bottom: 60,
                                    side: 30
                                }
                            }
                        });
                    `,
                }}
            />
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
