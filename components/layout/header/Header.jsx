import Link from 'next/link'
import { SearchIcon, ColorSwatchIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import HeaderActiveLink from '@/components/layout/header/HeaderActiveLink'
import ProfileDropdown from '@/components/navbar/ProfileDropdown'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'

const Header = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    if (loading) {
        return <div></div>
    }

    const [cartLength, setCartLength] = useState(0)
    const [openFavorite, setOpenFavorite] = useState(false)
    const [favorite, setFavorite] = useState([])

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

        setFavorite(z)

        return () => {}
    }, [])

    return (
        <header className='w-full px-4 xl:px-0 h-20 xl:container xl:mx-auto flex justify-between items-center'>
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
                <button type='button' name='search' aria-label='Search'>
                    <SearchIcon className='hidden xl:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                </button>
                <button
                    type='button'
                    name='search'
                    aria-label='Favorites'
                    onClick={() => {
                        setOpenFavorite(!openFavorite)
                    }}
                >
                    <HeartIcon className='hidden xl:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                </button>
                {session && (
                    <Link href='/cart'>
                        <button className='relative' type='button' name='cart' aria-label='Cart'>
                            <ShoppingCartIcon className='hidden xl:block h-6 w-6 text-blueGray-600 cursor-pointer' />
                            {cartLength > 0 && (
                                <span className='flex h-3 w-3 absolute top-0 right-0'>
                                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                                    <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
                                </span>
                            )}
                        </button>
                    </Link>
                )}
                {session ? (
                    <ProfileDropdown />
                ) : (
                    <>
                        <Button href={() => router.push('/account/login')} size='md' width='max' display='block' type='secondary'>
                            <span>Sign In</span>
                        </Button>
                    </>
                )}
            </div>
            {openFavorite && (
                <div className='relative right-72 top-0 pt-10' onMouseEnter={() => setOpenFavorite(true)}>
                    <div className='absolute flex flex-col space-y-2 p-2 rounded-md bg-white border border-blueGray-200 max-w-xs w-max'>
                        {favorite.map((f, i) => {
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
                                            <NumberFormat value={f.sellingPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='line-clamp-1 text-sm' />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
