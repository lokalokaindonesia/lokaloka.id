/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HeartIcon } from '@heroicons/react/outline'
import NumberFormat from 'react-number-format'
import Link from 'next/link'
import Image from 'next/image'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const FavoritesDropdown = ({ favorite }) => {
    return (
        <Menu as='div' className='relative inline-block text-left mt-1'>
            <div>
                <Menu.Button className='inline-flex justify-center w-full rounded-md shadow-sm bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'>
                    <HeartIcon className='block h-6 w-6 md:h-6 md:w-6 text-blueGray-500 cursor-pointer' />
                    {favorite.length > 0 && (
                        <span className='flex h-3 w-3 absolute top-0 right-0'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
                        </span>
                    )}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-80 p-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='flex flex-col space-y-1 '>
                        {favorite.map((f, i) => {
                            return (
                                <Menu.Item key={i}>
                                    <Link href={`/${f.product_category.slug}/${f.slug}`} className=''>
                                        <div className='w-full flex cursor-pointer'>
                                            <div className='w-3/12'>
                                                <div className='w-14 h-14 rounded'>
                                                    <Image src={f.images[0].url} priority className='rounded' layout='responsive' width={1} height={1} />
                                                </div>
                                            </div>
                                            <div className='w-9/12 flex flex-col space-y-2'>
                                                <span className='line-clamp-1 font-semibold text-blueGray-700 text-sm'>{f.name}</span>
                                                <NumberFormat
                                                    value={f.sellingPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'Rp. '}
                                                    className='line-clamp-1 text-sm'
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                            )
                        })}
                        {favorite.length == 0 && <div className='w-full flex p-6'>Tidak ada produk favorit</div>}
                        <Link href='/profile/favorites'>
                            <div className='w-full text-sm cursor-pointer hover:bg-blueGray-200 py-2 transition ease-in-out duration-150 text-blue-400 text-center'>
                                Lihat semua
                            </div>
                        </Link>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default FavoritesDropdown
