import { getSession } from 'next-auth/client'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRightIcon, ExclamationIcon, SelectorIcon, TrashIcon, CashIcon } from '@heroicons/react/solid'
import { FaCheckCircle, FaWallet } from 'react-icons/fa'
import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/Button'
import { setPaymentMethod } from '@/redux/paymentMethod'
import { setTransaction } from '@/redux/transactionSlice'
import { data } from 'autoprefixer'

// Area Data
const areaCollection = [
    {
        value: 'malang-batu',
        label: 'Kota Malang - Batu',
    },
    {
        value: 'anotherCity',
        label: 'Kota Lainnya',
    },
]
const cardBoardBoxOpt = [
    {
        value: 0,
        id: 'no-cardboard',
        label: 'Tanpa Kardus',
    },
    {
        value: 8000,
        id: 'cardboard',
        label: 'Bungkus Kardus',
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
        src: '/images/payment-gateway-small/gopay.png',
        type: 'ewallet',
        id: 'GOPAY',
        label: 'GOPAY',
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
        src: '/images/payment-gateway-small/alfamart.png',
        type: 'cod',
        id: 'COD',
        label: 'COD',
    },
]

const index = ({ orderData, cityData, carts, provinceData, session }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const order = orderData[0]

    const [area, setArea] = useState('malang-batu')
    const [cardBoard, setCardBoard] = useState('no-cardboard')
    const [choosenPaymentMethod, setChoosenPaymentMethod] = useState(undefined)
    const [shippingCost, setShippingCost] = useState(15000)
    const [shippingEtd, setShippingEtd] = useState(null)
    const [total, setTotal] = useState(0)
    const [filteredCity, setFilteredCity] = useState(cityData)
    const [city, setCity] = useState('')
    const [cityToggle, setCityToggle] = useState(false)
    const [province, setProvince] = useState({ province: '' })
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phone, setPhone] = useState()
    const [note, setNote] = useState('')
    const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
    const [ovoNumber, setOvoNumber] = useState('')
    const [couponInput, setCouponInput] = useState(null)
    const [couponPromo, setCouponPromo] = useState(0)
    const [coupon, setCoupon] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [payLoading, setPayLoading] = useState(false)
    const [plasticWrap, setPlasticWrap] = useState(2000)
    const [cardBoardBoxPrice, setCardBoardBoxPrice] = useState(0)
    const [showCouponMessage, setShowCouponMessage] = useState('')

    useEffect(() => {
        selectArea, selectPaymentMethod, countTotal(), countCouponPromo(), countSubTotal()
        return () => {}
    }, [area, choosenPaymentMethod, shippingCost, total, shippingEtd, cardBoardBoxPrice, coupon, subTotal, couponPromo])

    // Handle Coupon Input
    const handleCouponInput = (e) => {
        e.preventDefault()
        return setCouponInput(e.target.value)
    }
    // END Handle Coupon Input

    //  GET Coupons
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
            return alert('Kupon tidak terdaftar!')
        }
        return setCoupon(couponData)
    }
    //  END GET Coupon

    //  DELETE COUPON
    const deleteCoupon = async () => {
        return setCoupon('')
    }
    // UPDATE COUPON END DELETE COUPON

    const countCouponPromo = async () => {
        if (order.totalPrice < coupon.minSpend) {
            setShowCouponMessage(`Minimal pembelanjaan adalah Rp. ${coupon.minSpend} untuk memakain diskon ini.`)
            return setCouponPromo(0)
        }
        let potongan = (order.totalPrice * coupon.discount) / 100
        if (potongan >= coupon.maxDiscount) {
            return setCouponPromo(Math.round(coupon.maxDiscount))
        }
        return setCouponPromo(Math.round(potongan))
    }

    // Select Area
    const selectArea = (value) => {
        const data = areaCollection.find((area) => area.value == value)
        setArea(data.value)
        if (data.value == 'malang-batu') {
            if (subTotal >= 200000) {
                return setShippingCost(0)
            }
            return setShippingCost(15000)
        }
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

    // Handle Phone
    const handlePhone = async (e) => {
        return setPhone(e.target.value)
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
            weight: orderData[0].totalWeight,
            origin: process.env.NEXT_PUBLIC_RAJA_ONGKIR_ORIGIN,
            courier: process.env.NEXT_PUBLIC_RAJA_ONGKIR_COURIER,
        }

        const { data } = await axios.post(`/api/expedition/cost/`, destinationInfo)
        const markup = data.value < 16000 || data.value == undefined ? 16000 : data.value
        setShippingCost(markup)
        setShippingEtd(data.etd)
    }

    // Select Payment Method
    const selectPaymentMethod = (id) => {
        const data = paymentMethodCollection.find((paymentMethod) => paymentMethod.id == id)
        return setChoosenPaymentMethod(data.id)
    }

    // count subtotal
    const countSubTotal = () => {
        const x = Math.round(+order.totalPrice - couponPromo)
        if (!coupon) {
            return setSubTotal(+order.totalPrice)
        }
        return setSubTotal(x)
    }

    // count total
    const countTotal = () => {
        if (subTotal >= 200000 && area == 'malang-batu') {
            const z = Math.round(+subTotal + 2000 + +cardBoardBoxPrice)
            return setTotal(z)
        }
        const x = Math.round(+shippingCost + +subTotal + 2000 + +cardBoardBoxPrice)
        return setTotal(x)
    }

    // Handle Modal
    const openModal = () => {
        if (area != 'anotherCity') {
            if (address == '' || location == '') {
                return alert('Lengkapi form untuk melanjutkan')
            }
        }
        if (area == 'anotherCity') {
            if (address == '' || postalCode == '') {
                return alert('Lengkapi form untuk melanjutkan')
            }
        }
        if (choosenPaymentMethod == undefined) {
            return alert('Pilih Metode Pembayaran')
        }
        return setOpenModalConfirmation(!openModalConfirmation)
    }

    // pay Handle
    const pay = async () => {
        setPayLoading(true)
        if (choosenPaymentMethod == 'COD') {
            dispatch(setPaymentMethod('COD'))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`

            const getExternalID = await axios.get(`/api/generatePaymentID`)
            const externalID = getExternalID.data

            const transactionData = {
                ...orderData[0],
                shouldPayAmount: total,
                shippingLocation: toShipping,
                code: externalID,
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                discount: couponPromo,
                paymentStatus: 'PAID',
                paymentMethod: choosenPaymentMethod,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionData))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            setPayLoading(false)

            alert('Pesanan sedang diproses. \nJangan lupa bayar pesanan kepada kurir ya 🙂')

            return await router.push('/')
        }

        if (choosenPaymentMethod == 'BNI' || choosenPaymentMethod == 'BRI' || choosenPaymentMethod == 'MANDIRI' || choosenPaymentMethod == 'PERMATA') {
            const createInvoice = await axios.post(`/api/payment/invoice`, {
                amount: total,
            })
            const invoiceResponse = await createInvoice.data

            const selectedPaymentMethod = await invoiceResponse.available_banks.find((bank) => choosenPaymentMethod == bank.bank_code)

            dispatch(setPaymentMethod(selectedPaymentMethod))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`

            const transactionData = {
                ...orderData[0],
                shouldPayAmount: total,
                shippingLocation: toShipping,
                code: invoiceResponse.external_id,
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                discount: couponPromo,
                paymentStatus: invoiceResponse.status,
                paymentMethod: choosenPaymentMethod,
                bankNumber: selectedPaymentMethod.bank_account_number,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionData))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            setPayLoading(false)

            return await router.push('/cart/checkout/pay')
        }

        if (choosenPaymentMethod == 'GOPAY') {
            const createGopayCharge = await axios.post(`/api/payment/midtrans/gopay`, {
                amount: total,
            })

            const gopayResponse = await createGopayCharge.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`

            setPayLoading(false)
            setOpenModalConfirmation(false)

            const createTransaction = await axios.post(`/api/transactions`, {
                ...orderData[0],
                shouldPayAmount: total,
                code: gopayResponse.data.transaction_details.order_id,
                shippingLocation: toShipping,
                discount: couponPromo,
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                paymentStatus: 'PAID',
                // qrCodeString: gopayResponse.actions[0].url,
                paymentMethod: choosenPaymentMethod,
            })
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionResponse))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            return window.snap.pay(gopayResponse.resp.token, {
                onSuccess: async () => {
                    const createTransaction = await axios.put(`${processs.env.NEXT_PUBLIC_API_URL}/transactions/${transactionResponse.id}`, {
                        paymentStatus: 'PAID',
                    })
                    const transactionResponse = await createTransaction.data

                    dispatch(setTransaction(transactionResponse))
                },
            })
        }

        if (choosenPaymentMethod == 'ID_OVO') {
            const createEWalletInvoice = await axios.post(`/api/payment/e-wallet`, {
                eWalletType: 'ID_OVO',
                amount: total,
                mobileNumber: ovoNumber,
            })

            const eWalletResponse = await createEWalletInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`

            const transactionData = {
                ...orderData[0],
                discount: couponPromo,
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                shouldPayAmount: total,
                shippingLocation: toShipping,
                code: eWalletResponse.reference_id,
                paymentStatus: eWalletResponse.status,
                paymentMethod: choosenPaymentMethod,
                mobileNumber: ovoNumber,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionResponse))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            setPayLoading(false)

            return await router.push('/cart/checkout/pay')
        }

        if (choosenPaymentMethod == 'ID_DANA' || choosenPaymentMethod == 'ID_LINKAJA') {
            const createEWalletInvoice = await axios.post(`/api/payment/e-wallet`, {
                eWalletType: choosenPaymentMethod,
                amount: total,
                successRedirectURL: `${process.env.NEXT_PUBLIC_API_CALLBACK}/cart/checkout/pay`,
            })

            const eWalletResponse = await createEWalletInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`

            const transactionData = {
                discount: couponPromo,
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                ...orderData[0],
                shouldPayAmount: total,
                shippingLocation: toShipping,
                code: eWalletResponse.reference_id,
                paymentStatus: eWalletResponse.status,
                paymentMethod: choosenPaymentMethod,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionResponse))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            setPayLoading(false)

            return await router.push(eWalletResponse.actions.desktop_web_checkout_url)
        }

        if (choosenPaymentMethod == 'QRCODE') {
            const createQrCodeInvoice = await axios.post(`/api/payment/qris`, {
                amount: total,
            })

            const qrCodeResponse = await createQrCodeInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`

            const transactionData = {
                discount: couponPromo,
                ...orderData[0],
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                shouldPayAmount: total,
                shippingLocation: toShipping,
                code: qrCodeResponse.external_id,
                paymentStatus: qrCodeResponse.status,
                paymentMethod: choosenPaymentMethod,
                qrCodeString: qrCodeResponse.qr_string,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionResponse))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            setPayLoading(false)

            return await router.push('/cart/checkout/pay')
        }

        if (choosenPaymentMethod == 'ALFAMART' || choosenPaymentMethod == 'INDOMARET') {
            const createRetailOutletInvoice = await axios.post(`/api/payment/retail-outlet`, {
                amount: total,
                name: session.user.name,
                retail: choosenPaymentMethod,
            })

            const retailOutletInvoiceResponse = await createRetailOutletInvoice.data

            dispatch(setPaymentMethod(choosenPaymentMethod))

            const toShipping = area != 'anotherCity' ? `${location} ${address}` : `${address}, ${postalCode}, ${city.type} ${city.city_name}, ${province.province}`
            // return console.log(retailOutletInvoiceResponse)
            const transactionData = {
                ...orderData[0],
                shouldPayAmount: total,
                discount: couponPromo,
                phone,
                notes: note,
                shippingCost,
                packagingFee: cardBoardBoxPrice,
                shippingLocation: toShipping,
                code: retailOutletInvoiceResponse.external_id,
                paymentStatus: retailOutletInvoiceResponse.status,
                paymentMethod: choosenPaymentMethod,
                paymentCode: retailOutletInvoiceResponse.payment_code,
            }

            const createTransaction = await axios.post(`/api/transactions`, transactionData)
            const transactionResponse = await createTransaction.data

            dispatch(setTransaction(transactionResponse))

            await carts.forEach(async (c) => {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${c.id}`, {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                })
            })

            setPayLoading(false)

            return await router.push('/cart/checkout/pay')
        }
    }

    return (
        <Layout title='Pembayaran'>
            {openModalConfirmation && (
                <div className='fixed z-50 inset-0 overflow-y-auto ' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' aria-hidden='true'></div>

                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                            &#8203;
                        </span>

                        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 md:align-middle max-w-2xl w-full 2xl:w-full 2xl:max-w-4xl'>
                            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                <div className='sm:flex sm:items-start'>
                                    <div className='hidden mx-auto flex-shrink-0 md:flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10'>
                                        <ExclamationIcon className='w-7 h-7 text-orange-500' />
                                    </div>
                                    <div className='w-full text-left md:text-left sm:mt-0 sm:ml-4 sm:text-left'>
                                        <h3 className='text-base md:text-lg leading-none font-medium ' id='modal-title'>
                                            Konfirmasi pesanan
                                        </h3>
                                        <div className='mt-2 flex flex-col space-y-2'>
                                            <p className='text-xs md:text-sm text-gray-500'>Apakah pesananmu sudah sesuai?</p>
                                            <br />
                                            <div className='font-medium tracking-wide text-xs md:text-sm text-slate-500'>Produk</div>
                                            {orderData[0].products.map((product, index) => {
                                                return (
                                                    <div className='flex justify-between space-x-2 text-xs md:text-base' key={index}>
                                                        <div className='flex space-x-1'>
                                                            <span className='w-2/12 md:w-10'>x {product.quantity}</span>
                                                            <span className='w-10/12 line-clamp-1 flex-initial max-w-sm'>{product.product.name}</span>
                                                        </div>
                                                        <NumberFormat
                                                            value={
                                                                product.quantity * (product.product.sellingPrice - (product.product.sellingPrice * product.product.discount) / 100)
                                                            }
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'Rp. '}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <br />
                                        <div className='flex text-xs md:text-base flex-col space-y-2'>
                                            <div className='flex justify-between space-x-2 md:space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Sub Total</span>
                                                <NumberFormat
                                                    className='font-bold text-xs md:text-base'
                                                    value={subTotal}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'Rp. '}
                                                />
                                            </div>
                                            <div className='flex justify-between space-x-2 md:space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Biaya Pengiriman</span>
                                                <NumberFormat
                                                    className={`font-bold text-xs md:text-base ${subTotal >= 200000 && area == 'malang-batu' ? 'line-through text-red-400' : ''}`}
                                                    value={shippingCost}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'Rp. '}
                                                />
                                            </div>
                                            <div className='flex justify-between space-x-2 md:space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Biaya Penanganan</span>
                                                <NumberFormat
                                                    className='font-bold text-xs md:text-base'
                                                    value={plasticWrap}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'Rp. '}
                                                />
                                            </div>
                                            <div className='flex justify-between space-x-2 md:space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Packing Kardus</span>
                                                <NumberFormat
                                                    className='font-bold text-xs md:text-base'
                                                    value={cardBoardBoxPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'Rp. '}
                                                />
                                            </div>
                                            <div className='flex justify-between space-x-2 md:space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Diskon</span>
                                                <NumberFormat
                                                    className='font-bold text-xs md:text-base text-red-500'
                                                    value={couponPromo}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'-Rp. '}
                                                />
                                            </div>
                                            <hr className='border border-dashed' />
                                            <div className='flex justify-between space-x-2 md:space-x-4 font-medium'>
                                                <span className='truncate font-bold w-1/2'>Total</span>
                                                <NumberFormat
                                                    className='font-bold text-xs md:text-base'
                                                    value={total}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'Rp. '}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <div className='flex text-sm md:text-base flex-col space-y-2'>
                                            <div>
                                                <div className='font-medium tracking-wide text-sm text-slate-500'>Lokasi</div>
                                                {area != 'anotherCity' ? (
                                                    <>
                                                        <div className='font-medium '>{`${location}`}</div>
                                                        <div className='font-medium '>{`${address}`}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='font-medium '>{`${address}`}</div>
                                                        <div className='font-medium '>{`${postalCode}, ${city.type} ${city.city_name}, ${province.province}`}</div>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                <div className='font-medium tracking-wide text-sm text-slate-500'>Nomor Telepon</div>
                                                <div className='font-medium'>{phone}</div>
                                            </div>
                                            <div>
                                                <div className='font-medium tracking-wide text-sm text-slate-500'>Metode Pembayaran</div>
                                                <div className='font-medium'>{`${choosenPaymentMethod.replace('ID_', '').toUpperCase()} ${ovoNumber && `(${ovoNumber})`}`}</div>
                                            </div>
                                            {note != '' && (
                                                <div>
                                                    <div className='font-medium tracking-wide text-sm text-slate-500'>Catatan</div>
                                                    <div className='font-medium '>{`${note}`}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-50 px-4 py-3 flex flex-col space-y-3 md:px-6 md:space-y-0 md:flex md:flex-row md:space-x-2 md:justify-end md:items-center'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        openModal()
                                    }}
                                    className='w-full md:w-max inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                >
                                    Batal
                                </button>
                                {payLoading ? (
                                    <button
                                        type='button'
                                        onClick={() => {}}
                                        className='w-full md:w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                                    >
                                        Memproses...
                                    </button>
                                ) : (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            pay()
                                        }}
                                        className='w-full md:w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                                    >
                                        Bayar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='container mx-auto px-4 md:px-12 lg:px-16 my-4 md:my-5 2xl:my-6'>
                <div className='w-full hidden md:flex space-x-2 items-center md:my-2 2xl:my-3'>
                    <div className='text-orange-500 hover:text-orange-600'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-orange-500 hover:text-orange-600'>
                        <Link href='/cart'>Keranjang</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className=''>Checkout</div>
                </div>
                <h1 className='text-lg md:text-2xl font-semibold my-2 2xl:my-3'>Pembayaran</h1>
                <div className='flex flex-col space-y-4 md:space-y-8 mb-12'>
                    <div className='flex flex-col space-y-4 space-x-0 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-5'>
                        <div className='w-full lg:w-9/12'>
                            <div className='flex flex-col space-y-2 md:space-y-4'>
                                <div className='p-2 md:p-4 border border-slate-200 bg-white  rounded-md drop-shadow-sm'>
                                    <h2 className='text-base md:text-lg font-semibold mb-3'>Informasi Pengiriman</h2>
                                    <div className='flex flex-col space-y-4'>
                                        {/* Area */}
                                        <div className='flex flex-col space-y-1 text-sm md:text-base'>
                                            <label htmlFor='area'>Area</label>
                                            <div className='flex items-center space-x-2 md:space-x-4 text-sm md:text-base'>
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
                                                                    ? 'py-1 px-2 flex items-center space-x-2 rounded-md border border-orange-500 bg-orange-500 text-white transition ease-in-out duration-300'
                                                                    : 'py-1 px-2 flex items-center space-x-2 rounded-md border border-slate-200 bg-slate-300  transition ease-in-out duration-300'
                                                            }
                                                        >
                                                            {area != n.value && <div className='border border-slate-800 rounded-full w-4 h-4'></div>}
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
                                                <div className='flex flex-col text-sm md:text-base space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center'>
                                                    <div className='flex flex-col flex-initial space-y-1'>
                                                        <label htmlFor='location'>Lokasi</label>
                                                        <input
                                                            type='text'
                                                            name='location'
                                                            id='location'
                                                            onChange={handleLocation}
                                                            required
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                            placeholder='Hotel Singhasari'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='address'>Alamat</label>
                                                        <input
                                                            type='text'
                                                            onChange={handleAddress}
                                                            name='address'
                                                            required
                                                            id='address'
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                            placeholder='Jl. Ir. Soekarno No.120, Beji, Kec. Batu, Kota Batu, Jawa Timur 65236'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col flex-initial space-y-1'>
                                                        <label htmlFor='phone'>Nomor Telepon</label>
                                                        <input
                                                            type='text'
                                                            name='phone'
                                                            id='phone'
                                                            onChange={handlePhone}
                                                            required
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-1 text-sm md:text-base'>
                                                    <label htmlFor='notes'>Catatan</label>
                                                    <textarea
                                                        name='notes'
                                                        id='notes'
                                                        onChange={handleNote}
                                                        placeholder=''
                                                        className='rounded-md focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                    ></textarea>
                                                </div>
                                            </>
                                        )}
                                        {area == 'anotherCity' && (
                                            <>
                                                <div className='text-sm md:text-base flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center'>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='address'>Alamat</label>
                                                        <input
                                                            type='text'
                                                            name='address'
                                                            onChange={handleAddress}
                                                            required
                                                            id='address'
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                            placeholder='Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-2 text-sm md:text-base md:flex-row md:space-y-0 md:space-x-4 md:items-center'>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='city'>Kota</label>
                                                        <button
                                                            onClick={() => setCityToggle(!cityToggle)}
                                                            className='rounded-md border flex items-center justify-between text-sm px-2 text-slate-500 w-full py-2 border-slate-200'
                                                        >
                                                            <span>{city ? city.type + ' ' + city.city_name : 'Pilih Kota'}</span>
                                                            <span>
                                                                <SelectorIcon className='w-4 h-4 text-slate-500' />
                                                            </span>
                                                        </button>
                                                        {cityToggle && (
                                                            <div className='relative'>
                                                                <div className='rounded-md bg-white border border-slate-200 drop-shadow-sm  h-auto w-auto absolute'>
                                                                    <ul
                                                                        className='w-96 bg-white max-h-32 rounded-md py-1 overflow-auto focus:outline-none text-sm'
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
                                                                                className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border border-slate-200'
                                                                                placeholder='Cari Kota...'
                                                                            />
                                                                        </div>
                                                                        {filteredCity.map((c) => {
                                                                            return (
                                                                                <li
                                                                                    key={c.city_id}
                                                                                    onClick={() => {
                                                                                        selectCity(c)
                                                                                    }}
                                                                                    className=' w-full cursor-pointer hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out select-none relative py-2'
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
                                                        <label htmlFor='province'>Provinsi</label>
                                                        <input
                                                            type='text'
                                                            name='province'
                                                            value={province.province}
                                                            readOnly={true}
                                                            id='province'
                                                            required
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                            placeholder='Jawa Barat'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col flex-1 space-y-1'>
                                                        <label htmlFor='postalCode'>Kode Pos</label>
                                                        <input
                                                            type='text'
                                                            name='postalCode'
                                                            id='postalCode'
                                                            onChange={handlePostalCode}
                                                            required
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                            placeholder='xxxxx'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-1/3'>
                                                    <div className='flex flex-col flex-initial space-y-1'>
                                                        <label htmlFor='phone'>Nomor Telepon</label>
                                                        <input
                                                            type='text'
                                                            name='phone'
                                                            id='phone'
                                                            onChange={handlePhone}
                                                            required
                                                            className='rounded-md placeholder-slate-400 focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col space-y-1 text-sm md:text-base'>
                                                    <label htmlFor='notes'>Catatan</label>
                                                    <textarea
                                                        name='notes'
                                                        onChange={handleNote}
                                                        id='notes'
                                                        className='rounded-md focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm border-slate-200'
                                                    ></textarea>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='p-2 md:p-4 border border-slate-200 bg-white  rounded-md drop-shadow-sm'>
                                    <h2 className='text-base md:text-lg font-semibold mb-3'>Packing</h2>
                                    <div className='flex flex-col space-y-1 text-sm md:text-base'>
                                        <div className='flex items-center space-x-2 md:space-x-4 text-sm md:text-base'>
                                            {cardBoardBoxOpt.map((n, index) => {
                                                return (
                                                    <button
                                                        type='button'
                                                        key={n.id}
                                                        onClick={() => {
                                                            setCardBoard(n.id)
                                                            setCardBoardBoxPrice(n.value)
                                                        }}
                                                        className={
                                                            cardBoard == n.id
                                                                ? 'py-1 px-2 flex items-center space-x-2 rounded-md border border-orange-500 bg-orange-500 text-white transition ease-in-out duration-300'
                                                                : 'py-1 px-2 flex items-center space-x-2 rounded-md border border-slate-200 bg-slate-300  transition ease-in-out duration-300'
                                                        }
                                                    >
                                                        {cardBoard != n.id && <div className='border border-slate-800 rounded-full w-4 h-4'></div>}
                                                        {cardBoard == n.id && <FaCheckCircle className='text-white w-4 h-4' />}
                                                        <span>{n.label}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='p-2 md:p-4 border border-slate-200 bg-white rounded-md drop-shadow-sm'>
                                    <h2 className='text-base md:text-lg font-semibold mb-3'>Metode Pembayaran</h2>
                                    <div className='flex flex-col space-y-2 2xl:space-y-4 font-semibold text-slate-500'>
                                        {order.totalPrice >= 200000 && (
                                            <div className='flex flex-col space-y-1 2xl:space-y-2'>
                                                <h3 className='text-sm md:text-base font-normal'>Virtual Account</h3>
                                                <div className='flex space-x-2 md:space-x-4 items-center'>
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
                                                                            ? 'rounded-md ring-2 md:ring-4 ring-orange-500 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                            : 'rounded-md border md:border-2 border-slate-200 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                        )}
                                        <div className='flex flex-col md:space-y-1 2xl:space-y-2'>
                                            <h3 className='text-sm md:text-base font-normal'>E-Wallet</h3>
                                            <div className='flex space-x-2 md:space-x-4 items-center'>
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
                                                                        ? 'rounded-md ring-2 md:ring-4 ring-orange-500 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border md:border-2 border-slate-200 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
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

                                        <div className='flex flex-col md:space-y-1 2xl:space-y-2'>
                                            <h3 className='text-sm md:text-base font-normal'>QRCode</h3>
                                            <div className='flex space-x-2 md:space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'qrcode')
                                                    .map((paymentMethod, index) => {
                                                        return (
                                                            <button
                                                                disabled={orderData[0].totalPrice > 5000000 ? true : false}
                                                                key={index}
                                                                onClick={() => {
                                                                    selectPaymentMethod(paymentMethod.id)
                                                                }}
                                                                type='button'
                                                                className={
                                                                    choosenPaymentMethod == paymentMethod.id
                                                                        ? 'rounded-md ring-2 md:ring-4 ring-orange-500 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : orderData[0].totalPrice > 5000000
                                                                        ? 'rounded-md border-2 border-md:slate-200 bg-slate-200 filter grayscale h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border md:border-2 border-slate-200 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                        {/* <div className='flex flex-col md:space-y-1 2xl:space-y-2'>
                                            <h3 className='text-sm md:text-base font-normal'>Retail Outlet</h3>
                                            <div className='flex space-x-2 md:space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'retail-outlet')
                                                    .map((paymentMethod, index) => {
                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    selectPaymentMethod(paymentMethod.id)
                                                                }}
                                                                disabled={
                                                                    (orderData[0].totalPrice > 5000000 && paymentMethod.id == 'INDOMARET') ||
                                                                    (orderData[0].totalPrice > 2500000 && paymentMethod.id == 'ALFAMART')
                                                                        ? true
                                                                        : false
                                                                }
                                                                type='button'
                                                                className={
                                                                    choosenPaymentMethod == paymentMethod.id
                                                                        ? 'rounded-md ring-2 md:ring-4 ring-orange-500 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : (orderData[0].totalPrice > 2500000 && paymentMethod.id == 'ALFAMART') ||
                                                                          (orderData[0].totalPrice > 5000000 && paymentMethod.id == 'INDOMARET')
                                                                        ? 'rounded-md border-2 border-md:slate-200 bg-slate-200 filter grayscale h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md border md:border-2 border-slate-200 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
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
                                        </div> */}
                                        <div className='flex flex-col md:space-y-1 2xl:space-y-2'>
                                            <h3 className='text-sm md:text-base font-normal'>COD</h3>
                                            <div className='flex space-x-2 md:space-x-4 items-center'>
                                                {paymentMethodCollection
                                                    .filter((pm) => pm.type == 'cod')
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
                                                                        ? 'rounded-md flex justify-center items-center ring-2 md:ring-4 ring-orange-500 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                        : 'rounded-md flex justify-center items-center border md:border-2 border-slate-200 bg-white h-8 w-16 md:h-16 md:w-40 px-2 md:px-10 drop-shadow-sm transition duration-300 ease-in'
                                                                }
                                                            >
                                                                <CashIcon className='w-7 h-7' />
                                                            </button>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full lg:w-3/12'>
                            <div className='sticky top-28 p-4 bg-white border drop-shadow-sm border-slate-200 h-auto rounded-md flex flex-col space-y-4'>
                                {/* Summary */}
                                <div className='text-base md:text-xl font-bold '>Rincian</div>
                                <div className='text-xs 2xl:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                    <span>Total ({order.totalQuantity})</span>
                                    <NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                </div>
                                <form className='flex items-center' onSubmit={getCoupon} method='get'>
                                    <input
                                        className={
                                            coupon
                                                ? 'px-2 py-2 text-sm md:text-base md:px-3 md:py-2 rounded-l rounded-r-none w-full border md:border-2 focus:rounded-r-none focus:border-green-500 focus:border md:focus:border-2 focus:ring-0 border-green-300 transition ease-in-out duration-300 font-bold text-slate-500'
                                                : 'px-2 py-2 text-sm md:text-base md:px-3 md:py-2 rounded-l rounded-r-none w-full border md:border-2 focus:rounded-r-none focus:border-slate-500 focus:border md:focus:border-2 focus:ring-0 border-slate-500 transition ease-in-out duration-300 font-bold '
                                        }
                                        placeholder='Kode Kupon'
                                        disabled={coupon && 'disabled'}
                                        onChange={handleCouponInput}
                                        type='text'
                                    />

                                    <button
                                        type='submit'
                                        className={
                                            coupon
                                                ? 'text-sm md:text-base rounded-r px-2 py-2 md:px-3 md:py-2 text-white font-bold border md:border-2 border-green-300 bg-green-300'
                                                : 'text-sm md:text-base rounded-r px-2 py-2 md:px-3 md:py-2 text-white font-bold border md:border-2 border-slate-500 bg-slate-500'
                                        }
                                    >
                                        Terapkan
                                    </button>
                                </form>
                                {coupon && (
                                    <div className='text-sm md:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                        <div className='flex space-x-2 items-center'>
                                            <span>Kupon {coupon.discount}%</span>
                                            <button type='button' onClick={() => deleteCoupon()}>
                                                <TrashIcon className='text-red-500 w-4 h-4' />
                                            </button>
                                        </div>
                                        <NumberFormat value={couponPromo} displayType={'text'} className='text-red-500' thousandSeparator={true} prefix={'-Rp. '} />
                                    </div>
                                )}
                                {showCouponMessage && (
                                    <>
                                        <span className='text-sm text-red-500'>{showCouponMessage}</span>
                                    </>
                                )}
                                <hr />
                                <div className='flex justify-between items-center'>
                                    <div className='text-base font-bold '>Sub Total</div>
                                    <NumberFormat value={subTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-base font-bold text-orange-500' />
                                </div>
                                <div className='text-xs 2xl:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                    <div className='flex space-x-2 items-baseline'>
                                        <span>Biaya Pengiriman</span>
                                    </div>
                                    <NumberFormat
                                        value={shippingCost}
                                        displayType={'text'}
                                        className={`font-bold text-xs md:text-base ${subTotal >= 200000 && area == 'malang-batu' ? 'line-through text-red-400' : ''}`}
                                        thousandSeparator={true}
                                        prefix={'Rp. '}
                                    />
                                </div>
                                <div className='text-xs 2xl:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                    <div className='flex space-x-2 items-baseline'>
                                        <span>Biaya Penanganan</span>
                                    </div>
                                    <NumberFormat value={plasticWrap} displayType={'text'} className='text-slate-500' thousandSeparator={true} prefix={'Rp. '} />
                                </div>
                                <div className='text-xs 2xl:text-base text-slate-500 font-semibold flex justify-between items-center'>
                                    <div className='flex space-x-2 items-baseline'>
                                        <span>Packing Kardus</span>
                                    </div>
                                    <NumberFormat value={cardBoardBoxPrice} displayType={'text'} className='text-slate-500' thousandSeparator={true} prefix={'Rp. '} />
                                </div>

                                <hr />

                                {/* Total */}
                                <div className='flex justify-between items-center'>
                                    <div className='text-base font-bold '>Total</div>
                                    <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-base font-bold text-orange-500' />
                                </div>
                                <hr />
                                {choosenPaymentMethod == 'ID_OVO' ? (
                                    <div className='flex flex-col space-y-1  text-sm md:text-base'>
                                        <label htmlFor='ovo_number' className='block text-sm font-medium text-slate-500'>
                                            Nomor OVO
                                        </label>
                                        <div className='mt-1 flex rounded-md shadow-sm'>
                                            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm'>
                                                +62
                                            </span>
                                            <input
                                                type='text'
                                                name='ovo_number'
                                                id='ovo_number'
                                                onChange={handleOvoNumber}
                                                required
                                                className='rounded-r-md focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full text-sm placeholder-gray-400 border-slate-300'
                                                placeholder='85199992222'
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                                {/* Checkout Button */}
                                <div className='hidden md:block'>
                                    <Button href={() => openModal()} type='primary' size='lg' width='full' display='flex'>
                                        <span>Bayar</span>
                                        <FaWallet className='w-6' />
                                    </Button>
                                </div>
                                <div className='md:hidden'>
                                    <Button href={() => openModal()} type='primary' size='base' width='full' display='flex'>
                                        <span>Bayar</span>
                                        <FaWallet className='w-6' />
                                    </Button>
                                </div>
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

    const getCart = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })
    const carts = await getCart.data

    const getOrder = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?user_eq=${session.id}`, {
        headers: {
            Authorization: 'Bearer ' + session.jwt,
        },
    })
    const order = getOrder.data

    const getCity = await axios.get(`${process.env.NEXT_URL}/api/expedition/cities/`)
    const city = getCity.data

    const getProvince = await axios.get(`${process.env.NEXT_URL}/api/expedition/provinces/`)
    const province = getProvince.data

    return {
        props: {
            session,
            orderData: order,
            cityData: city,
            carts,
            provinceData: province,
        },
    }
}

export default index
