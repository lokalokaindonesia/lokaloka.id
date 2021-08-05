import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import axios from 'axios'
import Link from 'next/link'
import { ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import { FaCheckCircle, FaWallet } from 'react-icons/fa'
import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import { setOrder } from '@/redux/orderSlice'
import Button from '@/components/ui/Button'
import Image from 'next/image'

const index = ({ orderData, cityData, provinceData }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    dispatch(setOrder(orderData[0]))
    const order = useSelector((state) => state.order.value)

    // Area Data
    const areaCollection = [
        {
            value: 'malang-batu',
            label: 'Malang - Batu City',
        },
        {
            value: 'anotherCity',
            label: 'Another City',
        },
    ]

    // Images Payment Methods
    const paymentMethodCollection = [
        {
            src: '/images/payment-gateway-small/bni.png',
            type: 'va',
            id: 'bni',
            label: 'BNI Virtual Account',
        },
        {
            src: '/images/payment-gateway-small/briva.png',
            type: 'va',
            id: 'bri',
            label: 'BRI Virtual Account',
        },
        {
            src: '/images/payment-gateway-small/mandiri.png',
            type: 'va',
            id: 'mandiri',
            label: 'Mandiri Virtual Account',
        },
        {
            src: '/images/payment-gateway-small/permata.png',
            type: 'va',
            id: 'permata',
            label: 'Permata Virtual Account',
        },
        {
            src: '/images/payment-gateway-small/ovo.png',
            type: 'ewallet',
            id: 'ovo',
            label: 'OVO',
        },
        {
            src: '/images/payment-gateway-small/dana.png',
            type: 'ewallet',
            id: 'dana',
            label: 'DANA',
        },
        {
            src: '/images/payment-gateway-small/linkaja.png',
            type: 'ewallet',
            id: 'linkaja',
            label: 'Link AJA',
        },
        {
            src: '/images/payment-gateway-small/qris.png',
            type: 'qrcode',
            id: 'qrcode',
            label: 'QRIS',
        },
    ]

    const [area, setArea] = useState('malang-batu')
    const [choosenPaymentMethod, setChoosenPaymentMethod] = useState(undefined)
    const [shippingCost, setShippingCost] = useState(3000)
    const [total, setTotal] = useState(0)
    const [inputCity, setInputCity] = useState('')
    const [filteredCity, setFilteredCity] = useState(cityData)
    const [city, setCity] = useState('')
    const [cityToggle, setCityToggle] = useState(false)
    const [province, setProvince] = useState('')

    useEffect(() => {
        selectArea, selectPaymentMethod, countTotal()
        return () => {}
    }, [area, choosenPaymentMethod, shippingCost, total, city])

    // Select Area
    const selectArea = (value) => {
        const data = areaCollection.find((area) => area.value == value)
        setArea(data.value)
        if (data.value == 'malang-batu') return setShippingCost(3000)
        if (data.value == 'anotherCity') return setShippingCost(50000)
    }

    // Handle Input City
    const handleCityInput = async (e) => {
        const ct = await cityData.filter((c) => {
            return c.city_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredCity(ct)
        setInputCity(e.target.value)
    }

    // Select City
    const selectCity = async (c) => {
        setCity(c)
        const province = provinceData.find((p) => p.id == c.province_id)
        console.log(c)
        console.log(province)
        console.log(provinceData)
        // setProvince(province)
        setCityToggle(false)
    }

    // Select Payment Method
    const selectPaymentMethod = (id) => {
        const data = paymentMethodCollection.find((paymentMethod) => paymentMethod.id == id)
        setChoosenPaymentMethod(data.id)
        return
    }

    // count total
    const countTotal = () => {
        return setTotal(+shippingCost + +order.totalPrice)
    }

    // pay Handle
    const pay = () => {
        return
    }

    return (
        <Layout title='Checkout'>
            <div className='container mx-auto'>
                <div className='w-full flex space-x-2 items-center mt-4'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/cart'>Cart</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800'>Checkout</div>
                </div>
                <div className='py-6'>
                    <h1 className='text-blueGray-800 font-extrabold text-3xl'>Payment</h1>
                </div>
                <div className='flex flex-col space-y-8 mb-12'>
                    <div className='flex justify-between space-x-5'>
                        <div className='w-9/12'>
                            <div className='flex flex-col space-y-4'>
                                <div className='p-4 border border-blueGray-200 bg-white text-blueGray-800 rounded-md drop-shadow-sm'>
                                    <h2 className='text-lg font-semibold mb-3'>Shipping Information</h2>
                                    <div className='flex flex-col space-y-4'>
                                        {/* Area */}
                                        <div className='flex flex-col space-y-1'>
                                            <label htmlFor='area'>Area</label>
                                            <div className='flex items-center space-x-4'>
                                                {areaCollection.map((n, index) => {
                                                    return (
                                                        <button
                                                            type='button'
                                                            key={n.value}
                                                            onClick={() => {
                                                                selectArea(n.value)
                                                            }}
                                                            className={
                                                                area == n.value
                                                                    ? 'py-1 px-2 flex items-center space-x-8 rounded-md border border-blue-500 bg-blue-500 text-white transition ease-in-out duration-300'
                                                                    : 'py-1 px-2 flex items-center space-x-8 rounded-md border border-blueGray-200 bg-blueGray-300 text-blueGray-800 transition ease-in-out duration-300'
                                                            }
                                                        >
                                                            {area != n.value && <div className='border border-blueGray-800 rounded-full w-4 h-4'></div>}
                                                            {area == n.value && <FaCheckCircle className='text-white w-4 h-4' />}
                                                            <span>{n.label}</span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        {/* Address */}
                                        {area == 'malang-batu' && (
                                            <>
                                                <div className='flex space-x-4 items-center'>
                                                    <div className='flex flex-col flex-initial space-y-1'>
                                                        <label htmlFor='location'>Location</label>
                                                        <input
                                                            type='text'
                                                            name='location'
                                                            id='location'
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='Massachusetts Institute of Technology'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='address'>Address</label>
                                                        <input
                                                            type='text'
                                                            name='address'
                                                            id='address'
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='77 Massachusetts Ave, Cambridge, MA 02139, United States'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-1'>
                                                    <label htmlFor='notes'>Notes</label>
                                                    <textarea
                                                        name='notes'
                                                        id='notes'
                                                        placeholder='Notes'
                                                        className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                    ></textarea>
                                                </div>
                                            </>
                                        )}
                                        {area == 'anotherCity' && (
                                            <>
                                                <div className='flex space-x-4 items-center'>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='address'>Address</label>
                                                        <input
                                                            type='text'
                                                            name='address'
                                                            id='address'
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='77 Massachusetts Ave, Cambridge, MA 02139, United States'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex space-x-4 items-center'>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='city'>City</label>
                                                        <button
                                                            onClick={() => setCityToggle(!cityToggle)}
                                                            className='rounded-md border flex text-sm px-2 text-blueGray-500 w-full py-2 border-blueGray-200'
                                                        >
                                                            {city ? city.type + ' ' + city.city_name : 'Select City'}
                                                        </button>
                                                        {cityToggle && (
                                                            <div className='relative'>
                                                                <div className='rounded-md bg-white border border-blueGray-200 drop-shadow-sm text-blueGray-800 h-auto w-auto absolute'>
                                                                    <ul
                                                                        className='w-96 bg-white max-h-32 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
                                                                        tabIndex='-1'
                                                                        role='listbox'
                                                                        aria-labelledby='listbox-label'
                                                                        aria-activedescendant='listbox-option-3'
                                                                    >
                                                                        <div className='sticky top-2 bg-white z-10 m-2'>
                                                                            <input
                                                                                type='text'
                                                                                autoComplete='disabled'
                                                                                name='city'
                                                                                id='city'
                                                                                onChange={handleCityInput}
                                                                                className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border border-blueGray-200'
                                                                                placeholder='MA'
                                                                            />
                                                                        </div>
                                                                        {filteredCity.map((c) => {
                                                                            return (
                                                                                <li
                                                                                    key={c.city_id}
                                                                                    onClick={() => {
                                                                                        selectCity(c)
                                                                                    }}
                                                                                    className='text-blueGray-800 w-full cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out select-none relative py-2'
                                                                                    id='listbox-option-0'
                                                                                    role='option'
                                                                                >
                                                                                    <div className='flex items-center w-full'>
                                                                                        <span className='font-normal ml-3 block truncate w-full'>
                                                                                            {c.type} {c.city_name}
                                                                                        </span>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='province'>Province</label>
                                                        <input
                                                            type='text'
                                                            name='province'
                                                            value={province}
                                                            onChange={() => {}}
                                                            id='province'
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='Massachusetts'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='postalCode'>Postal Code</label>
                                                        <input
                                                            type='text'
                                                            name='postalCode'
                                                            id='postalCode'
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='MA 02139'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-1'>
                                                    <label htmlFor='notes'>Notes</label>
                                                    <textarea
                                                        name='notes'
                                                        id='notes'
                                                        placeholder='Notes'
                                                        className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                    ></textarea>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='p-4 border border-blueGray-200 bg-white text-blueGray-800 rounded-md drop-shadow-sm'>
                                    <h2 className='text-lg font-semibold mb-3'>Payment Methods</h2>
                                    <div className='flex flex-col space-y-4'>
                                        <div className='flex flex-col space-y-2'>
                                            <h3 className='text-semibold'>Virtual Accounts</h3>
                                            <div className='flex space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'va')
                                                    .map((paymentMethod, index) => {
                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    selectPaymentMethod(paymentMethod.id)
                                                                }}
                                                                type='button'
                                                                className={
                                                                    choosenPaymentMethod == paymentMethod.id
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-12 w-36 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-12 w-36 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                }
                                                            >
                                                                <Image
                                                                    title={paymentMethod.label}
                                                                    src={paymentMethod.src}
                                                                    layout='responsive'
                                                                    alt={paymentMethod.label}
                                                                    priority
                                                                    quality={100}
                                                                    objectFit='scale-down'
                                                                    width={8}
                                                                    height={4}
                                                                />
                                                            </button>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-2'>
                                            <h3 className='text-semibold'>E-Wallets</h3>
                                            <div className='flex space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'ewallet')
                                                    .map((paymentMethod, index) => {
                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    selectPaymentMethod(paymentMethod.id)
                                                                }}
                                                                type='button'
                                                                className={
                                                                    choosenPaymentMethod == paymentMethod.id
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-12 w-36 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-12 w-36 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                }
                                                            >
                                                                <Image
                                                                    title={paymentMethod.label}
                                                                    src={paymentMethod.src}
                                                                    alt={paymentMethod.label}
                                                                    layout='responsive'
                                                                    priority
                                                                    quality={100}
                                                                    objectFit='scale-down'
                                                                    width={8}
                                                                    height={4}
                                                                />
                                                            </button>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-2'>
                                            <h3 className='text-semibold'>QRCodes</h3>
                                            <div className='flex space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'qrcode')
                                                    .map((paymentMethod, index) => {
                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    selectPaymentMethod(paymentMethod.id)
                                                                }}
                                                                type='button'
                                                                className={
                                                                    choosenPaymentMethod == paymentMethod.id
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-12 w-36 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-12 w-36 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                }
                                                            >
                                                                <Image
                                                                    title={paymentMethod.label}
                                                                    src={paymentMethod.src}
                                                                    alt={paymentMethod.label}
                                                                    layout='responsive'
                                                                    priority
                                                                    quality={100}
                                                                    objectFit='scale-down'
                                                                    width={8}
                                                                    height={4}
                                                                />
                                                            </button>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-3/12'>
                            <div className='sticky top-28 p-4 bg-white border drop-shadow-sm border-blueGray-200 h-auto rounded-md flex flex-col space-y-4'>
                                {/* Summary */}
                                <div className='flex flex-col space-y-2'>
                                    <div className='text-xl font-bold text-blueGray-800'>Summary</div>
                                    <div className='flex flex-col space-y-1'>
                                        <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                            <span>Product Price({order.totalQuantity})</span>
                                            <NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                        </div>
                                        <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                            <span>Shipping</span>
                                            <NumberFormat value={shippingCost} displayType={'text'} className='text-blueGray-500' thousandSeparator={true} prefix={'Rp. '} />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                {/* Total */}
                                <div className='flex justify-between items-center'>
                                    <div className='text-xl font-bold text-blueGray-800'>Total</div>
                                    <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-xl font-bold text-blue-500' />
                                </div>
                                <hr />
                                {/* Checkout Button */}
                                <Button href={() => pay()} type='primary' size='lg' width='full' display='flex'>
                                    <span>Pay</span>
                                    <FaWallet className='w-6' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (contex) => {
    const session = await getSession(contex)
    if (!session) {
        return { notFound: true }
    }

    const getOrder = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?user_eq=${session.id}`)
    const order = getOrder.data

    const getCity = await axios.get(`${process.env.NEXT_URL}/api/expedition/cities`)
    const city = getCity.data

    const getProvince = await axios.get(`${process.env.NEXT_URL}/api/expedition/provinces`)
    const province = getProvince.data

    return {
        props: {
            orderData: order,
            cityData: city,
            provinceData: province,
        },
    }
}

export default index
