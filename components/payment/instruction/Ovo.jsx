import NumberFormat from 'react-number-format'

const Ovo = ({ transaction }) => {
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
                    <div>
                        <span className='text-sm md:text-base text-slate-200'>No Hp</span>
                        <div className='font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>{transaction.mobileNumber}</div>
                    </div>
                    <div>
                        <span className='text-sm md:text-base text-slate-200'>Merchant</span>
                        <div className='font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>LOKALOKA</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ovo
