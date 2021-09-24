import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import HeaderActiveLink from '@/components/layout/header/HeaderActiveLink'
import { useEffect, useState, Fragment, useRef } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import Logo from '../../../public/logo.png'

const HeaderNotSignIn = () => {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [inputText, setInputText] = useState('')

    const handleInputSearch = async (e) => {
        setInputText(e.target.value)
    }

    return (
        <header className='w-full h-16 lg:h-20 container mx-auto px-4 2xl:px-0 flex justify-between items-center'>
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
                    <div>
                        <h1 className='hidden lg:block text-4xl font-bold text-blue-500'>Lokaloka</h1>
                        <div className='block lg:hidden md:w-10 md:h-10'>
                            <Image src={Logo} layout='responsive' quality={100} width={1} height={1} priority />
                        </div>
                    </div>
                </Link>
            </div>

            <div className='w-8/12 flex justify-center '>
                <div className='hidden md:flex md:space-x-3 lg:space-x-4 xl:space-x-8 flex-initial font-medium text-blueGray-600'>
                    <HeaderActiveLink href='/'>Home</HeaderActiveLink>
                    <HeaderActiveLink href='/makanan-dan-minuman'>Makanan dan Minuman</HeaderActiveLink>
                    <HeaderActiveLink href='/kerajinan'>Kerajinan</HeaderActiveLink>
                    <HeaderActiveLink href='/fashion'>Fashion</HeaderActiveLink>
                </div>
                <input type='text' className='block md:hidden px-3 py-2 border border-gray-400 focus:outline-none text-blueGray-600 bg-blueGray-200 w-full' />
            </div>

            <div className='w-2/12 flex items-center justify-end md:space-x-3 lg:space-x-4 xl:space-x-6'>
                <button type='button' name='search' aria-label='Search' onClick={() => setOpen(true)}>
                    <SearchIcon className='hidden md:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                </button>
                <Button href={() => router.push('/account/login')} size='base' width='max' display='block' type='secondary'>
                    <span>Sign In</span>
                </Button>
            </div>
        </header>
    )
}

export default HeaderNotSignIn
