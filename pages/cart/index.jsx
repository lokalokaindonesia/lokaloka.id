import { session } from 'next-auth/client'
import Layout from '@/components/Layout'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '@/components/Button'
import { FaChevronRight } from 'react-icons/fa'

const Cart = () => {
    const router = useRouter()

    const [quantity, setQuantity] = useState(1)

    // * Qty Func
    const addQty = () => {
        setQuantity(quantity + 1)
    }

    const reduceQty = () => {
        setQuantity(quantity === 1 ? 1 : quantity - 1)
    }

    const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <Layout title='Lokaloka Cart' session={session}>
            <div className='container mx-auto'>
                <div className='w-full flex space-x-2 items-center mt-4'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800'>Cart</div>
                </div>
                <div className='py-6'>
                    <h1 className='text-blueGray-800 font-extrabold text-3xl'>Cart</h1>
                </div>
                <div className='flex justify-between space-x-12 mb-12'>
                    <div className='w-9/12'>
                        <div className='flex flex-col space-y-4'>
                            <div className='flex justify-between items-center'>
                                {/* SelectAll Checkbox*/}
                                <div className='flex space-x-4 items-center'>
                                    <input type='checkbox' className='h-4 w-4 text-blue-500 focus:ring-blue-600 border-blueGray-300' name='selectAll' id='selectAll' />
                                    <label htmlFor='selectAll' className='font-bold'>
                                        Select All
                                    </label>
                                </div>

                                {/* Delete Button */}
                                <div>
                                    <button className='text-red-500 font-bold'>Delete</button>
                                </div>
                            </div>
                            {/* Product Cart Item */}
                            <div className='flex flex-col space-y-8'>
                                {counter.map((item) => {
                                    return (
                                        <>
                                            {/* Item */}
                                            <div key={item} className='flex space-y-4 flex-col'>
                                                <div className='flex space-x-4 items-center'>
                                                    {/* Checkbox */}
                                                    <input type='checkbox' className='h-4 w-4 text-blue-500 focus:ring-blue-600 border-blueGray-300' name='' id='1' />
                                                    <div className='flex space-x-4 items-center w-full'>
                                                        {/* Image */}
                                                        <div className='px-10 py-10 bg-red-400'></div>
                                                        <div className='flex flex-col space-y-1 w-full'>
                                                            {/* Title */}
                                                            <span className='text-lg font-semibold text-blueGray-800 line-clamp-1'>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim? lorem
                                                            </span>
                                                            <div className='flex justify-between items-end'>
                                                                {/* Price */}
                                                                <div className='flex space-y-1 flex-col'>
                                                                    <span className='text-xl font-black text-blueGray-800'>Rp. 12.000.000</span>
                                                                    <span className='text-xs line-through font-semibold text-red-500'>Rp. 14.000.000</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Qty */}
                                                <div className='flex items-center border-2 h-8 w-max ml-32 border-blueGray-600'>
                                                    <div
                                                        onClick={reduceQty}
                                                        className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-r-2 border-blueGray-600 text-blue-gray-800'
                                                    >
                                                        -
                                                    </div>
                                                    <div className='px-4 py-1 w-12 flex-1 text-center text-blue-gray-800 '>{quantity}</div>
                                                    <div
                                                        onClick={addQty}
                                                        className='select-none cursor-pointer transition duration-100 ease-in hover:bg-blueGray-200 px-3 py-1 font-bold text-center border-l-2 border-blueGray-600 text-blue-gray-800'
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='w-3/12 mt-10 sticky top-5 flex flex-col space-y-4'>
                        {/* Coupon Form */}
                        <div className='flex items-center '>
                            <input
                                className='px-3 py-2 w-full ring-2 focus:ring-blue-500 focus:ring-2 ring-blue-500 border-0 font-bold text-blueGray-800'
                                placeholder='Coupon Code'
                                type='text'
                            />
                            <button className='px-3 py-2 text-white font-bold ring-2 ring-blue-500 bg-blue-500'>Apply</button>
                        </div>

                        <hr />

                        {/* Summary */}
                        <div className='flex flex-col space-y-2'>
                            <div className='text-xl font-bold text-blueGray-800'>Summary</div>
                            <div className='flex flex-col space-y-1'>
                                <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                    <span>Total Price</span>
                                    <span>Rp. 17.200.000</span>
                                </div>
                                <div className='text-blueGray-500 font-semibold flex justify-between items-center'>
                                    <span>Total Discount</span>
                                    <span className='text-red-400'>-Rp. 7.200.000</span>
                                </div>
                            </div>
                        </div>

                        <hr />

                        {/* Total */}
                        <div className='flex justify-between items-center'>
                            <div className='text-xl font-bold text-blueGray-800'>Total</div>
                            <div className='text-xl font-bold text-blue-500'>Rp. 10.000.000</div>
                        </div>

                        <hr />

                        {/* Checkout Button */}
                        <Button type='primary' size='lg' width='full' display='flex'>
                            <span>Checkout</span>
                            <FaChevronRight className='w-6' />
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
