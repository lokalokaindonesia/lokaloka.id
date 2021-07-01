import { session } from 'next-auth/client'
import Layout from '@/components/Layout'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

    return (
        <Layout title='Cart' session={session}>
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
                <div className='flex justify-between pb-6'>
                    <div className='w-8/12'>
                        <div className='flex flex-col space-y-4'>
                            <div className='flex justify-between items-center'>
                                {/* SelectAll Checkbox*/}
                                <div className='flex space-x-4 items-center'>
                                    <input type='checkbox' className='px-4 py-4 border border-blueGray-400 active:border-blueGray-800' name='selectAll' id='selectAll' />
                                    <label htmlFor='selectAll'>Select All</label>
                                </div>

                                {/* Delete Button */}
                                <div>
                                    <button className='text-red-500'>Delete</button>
                                </div>
                            </div>
                            {/* Product Cart Item */}
                            <div className='flex flex-col space-y-4'>
                                {/* Item */}
                                <div className='flex flex-col space-y-2 p-4 border border-blueGray-200 shadow-sm'>
                                    <div className='flex space-y-2 flex-col'>
                                        <div className='flex space-x-4 items-center'>
                                            {/* Checkbox */}
                                            <input type='checkbox' name='' id='1' />
                                            <div className='flex space-x-4 items-center w-full'>
                                                {/* Image */}
                                                <div className='px-10 py-10 bg-red-400'></div>
                                                <div className='flex flex-col space-y-1'>
                                                    {/* Title */}
                                                    <span className='text-lg font-medium text-blueGray-800 line-clamp-1'>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim? lorem
                                                    </span>
                                                    <div className='flex justify-between items-center'>
                                                        {/* Price */}
                                                        <div className='flex space-y-1 flex-col'>
                                                            <span className='text-lg font-black text-blueGray-800'>Rp. 12.000.000</span>
                                                            <span className='text-sm line-through font-black text-red-500'>Rp. 14.000.000</span>
                                                        </div>
                                                        {/* Qty */}
                                                        <div className='flex items-center border-2 h-9 border-blueGray-800'>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className='flex flex-col space-y-2 p-4 border border-blueGray-200 shadow-sm'>
                                    <div className='flex space-y-2 flex-col'>
                                        <div className='flex space-x-4 items-center'>
                                            {/* Checkbox */}
                                            <input type='checkbox' name='' id='1' />
                                            <div className='flex space-x-4 items-center w-full'>
                                                {/* Image */}
                                                <div className='px-10 py-10 bg-red-400'></div>
                                                <div className='flex flex-col space-y-1'>
                                                    {/* Title */}
                                                    <span className='text-lg font-medium text-blueGray-800 line-clamp-1'>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim? lorem
                                                    </span>
                                                    <div className='flex justify-between items-center'>
                                                        {/* Price */}
                                                        <div className='flex space-y-1 flex-col'>
                                                            <span className='text-lg font-black text-blueGray-800'>Rp. 12.000.000</span>
                                                            <span className='text-sm line-through font-black text-red-500'>Rp. 14.000.000</span>
                                                        </div>
                                                        {/* Qty */}
                                                        <div className='flex items-center border-2 h-9 border-blueGray-800'>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className='flex flex-col space-y-2 p-4 border border-blueGray-200 shadow-sm'>
                                    <div className='flex space-y-2 flex-col'>
                                        <div className='flex space-x-4 items-center'>
                                            {/* Checkbox */}
                                            <input type='checkbox' name='' id='1' />
                                            <div className='flex space-x-4 items-center w-full'>
                                                {/* Image */}
                                                <div className='px-10 py-10 bg-red-400'></div>
                                                <div className='flex flex-col space-y-1'>
                                                    {/* Title */}
                                                    <span className='text-lg font-medium text-blueGray-800 line-clamp-1'>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim? lorem
                                                    </span>
                                                    <div className='flex justify-between items-center'>
                                                        {/* Price */}
                                                        <div className='flex space-y-1 flex-col'>
                                                            <span className='text-lg font-black text-blueGray-800'>Rp. 12.000.000</span>
                                                            <span className='text-sm line-through font-black text-red-500'>Rp. 14.000.000</span>
                                                        </div>
                                                        {/* Qty */}
                                                        <div className='flex items-center border-2 h-9 border-blueGray-800'>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/12'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, rerum provident commodi nihil ipsam nemo veniam quidem, sint aliquam eum tempora ducimus
                        consequuntur illo! Ipsa nobis commodi quo dignissimos odit!
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
