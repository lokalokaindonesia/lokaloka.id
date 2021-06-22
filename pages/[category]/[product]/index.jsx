import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import Layout from '../../../components/Layout'
import Badge from '../../../components/Badge'
import VariantBadge from '../../../components/VariantBadge'
import Button from '../../../components/Button'
import ProductItem from '../../../components/ProductItem'

const Product = ({ product, similarProducts }) => {
    const router = useRouter()

    const productRoute = router.query.product || 'Lokaloka'
    const categoryRoute = '/' + router.query.category || []

    const [current, setCurrent] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const length = product.images.length

    // Carousel Func
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    // Qty Func
    const addQty = () => {
        setQuantity(quantity + 1)
    }

    const reduceQty = () => {
        setQuantity(quantity === 1 ? 1 : quantity - 1)
    }

    if (!Array.isArray(product.images) || product.images.length <= 0) return null

    return (
        <Layout title={productRoute}>
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
                        <div className='flex justify-between w-96 h-96 absolute bg-red-500'>
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
                        <div className='text-3xl mb-4 font-bold text-blueGray-800 '>{product.name}</div>
                        <Badge text='Recommended' color='green' />
                        <div className='my-4 flex space-x-8 items-baseline'>
                            <NumberFormat
                                value={product.sellingPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp. '}
                                className='text-3xl font-extrabold text-blue-500'
                            />
                            <NumberFormat
                                value={product.sellingPrice - (product.discount * product.sellingPrice) / 100}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp. '}
                                className='font-semibold line-through text-red-500'
                            />
                        </div>
                        <div className='flex flex-col space-y-2 mb-4'>
                            <p className='text-xl font-semibold text-blueGray-600'>Variants</p>
                            <div className='flex space-x-2'>
                                <VariantBadge text='XL' />
                                <VariantBadge text='L' />
                                <VariantBadge text='M' />
                                <VariantBadge text='S' />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 mb-4'>
                            <p className='text-xl font-semibold text-blueGray-600'>Colors</p>
                            <div className='flex space-x-2'>
                                <VariantBadge text='Blue' />
                                <VariantBadge text='Red' />
                                <VariantBadge text='Green' />
                                <VariantBadge text='Purple' />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1 mb-4'>
                            <p className='text-xl font-semibold text-blueGray-600'>Description</p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, pariatur obcaecati! Molestiae illo inventore, magni sint, temporibus dicta quas
                                culpa voluptas quasi modi incidunt veniam. Velit, vel excepturi. Assumenda modi at inventore atque recusandae mollitia consequatur, ad repudiandae
                                veniam expedita omnis voluptates, ea quod repellendus ab dignissimos veritatis iusto nisi libero excepturi quos illo laudantium? At illum cupiditate
                                autem cum voluptate id sint totam,
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className='flex flex-col space-y-4'>
                        <p className='text-xl font-semibold text-blueGray-800'>Quantity</p>
                        <div className='flex items-center border border-blueGray-400'>
                            <div
                                onClick={reduceQty}
                                className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 border-r border-blueGray-600 text-blue-gray-800'
                            >
                                -
                            </div>
                            <div className='px-4 py-1 flex-1 text-center text-blue-gray-800 '>{quantity}</div>
                            <div
                                onClick={addQty}
                                className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 border-l border-blueGray-600 text-blue-gray-800'
                            >
                                +
                            </div>
                        </div>
                        <hr className='border border-blueGray-300' />
                        <Button size='lg' href='#' type='primary'>
                            <p>Add to Cart</p>
                        </Button>
                    </div>
                </div>

                <br />
                {/* Reviews */}
                <div className='flex flex-col space-y-10 mb-12'>
                    <div className='relative bottom-3 xl:bottom-4'>
                        <div className='absolute w-auto h-auto bg-orange-500 px-2 left-1 -top-1'>
                            <span className='text-lg md:text-xl xl:text-2xl font-bold  text-orange-500'>Reviews</span>
                        </div>
                        <div className='absolute w-auto h-auto bg-blue-400 px-2'>
                            <span className='text-lg md:text-xl xl:text-2xl font-bold  text-white'>Reviews</span>
                        </div>
                    </div>
                    <div className='flex space-y-4 flex-col'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex space-x-2 items-center'>
                                <div className='w-12 h-12 rounded-full bg-red-500'></div>
                                <div className='flex flex-col'>
                                    <p className='text-lg font-semibold text-blueGray-800'>Budi Hartono</p>
                                    <p className='text-xs text-blueGray-500'>January 12</p>
                                </div>
                            </div>
                            <span className='pl-14'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, similique reiciendis veniam accusantium vero sed ab, ea eveniet quasi neque
                                dignissimos ratione cumque reprehenderit maxime. Illum in temporibus perspiciatis aut.
                            </span>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex space-x-2 items-center'>
                                <div className='w-12 h-12 rounded-full bg-red-500'></div>
                                <div className='flex flex-col'>
                                    <p className='text-lg font-semibold text-blueGray-800'>Budi Hartono</p>
                                    <p className='text-xs text-blueGray-500'>January 12</p>
                                </div>
                            </div>
                            <span className='pl-14'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, similique reiciendis veniam accusantium vero sed ab, ea eveniet quasi neque
                                dignissimos ratione cumque reprehenderit maxime. Illum in temporibus perspiciatis aut.
                            </span>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex space-x-2 items-center'>
                                <div className='w-12 h-12 rounded-full bg-red-500'></div>
                                <div className='flex flex-col'>
                                    <p className='text-lg font-semibold text-blueGray-800'>Budi Hartono</p>
                                    <p className='text-xs text-blueGray-500'>January 12</p>
                                </div>
                            </div>
                            <span className='pl-14'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, similique reiciendis veniam accusantium vero sed ab, ea eveniet quasi neque
                                dignissimos ratione cumque reprehenderit maxime. Illum in temporibus perspiciatis aut.
                            </span>
                        </div>
                    </div>
                </div>
                <br />
                {/* Similar Products */}
                <div className='flex flex-col space-y-10 mb-12'>
                    <div className='relative bottom-3 xl:bottom-4'>
                        <div className='absolute w-auto h-auto bg-orange-500 px-2 left-1 -top-1'>
                            <span className='text-lg md:text-xl xl:text-2xl font-bold  text-orange-500'>Similar Products</span>
                        </div>
                        <div className='absolute w-auto h-auto bg-blue-400 px-2'>
                            <span className='text-lg md:text-xl xl:text-2xl font-bold  text-white'>Similar Products</span>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                        {similarProducts.map((item, index) => {
                            return (
                                <ProductItem
                                    key={index}
                                    imgSrc={item.images[0].formats.medium.url}
                                    productName={item.productName}
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
    const data = await res.json()

    const resSimilarProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const dataSimilarProducts = await resSimilarProducts.json()

    return {
        props: { product: data[0], similarProducts: dataSimilarProducts },
    }
}

export default Product
