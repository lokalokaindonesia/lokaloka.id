import { ChevronRightIcon, TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { getSession, useSession } from 'next-auth/client'
import NumberFormat from 'react-number-format'
import Layout from '@/components/layout/Layout'
import { setOrder } from '@/redux/orderSlice'
import Button from '@/components/ui/Button'

const Cart = ({ cartProducts, session, productCategories }) => {
    const router = useRouter()

    const [cart, setCart] = useState(cartProducts)
    const [summaryTotal, setSummaryTotal] = useState(0)
    const [discountTotal, setDiscountTotal] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [couponPromo, setCouponPromo] = useState(0)
    const [coupon, setCoupon] = useState(null)
    const [couponInput, setCouponInput] = useState(null)
    const [totalWeight, setTotalWeight] = useState(0)

    const dispatch = useDispatch()

    // * QTY Effect
    useEffect(() => {
        countGrandTotal(), countSummaryTotal(), countDiscountTotal(), cart, countCouponPromo(), countSubTotal(), countWeight()
        return () => {}
    }, [cart, summaryTotal, discountTotal, coupon, couponPromo, subTotal])
    // * END QTY Effect

    // * PRICE
    const countCouponPromo = async () => {
        if (coupon) {
            setCouponPromo((subTotal * coupon.discount) / 100)
            return
        }
        return 0
    }

    const countSummaryTotal = async () => {
        const sum = cart.reduce((currentSummary, product) => currentSummary + +product.quantity * +product.product.sellingPrice, 0)
        return setSummaryTotal(sum)
    }

    const countWeight = async () => {
        const weight = cart.reduce((currentWeight, product) => currentWeight + +product.product.weight * +product.quantity, 0)
        return setTotalWeight(weight)
    }

    const countDiscountTotal = async () => {
        const sum = cart.reduce((currentDiscount, product) => currentDiscount + +product.quantity * ((+product.product.sellingPrice * +product.product.discount) / 100), 0)
        return setDiscountTotal(sum)
    }

    const countSubTotal = async () => {
        return setSubTotal(summaryTotal - discountTotal)
    }

    const countGrandTotal = async () => {
        if (!coupon) {
            return setGrandTotal(subTotal)
        }
        return setGrandTotal(subTotal - couponPromo)
    }
    // * END PRICE

    // * Qty Func
    const addQty = async (product) => {
        await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/carts/${product.id}`,
            {
                quantity: +product.quantity + 1,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + session.jwt,
                },
            }
        )

        const getUpdatedData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`, {
            headers: {
                Authorization: 'Bearer ' + session.jwt,
            },
        })
        const updatedData = await getUpdatedData.data

        return setCart(updatedData)
    }

    const reduceQty = async (product) => {
        if (product.quantity == 1) {
            return
        }
        await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/carts/${product.id}`,
            {
                quantity: +product.quantity - 1,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + session.jwt,
                },
            }
        )

        const getUpdatedData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`, {
            headers: {
                Authorization: 'Bearer ' + session.jwt,
            },
        })
        const updatedData = await getUpdatedData.data

        return setCart(updatedData)
    }

    const deleteItem = async (product) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${product.id}`, {
            headers: {
                Authorization: 'Bearer ' + session.jwt,
            },
        })
        const data = await res.data

        if (!data) {
            return console.log('gagal')
        }

        return setCart(cart.filter((item) => item.id !== data.id))
    }
    //  * END Qty Func

    // * Handle Coupon Input
    const handleCouponInput = (e) => {
        e.preventDefault()
        return setCouponInput(e.target.value)
    }
    // * END Handle Coupon Input

    //  * GET Coupons
    const getCoupon = async (e) => {
        e.preventDefault()
        if (!couponInput) {
            return alert('Fill the form')
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coupons`, {
            headers: {
                Authorization: 'Bearer ' + session.jwt,
            },
        })
        const couponData = await data.find((c) => c.code === couponInput)
        if (!couponData) {
            return alert('Coupon not found!')
        }
        return setCoupon(couponData)
    }
    // * END GET Coupon

    // * DELETE COUPON
    const deleteCoupon = async () => {
        return setCoupon('')
    }
    // * END DELETE COUPON

    // * SET ORDER DATA AND CHECKOUT
    const checkout = async () => {
        const totalQuantity = cart.reduce((a, b) => +a + +b.quantity, 0)
        const orderData = {
            products: cart,
            totalPrice: grandTotal,
            totalQuantity,
            totalWeight,
            discount: couponPromo,
            subTotal: subTotal,
            user: session.id,
        }

        const getOrder = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?user_eq=${session.id}`, {
            headers: {
                Authorization: 'Bearer ' + session.jwt,
            },
        })
        const order = getOrder.data[0]

        if (!order) {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData, {
                headers: {
                    Authorization: 'Bearer ' + session.jwt,
                },
            })
            return dispatch(setOrder(data))
        }

        const updateOrder = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${order.id}`, orderData, {
            headers: {
                Authorization: 'Bearer ' + session.jwt,
            },
        })
        const updatedOrder = updateOrder.data

        dispatch(setOrder(updatedOrder))

        return router.push('/cart/checkout')
    }
    // * END SET ORDER DATA AND CHECKOUT

    return (
        <Layout title='Lokaloka Cart'>
            {cart.length == 0 ? (
                <div className='container my-12 mx-auto flex items-center space-x-24 justify-center'>
                    <div className='w-[32rem] h-[32rem]'>
                        <Image src={'/images/add-to-cart.gif'} layout='responsive' placeholder='blur' quality='75' blurDataURL={blurData} width={1} height={1} priority />
                    </div>
                    <div className='flex space-y-8 flex-col justify-center items-center'>
                        <h1 className='text-4xl font-bold text-blueGray-800'>Your cart is empty</h1>
                        <Button size='xl' width='max' display='flex' type='primary' href={() => router.push('/')}>
                            <span>Buy Something</span>
                            <ChevronRightIcon className='text-white w-7 h-7' />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='container mx-auto'>
                    <div className='w-full flex space-x-2 items-center mt-6'>
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
                        <div className='flex justify-between space-x-5'>
                            <div className='w-9/12'>
                                <div className='flex flex-col space-y-4'>
                                    {/* Product Cart Item */}
                                    <div className='flex flex-col space-y-4'>
                                        {cart.map((product) => {
                                            // Count Price
                                            const discountPrice = product.product.sellingPrice - (product.product.sellingPrice * product.product.discount) / 100
                                            const isDiscount = product.product.discount !== 0 && product.product.discount !== null ? true : false
                                            const xPrice = isDiscount ? discountPrice : product.product.sellingPrice

                                            const category = productCategories.find((c) => c.id == product.product.product_category)
                                            return (
                                                <div key={product._id} className='p-4 rounded-md border drop-shadow-sm bg-white border-blueGray-300'>
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
                                                                            quality='75'
                                                                            className='rounded'
                                                                            width={1}
                                                                            height={1}
                                                                            objectFit='cover'
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col space-y-1 w-full'>
                                                                    {/* Title */}
                                                                    <div className='flex justify-between items-start'>
                                                                        <Link href={`/${category.slug}/${product.product.slug}`}>
                                                                            <a className='text-lg font-semibold text-blueGray-600 line-clamp-1'>{product.product.name}</a>
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
                                                                                className='text-xl font-black text-blue-500'
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
                            <div className='w-3/12'>
                                <div className='sticky top-28 p-4 bg-white border drop-shadow-sm border-blueGray-300 h-auto rounded-md flex flex-col space-y-4'>
                                    {/* Coupon Form */}
                                    <form className='flex items-center' onSubmit={getCoupon} method='get'>
                                        <input
                                            className={
                                                coupon
                                                    ? 'px-3 py-2 rounded-l w-full border-2 focus:border-green-500 focus:border-2 focus:ring-0 border-green-300 transition ease-in-out duration-300 font-bold text-blueGray-400'
                                                    : 'px-3 py-2 rounded-l w-full border-2 focus:border-blueGray-500 focus:border-2 focus:ring-0 border-blueGray-500 transition ease-in-out duration-300 font-bold text-blueGray-800'
                                            }
                                            placeholder='Coupon Code'
                                            disabled={coupon && 'disabled'}
                                            onChange={handleCouponInput}
                                            type='text'
                                        />
                                        <button
                                            type='submit'
                                            className={
                                                coupon
                                                    ? 'rounded-r px-3 py-2 text-white font-bold border-2 border-green-300 bg-green-300'
                                                    : 'rounded-r px-3 py-2 text-white font-bold border-2 border-blueGray-500 bg-blueGray-500'
                                            }
                                        >
                                            Apply
                                        </button>
                                    </form>
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
                                        <div className='text-blueGray-500 font-semibold flex justify-between items-center'>Sub Total</div>
                                        <NumberFormat className='text-blueGray-500 font-semibold' value={subTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                    </div>
                                    {coupon && (
                                        <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                            <div className='flex space-x-2 items-center'>
                                                <span>Coupon {coupon.discount}%</span>
                                                <button type='button' onClick={() => deleteCoupon()}>
                                                    <TrashIcon className='text-red-500 w-4 h-4' />
                                                </button>
                                            </div>
                                            <NumberFormat value={couponPromo} displayType={'text'} className='text-red-500' thousandSeparator={true} prefix={'-Rp. '} />
                                        </div>
                                    )}
                                    <div className='flex justify-between items-center'>
                                        <div className='text-xl font-bold text-blueGray-800'>Total</div>
                                        <NumberFormat
                                            value={grandTotal}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp. '}
                                            className='text-xl font-bold text-blue-500'
                                        />
                                    </div>
                                    <hr />
                                    {/* Checkout Button */}
                                    <Button href={() => checkout()} type='primary' size='lg' width='full' display='flex'>
                                        <span>Checkout</span>
                                        <FaChevronRight className='w-6' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            notFound: true,
        }
    }

    const getCartProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`, {
        headers: {
            Authorization: 'Bearer ' + session.jwt,
        },
    })
    const cartProducts = await getCartProducts.data

    const getCategories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product-categories`)
    const productCategories = await getCategories.data

    if (!cartProducts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            cartProducts,
            session,
            productCategories,
        },
    }
}

export default Cart
