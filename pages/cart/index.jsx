import { session } from 'next-auth/client'
import Layout from '@/components/Layout'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Cart = () => {
    const router = useRouter()

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
                <div className='flex justify-between'>
                    <div className='w-8/12'>
                        <div className='flex flex-col space-y-4'>
                            {/* SelectAll */}
                            <div className='flex justify-between items-center'>
                                <div className='flex space-x-4 items-center'>
                                    <input type='checkbox' className='px-4 py-4 border border-blueGray-400 active:border-blueGray-800' name='selectAll' id='selectAll' />
                                    <label htmlFor='selectAll'>Select All</label>
                                </div>

                                <div>
                                    <span className='text-red-500'>Hapus</span>
                                </div>
                            </div>
                            {/* Product Cart Item */}
                            <div className='flex flex-col space-y-4'>
                                {/* Item */}
                                <div className='flex space-x-4 items-center p-4 border border-blueGray-200 shadow-sm'>
                                    <input type='checkbox' name='' id='1' />
                                    <div className='px-10 py-10 bg-red-400'></div>
                                    <div className='flex flex-col space-y-1'>
                                        <span className='text-lg font-medium text-blueGray-800 line-clamp-1'>
                                            {' '}
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim?
                                        </span>
                                        <span className='text-lg font-black text-blueGray-800'>Rp. 12.000.000</span>
                                        <span className='text-sm line-through font-black text-red-500'>Rp. 14.000.000</span>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className='flex space-x-4 items-center  p-4 border border-blueGray-200 shadow-sm'>
                                    <input type='checkbox' name='' id='1' />
                                    <div className='px-10 py-10 bg-red-400'></div>
                                    <div className='flex flex-col space-y-1'>
                                        <span className='text-lg font-medium text-blueGray-800 line-clamp-1'>
                                            {' '}
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim?
                                        </span>
                                        <span className='text-lg font-black text-blueGray-800'>Rp. 12.000.000</span>
                                        <span className='text-sm line-through font-black text-red-500'>Rp. 14.000.000</span>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className='flex space-x-4 items-center  p-4 border border-blueGray-200 shadow-sm'>
                                    <input type='checkbox' name='' id='1' />
                                    <div className='px-10 py-10 bg-red-400'></div>
                                    <div className='flex flex-col space-y-1'>
                                        <span className='text-lg font-medium text-blueGray-800 line-clamp-1'>
                                            {' '}
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, enim?
                                        </span>
                                        <span className='text-lg font-black text-blueGray-800'>Rp. 12.000.000</span>
                                        <span className='text-sm line-through font-black text-red-500'>Rp. 14.000.000</span>
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
