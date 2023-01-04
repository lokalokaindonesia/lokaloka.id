import Link from 'next/link'
import { SearchIcon, ColorSwatchIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import ProfileDropdown from '@/components/navbar/ProfileDropdown'
import FavoritesDropdown from '@/components/navbar/FavoritesDropdown'
import { useEffect, useState, Fragment, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFavorite } from '@/redux/favoriteSlice'

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
            <div className='hidden md:block md:w-2/12 text-2xl font-extrabold text-orange-500 tracking-wide'>
                <a href='/'>
                    <div className='cursor-pointer'>
                        <img className='hidden md:block cursor-pointer ' src='/logo.png' alt='' style={{ height: '40px' }} />
                        {/* <Image objectFit='contain' layout='responsive' width={100} height={40} src='/images/logo2.png' alt='' /> */}
                        {/* <h1 className='hidden md:block cursor-pointer logo lowercase text-4xl font-bold text-orange-500'>Lokaloka</h1> */}
                    </div>
                </a>
            </div>

            <div className='w-9/12 flex justify-start md:justify-center'>
                <form method='post' className='w-full' action={`/search?s=${inputText}`}>
                    <div className='flex rounded-md shadow-sm w-full'>
                        <input
                            type='text'
                            required={true}
                            name='search'
                            onChange={handleInputSearch}
                            id='search'
                            className='block w-full bg-white text-slate-700 border-r-0 placeholder-zinc-400 border-slate-300 px-2 py-2 md:px-3 md:py-3 shadow-sm text-xs focus:border-slate-300 focus:ring-0 rounded-l-0 rounded-l-md'
                            placeholder='Cari produk disini...'
                        />
                        <button type='submit' className='inline-flex bg-white bg-opacity-100 border border-l-0 border-slate-300 items-center px-3 md:px-4 rounded-r-md'>
                            <SearchIcon className='w-4 h-4 text-slate-400' />
                        </button>
                    </div>
                </form>
            </div>

            <div className='md:w-2/12 flex items-center justify-end space-x-3 md:space-x-2 lg:space-x-4 xl:space-x-6'>
                <FavoritesDropdown favorite={favorite} />
                <Link href='/cart'>
                    <button className='relative ' type='button' name='cart' aria-label='Cart'>
                        <ShoppingCartIcon className='h-6 w-6 md:h-6 md:w-6 text-slate-500 cursor-pointer' />
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
