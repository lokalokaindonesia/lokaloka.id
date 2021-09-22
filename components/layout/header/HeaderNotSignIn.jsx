import Link from 'next/link'
import { SearchIcon, ColorSwatchIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import HeaderActiveLink from '@/components/layout/header/HeaderActiveLink'
import ProfileDropdown from '@/components/navbar/ProfileDropdown'
import { useEffect, useState, Fragment, useRef } from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { setFavorite } from '@/redux/favoriteSlice'
import { Dialog, Transition } from '@headlessui/react'

const HeaderNotSignIn = () => {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [inputText, setInputText] = useState('')

    const handleInputSearch = async (e) => {
        setInputText(e.target.value)
    }

    return (
        <header className='w-full px-4 xl:px-0 h-20 xl:container xl:mx-auto flex justify-between items-center'>
            {/* Modal Section */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='fixed z-50 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        {/* <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                            &#8203;
                        </span> */}
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full'>
                                <form method='post' action={`/search?s=${inputText}`}>
                                    <div className='flex rounded-md shadow-sm'>
                                        <span className='inline-flex items-center px-3 rounded-l-md border-none'>
                                            <SearchIcon className='w-4 h-4 text-blueGray-500' />
                                        </span>
                                        <input
                                            type='text'
                                            name='search'
                                            onChange={handleInputSearch}
                                            id='search'
                                            className='block w-full text-lg px-4 py-2 shadow-sm sm:text-sm ring-0 border-none rounded-l-0 rounded-r-md'
                                            placeholder='Apel Celup'
                                        />
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* End Modal Section */}

            <div className='w-2/12 text-2xl font-extrabold text-blue-500 tracking-wide'>
                <Link href='/'>
                    <button type='button' name='home' aria-label='Home'>
                        <ColorSwatchIcon className='cursor-pointer h-10 w-10 text-blue-800' />
                    </button>
                </Link>
            </div>

            <div className='w-8/12 flex justify-center '>
                <div className='hidden xl:flex space-x-8 flex-initial font-medium text-blueGray-600'>
                    <HeaderActiveLink href='/'>Home</HeaderActiveLink>
                    <HeaderActiveLink href='/food-and-beverage'>Food & Beverages</HeaderActiveLink>
                    <HeaderActiveLink href='/craft'>Craft</HeaderActiveLink>
                    <HeaderActiveLink href='/fashion'>Fashion</HeaderActiveLink>
                    <HeaderActiveLink href='/experience'>Experience</HeaderActiveLink>
                    <HeaderActiveLink href='/rent'>Rent</HeaderActiveLink>
                    <HeaderActiveLink href='/book'>Book</HeaderActiveLink>
                </div>
                <input type='text' className='block xl:hidden px-3 py-2 border border-gray-400 focus:outline-none text-blueGray-600 bg-blueGray-200 w-full' />
            </div>

            <div className='w-2/12 flex items-center justify-end space-x-6'>
                <button type='button' name='search' aria-label='Search' onClick={() => setOpen(true)}>
                    <SearchIcon className='hidden xl:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                </button>
                <Button href={() => router.push('/account/login')} size='md' width='max' display='block' type='secondary'>
                    <span>Sign In</span>
                </Button>
            </div>
        </header>
    )
}

export default HeaderNotSignIn
