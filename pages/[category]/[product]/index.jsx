import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { session } from 'next-auth/client'
import { ChevronRightIcon, ChevronLeftIcon, LinkIcon } from '@heroicons/react/solid'
import { FaInstagram, FaFacebookSquare, FaWhatsapp, FaHeart } from 'react-icons/fa'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import Layout from '@/components/Layout'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import VariantBadge from '@/components/VariantBadge'
import ProductItem from '@/components/ProductItem'
import FancySecrionTitle from '@/components/FancySecrionTitle'
import { addToCart } from '@/redux/cartSlice'

const Product = ({ product, similarProducts, reviews }) => {
    const discountPrice = product.sellingPrice - (product.sellingPrice * product.discount) / 100
    const isDiscount = product.discount !== 0 && product.discount !== null ? true : false
    const xPrice = product.discount ? discountPrice : product.sellingPrice

    const router = useRouter()

    const productRoute = router.query.product || 'Lokaloka'
    const categoryRoute = '/' + router.query.category || []

    // Slider Image
    const [current, setCurrent] = useState(0)

    // Product
    const [quantity, setQuantity] = useState(1)
    const [subtotal, setSubtotal] = useState(xPrice)
    const [favorite, setFavorite] = useState(false)

    const length = product.images.length

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
    const favoriteHandle = () => {
        setFavorite(!favorite)
    }

    if (!Array.isArray(product.images) || product.images.length <= 0) return null

    // Render SubTotal
    useEffect(() => {
        countSubtotal()
    })

    // Add To Cart
    const { cartProducts } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    return (
        <Layout title={productRoute} session={session}>
            <div className='container mx-auto'>
                <div className='w-full flex space-x-2 items-center mt-4'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href={categoryRoute}>{product.product_category.name}</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div>
                        <div>{product.name}</div>
                    </div>
                </div>

                <div className='flex justify-start space-x-8 my-8'>
                    {/* Images */}
                    <div className='w-auto'>
                        <div className='flex justify-end absolute w-96 z-40 items-start px-4 py-4'>
                            <div className='px-3 py-3 rounded-full cursor-pointer bg-gray-300 bg-opacity-50' onClick={favoriteHandle}>
                                <FaHeart className='text-white hover:text-red-500 transition duration-300 ease-in-out w-6 h-6' />
                            </div>
                        </div>
                        <div className='flex justify-between w-96 h-96 absolute bg-gray-300 '>
                            {product.images.map((img, index) => {
                                return (
                                    <div key={index} className={index === current ? 'block w-full h-full ease-in-out duration-300 transition-all select-none' : 'hidden'}>
                                        <Image src={img.formats.medium.url} layout='responsive' width={1} height={1} objectFit='cover' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-96 h-96 flex justify-between items-center'>
                            <ChevronLeftIcon className='w-8 h-8 bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-50 cursor-pointer' onClick={prevSlide} />
                            <ChevronRightIcon className='w-8 h-8 bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-50 cursor-pointer' onClick={nextSlide} />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className='h-full w-full flex-auto'>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-2xl font-bold text-blueGray-800 -mt-2'>{product.name}</div>
                            <Badge text='Recommended' color='green' />
                            <div className='my-4 flex space-x-8 items-baseline'>
                                <NumberFormat
                                    value={isDiscount ? discountPrice : product.sellingPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                    className='text-3xl font-extrabold text-blue-500'
                                />
                                <NumberFormat
                                    value={product.sellingPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                    className='font-semibold line-through text-red-500'
                                />
                            </div>
                            <div className='flex flex-col space-y-2 mb-4'>
                                <p className='text-lg font-semibold text-blueGray-600'>Sizes</p>
                                <div className='flex space-x-2'>
                                    <VariantBadge text='XL' />
                                    <VariantBadge text='L' />
                                    <VariantBadge text='M' />
                                    <VariantBadge text='S' />
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2 mb-4'>
                                <p className='text-lg font-semibold text-blueGray-600'>Colors</p>
                                <div className='flex space-x-2'>
                                    <VariantBadge text='Blue' />
                                    <VariantBadge text='Red' />
                                    <VariantBadge text='Green' />
                                    <VariantBadge text='Purple' />
                                </div>
                            </div>
                            <div className='flex flex-col space-y-1 mb-4'>
                                <p className='text-lg font-semibold text-blueGray-600'>Description</p>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, pariatur obcaecati! Molestiae illo inventore, magni sint, temporibus dicta
                                    quas culpa voluptas quasi modi incidunt veniam. Velit, vel excepturi. Assumenda modi at inventore atque recusandae mollitia consequatur, ad
                                    repudiandae veniam expedita omnis voluptates, ea quod repellendus ab dignissimos veritatis iusto nisi libero excepturi quos illo laudantium? At
                                    illum cupiditate autem cum voluptate id sint totam,
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className='flex flex-col space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-sm font-semibold text-blueGray-600'>Share Me</div>
                            <div className='flex space-x-8 items-center'>
                                <FaInstagram className='cursor-pointer w-6 h-6 text-blueGray-800' />
                                <FaFacebookSquare className='cursor-pointer w-6 h-6 text-blueGray-800' />
                                <FaWhatsapp className='cursor-pointer w-6 h-6 text-blueGray-800' />
                                <LinkIcon className='cursor-pointer w-6 h-6 text-blueGray-800' />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-sm font-semibold text-blueGray-600'>Quantity</div>
                            <div className='flex items-center border-2 border-blueGray-800 '>
                                <div
                                    onClick={reduceQty}
                                    className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-r-2 border-blueGray-600 text-blue-gray-800'
                                >
                                    -
                                </div>
                                <div className='px-4 py-1 flex-1 text-center text-blue-gray-800 '>{quantity}</div>
                                <div
                                    onClick={addQty}
                                    className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-l-2 border-blueGray-600 text-blue-gray-800'
                                >
                                    +
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-sm font-semibold text-blueGray-600'>Subtotal</div>
                            <NumberFormat value={subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-2xl font-extrabold text-blueGray-800' />
                        </div>
                        <div
                            onClick={() => {
                                // dispatch(addToCart({ product, quantity, subtotal }))
                            }}
                        >
                            <Button type='primary' displayType='flex' size='lg' width='full'>
                                <span>Add to Cart</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <br />
                {/* Reviews */}
                {reviews.length !== 0 && (
                    <div className='flex flex-col space-y-10 my-12'>
                        <div className='relative bottom-3 xl:bottom-4'>
                            <div className='absolute w-auto h-auto bg-orange-500 px-2 left-1 -top-1'>
                                <span className='text-lg md:text-xl xl:text-2xl font-bold  text-orange-500'>Reviews</span>
                            </div>
                            <div className='absolute w-auto h-auto bg-blue-400 px-2'>
                                <span className='text-lg md:text-xl xl:text-2xl font-bold  text-white'>Reviews</span>
                            </div>
                        </div>
                        <div className='flex space-y-4 flex-col'>
                            {reviews.map((review) => {
                                return (
                                    <div className='flex flex-col space-y-2' key={review.id}>
                                        <div className='flex space-x-4 items-center'>
                                            <div className='w-12 h-12 rounded-full bg-red-500'></div>
                                            <div className='flex flex-col'>
                                                <p className='text-lg font-semibold text-blueGray-800'>{review.user.username}</p>
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
                <div className='flex flex-col space-y-10 mb-12'>
                    <FancySecrionTitle title='Similar Products' />
                    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                        {similarProducts.map((item, index) => {
                            return (
                                <ProductItem
                                    key={index}
                                    imgSrc={item.images[0].formats.medium.url}
                                    productName={item.name}
                                    price={item.sellingPrice}
                                    discount={item.discount}
                                    isRecommended={item.isRecommended}
                                    category={item.product_category.name}
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

export const getServerSideProps = async ({ query }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?slug=${query.product}`)
    const product = await res.json()

    if (product.length === 0) {
        return {
            notFound: true,
        }
    }

    const resSimilarProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const similarProducts = await resSimilarProducts.json()

    const resReviews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?product_eq=${product[0].id}`)
    const reviews = await resReviews.json()

    return {
        props: {
            product: product[0],
            similarProducts,
            reviews,
        },
    }
}

export default Product
