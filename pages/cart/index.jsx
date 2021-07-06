import Layout from '@/components/Layout'
import { ChevronRightIcon, TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { getSession, useSession } from 'next-auth/client'
import NumberFormat from 'react-number-format'
import Button from '@/components/Button'

const Cart = ({ cartProducts }) => {
    const router = useRouter()
    const [session, loading] = useSession()

    const [cart, setCart] = useState(cartProducts)
    const [summaryTotal, setSummaryTotal] = useState(0)
    const [discountTotal, setDiscountTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)

    useEffect(() => {
        countGrandTotal(), countSummaryTotal(), countDiscountTotal(), cart
        return () => {}
    }, [cart, summaryTotal, discountTotal])

    const countSummaryTotal = async () => {
        const sum = cart.reduce((currentSummary, product) => currentSummary + +product.quantity * +product.product.sellingPrice, 0)
        setSummaryTotal(sum)
    }

    const countDiscountTotal = async () => {
        const sum = cart.reduce((currentDiscount, product) => currentDiscount + +product.quantity * ((+product.product.sellingPrice * +product.product.discount) / 100), 0)
        setDiscountTotal(sum)
    }

    const countGrandTotal = async () => {
        setGrandTotal(summaryTotal - discountTotal)
    }

    // * Qty Func
    const addQty = async (product) => {
        const updateQty = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/carts/${product.id}`, {
            quantity: +product.quantity + 1,
        })

        const getUpdatedData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`)
        const updatedData = await getUpdatedData.data

        setCart(updatedData)
    }

    const reduceQty = async (product) => {
        if (product.quantity == 1) {
            return
        }
        const updateQty = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/carts/${product.id}`, {
            quantity: +product.quantity - 1,
        })

        const getUpdatedData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`)
        const updatedData = await getUpdatedData.data

        setCart(updatedData)
    }

    const deleteItem = async (product) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${product.id}`)
        const data = await res.data

        if (!data) {
            return console.log('gagal')
        }

        setCart(cart.filter((item) => item.id !== data.id))
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
                <div className='flex flex-col space-y-8 mb-12'>
                    <div className='flex justify-between space-x-12'>
                        <div className='w-9/12'>
                            <div className='flex flex-col space-y-4'>
                                {/* Product Cart Item */}
                                <div className='flex flex-col space-y-4'>
                                    {cart.map((product) => {
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
                                                                {/* Image */}
                                                                <div className='h-20 w-20 rounded-md'>
                                                                    <Image
                                                                        alt={product.product.name}
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
                                                                        <a className='text-lg font-semibold text-blueGray-800 line-clamp-1'>{product.product.name}</a>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => deleteItem(product)}
                                                                        type='button'
                                                                        className='flex items-center space-x-2 text-red-500 font-bold'
                                                                    >
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
                                                                            onClick={() => reduceQty(product)}
                                                                            className='select-none rounded-l cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-r border-blueGray-300 text-blue-gray-800'
                                                                        >
                                                                            -
                                                                        </div>
                                                                        <div className='px-4 py-1 w-12 flex-1 text-center text-blue-gray-800 '>{product.quantity}</div>
                                                                        <div
                                                                            onClick={() => addQty(product)}
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
                        <div className='w-3/12 flex flex-col space-y-4'>
                            {/* Coupon Form */}
                            <div className='flex items-center '>
                                <input
                                    className='px-3 py-2 rounded-l w-full border-2 focus:border-blue-500 focus:border-2 focus:ring-0 border-blue-400 transition ease-in-out duration-3007 font-bold text-blueGray-800'
                                    placeholder='Coupon Code'
                                    type='text'
                                />
                                <button type='button' className='rounded-r px-3 py-2 text-white font-bold border-2 border-blue-500 bg-blue-500'>
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
                                        <NumberFormat value={summaryTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                    </div>
                                    <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                        <span>Total Discount</span>
                                        <NumberFormat value={discountTotal} displayType={'text'} className='text-red-500' thousandSeparator={true} prefix={'-Rp. '} />
                                    </div>
                                </div>
                            </div>

                            <hr />

                            {/* Total */}
                            <div className='flex justify-between items-center'>
                                <div className='text-xl font-bold text-blueGray-800'>Total</div>
                                <NumberFormat value={grandTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-xl font-bold text-blue-500' />
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
