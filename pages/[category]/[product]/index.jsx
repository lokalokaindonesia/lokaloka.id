import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon, ChevronLeftIcon, LinkIcon } from '@heroicons/react/solid'
import { FaInstagram, FaFacebookSquare, FaWhatsapp, FaHeart, FaCheckCircle } from 'react-icons/fa'
import moment from 'moment'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import VariantBadge from '@/components/ui/VariantBadge'
import ProductCard from '@/components/product/ProductCard'
import FancySectionTitle from '@/components/ui/FancySectionTitle'
import { setOrder } from '@/redux/orderSlice'
import { useDispatch } from 'react-redux'

const Product = ({ product, similarProducts, reviews }) => {
    const dispatch = useDispatch()

    const addToCartSuccessToast = () => toast.success('Nice move 😍')

    const addToCartFailedToast = () => toast.error('Ooops, you failed 😢')

    const [session, loading] = useSession()

    const discountPrice = product.sellingPrice - (product.sellingPrice * product.discount) / 100
    const isDiscount = product.discount == 0 ? false : true
    const xPrice = product.discount ? discountPrice : product.sellingPrice

    const router = useRouter()

    // Slider Image
    const [current, setCurrent] = useState(0)

    // Product
    const [quantity, setQuantity] = useState(1)
    const [subtotal, setSubtotal] = useState(xPrice)
    const [favorite, setFavorite] = useState(false)

    const length = product.images.length

    useEffect(async () => {
        const { data } = await axios.get(`/api/user`)
        const isFavorited = await data.favorites.filter((f) => f.includes(product.id))
        isFavorited.length > 0 ? setFavorite(true) : setFavorite(false)
        return () => {}
    })

    // * Carousel Func
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    // * Qty Func
    const addQty = () => {
        setQuantity(quantity + 1)
        countSubtotal()
    }

    const reduceQty = () => {
        setQuantity(quantity === 1 ? 1 : quantity - 1)
        countSubtotal()
    }

    // * Count Subtotal
    const countSubtotal = () => {
        const xPrice = product.discount ? discountPrice : product.sellingPrice
        setSubtotal(quantity * xPrice)
    }

    // * Favorite Func
    const favoriteHandle = async () => {
        const getFavorites = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { headers: { Authorization: 'Bearer ' + session.jwt } })

        const favoritesData = await getFavorites.data.favorites

        const filteredFavorites = await favoritesData.find((f) => f == product.id)

        if (filteredFavorites) {
            const x = await favoritesData.filter((f) => f != filteredFavorites)
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`,
                { favorites: (x == [] && null) || (x != [] && x) },
                {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                }
            )
            return setFavorite(!favorite)
        }

        const { data } = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`,
            { favorites: [...favoritesData, product.id] },
            {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            }
        )

        return setFavorite(!favorite)
    }

    if (!Array.isArray(product.images) || product.images.length <= 0) return null

    // Render SubTotal
    useEffect(() => {
        countSubtotal()
    })

    // Add to Cart Handler
    const addToCart = async () => {
        const getCartProducts = await axios.get(`/api/cart`)
        const cartProducts = await getCartProducts.data

        const sameProduct = await cartProducts.find((item) => item.product.id === product.id)

        if (sameProduct) {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/carts/${sameProduct.id}`,
                {
                    quantity: +sameProduct.quantity + quantity,
                },
                { headers: { Authorization: 'Bearer ' + session.jwt } }
            )

            if (!data) {
                return console.log('something wrong when update product qty')
            }

            const cart = await axios.get('/api/cart')
            dispatch(setOrder(cart.data))
            // return
            return addToCartSuccessToast()
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/carts`,
            {
                product: product._id,
                user: session.id,
                quantity,
            },
            { headers: { Authorization: 'Bearer ' + session.jwt } }
        )
        if (!res.data) {
            return addToCartFailedToast()
        }

        const cart = await axios.get('/api/cart')

        dispatch(setOrder(cart.data))
        // return
        return addToCartSuccessToast()
    }

    return (
        <Layout title={product.name}>
            <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='container mx-auto my-6'>
                <div className='w-full flex space-x-2 items-center'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href={`/${product.product_category.slug}`}>{product.product_category.name}</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div>
                        <div>{product.name}</div>
                    </div>
                </div>

                <div className='flex justify-start space-x-8 my-6'>
                    {/* Images */}
                    <div className='w-auto'>
                        <div className='flex justify-end absolute w-96 z-30 items-start px-4 py-4'>
                            <div
                                className='px-3 py-3 rounded-full cursor-pointer bg-gray-300 bg-opacity-50'
                                onClick={() => {
                                    favoriteHandle()
                                }}
                            >
                                <FaHeart className={`${favorite ? 'text-red-500' : 'text-white'} hover:text-red-500 transition duration-300 ease-in-out w-6 h-6`} />
                            </div>
                        </div>
                        <div className='flex justify-between w-96 h-96 absolute '>
                            {product.images.map((img, index) => {
                                return (
                                    <div key={index} className={index === current ? 'block w-full h-full ease-in-out duration-300 transition-all select-none' : 'hidden'}>
                                        <Image alt={product.name} src={img.formats.medium.url} className='rounded-lg' layout='responsive' width={1} height={1} objectFit='cover' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-96 h-96 flex justify-between items-center'>
                            <ChevronLeftIcon className='w-8 h-8 rounded-r-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-10 cursor-pointer' onClick={prevSlide} />
                            <ChevronRightIcon
                                className='w-8 h-8 rounded-l-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-10 cursor-pointer'
                                onClick={nextSlide}
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className='h-full w-full flex-auto'>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-2xl font-bold -mt-2'>{product.name}</div>
                            <Badge text='Recommended' color='green' />
                            <div className='my-4 flex space-x-8 items-baseline'>
                                <NumberFormat
                                    value={isDiscount ? discountPrice : product.sellingPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                    className='text-3xl font-extrabold text-orange-500'
                                />
                                {isDiscount && (
                                    <NumberFormat
                                        value={product.sellingPrice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp. '}
                                        className='font-semibold line-through text-red-500'
                                    />
                                )}
                            </div>
                            {/* <div className='flex flex-col space-y-2 mb-4'>
                                <p className='text-lg font-semibold'>Sizes</p>
                                <div className='flex space-x-2'>
                                    <VariantBadge text='XL' />
                                    <VariantBadge text='L' />
                                    <VariantBadge text='M' />
                                    <VariantBadge text='S' />
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2 mb-4'>
                                <p className='text-lg font-semibold'>Colors</p>
                                <div className='flex space-x-2'>
                                    <VariantBadge text='Blue' />
                                    <VariantBadge text='Red' />
                                    <VariantBadge text='Green' />
                                    <VariantBadge text='Purple' />
                                </div>
                            </div> */}
                            <div className='flex flex-col space-y-1 mb-4 pt-4'>
                                <p className='text-lg font-semibold tracking-wide py-2 text-blueGray-600'>Description</p>
                                <p className='text-base font-medium text-justify leading-relaxed'>{product.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className='flex flex-col space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-sm font-semibold text-blueGray-600'>Share Me</div>
                            <div className='flex space-x-8 items-center'>
                                <FaInstagram className='cursor-pointer text-indigo-400 w-6 h-6' />
                                <FaFacebookSquare className='cursor-pointer text-blue-500 w-6 h-6' />
                                <FaWhatsapp className='cursor-pointer text-green-500 w-6 h-6' />
                                <LinkIcon className='cursor-pointer w-6 h-6' />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-sm font-semibold text-blueGray-600'>Quantity</div>
                            <div className='flex items-center border border-blueGray-300 bg-white rounded'>
                                <div
                                    onClick={reduceQty}
                                    className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-r border-blueGray-300'
                                >
                                    -
                                </div>
                                <div className='px-4 py-1 flex-1 text-center '>{quantity}</div>
                                <div
                                    onClick={addQty}
                                    className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-l border-blueGray-300'
                                >
                                    +
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-sm font-semibold text-blueGray-600'>Subtotal</div>
                            <NumberFormat value={subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-2xl font-extrabold' />
                        </div>
                        <Button type='primary' displayType='flex' size='lg' width='full' href={() => addToCart()}>
                            <span>Add to Cart</span>
                        </Button>
                    </div>
                </div>

                <br />
                {/* Reviews */}
                {reviews.length !== 0 && (
                    <div className='flex flex-col space-y-10 my-12'>
                        <FancySectionTitle title='Reviews' />

                        <div className='flex space-y-4 flex-col'>
                            {reviews.map((review) => {
                                return (
                                    <div className='flex flex-col space-y-2' key={review.id}>
                                        <div className='flex space-x-4 items-center'>
                                            <div className='w-12 h-12 rounded-full bg-red-500'></div>
                                            <div className='flex flex-col'>
                                                <p className='text-lg font-semibold'>{review.user.username}</p>
                                                <p className='text-xs text-blueGray-500'>{moment(review.createdAt).format('ll')}</p>
                                            </div>
                                        </div>
                                        <span className='pl-16'>{review.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                <br />
                {/* Similar Products */}
                <div className='flex flex-col space-y-10 mb-8'>
                    <FancySectionTitle title='Similar Products' />
                    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                        {similarProducts.map((item, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    imgSrc={item.images[0].formats.medium.url}
                                    productName={item.name}
                                    price={item.sellingPrice}
                                    discount={item.discount}
                                    isRecommended={item.isRecommended}
                                    category={item.product_category.slug}
                                    slug={item.slug}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const getProducts = await axios.get(`${process.env.NEXT_URL}/api/products`)
    const data = await getProducts.data

    const paths = data.map((product) => {
        return { params: { category: product.product_category.slug, product: product.slug } }
    })

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params }) => {
    const getProduct = await axios.get(`${process.env.NEXT_URL}/api/products/${params.product}`)
    const data = await getProduct.data

    if (!data) {
        return {
            notFound: true,
        }
    }

    const resSimilarProducts = await axios.get(`${process.env.NEXT_URL}/api/products`)
    const similarProducts = await resSimilarProducts.data

    const resReviews = await axios.get(`${process.env.NEXT_URL}/api/reviews/${data.id}`)
    const reviews = await resReviews.data

    return {
        props: {
            product: data,
            similarProducts,
            reviews,
            revalidate: 1,
        },
    }
}

export default Product
