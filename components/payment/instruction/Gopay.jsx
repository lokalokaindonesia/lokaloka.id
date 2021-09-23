import NumberFormat from 'react-number-format'
import Image from 'next/image'

const Gopay = ({ transaction }) => {
    return (
        <div className='flex flex-col md:space-y-2 xl:space-y-4'>
            <div className='shadow-md p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col md:space-y-2 xl:space-y-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>{transaction.code}</span>
                        <h1 className='md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold'>{transaction.paymentMethod.replace('ID_', '')}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>Total Pembayaran</span>
                        <NumberFormat
                            className='md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold'
                            value={transaction.totalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-blueGray-200'>Scan QrCode dibawah menggunakan Aplikasi Gojek</span>
                        <img className='md:w-36 md:h-36 xl:w-40 xl:h-40' src={transaction.qrCodeString} alt='' title='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gopay
