import { ChevronRightIcon, TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { getSession, useSession } from 'next-auth/client'
import NumberFormat from 'react-number-format'
import Layout from '@/components/layout/Layout'
import { setOrder } from '@/redux/orderSlice'
import Button from '@/components/ui/Button'

const Cart = ({ cartProducts, session, productCategories, user }) => {
    const router = useRouter()
    const ref = useRef(null)

    useEffect(() => {
        import('@lottiefiles/lottie-player')
        return () => {}
    }, [])

    const [cart, setCart] = useState(cartProducts)
    const [summaryTotal, setSummaryTotal] = useState(0)
    const [discountTotal, setDiscountTotal] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)

    const [checkoutLoading, setCheckoutLoading] = useState(false)

    const dispatch = useDispatch()

    // * QTY Effect
    useEffect(() => {
        countGrandTotal(), countSummaryTotal(), countDiscountTotal(), cart, countSubTotal(), countWeight()
        return () => {}
    }, [cart, summaryTotal, discountTotal, , subTotal])
    // * END QTY Effect

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
        return setGrandTotal(subTotal)
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

    // * SET ORDER DATA AND CHECKOUT
    const checkout = async () => {
        if (!user.name) {
            alert('Lengkapi Profil kamu dulu')
            return router.push('/profile/my-account')
        }
        setCheckoutLoading(true)
        const productsOrigin = cart.map((p) => p._id)
        const totalQuantity = cart.reduce((a, b) => +a + +b.quantity, 0)

        const orderData = {
            products: cart,
            productsOrigin: productsOrigin,
            totalPrice: grandTotal,
            totalQuantity,
            totalWeight,
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

        setCheckoutLoading(false)

        return router.push('/cart/checkout')
    }
    // * END SET ORDER DATA AND CHECKOUT

    return (
        <Layout title='Keranjang Belanja'>
            {cart.length == 0 ? (
                <div className='container my-12 mx-auto px-4 md:px-12 lg:px-16 flex flex-col space-y-4 space-x-0 lg:flex-row items-center lg:space-x-12 lg:space-y-0 2xl:space-x-24 justify-center'>
                    <lottie-player
                        src='https://assets2.lottiefiles.com/private_files/lf30_x2lzmtdl.json'
                        id='verified'
                        ref={ref}
                        autoplay
                        mode='normal'
                        loop
                        style={{ width: 'auto', height: 'auto' }}
                    ></lottie-player>
                    <div className='flex space-y-8 flex-col justify-center items-center'>
                        <h1 className='text-2xl md:text-4xl font-bold'>Ooops, Keranjangmu kosong</h1>
                        <Button size='lg' width='max' display='flex' type='primary' href={() => router.push('/')}>
                            <span>Beli sesuatu</span>
                            <ChevronRightIcon className='text-white w-7 h-7' />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='container mx-auto min-h-full px-4 2xl:px-0 my-4 md:my-5 2xl:my-6'>
                    <div className='w-full hidden md:flex space-x-2 items-center my-2 2xl:my-3'>
                        <div className='text-orange-500 hover:text-orange-600'>
                            <Link href='/'>Home</Link>
                        </div>
                        <ChevronRightIcon className='w-5 h-5 text-slate-500' />
                        <div className=''>Keranjang</div>
                    </div>
                    <h1 className='text-xl md:text-2xl font-semibold my-2 2xl:my-3'>Keranjang</h1>
                    <div className='flex flex-col space-y-4 2xl:space-y-8 mb-12'>
                        <div className='flex flex-col space-y-5 space-x-0 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-5'>
                            <div className='w-full lg:w-8/12 xl:w-9/12'>
                                <div className='w-full flex flex-col space-y-4'>
                                    {/* Product Cart Item */}
                                    <div className='w-full flex flex-col space-y-2 md:space-y-4'>
                                        {cart.map((product) => {
                                            // Count Price
                                            const discountPrice = product.product.sellingPrice - (product.product.sellingPrice * product.product.discount) / 100
                                            const isDiscount = product.product.discount !== 0 && product.product.discount !== null ? true : false
                                            const xPrice = isDiscount ? discountPrice : product.product.sellingPrice

                                            const category = productCategories.find((c) => c.id == product.product.product_category)
                                            return (
                                                <div key={product._id} className='w-full p-3 md:p-2 2xl:p-4 rounded-md border drop-shadow-sm bg-white border-slate-300'>
                                                    <div className='flex space-y-2 md:space-y-4 flex-col'>
                                                        <div className='flex space-x-2 md:space-x-4 items-center'>
                                                            <div className='flex space-x-4 items-center w-full'>
                                                                {/* Checkbox */}
                                                                <div className='flex items-center space-x-2 md:space-x-4'>
                                                                    {/* Image */}
                                                                    <div className='w-16 h-16 md:h-20 md:w-20 rounded-md'>
                                                                        <Image
                                                                            alt={product.product.name}
                                                                            src={product.product.images[0].url}
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
                                                                            <a className='text-sm md:text-lg font-semibold text-slate-600 line-clamp-1'>{product.product.name}</a>
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
                                                                                className='text-xs md:text-xl font-black text-orange-500'
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
                                                                        <div className='flex items-center border h-6 md:h-8 w-max rounded ml-6 md:ml-[8.7rem] border-slate-300'>
                                                                            <div
                                                                                onClick={() => reduceQty(product)}
                                                                                className='select-none rounded-l cursor-pointer transition duration-100 ease-in hover:bg-slate-200 px-2 md:px-3 md:py-1 font-bold text-center border-r border-slate-300 text-orange-gray-800'
                                                                            >
                                                                                -
                                                                            </div>
                                                                            <div className='px-4 py-1 w-12 flex-1 text-center text-orange-gray-800 '>{product.quantity}</div>
                                                                            <div
                                                                                onClick={() => addQty(product)}
                                                                                className='select-none rounded-r cursor-pointer transition duration-100 ease-in hover:bg-slate-200 px-2 md:px-3 md:py-1 font-bold text-center border-l border-slate-300 text-orange-gray-800'
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
                            <div className='w-full lg:w-4/12 xl:w-3/12'>
                                <div className='sticky top-28 p-3 md:p-4 bg-white border drop-shadow-sm border-slate-300 h-auto rounded-md flex flex-col space-y-3 md:space-y-4'>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='text-base md:text-xl font-bold'>Rincian</div>
                                        <div className='flex flex-col space-y-1'>
                                            <div className='text-xs md:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                                <span>Total Harga</span>
                                                <NumberFormat value={summaryTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                            </div>
                                            <div className='text-xs md:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                                <span>Total Diskon</span>
                                                <NumberFormat value={discountTotal} displayType={'text'} className='text-red-500' thousandSeparator={true} prefix={'-Rp. '} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='border border-slate-200' />
                                    {/* Total */}
                                    <div className='text-xs md:text-base flex justify-between items-center'>
                                        <div className='text-slate-500 font-semibold flex justify-between items-center'>Sub Total</div>
                                        <NumberFormat className='text-slate-500 font-semibold' value={subTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-base md:text-xl font-bold '>Total</div>
                                        <NumberFormat
                                            value={grandTotal}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp. '}
                                            className='text-base md:text-xl font-bold text-orange-500'
                                        />
                                    </div>
                                    <hr className='border border-slate-200' />
                                    {/* Checkout Button */}
                                    <div className='hidden md:block'>
                                        {checkoutLoading ? (
                                            <Button href={() => {}} type='secondary' size='lg' width='full' display='flex'>
                                                Memproses...
                                            </Button>
                                        ) : (
                                            <Button href={() => checkout()} type='primary' size='lg' width='full' display='flex'>
                                                <span>Checkout</span>
                                                <FaChevronRight className='w-6' />
                                            </Button>
                                        )}
                                    </div>
                                    <div className='block md:hidden'>
                                        {checkoutLoading ? (
                                            <Button href={() => {}} type='secondary' size='base' width='full' display='flex'>
                                                Memproses...
                                            </Button>
                                        ) : (
                                            <Button href={() => checkout()} type='primary' size='base' width='full' display='flex'>
                                                <span>Checkout</span>
                                                <FaChevronRight className='w-6' />
                                            </Button>
                                        )}
                                    </div>
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
            redirect: { destination: '/', permanent: false },
        }
    }

    const getUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })
    const user = await getUser.data

    const getCartProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`, {
        headers: {
            Authorization: 'Bearer ' + session.jwt,
        },
    })
    const cartProducts = await getCartProducts.data

    const getCategories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product-categories`)
    const productCategories = await getCategories.data

    return {
        props: {
            cartProducts,
            session,
            user,
            productCategories,
        },
    }
}

export default Cart
