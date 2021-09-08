import NumberFormat from 'react-number-format'

const Ovo = ({ transaction }) => {
    return (
        <div className='flex flex-col space-y-4'>
            <div className='shadow-md p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col space-y-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>{transaction.code}</span>
                        <h1 className='text-5xl font-bold'>{transaction.paymentMethod.replace('ID_', '')}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>Total Pembayaran</span>
                        <NumberFormat className='text-4xl font-bold' value={transaction.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <span className='text-blueGray-200'>No Hp</span>
                        <div className='font-semibold text-4xl'>{transaction.mobileNumber}</div>
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

export default Ovo
