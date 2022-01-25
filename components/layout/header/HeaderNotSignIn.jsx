import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/outline'
import { FaGooglePlusG } from 'react-icons/fa'
import Button from '@/components/ui/Button'
import { useState, Fragment, useRef } from 'react'
import { useSession, signIn, getProviders } from 'next-auth/client'

const HeaderNotSignIn = () => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [inputText, setInputText] = useState('')

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

            <div className='w-10/12 flex justify-start md:justify-center'>
                <form method='post' className='w-full' action={`/search?s=${inputText}`}>
                    <div className='flex rounded-md shadow-sm w-full'>
                        <input
                            type='text'
                            required={true}
                            name='search'
                            onChange={handleInputSearch}
                            id='search'
                            className='block w-full bg-slate-200 bg-opacity-50 text-slate-700 border-r-0 placeholder-zinc-400 border-slate-300 px-2 py-2 md:px-3 md:py-3 shadow-sm text-xs focus:border-slate-300 focus:ring-0 rounded-l-0 rounded-l-md'
                            placeholder='Cari produk disini...'
                        />
                        <button type='submit' className='inline-flex bg-white bg-opacity-50 border border-l-0 border-slate-300 items-center px-3 md:px-4 rounded-r-md'>
                            <SearchIcon className='w-4 h-4 text-slate-400' />
                        </button>
                    </div>
                </form>
            </div>

            <div className='w-4/12 md:w-2/12 md:hidden flex items-center justify-end space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6'>
                <Button href={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })} size='sm' width='max' display='block' type='primary'>
                    <div className='flex space-x-2 items-center'>
                        <span>Masuk</span>
                        <FaGooglePlusG className='w-6 h-6' />
                    </div>
                </Button>
            </div>
            <div className='w-4/12 md:w-2/12 hidden md:flex items-center justify-end space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6'>
                <Button href={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })} size='base' width='max' display='block' type='primary'>
                    <div className='flex space-x-2 items-center'>
                        <span>Masuk</span>
                        <FaGooglePlusG className='w-6 h-6' />
                    </div>
                </Button>
            </div>
        </header>
    )
}

export default HeaderNotSignIn
