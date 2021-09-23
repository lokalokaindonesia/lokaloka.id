import Image from 'next/image'

const PaymentGateway = () => {
    return (
        <div className='bg-blueGray-75'>
            <div className='w-full h-auto py-8 xl:container xl:mx-auto xl:px-4 2xl:px-0 flex justify-between items-center '>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='BNI Virtual Account' src='/images/payment-gateway/bni.png' layout='responsive' objectFit='contain' width={3} height={1} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale mt-1'>
                    <Image alt='BRI Virtual Account' src='/images/payment-gateway/briva.png' layout='responsive' objectFit='contain' width={3} height={1} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='Link Aja' src='/images/payment-gateway/linkaja2.png' layout='responsive' objectFit='contain' width={162} height={65} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='Dana' src='/images/payment-gateway/dana2.png' layout='responsive' objectFit='contain' width={143} height={40} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='Permata Bank' src='/images/payment-gateway/permatabank.png' layout='responsive' objectFit='contain' width={186} height={64} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='QRIS' src='/images/payment-gateway/qris.png' layout='responsive' objectFit='contain' width={251} height={74} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='Mandiri' src='/images/payment-gateway/mandiri.png' layout='responsive' objectFit='contain' width={202} height={64} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='GOPAY' src='/images/payment-gateway/gopay.png' layout='responsive' objectFit='contain' width={174} height={41} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='OVO' src='/images/payment-gateway/ovo.png' layout='responsive' objectFit='contain' width={127} height={40} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='ALFAMART' src='/images/payment-gateway/alfamart.png' layout='responsive' objectFit='contain' width={127} height={40} quality={75} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 transition ease-in-out duration-300 hover:scale-110 grayscale'>
                    <Image alt='INDOMARET' src='/images/payment-gateway/indomaret.png' layout='responsive' objectFit='contain' width={127} height={40} quality={75} priority />
                </div>
            </div>
        </div>
    )
}

export default PaymentGateway
