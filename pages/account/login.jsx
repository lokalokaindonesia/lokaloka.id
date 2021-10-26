import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, getProviders } from 'next-auth/client'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

const login = () => {
    const errorToast = (msg) => toast.error(msg)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const query = router.query?.error
        if (query) {
            setError(true)
            errorToast('Failed, Try Again')
        }
    }, [])

    const [session, loading] = useSession()

    if (session) router.push('/')

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn('credentials', { email, password })
    }

    return (
        <div className='text-blueGray-800'>
            <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Head>
                <title>Login buat beliin pacar oleh-oleh 😊</title>
            </Head>
            <div className=''>
                <section className='flex flex-col md:flex-row h-screen items-center'>
                    <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 lg:w-2/3 h-screen'>
                        <img src='https://source.unsplash.com/collection/1808212' className='object-cover w-full h-full' />
                    </div>

                    <div className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:w-1/3 h-full px-4 md:px-6 xl:px-6 lg:px-6 flex items-center justify-center md:overflow-y-auto lg:py-6'>
                        <div className='w-full h-auto'>
                            <h1 className='text-2xl md:text-4xl lg:text-2xl 2xl:text-4xl font-bold leading-loose text-blueGray-800'>Login biar bisa belanja</h1>

                            <form className='mt-6 text-sm md:text-base flex flex-col space-y-4' method='POST' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor='email' className='block text-gray-700'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='belanjain_teman@gmail.com'
                                        className='rounded-md w-full px-2 py-2 text-sm md:text-base md:px-4 md:py-3 transition ease-in-out duration-300 bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
                                        required
                                    />
                                </div>

                                <div className=''>
                                    <label htmlFor='password' className='block text-gray-700'>
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        value={password}
                                        id='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='*****'
                                        minLength={6}
                                        className='rounded-md w-full px-2 py-2 text-sm md:text-base md:px-4 md:py-3 transition ease-in-out duration-300 bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                        required
                                    />
                                </div>

                                {/* <div className='text-right my-2'>
                                    <Link href='/account/forgot-password'>
                                        <span className='cursor-pointer text-sm font-semibold text-orange-500 transition duration-300 ease-in-out hover:text-orange-700 focus:text-orange-700'>
                                            Lupa Password?
                                        </span>
                                    </Link>
                                </div> */}

                                <button
                                    type='submit'
                                    className='rounded-md w-full text-sm md:text-base block bg-orange-500 transition duration-300 ease-in-out hover:bg-orange-600 focus:bg-orange-600 text-white font-semibold px-2 py-2 md:px-4 md:py-3 '
                                >
                                    Login
                                </button>
                            </form>

                            <hr className='my-6 border-gray-300 w-full' />

                            <div className='flex flex-col space-y-4'>
                                <button
                                    type='button'
                                    onClick={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })}
                                    className='rounded-md w-full block bg-white transition duration-300 ease-in-out hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold px-2 py-2 text-sm md:text-base md:px-4 md:py-3 border border-gray-300'
                                >
                                    <div className='flex items-center space-x-4 justify-center'>
                                        <div className='w-5 h-5'>
                                            <Image src='/google.svg' layout='responsive' width={1} height={1} />
                                        </div>
                                        <span className='text-sm md:text-base'> Login dengan Google</span>
                                    </div>
                                </button>
                            </div>

                            <p className='mt-8'>
                                Belum punya akun? &nbsp;
                                <Link href='/account/register'>
                                    <span className='cursor-pointer text-sm md:text-base text-orange-500 transition duration-300 ease-in-out hover:text-orange-700 font-semibold'>
                                        Buat sekarang
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default login
