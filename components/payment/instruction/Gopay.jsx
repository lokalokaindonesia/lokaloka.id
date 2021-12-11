import NumberFormat from 'react-number-format'
import Image from 'next/image'

const Gopay = ({ transaction }) => {
    return (
        <div className='flex flex-col md:space-y-2 xl:space-y-4'>
            <div className='shadow-md p-2 md:p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col md:space-y-2 xl:space-y-4'>
                <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between md:items-center'>
                    <div className='flex flex-col'>
                        <span className='text-xs md:text-base text-slate-200'>{transaction.code}</span>
                        <h1 className='text-sm md:text-lg lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold'>{transaction.paymentMethod.replace('ID_', '')}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs md:text-base text-slate-200'>Total Pembayaran</span>
                        <NumberFormat
                            className='text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold'
                            value={transaction.shouldPayAmount}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                        />
                    </div>
                </div>
                <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between md:items-center'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-sm md:text-lg text-slate-200'>Scan QrCode dibawah menggunakan Aplikasi Gojek</span>
                        <img className='md:w-36 md:h-36 xl:w-40 xl:h-40' src={transaction.qrCodeString} alt='' title='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gopay
