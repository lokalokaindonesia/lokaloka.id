import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, getProviders } from 'next-auth/client'
import Button from '@/components/ui/Button'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const [session, loading] = useSession()

    if (session) router.push('/')

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn('credentials', { email, password })
    }

    return (
        <div>
            <Head>
                <title>Sign In to Give your Ex an Souvenirs 😊</title>
            </Head>
            <div className=''>
                <section className='flex flex-col md:flex-row h-screen items-center'>
                    <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
                        <img src='https://source.unsplash.com/collection/1808212' className='object-cover w-full h-full' />
                    </div>

                    <div className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
                        <div className='w-full h-sceen'>
                            <h1 className='text-2xl md:text-4xl font-bold leading-loose '>Sign In First Boy </h1>

                            <form className='mt-6' method='POST' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor='email' className='block text-gray-700'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Email Address'
                                        className='rounded-md w-full px-4 py-3 transition ease-in-out duration-300 bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
                                        required
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label htmlFor='password' className='block text-gray-700'>
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        value={password}
                                        id='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Enter Password'
                                        minLength={6}
                                        className='rounded-md w-full px-4 py-3 transition ease-in-out duration-300 bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        required
                                    />
                                </div>

                                <div className='text-right my-2'>
                                    <Link href='/forgot-password'>
                                        <span className='cursor-pointer text-sm font-semibold text-blue-500 transition duration-300 ease-in-out hover:text-blue-700 focus:text-blue-700'>
                                            Forgot Password?
                                        </span>
                                    </Link>
                                </div>

                                <Button type='primary' width='full' size='ghostSize' buttonType='submit'>
                                    Sign In
                                </Button>
                            </form>

                            <hr className='my-6 border-gray-300 w-full' />

                            <div className='flex flex-col space-y-4'>
                                <Button type='ghost' width='full' size='ghostSize' href={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })}>
                                    <div className='flex items-center justify-center'>
                                        <div className='w-5 h-5'>
                                            <Image src='/google.svg' layout='responsive' width={1} height={1} />
                                        </div>
                                        <span className='ml-4'> Sign In with Google</span>
                                    </div>
                                </Button>

                                {/* <button
                                    onClick={() => signIn('facebook', { callbackUrl: process.env.NEXTAUTH_URL })}
                                    className='w-full block bg-white transition duration-300 ease-in-out hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold  px-4 py-3 border border-gray-300'
                                >
                                    <div className='flex items-center justify-center'>
                                        <div className='w-6 h-6'>
                                            <Image src='/facebook.svg' layout='responsive' width={1} height={1} />
                                        </div>
                                        <span className='ml-4'> Sign In with Facebook</span>
                                    </div>
                                </button> */}
                            </div>

                            <p className='mt-8'>
                                Don't Have an Account? &nbsp;
                                <Link href='/account/register'>
                                    <span className='cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:text-blue-700 font-semibold'>Create New</span>
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
