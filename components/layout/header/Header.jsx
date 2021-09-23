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
        <header className='w-full h-20 container mx-auto px-4 2xl:px-0 flex justify-between items-center'>
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
                            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl lg:max-w-4xl sm:w-full'>
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
                                            className='block w-full text-lg px-6 py-4 shadow-sm sm:text-sm ring-0 border-none rounded-l-0 rounded-r-md'
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
                <div className='hidden md:flex md:space-x-3 lg:space-x-4 xl:space-x-8 flex-initial font-medium text-blueGray-600'>
                    <HeaderActiveLink href='/'>Home</HeaderActiveLink>
                    <HeaderActiveLink href='/food-and-beverage'>Food & Beverages</HeaderActiveLink>
                    <HeaderActiveLink href='/craft'>Craft</HeaderActiveLink>
                    <HeaderActiveLink href='/fashion'>Fashion</HeaderActiveLink>
                </div>
                <input type='text' className='block md:hidden px-3 py-2 border border-gray-400 focus:outline-none text-blueGray-600 bg-blueGray-200 w-full' />
            </div>

            <div className='w-2/12 flex items-center justify-end md:space-x-3 lg:space-x-4 xl:space-x-6'>
                <button type='button' name='search' aria-label='Search' onClick={() => setOpen(true)}>
                    <SearchIcon className='hidden md:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                </button>
                <button
                    type='button'
                    name='search'
                    className='relative'
                    aria-label='Favorites'
                    onClick={() => {
                        setOpenFavorite(!openFavorite)
                    }}
                >
                    <HeartIcon className='hidden md:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                    {favorite.length > 0 && (
                        <span className='flex h-3 w-3 absolute top-0 right-0'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
                        </span>
                    )}
                </button>
                <Link href='/cart'>
                    <button className='relative' type='button' name='cart' aria-label='Cart'>
                        <ShoppingCartIcon className='hidden md:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                        {cartLength > 0 && (
                            <span className='flex h-3 w-3 absolute top-0 right-0'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
                            </span>
                        )}
                    </button>
                </Link>
                <ProfileDropdown />
            </div>
            {openFavorite && (
                <div
                    className='relative md:right-[20rem] md:top-0 md:pt-10 lg:right-80 lg:top-0 lg:pt-10 2xl:right-72 2xl:top-0 2xl:pt-10'
                    onMouseEnter={() => setOpenFavorite(true)}
                >
                    <div className='absolute flex flex-col space-y-2 p-2 rounded-md bg-white border border-blueGray-200 max-w-xs w-max'>
                        {favorite
                            .map((f, i) => {
                                return (
                                    <Link href={`/${f.product_category.slug}/${f.slug}`} key={i} className=''>
                                        <div className='w-full flex cursor-pointer'>
                                            <div className='w-3/12'>
                                                <div className='w-14 h-14'>
                                                    <Image src={f.images[0].url} priority layout='responsive' width={1} height={1} />
                                                </div>
                                            </div>
                                            <div className='w-9/12 flex flex-col space-y-1'>
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
                                )
                            })
                            .splice(0, 3)}
                        {favorite.length == 0 && <div className='w-full flex p-6'>No favorites here, Get Now!</div>}
                        <Link href='/profile/favorites'>
                            <div className='w-full text-sm cursor-pointer text-blue-400 text-center'>View All</div>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
