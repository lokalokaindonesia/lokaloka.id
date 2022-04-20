import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { ChevronRightIcon, ChevronLeftIcon, LinkIcon } from '@heroicons/react/solid'
import { FaInstagram, FaFacebookSquare, FaWhatsapp, FaHeart, FaCheckCircle } from 'react-icons/fa'
import moment from 'moment'
import { useState, useEffect, useRef, Fragment } from 'react'
import NumberFormat from 'react-number-format'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('@/components/product/ProductCard'))
import FancySectionTitle from '@/components/ui/FancySectionTitle'
import { setOrder } from '@/redux/orderSlice'
import { useDispatch } from 'react-redux'
import { setFavorite } from '@/redux/favoriteSlice'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationCircleIcon, ExclamationIcon } from '@heroicons/react/outline'

const Product = ({ product, similarProducts, baseLink }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const addToCartSuccessToast = (msg) => toast.success(msg)

    const addToCartFailedToast = (msg) => toast.error(msg)

    const [session, loading] = useSession()

    const discountPrice = product.sellingPrice - (product.sellingPrice * product.discount) / 100
    const isDiscount = product.discount == 0 ? false : true
    const xPrice = product.discount ? discountPrice : product.sellingPrice

    const router = useRouter()

    const [addToCartLoading, setAddToCartLoading] = useState(false)

    // Slider Image
    const [current, setCurrent] = useState(0)

    // Product
    const [quantity, setQuantity] = useState(1)
    const [subtotal, setSubtotal] = useState(xPrice)
    const [isFavorited, setIsFavorited] = useState(false)
    const [shareLink, setShareLink] = useState('')

    const length = product.images.length

    useEffect(async () => {
        setShareLink(baseLink + router.asPath)
        if (!loading && session) {
            const { data } = await axios.get(`/api/user`)
            const isFavorited = await data.favorites.filter((f) => f.id.includes(product.id))
            isFavorited.length > 0 ? setIsFavorited(true) : setIsFavorited(false)
        }
        return () => {}
    }, [session])

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

        // remove isFavorited
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
            setIsFavorited(!isFavorited)
            return dispatch(setFavorite(data.favorites))
        }
        // add isFavorited
        const { data } = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`,
            { favorites: [...favoritesData, product.id] },
            {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            }
        )

        setIsFavorited(!isFavorited)
        return dispatch(setFavorite(data.favorites))
    }

    if (!Array.isArray(product.images) || product.images.length <= 0) return null

    // Render SubTotal
    useEffect(() => {
        countSubtotal()
    })

    // Add to Cart Handler
    const addToCart = async () => {
        setAddToCartLoading(true)

        if (!session) {
            setAddToCartLoading(false)
            return setOpen(true)
        }
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

            setAddToCartLoading(false)

            return addToCartSuccessToast('Produk ditambahkan ke Keranjang')
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
            setAddToCartLoading(false)
            return addToCartFailedToast('Gagal menambah Keranjang')
        }

        const cart = await axios.get('/api/cart')

        dispatch(setOrder(cart.data))

        setAddToCartLoading(false)

        return addToCartSuccessToast('Produk ditambahkan ke Keranjang')
    }

    return (
        <Layout title={`${product.name} - Lokaloka`}>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='fixed z-50 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <div className='inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full'>
                                <div className='bg-white p-4'>
                                    <div className='flex flex-col items-center justify-between w-full'>
                                        <ExclamationCircleIcon className='text-red-500 w-12 h-12' />
                                        <Dialog.Title as='h3' className='mt-3 text-lg leading-6 font-medium text-gray-900'>
                                            Anda belum login
                                        </Dialog.Title>
                                        <div className='mt-2'>
                                            <p className='text-sm text-gray-500'>Silahkan melakukan login untuk membeli produk!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='container mx-auto px-4 md:px-12 lg:px-16 md:my-5 2xl:my-6'>
                <div className='w-full hidden md:text-sm md:space-x-1 md:flex space-x-2 items-center'>
                    <div className='text-orange-500 hover:text-orange-600'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5 text-slate-500' />
                    <div className='text-orange-500 hover:text-orange-600'>
                        <Link href={`/${product.product_category.slug}`}>{product.product_category.name}</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5 text-slate-500' />
                    <div>
                        <div className='line-clamp-1'>{product.name}</div>
                    </div>
                </div>
                {/* Tablet Only */}
                <div className='hidden md:flex md:flex-col md:space-y-4 md:justify-start lg:hidden md:my-5'>
                    {/* Images */}
                    <div className='lg:hidden flex space-x-4'>
                        <div className='w-auto'>
                            {session && (
                                <div className='flex justify-end absolute w-96 z-30 items-start px-4 py-4'>
                                    <div
                                        className='px-3 py-3 rounded-full cursor-pointer bg-gray-300 bg-opacity-50'
                                        onClick={() => {
                                            favoriteHandle()
                                        }}
                                    >
                                        <FaHeart className={`${isFavorited ? 'text-red-500' : 'text-white'} hover:text-red-500 transition duration-300 ease-in-out w-6 h-6`} />
                                    </div>
                                </div>
                            )}
                            <div className='flex justify-between md:w-96 lg:w-96 lg:h-96 absolute'>
                                {product.images.map((img, index) => {
                                    return (
                                        <div key={index} className={index === current ? 'block w-full h-full ease-in-out duration-300 transition-all select-none' : 'hidden'}>
                                            <Image alt={product.name} src={img.url} className='rounded-lg' layout='responsive' width={1} height={1} objectFit='cover' />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='w-96 h-96 flex justify-between items-center'>
                                <ChevronLeftIcon
                                    className='w-8 h-8 rounded-r-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-10 cursor-pointer'
                                    onClick={prevSlide}
                                />
                                <ChevronRightIcon
                                    className='w-8 h-8 rounded-l-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-10 cursor-pointer'
                                    onClick={nextSlide}
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className='h-full w-full flex-auto'>
                            <div className='flex flex-col space-y-2'>
                                <div className='md:text-xl md:-mt-1 2xl:text-2xl 2xl:-mt-2 font-bold'>{product.name}</div>
                                <Badge text='Rekomendasi' color='green' />
                                <div className='my-4 flex flex-col space-y-2 items-start'>
                                    <NumberFormat
                                        value={isDiscount ? discountPrice : product.sellingPrice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp. '}
                                        className='md:text-2xl 2xl:text-3xl font-extrabold text-orange-500'
                                    />
                                    {isDiscount && (
                                        <div className='flex space-x-2 items-center'>
                                            <NumberFormat
                                                value={product.sellingPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Rp. '}
                                                className='md:text-sm 2xl:text-base font-semibold line-through text-slate-500'
                                            />
                                            <NumberFormat
                                                value={product.discount}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'%'}
                                                className='md:text-xs 2xl:text-sm font-semibold rounded px-1 py-0.5 text-red-500 bg-red-200'
                                            />
                                        </div>
                                    )}
                                </div>
                                {/* Navigation */}
                                <div className='flex flex-col space-y-2'>
                                    <div className='flex flex-col space-y-1'>
                                        <div className='text-sm font-semibold text-slate-600'>Bagikan</div>
                                        <div className='flex space-x-8 items-center'>
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target='_blank' rel='noopener noreferrer'>
                                                <FaFacebookSquare className='cursor-pointer text-blue-500 w-5 h-5 lg:w-6 lg:h-6' />
                                            </a>
                                            <a href={`whatsapp://send?text=${shareLink}`} target='_blank' rel='noopener noreferrer'>
                                                <FaWhatsapp className='cursor-pointer text-green-500 w-5 h-5 lg:w-6 lg:h-6' />
                                            </a>
                                            <LinkIcon onClick={() => navigator.clipboard.writeText(shareLink)} className='cursor-pointer w-5 h-5 lg:w-6 lg:h-6' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <div className='text-sm font-semibold text-slate-600'>Kuantitas</div>
                                        <div className='flex items-center border border-slate-300 bg-white rounded'>
                                            <div
                                                onClick={reduceQty}
                                                className='select-none cursor-pointer transition duration-100 ease-in hover:bg-slate-200 px-3 py-1 font-bold text-center border-r border-slate-300'
                                            >
                                                -
                                            </div>
                                            <div className='px-4 py-1 flex-1 text-center '>{quantity}</div>
                                            <div
                                                onClick={addQty}
                                                className='select-none cursor-pointer transition duration-100 ease-in hover:bg-slate-200 px-3 py-1 font-bold text-center border-l border-slate-300'
                                            >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <div className='text-sm font-semibold text-slate-600'>Subtotal</div>
                                        <NumberFormat
                                            value={subtotal}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp. '}
                                            className='md:text-xl 2xl:text-2xl font-extrabold'
                                        />
                                    </div>
                                    {addToCartLoading ? (
                                        <Button type='secondary' displayType='flex' size='base' width='full' href={() => {}}>
                                            <span className=''>Menambahkan...</span>
                                        </Button>
                                    ) : (
                                        <Button type='primary' displayType='flex' size='base' width='full' href={() => addToCart()}>
                                            <span className=''>Tambah Keranjang</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <details open={true} className='lg:hidden flex flex-col'>
                        <summary className='appearance-none list-none cursor-pointer 2xl:text-lg md:text-base font-semibold tracking-wide py-2 text-slate-600'>Deskripsi</summary>
                        <div className='prose prose-sm leading-snug text-slate-700'>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} children={product.description} />
                        </div>
                    </details>
                </div>

                {/* Mobile and Desktop */}
                <div className='flex flex-col space-y-2 space-x-0 md:hidden lg:space-y-0 lg:flex lg:flex-row lg:justify-start my-4 md:my-5 2xl:my-6'>
                    <div className='aspect-w-1 aspect-h-1 lg:hidden w-full'>
                        {session && (
                            <div className='flex justify-end absolute w-full h-full lg:w-96 z-20 items-start px-4 py-4'>
                                <div
                                    className='px-3 py-3 rounded-full cursor-pointer bg-gray-300 bg-opacity-50'
                                    onClick={() => {
                                        favoriteHandle()
                                    }}
                                >
                                    <FaHeart className={`${isFavorited ? 'text-red-500' : 'text-white'} hover:text-red-500 transition duration-300 ease-in-out w-6 h-6`} />
                                </div>
                            </div>
                        )}
                        <div className='flex justify-between w-full h-full lg:w-96 lg:h-96 absolute'>
                            {product.images.map((img, index) => {
                                return (
                                    <div key={index} className={index === current ? 'w-full h-full ease-in-out duration-300 transition-all select-none' : 'hidden'}>
                                        <Image alt={product.name} src={img.url} className='rounded-lg' layout='responsive' width={1} height={1} objectFit='cover' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-full h-full lg:w-96 lg:h-96 flex justify-between items-center'>
                            <ChevronLeftIcon className='w-8 h-8 rounded-r-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-20 cursor-pointer' onClick={prevSlide} />
                            <ChevronRightIcon
                                className='w-8 h-8 rounded-l-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-20 cursor-pointer'
                                onClick={nextSlide}
                            />
                        </div>
                    </div>
                    <div className='hidden lg:flex flex-1 w-96 h-96'>
                        {session && (
                            <div className='flex justify-end absolute w-96 z-20 items-start px-4 py-4'>
                                <div
                                    className='px-3 py-3 rounded-full cursor-pointer bg-gray-300 bg-opacity-50'
                                    onClick={() => {
                                        favoriteHandle()
                                    }}
                                >
                                    <FaHeart className={`${isFavorited ? 'text-red-500' : 'text-white'} hover:text-red-500 transition duration-300 ease-in-out w-6 h-6`} />
                                </div>
                            </div>
                        )}
                        <div className='flex w-96 h-96 absolute'>
                            {product.images.map((img, index) => {
                                return (
                                    <div key={index} className={index === current ? 'w-96 h-96 ease-in-out duration-300 transition-all select-none' : 'hidden'}>
                                        <Image alt={product.name} src={img.url} className='rounded-lg' layout='responsive' width={1} height={1} objectFit='cover' />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-96 h-96 flex justify-between items-center'>
                            <ChevronLeftIcon className='w-8 h-8 rounded-r-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-20 cursor-pointer' onClick={prevSlide} />
                            <ChevronRightIcon
                                className='w-8 h-8 rounded-l-md bg-gray-100 bg-opacity-50 text-gray-400 hover:text-gray-600 z-20 cursor-pointer'
                                onClick={nextSlide}
                            />
                        </div>
                    </div>
                    {/* Product Details */}
                    <div className='block md:hidden lg:block h-full w-full lg:px-6 flex-initial'>
                        <div className='flex flex-col space-y-2 md:space-y-2'>
                            <div className='text-lg md:text-xl md:-mt-1 2xl:text-2xl 2xl:-mt-2 font-bold'>{product.name}</div>
                            <Badge text='Rekomendasi' color='green' />
                            <div className='my-4 flex flex-col space-y-2 items-start'>
                                <NumberFormat
                                    value={isDiscount ? discountPrice : product.sellingPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                    className='text-lg md:text-2xl 2xl:text-3xl font-extrabold text-orange-500'
                                />
                                {isDiscount && (
                                    <div className='flex space-x-2 items-center'>
                                        <NumberFormat
                                            value={product.sellingPrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp. '}
                                            className='text-sm md:text-sm 2xl:text-base font-semibold line-through text-slate-500'
                                        />
                                        <NumberFormat
                                            value={product.discount}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'%'}
                                            className='text-xs 2xl:text-sm font-semibold rounded px-1 py-0.5 text-red-500 bg-red-200'
                                        />
                                    </div>
                                )}
                            </div>
                            <details open={true} className='flex flex-col select-none'>
                                <summary className='2xl:text-lg md:text-base cursor-pointer underline appearance-none list-none text-sm font-semibold tracking-wide py-2 text-slate-600'>
                                    Deskripsi
                                </summary>
                                <div className='prose prose-sm leading-snug text-slate-700'>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={product.description} />
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className='block md:hidden lg:w-4/12 lg:flex lg:flex-col space-y-2 md:space-y-4 mt-2'>
                        <div className='flex flex-col space-y-1 md:space-y-2'>
                            <div className='text-sm font-semibold text-slate-600'>Bagikan</div>
                            <div className='flex space-x-8 items-center'>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target='_blank' rel='noopener noreferrer'>
                                    <FaFacebookSquare className='cursor-pointer text-blue-500 w-5 h-5 lg:w-6 lg:h-6' />
                                </a>
                                <a href={`whatsapp://send?text=${shareLink}`} target='_blank' rel='noopener noreferrer'>
                                    <FaWhatsapp className='cursor-pointer text-green-500 w-5 h-5 lg:w-6 lg:h-6' />
                                </a>
                                <LinkIcon onClick={() => navigator.clipboard.writeText(shareLink)} className='cursor-pointer w-5 h-5 lg:w-6 lg:h-6' />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 md:py-0 md:space-y-4 md:bottom-0 md:relative'>
                            <div className='flex justify-between items-center lg:flex-col lg:space-y-4 lg:items-start py-2'>
                                <div className='flex flex-col space-y-1'>
                                    <div className='text-sm font-semibold text-slate-600'>Subtotal</div>
                                    <NumberFormat
                                        value={subtotal}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp. '}
                                        className='md:text-xl 2xl:text-2xl font-extrabold'
                                    />
                                </div>
                                <div className='flex flex-col space-y-1 md:space-y-2'>
                                    <div className='text-sm font-semibold text-slate-600'>Kuantitas</div>
                                    <div className='flex items-center border border-slate-300 bg-white rounded'>
                                        <div
                                            onClick={reduceQty}
                                            className='select-none cursor-pointer transition duration-100 ease-in hover:bg-slate-200 px-3 md:py-1 font-bold text-center border-r border-slate-300'
                                        >
                                            -
                                        </div>
                                        <div className='px-4 md:py-1 flex-1 text-center '>{quantity}</div>
                                        <div
                                            onClick={addQty}
                                            className='select-none cursor-pointer transition duration-100 ease-in hover:bg-slate-200 px-3 md:py-1 font-bold text-center border-l border-slate-300'
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='hidden md:flex'>
                                {addToCartLoading ? (
                                    <Button type='secondary' displayType='flex' size='base' width='full' href={() => {}}>
                                        <span className='text-sm'>Menambahkan...</span>
                                    </Button>
                                ) : (
                                    <Button type='primary' displayType='flex' size='base' width='full' href={() => addToCart()}>
                                        <span className='text-sm'>Tambah Keranjang</span>
                                    </Button>
                                )}
                            </div>
                            <div className='flex md:hidden'>
                                {addToCartLoading ? (
                                    <Button type='secondary' displayType='flex' size='base' width='full' href={() => {}}>
                                        <span className='text-sm'>Menambahkan...</span>
                                    </Button>
                                ) : (
                                    <Button type='primary' displayType='flex' size='base' width='full' href={() => addToCart()}>
                                        <span className='text-sm'>Tambah Keranjang</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className='flex flex-col space-y-4'>
                    <FancySectionTitle title='Produk serupa' />
                    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 2xl:gap-8'>
                        {similarProducts.map((item, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    slug={item.slug}
                                    category={item.product_category.slug}
                                    imgSrc={item.images[0].url}
                                    productName={item.name}
                                    price={item.sellingPrice}
                                    discount={item.discount ? item.discount : null}
                                    isRecommended={item.isRecommended}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }) => {
    const getProduct = await axios.get(`${process.env.NEXT_URL}/api/products/${params.product}`)
    const data = await getProduct.data

    const baseLink = await process.env.NEXT_URL

    if (!data) {
        return {
            notFound: true,
        }
    }

    const resSimilarProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?product_category=${data.product_category.id}&_limit=6`)
    const similarProducts = await resSimilarProducts.data

    return {
        props: {
            product: data,
            similarProducts: similarProducts,
            baseLink,
        },
    }
}

export default Product
