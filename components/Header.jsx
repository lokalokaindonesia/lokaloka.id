import Link from 'next/link'
import { useContext } from 'react'
import { SearchIcon, ColorSwatchIcon } from '@heroicons/react/outline'
import AuthContext from '../context/AuthContext'
import Button from './Button'
const Header = () => {
    const { user, logout } = useContext(AuthContext)

    return (
        <header className='w-full px-4 h-20 xl:container xl:mx-auto flex justify-between items-center '>
            <div className='w-2/12 text-2xl font-extrabold text-blue-500 tracking-wide'>
                <ColorSwatchIcon className='h-10 w-10 text-blue-800' />
            </div>

            <div className='w-8/12 flex justify-center'>
                <div className='hidden xl:flex space-x-8 flex-initial font-medium text-blueGray-600'>
                    <Link href='/' activeClassName='font-bold text-gray-800'>
                        Home
                    </Link>
                    <Link href='/category/food-and-beverages'>Food & Beverages</Link>
                    <Link href='/category/craft'>Craft</Link>
                    <Link href='/category/fashion'>Fashion</Link>
                    <Link href='/category/experience'>Experience</Link>
                    <Link href='/category/rent'>Rent</Link>
                    <Link href='/category/book'>Book</Link>
                </div>
                <input type='text' className='block xl:hidden px-3 py-2 border border-gray-400 focus:outline-none text-blueGray-600 bg-blueGray-200 w-full' />
            </div>

            <div className='w-2/12 flex items-center justify-end space-x-6'>
                <SearchIcon className='hidden xl:block h-6 w-6 text-blueGray-800 cursor-pointer' />
                {user ? (
                    <div className='cursor-pointer px-3 py-1 bg-red-100 text-extrabold text-red-500' onClick={() => logout()}>
                        Logout
                    </div>
                ) : (
                    <Button href='/account/login' size='md' type='secondary'>
                        <span>Sign In</span>
                    </Button>
                )}
            </div>
        </header>
    )
}

export default Header
