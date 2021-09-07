import { getSession } from 'next-auth/client'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRightIcon, ExclamationIcon, SelectorIcon } from '@heroicons/react/solid'
import { FaCheckCircle, FaWallet } from 'react-icons/fa'
import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/Button'
import { setPaymentMethod } from '@/redux/paymentMethod'
import { setTransaction } from '@/redux/transactionSlice'

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
        id: 'BNI',
        label: 'BNI Virtual Account',
    },
    {
        src: '/images/payment-gateway-small/briva.png',
        type: 'va',
        id: 'BRI',
        label: 'BRI Virtual Account',
    },
    {
        src: '/images/payment-gateway-small/mandiri.png',
        type: 'va',
        id: 'MANDIRI',
        label: 'Mandiri Virtual Account',
    },
    {
        src: '/images/payment-gateway-small/permata.png',
        type: 'va',
        id: 'PERMATA',
        label: 'Permata Virtual Account',
    },
    {
        src: '/images/payment-gateway-small/ovo.png',
        type: 'ewallet',
        id: 'ID_OVO',
        label: 'OVO',
    },
    {
        src: '/images/payment-gateway-small/dana.png',
        type: 'ewallet',
        id: 'ID_DANA',
        label: 'DANA',
    },
    {
        src: '/images/payment-gateway-small/linkaja.png',
        type: 'ewallet',
        id: 'ID_LINKAJA',
        label: 'Link AJA',
    },
    {
        src: '/images/payment-gateway-small/qris.png',
        type: 'qrcode',
        id: 'QRCODE',
        label: 'QRIS',
    },
    {
        src: '/images/payment-gateway-small/alfamart.png',
        type: 'retail-outlet',
        id: 'ALFAMART',
        label: 'ALFAMART',
    },
    {
        src: '/images/payment-gateway-small/indomaret.png',
        type: 'retail-outlet',
        id: 'INDOMARET',
        label: 'INDOMARET',
    },
]

const index = ({ orderData, cityData, provinceData, session }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const order = orderData[0]

    const [area, setArea] = useState('malang-batu')
    const [choosenPaymentMethod, setChoosenPaymentMethod] = useState(undefined)
    const [shippingCost, setShippingCost] = useState(3000)
    const [shippingEtd, setShippingEtd] = useState(null)
    const [total, setTotal] = useState(0)
    const [filteredCity, setFilteredCity] = useState(cityData)
    const [city, setCity] = useState('')
    const [cityToggle, setCityToggle] = useState(false)
    const [province, setProvince] = useState({ province: '' })
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [note, setNote] = useState('')
    const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
    const [ovoNumber, setOvoNumber] = useState('')

    useEffect(() => {
        selectArea, selectPaymentMethod, countTotal()
        return () => {}
    }, [area, choosenPaymentMethod, shippingCost, total, shippingEtd])

    // Select Area
    const selectArea = (value) => {
        const data = areaCollection.find((area) => area.value == value)
        setArea(data.value)
        if (data.value == 'malang-batu') return setShippingCost(3000)
        if (data.value == 'anotherCity') {
            return setShippingCost(0)
        }
    }

    // Handle Ovo Number
    const handleOvoNumber = async (e) => {
        if (e.target.value.startsWith('0')) {
            return setOvoNumber(`+62${e.target.value.substring(1)}`)
        }
        return setOvoNumber(`+62${e.target.value}`)
    }

    // Handle Address
    const handleAddress = async (e) => {
        return setAddress(e.target.value)
    }

    // Handle Location
    const handleLocation = async (e) => {
        return setLocation(e.target.value)
    }

    // Handle Note
    const handleNote = async (e) => {
        return setNote(e.target.value)
    }

    // Handle PostalCode
    const handlePostalCode = async (e) => {
        return setPostalCode(e.target.value)
    }

    // Handle Input City
    const handleCityInput = async (e) => {
        const ct = await cityData.filter((c) => {
            const x = c.type + ' ' + c.city_name
            return x.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredCity(ct)
    }

    // Select City
    const selectCity = async (c) => {
        setCity(c)
        const province = await provinceData.find((p) => p.province_id == c.province_id)
        setProvince(province)
        setCityToggle(false)

        const destinationInfo = {
            destination: c.city_id,
            weight: 2000,
            origin: process.env.NEXT_PUBLIC_RAJA_ONGKIR_ORIGIN,
            courier: process.env.NEXT_PUBLIC_RAJA_ONGKIR_COURIER,
        }

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/expedition/cost`, destinationInfo)

        setShippingCost(data.value)
        setShippingEtd(data.etd)
    }

    // Select Payment Method
    const selectPaymentMethod = (id) => {
        const data = paymentMethodCollection.find((paymentMethod) => paymentMethod.id == id)
        return setChoosenPaymentMethod(data.id)
    }

    // count total
    const countTotal = () => {
        return setTotal(+shippingCost + +order.totalPrice)
    }

    // Handle Modal
    const openModal = () => {
        if (area != 'anotherCity') {
            if (address == '' || location == '') {
                return alert('Fill all inputs form')
            }
        }
        if (area == 'anotherCity') {
            if (address == '' || postalCode == '') {
                return alert('Fill all inputs form')
            }
        }
        if (choosenPaymentMethod == undefined) {
            return alert('select payment method!')
        }
        return setOpenModalConfirmation(!openModalConfirmation)
    }

    // pay Handle
    const pay = async () => {
        if (choosenPaymentMethod == 'BNI' || choosenPaymentMethod == 'BRI' || choosenPaymentMethod == 'MANDIRI' || choosenPaymentMethod == 'PERMATA') {
            const createInvoice = await axios.get(`/api/payment/invoice`)
            const invoiceResponse = await createInvoice.data

            const selectedPaymentMethod = await invoiceResponse.available_banks.find((bank) => choosenPaymentMethod == bank.bank_code)

            dispatch(setPaymentMethod(selectedPaymentMethod))

            const transactionData = {
                ...orderData[0],
                code: invoiceResponse.external_id,
                paymentStatus: invoiceResponse.status,
                paymentMethod: choosenPaymentMethod,
                bankNumber: selectedPaymentMethod.bank_account_number,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data
            console.log(transactionResponse)

            dispatch(setTransaction(transactionData))

            return await router.push('/cart/checkout/pay')
        }

        if (choosenPaymentMethod == 'ID_OVO') {
            const createEWalletInvoice = await axios.post(`/api/payment/e-wallet`, {
                eWalletType: 'ID_OVO',
                amount: total,
                mobileNumber: ovoNumber,
            })

            const eWalletResponse = await createEWalletInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const transactionData = {
                ...orderData[0],
                code: eWalletResponse.reference_id,
                paymentStatus: eWalletResponse.status,
                paymentMethod: choosenPaymentMethod,
                mobileNumber: ovoNumber,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionData))

            return await router.push('/cart/checkout/pay')
        }

        if (choosenPaymentMethod == 'ID_DANA' || choosenPaymentMethod == 'ID_LINKAJA') {
            const createEWalletInvoice = await axios.post(`/api/payment/e-wallet`, {
                eWalletType: choosenPaymentMethod,
                amount: total,
                successRedirectURL: 'https://lokaloka.id',
            })

            const eWalletResponse = await createEWalletInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const transactionData = {
                ...orderData[0],
                code: eWalletResponse.reference_id,
                paymentStatus: eWalletResponse.status,
                paymentMethod: choosenPaymentMethod,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionData))

            return await router.push(eWalletResponse.actions.desktop_web_checkout_url)
        }

        if (choosenPaymentMethod == 'QRCODE') {
            const createQrCodeInvoice = await axios.post(`/api/payment/qris`, {
                amount: total,
            })

            const qrCodeResponse = await createQrCodeInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const transactionData = {
                ...orderData[0],
                code: qrCodeResponse.external_id,
                paymentStatus: qrCodeResponse.status,
                paymentMethod: choosenPaymentMethod,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionData))
            return await router.push('/cart/checkout/pay')
        }

        if (choosenPaymentMethod == 'ALFAMART' || choosenPaymentMethod == 'INDOMARET') {
            const createRetailOutletInvoice = await axios.get(`/api/payment/retail-outlet`, {
                amount: total,
                retail: choosenPaymentMethod,
            })

            const retailOutletInvoiceResponse = await createRetailOutletInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))
            return await router.push('/cart/checkout/pay')
        }
    }

    return (
        <Layout title='Checkout'>
            {openModalConfirmation && (
                <div className='fixed z-50 inset-0 overflow-y-auto text-blueGray-800' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden='true'></div>

                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                            &#8203;
                        </span>

                        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full 2xl:w-full 2xl:max-w-2xl'>
                            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                <div className='sm:flex sm:items-start'>
                                    <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10'>
                                        <ExclamationIcon className='w-7 h-7 text-orange-500' />
                                    </div>
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <h3 className='text-lg leading-none font-medium text-blueGray-800' id='modal-title'>
                                            Order confirmation
                                        </h3>
                                        <div className='mt-2 flex flex-col space-y-2'>
                                            <p className='text-sm text-gray-500'>Confirm order with the following details?</p>
                                            <br />
                                            <div className='font-medium tracking-wide text-sm text-blueGray-500'>Products</div>
                                            {orderData[0].products.map((product, index) => {
                                                return (
                                                    <div className='flex justify-between space-x-2 ' key={index}>
                                                        <div className='flex space-x-1'>
                                                            <span className='w-10'>x {product.quantity}</span>
                                                            <span className='w-10/12 line-clamp-1 flex-initial max-w-sm'>{product.product.name}</span>
                                                        </div>
                                                        <NumberFormat
                                                            value={product.quantity * product.product.sellingPrice}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'Rp. '}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <br />
                                        <div className='flex flex-col space-y-2'>
                                            <div className='flex justify-between space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Sub Total</span>
                                                <NumberFormat className='font-bold ' value={orderData[0].subTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                            </div>
                                            <div className='flex justify-between space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Discount</span>
                                                <NumberFormat
                                                    className='font-bold text-red-500'
                                                    value={orderData[0].discount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'-Rp. '}
                                                />
                                            </div>
                                            <hr className='border border-dashed' />
                                            <div className='flex justify-between space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Total</span>
                                                <NumberFormat className='font-bold' value={orderData[0].totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                            </div>
                                        </div>
                                        <br />
                                        <div className='flex flex-col space-y-2'>
                                            <div>
                                                <div className='font-medium tracking-wide text-sm text-blueGray-500'>Location</div>
                                                {area != 'anotherCity' ? (
                                                    <>
                                                        <div className='font-medium text-blueGray-800'>{`${location}`}</div>
                                                        <div className='font-medium text-blueGray-800'>{`${address}`}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='font-medium text-blueGray-800'>{`${address}`}</div>
                                                        <div className='font-medium text-blueGray-800'>{`${postalCode}, ${city.type} ${city.city_name}, ${province.province}`}</div>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                <div className='font-medium tracking-wide text-sm text-blueGray-500'>Payment Method</div>
                                                <div className='font-medium text-blueGray-800'>{`${choosenPaymentMethod.replace('ID_', '')} (${ovoNumber})`}</div>
                                            </div>
                                            <div>
                                                <div className='font-medium tracking-wide text-sm text-blueGray-500'>Notes</div>
                                                <div className='font-medium text-blueGray-800'>{`${note}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        pay()
                                    }}
                                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                                >
                                    Confirm
                                </button>
                                <button
                                    type='button'
                                    onClick={() => {
                                        openModal()
                                    }}
                                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                >
                                    Check order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                                                    ? 'py-1 px-2 flex items-center space-x-2 rounded-md border border-blue-500 bg-blue-500 text-white transition ease-in-out duration-300'
                                                                    : 'py-1 px-2 flex items-center space-x-2 rounded-md border border-blueGray-200 bg-blueGray-300 text-blueGray-800 transition ease-in-out duration-300'
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
                                                            onChange={handleLocation}
                                                            required
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='Massachusetts Institute of Technology'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='address'>Address</label>
                                                        <input
                                                            type='text'
                                                            onChange={handleAddress}
                                                            name='address'
                                                            required
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
                                                        onChange={handleNote}
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
                                                            onChange={handleAddress}
                                                            required
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
                                                            className='rounded-md border flex items-center justify-between text-sm px-2 text-blueGray-500 w-full py-2 border-blueGray-200'
                                                        >
                                                            <span>{city ? city.type + ' ' + city.city_name : 'Select City'}</span>
                                                            <span>
                                                                <SelectorIcon className='w-4 h-4 text-blueGray-500' />
                                                            </span>
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
                                                                                required
                                                                                autoComplete='disabled'
                                                                                name='city'
                                                                                id='city'
                                                                                onChange={handleCityInput}
                                                                                className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border border-blueGray-200'
                                                                                placeholder='Massachusetts'
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
                                                                                    <div className='flex text-left items-center w-full'>
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
                                                            value={province.province}
                                                            readOnly={true}
                                                            id='province'
                                                            required
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
                                                            onChange={handlePostalCode}
                                                            required
                                                            className='rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm border-blueGray-200'
                                                            placeholder='MA 02139'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-1'>
                                                    <label htmlFor='notes'>Notes</label>
                                                    <textarea
                                                        name='notes'
                                                        onChange={handleNote}
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
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                            <h3 className='text-semibold'>Retail Outlet</h3>
                                            <div className='flex space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'retail-outlet')
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
                                                                        ? 'rounded-md border-2 border-blue-500 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border-2 border-blueGray-200 bg-white h-16 w-40 px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                            <div className='flex space-x-2 items-baseline'>
                                                <span>Shipping</span>
                                                {shippingEtd && <span className='text-blueGray-400 text-sm'>{`(Etd ${shippingEtd} Days via JNE)`}</span>}
                                            </div>
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
                                {choosenPaymentMethod == 'ID_OVO' ? (
                                    <div className='flex flex-col space-y-1'>
                                        <label htmlFor='ovo_number' className='block text-sm font-medium text-blueGray-500'>
                                            OVO Number
                                        </label>
                                        <div className='mt-1 flex rounded-md shadow-sm'>
                                            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-blueGray-300 bg-blueGray-50 text-blueGray-500 text-sm'>
                                                +62
                                            </span>
                                            <input
                                                type='text'
                                                name='ovo_number'
                                                id='ovo_number'
                                                onChange={handleOvoNumber}
                                                required
                                                className='rounded-r-md focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full sm:text-sm placeholder-gray-300 border-blueGray-300'
                                                placeholder='85199992222'
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                                {/* Checkout Button */}
                                <Button href={() => openModal()} type='primary' size='lg' width='full' display='flex'>
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

    const getOrder = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?user_eq=${session.id}`, {
        headers: {
            Authorization: 'Bearer ' + session.jwt,
        },
    })
    const order = getOrder.data

    const getCity = await axios.get(`${process.env.NEXT_URL}/api/expedition/cities`)
    const city = getCity.data

    const getProvince = await axios.get(`${process.env.NEXT_URL}/api/expedition/provinces`)
    const province = getProvince.data

    return {
        props: {
            session,
            orderData: order,
            cityData: city,
            provinceData: province,
        },
    }
}

export default index
