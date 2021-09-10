import { useState } from 'react'
import NumberFormat from 'react-number-format'

const RetailOutlet = ({ transaction }) => {
    const [via, setVia] = useState('mBanking')

    return (
        <div className='flex flex-col space-y-4 h-sceen'>
            <div className='shadow-md p-4 rounded-md bg-gradient-to-tr from-teal-500 to-teal-600 text-white flex flex-col space-y-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>{transaction.code}</span>
                        <h1 className='text-5xl font-bold'>{transaction.paymentMethod}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-blueGray-200'>Total Pembayaran</span>
                        <NumberFormat className='text-4xl font-bold' value={transaction.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <span className='text-blueGray-200'>Kode Pembayaran</span>
                        <div className='font-semibold text-4xl'>{transaction.paymentCode}</div>
                    </div>
                    <div>
                        <span className='text-blueGray-200'>Bayar tagihan sebelum </span>
                        <div className='font-medium text-xl'>08:00 | 10 September 2021</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RetailOutlet
