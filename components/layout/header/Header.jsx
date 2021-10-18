import Link from 'next/link'
import { SearchIcon, ColorSwatchIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import HeaderActiveLink from '@/components/layout/header/HeaderActiveLink'
import ProfileDropdown from '@/components/navbar/ProfileDropdown'
import FavoritesDropdown from '@/components/navbar/FavoritesDropdown'
import { useEffect, useState, Fragment, useRef } from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { setFavorite } from '@/redux/favoriteSlice'
import { Dialog, Transition } from '@headlessui/react'

const Header = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    const dispatch = useDispatch()
    const favorite = useSelector((state) => state.favorite.value)

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [cartLength, setCartLength] = useState(0)
    const [openFavorite, setOpenFavorite] = useState(false)
    const [inputText, setInputText] = useState('')

    useEffect(async () => {
        const getCart = await axios.get(`/api/cart`)
        const cartData = await getCart.data

        setCartLength(cartData.length)

        const getUser = await axios.get('/api/user')
        const userData = await getUser.data

        const getProds = await axios.get(`/api/products`)
        const prods = await getProds.data

        const z = []
        const filtered = await userData.favorites.forEach((f) => {
            const x = prods.find((p) => p.id == f.id)
            z.push(x)
        })

        dispatch(setFavorite(z))
        return () => {}
    }, [loading])

    const handleInputSearch = async (e) => {
        setInputText(e.target.value)
    }

    return (
        <header className='w-full h-16 lg:h-20 container mx-auto px-4 2xl:px-0 flex justify-between items-center'>
            {/* Modal Section */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='fixed z-50 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className='flex items-start md:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
                            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-screen-sm sm:my-8 sm:align-middle sm:max-w-3xl lg:max-w-4xl sm:w-full'>
                                <form method='post' action={`/search?s=${inputText}`}>
                                    <div className='flex rounded-md shadow-sm'>
                                        <span className='inline-flex items-center px-3 rounded-l-md border-none'>
                                            <SearchIcon className='w-4 h-4 text-blueGray-500' />
                                        </span>
                                        <input
                                            type='text'
                                            required={true}
                                            name='search'
                                            onChange={handleInputSearch}
                                            id='search'
                                            className='block w-full md:text-lg md:px-6 md:py-4 shadow-sm text-xs ring-0 border-none rounded-l-0 rounded-r-md'
                                            placeholder='Cari produk disini...'
                                        />
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* End Modal Section */}

            <div className='hidden md:block md:w-2/12 text-2xl font-extrabold text-blue-500 tracking-wide'>
                <Link href='/'>
                    <div className='cursor-pointer'>
                        <h1 className='hidden md:block cursor-pointer text-4xl font-bold text-blue-500'>Lokaloka</h1>
                    </div>
                </Link>
            </div>

            <div className='w-10/12 md:w-8/12 flex justify-start md:justify-center'>
                <form method='post' className='block md:hidden' action={`/search?s=${inputText}`}>
                    <div className='flex rounded-md shadow-sm'>
                        <span className='inline-flex bg-white bg-opacity-50 border border-r-0 border-blueGray-200 items-center px-3 rounded-l-md'>
                            <SearchIcon className='w-4 h-4 text-blueGray-400' />
                        </span>
                        <input
                            type='text'
                            required={true}
                            name='search'
                            onChange={handleInputSearch}
                            id='search'
                            className='block w-full bg-white bg-opacity-50 text-blueGray-700 border-l-0 placeholder-gray-400 border-blueGray-200 px-2 py-2 shadow-sm text-xs focus:border-blueGray-200 focus:ring-0 rounded-l-0 rounded-r-md'
                            placeholder='Cari produk disini...'
                        />
                    </div>
                </form>
                <div className='hidden md:flex md:items-center md:justify-center md:w-full md:space-x-3 lg:space-x-4 xl:space-x-8 flex-initial font-medium text-blueGray-500'>
                    <HeaderActiveLink href='/'>Home</HeaderActiveLink>
                    <HeaderActiveLink href='/makanan-dan-minuman'>Makanan & Minuman</HeaderActiveLink>
                    <HeaderActiveLink href='/kerajinan'>Kerajinan</HeaderActiveLink>
                    <HeaderActiveLink href='/fashion'>Fashion</HeaderActiveLink>
                </div>
            </div>

            <div className='md:w-2/12 flex items-center justify-end space-x-3 md:space-x-2 lg:space-x-4 xl:space-x-6'>
                <button type='button' className='hidden md:block' name='search' aria-label='Search' onClick={() => setOpen(true)}>
                    <SearchIcon className='md:h-6 md:w-6 text-blueGray-500 cursor-pointer' />
                </button>
                <FavoritesDropdown favorite={favorite} />
                <Link href='/cart'>
                    <button className='relative ' type='button' name='cart' aria-label='Cart'>
                        <ShoppingCartIcon className='h-6 w-6 md:h-6 md:w-6 text-blueGray-500 cursor-pointer' />
                        {cartLength > 0 && (
                            <span className='hidden md:flex h-3 w-3 absolute top-0 right-0'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
                            </span>
                        )}
                    </button>
                </Link>
                <ProfileDropdown />
            </div>
        </header>
    )
}

export default Header
