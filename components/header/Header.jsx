import Link from 'next/link'
import { SearchIcon, ColorSwatchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { getSession, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import HeaderActiveLink from '@/components/header/HeaderActiveLink'

const Header = () => {
    const router = useRouter()
    const [session, loading] = useSession()
    const logoutHandler = () => {
        if (session) {
            return signOut({
                redirect: true,
                callbackUrl: process.env.NEXTAUTH_URL,
            })
        }
    }

    return (
        <header className='w-full px-4 xl:px-0 h-20 xl:container xl:mx-auto flex justify-between items-center '>
            <div className='w-2/12 text-2xl font-extrabold text-blue-500 tracking-wide'>
                <Link href='/'>
                    <button type='button' name='home'>
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
                <button type='button' name='search'>
                    <SearchIcon className='hidden xl:block h-6 w-6 text-blueGray-800 cursor-pointer' />
                </button>
                <Link href='/cart'>
                    <button className='relative' type='button' name='cart'>
                        <ShoppingCartIcon className='hidden xl:block h-6 w-6 text-blueGray-800 cursor-pointer' />
                        <span className='flex h-3 w-3 absolute top-0 right-0'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-3 w-3 bg-blue-500'></span>
                        </span>
                    </button>
                </Link>
                {session ? (
                    <>
                        <Button size='md' width='max' display='block' type='logout'>
                            <span onClick={() => logoutHandler()}>Logout</span>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button href='/account/login' size='md' width='max' display='block' type='secondary'>
                            <span>Sign In</span>
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
