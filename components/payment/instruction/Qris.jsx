import NumberFormat from 'react-number-format'
import Image from 'next/image'

const Qris = ({ transaction }) => {
    return (
        <div className='flex flex-col space-y-4'>
            <div className='shadow-md p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col space-y-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>{transaction.code}</span>
                        <h1 className='text-4xl font-bold'>{transaction.paymentMethod.replace('ID_', '')}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>Total Pembayaran</span>
                        <NumberFormat className='text-4xl font-bold' value={transaction.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-blueGray-200'>QrCode</span>
                        <img
                            className='w-40 h-40'
                            src={`https://api.qrserver.com/v1/create-qr-code/?data=${transaction.qrCodeString}&amp;size=40x40&format=svg&bgcolor=14b3a1`}
                            alt=''
                            title=''
                        />
                    </div>
                    <div>
                        <span className='text-blueGray-200'>Merchant</span>
                        <div className='font-semibold text-4xl'>LOKALOKA</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Qris
