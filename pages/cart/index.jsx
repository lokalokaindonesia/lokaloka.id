import Layout from '@/components/Layout'
import { ChevronRightIcon, TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { getSession } from 'next-auth/client'
import Button from '@/components/Button'
import NumberFormat from 'react-number-format'

const Cart = ({ cartProducts }) => {
    const router = useRouter()

    const [quantity, setQuantity] = useState(1)

    // * Qty Func
    const addQty = () => {
        setQuantity(quantity + 1)
    }

    const reduceQty = () => {
        setQuantity(quantity === 1 ? 1 : quantity - 1)
    }

    return (
        <Layout title='Lokaloka Cart'>
            <div className='container mx-auto'>
                <div className='w-full flex space-x-2 items-center mt-4'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800'>Cart</div>
                </div>
                <div className='py-6'>
                    <h1 className='text-blueGray-800 font-extrabold text-3xl'>Cart</h1>
                </div>
                <div className='flex justify-between space-x-12 mb-12'>
                    <div className='w-9/12'>
                        <div className='flex flex-col space-y-4'>
                            <div className='flex justify-between items-center'>
                                {/* SelectAll Checkbox*/}
                                <div className='flex space-x-4 items-center'>
                                    <input
                                        type='checkbox'
                                        className='rounded h-4 w-4 text-blue-500 focus:ring-blue-600 border-2 border-blueGray-400'
                                        name='selectAll'
                                        id='selectAll'
                                    />
                                    <label htmlFor='selectAll' className='font-bold'>
                                        Select All
                                    </label>
                                </div>

                                {/* Remove Button */}
                                <button type='button' className='flex border border-red-500 px-2 rounded items-center space-x-2 text-red-500 font-bold'>
                                    <TrashIcon className='w-4' />
                                    <span>Remove</span>
                                </button>
                            </div>
                            {/* Product Cart Item */}
                            <div className='flex flex-col space-y-4'>
                                {cartProducts.map((product) => {
                                    // Count Price
                                    const discountPrice = product.product.sellingPrice - (product.product.sellingPrice * product.product.discount) / 100
                                    const isDiscount = product.product.discount !== 0 && product.product.discount !== null ? true : false
                                    const xPrice = isDiscount ? discountPrice : product.product.sellingPrice
                                    return (
                                        <div key={product._id} className='p-4 rounded-md border border-blueGray-300'>
                                            <div className='flex space-y-4 flex-col'>
                                                <div className='flex space-x-4 items-center'>
                                                    <div className='flex space-x-4 items-center w-full'>
                                                        {/* Checkbox */}
                                                        <div className='flex items-center space-x-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='rounded h-4 w-4 text-blue-500 focus:ring-blue-600 border-2 border-blueGray-400'
                                                                name=''
                                                                id='1'
                                                            />

                                                            {/* Image */}
                                                            <div className='h-20 w-20 rounded-md'>
                                                                <Image
                                                                    src={product.product.images[0].formats.medium.url}
                                                                    layout='responsive'
                                                                    width={1}
                                                                    height={1}
                                                                    objectFit='cover'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col space-y-1 w-full'>
                                                            {/* Title */}
                                                            <div className='flex justify-between items-start'>
                                                                <Link href={`/${product.product.product_category.slug}/${product.product.slug}`}>
                                                                    <span className='text-lg font-semibold text-blueGray-800 line-clamp-1'>{product.product.name}</span>
                                                                </Link>
                                                                <button type='button' className='flex items-center space-x-2 text-red-500 font-bold'>
                                                                    <TrashIcon className='w-4' />
                                                                </button>
                                                            </div>
                                                            <div className='flex justify-between items-end'>
                                                                {/* Price */}
                                                                <div className='flex space-y-1 flex-col'>
                                                                    <NumberFormat
                                                                        value={xPrice}
                                                                        displayType={'text'}
                                                                        thousandSeparator={true}
                                                                        prefix={'Rp. '}
                                                                        className='text-xl font-black text-blueGray-800'
                                                                    />
                                                                    {isDiscount && (
                                                                        <NumberFormat
                                                                            value={product.product.sellingPrice}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            prefix={'Rp. '}
                                                                            className='text-xs line-through font-semibold text-red-500'
                                                                        />
                                                                    )}
                                                                </div>
                                                                {/* Qty */}
                                                                <div className='flex items-center border h-8 w-max rounded ml-[8.7rem] border-blueGray-300'>
                                                                    <div
                                                                        onClick={reduceQty}
                                                                        className='select-none rounded-l cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-r border-blueGray-300 text-blue-gray-800'
                                                                    >
                                                                        -
                                                                    </div>
                                                                    <div className='px-4 py-1 w-12 flex-1 text-center text-blue-gray-800 '>{product.quantity}</div>
                                                                    <div
                                                                        onClick={addQty}
                                                                        className='select-none rounded-r cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-l border-blueGray-300 text-blue-gray-800'
                                                                    >
                                                                        +
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='w-3/12 mt-12 flex flex-col space-y-4'>
                        {/* Coupon Form */}
                        <div className='flex items-center '>
                            <input
                                className='px-3 py-2 rounded-l w-full ring-2 focus:ring-blue-500 focus:ring-2 ring-blue-500 border-0 font-bold text-blueGray-800'
                                placeholder='Coupon Code'
                                type='text'
                            />
                            <button type='button' className='rounded-r px-3 py-2 text-white font-bold ring-2 ring-blue-500 bg-blue-500'>
                                Apply
                            </button>
                        </div>

                        <hr />

                        {/* Summary */}
                        <div className='flex flex-col space-y-2'>
                            <div className='text-xl font-bold text-blueGray-800'>Summary</div>
                            <div className='flex flex-col space-y-1'>
                                <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                    <span>Total Price</span>
                                    <span>Rp. 17.200.000</span>
                                </div>
                                <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                    <span>Total Discount</span>
                                    <span className='text-red-400'>-Rp. 7.200.000</span>
                                </div>
                            </div>
                        </div>

                        <hr />

                        {/* Total */}
                        <div className='flex justify-between items-center'>
                            <div className='text-xl font-bold text-blueGray-800'>Total</div>
                            <div className='text-xl font-bold text-blue-500'>Rp. 10.000.000</div>
                        </div>

                        <hr />

                        {/* Checkout Button */}
                        <Button type='primary' size='lg' width='full' display='flex'>
                            <span>Checkout</span>
                            <FaChevronRight className='w-6' />
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    const getCartProducts = await axios(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`)
    const cartProducts = await getCartProducts.data

    return {
        props: {
            cartProducts,
        },
    }
}

export default Cart
