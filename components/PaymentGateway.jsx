import Image from 'next/image'

const PaymentGateway = () => {
    return (
        <div className='bg-gray-200'>
            <div className='w-full h-auto py-8 container mx-auto flex justify-between items-center '>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/bni.png' layout='responsive' objectFit='contain' width={3} height={1} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale mt-1'>
                    <Image src='/images/payment-gateway/briva.png' layout='responsive' objectFit='contain' width={3} height={1} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/linkaja2.png' layout='responsive' objectFit='contain' width={162} height={65} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/shopeepay.png' layout='responsive' objectFit='contain' width={121.9} height={64} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/dana2.png' layout='responsive' objectFit='contain' width={143} height={40} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/permatabank.png' layout='responsive' objectFit='contain' width={186} height={64} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/qris.png' layout='responsive' objectFit='contain' width={251} height={74} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/mandiri.png' layout='responsive' objectFit='contain' width={202} height={64} priority />
                </div>
                <div className='h-42 w-24 filter hover:grayscale-0 grayscale'>
                    <Image src='/images/payment-gateway/ovo.png' layout='responsive' objectFit='contain' width={127} height={40} priority />
                </div>
            </div>
        </div>
    )
}

export default PaymentGateway
