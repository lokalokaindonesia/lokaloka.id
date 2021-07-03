import Link from 'next/link'
import { SearchIcon, ColorSwatchIcon } from '@heroicons/react/outline'
import Button from '@/components/Button'
import { signOut, useSession } from 'next-auth/client'

const Header = ({ cartProducts }) => {
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
                <a href='/'>
                    <ColorSwatchIcon className='cursor-pointer h-10 w-10 text-blue-800' />
                </a>
            </div>

            <div className='w-8/12 flex justify-center'>
                <div className='hidden xl:flex space-x-8 flex-initial font-medium text-blueGray-600'>
                    <Link href='/' activeClassName='font-bold text-gray-800'>
                        Home
                    </Link>
                    <Link href='/food-and-beverages'>Food & Beverages</Link>
                    <Link href='/craft'>Craft</Link>
                    <Link href='/fashion'>Fashion</Link>
                    <Link href='/experience'>Experience</Link>
                    <Link href='/rent'>Rent</Link>
                    <Link href='/book'>Book</Link>
                </div>
                <input type='text' className='block xl:hidden px-3 py-2 border border-gray-400 focus:outline-none text-blueGray-600 bg-blueGray-200 w-full' />
            </div>

            <div className='w-2/12 flex items-center justify-end space-x-6'>
                <SearchIcon className='hidden xl:block h-6 w-6 text-blueGray-800 cursor-pointer' />
                {session ? (
                    <>
                        <div onClick={() => logoutHandler()} className='cursor-pointer'>
                            <Button size='md' width='max' display='block' type='logout'>
                                <span>Logout</span>
                            </Button>
                        </div>
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

export const getServerSideProps = async () => {
    const getCartProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`)
    const cartProducts = await getCartProducts.json()

    return {
        props: { cartProducts },
    }
}

export default Header
