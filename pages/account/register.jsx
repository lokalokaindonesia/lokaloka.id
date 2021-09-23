import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import { useSession, signIn, getProviders } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'

const register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const router = useRouter()

    const [session, loading] = useSession()

    if (session) return router.push('/')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const register = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
            email,
            password,
            name,
            username,
        })

        const registerRes = await register.data

        if (!registerRes) {
            return console.log('failed to register')
        }

        console.log(registerRes)

        return router.push('/account/login')
        // console.log(e)
    }

    return (
        <div className='text-blueGray-800'>
            <Head>
                <title>Register New Account - Lokaloka.id 😊</title>
            </Head>
            <div className=''>
                <section className='flex flex-col md:flex-row h-screen items-center'>
                    <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 lg:w-2/3 h-screen'>
                        <img src='https://source.unsplash.com/collection/1808212' className='object-cover w-full h-full' />
                    </div>

                    <div className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:w-1/3 h-screen px-6 xl:px-6 lg:px-6 flex items-center justify-center overflow-y-scroll lg:py-6'>
                        <div className='w-full h-auto'>
                            <h1 className='pt-12 lg:text-2xl 2xl:text-4xl font-bold leading-loose'>Register an Account</h1>

                            <form className='mt-6' method='POST' onSubmit={() => handleSubmit(event)}>
                                <div>
                                    <label htmlFor='username' className='block text-gray-700'>
                                        Username
                                    </label>
                                    <input
                                        type='username'
                                        value={username}
                                        id='username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Enter Username'
                                        className='rounded-md w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
                                        required
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label htmlFor='name' className='block text-gray-700'>
                                        Name
                                    </label>
                                    <input
                                        type='name'
                                        value={name}
                                        id='name'
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Full Name'
                                        className='rounded-md w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
                                        required
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label htmlFor='email' className='block text-gray-700'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Email Address'
                                        className='rounded-md w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
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
                                        className='rounded-md w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        required
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label htmlFor='password-confirm' className='block text-gray-700'>
                                        Confirm Password
                                    </label>
                                    <input
                                        type='password'
                                        value={passwordConfirm}
                                        id='password-confirm'
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        placeholder='Enter Password'
                                        minLength={6}
                                        className='rounded-md w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        required
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='rounded-md w-full block bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold  px-4 py-3 mt-6'
                                >
                                    Register
                                </button>
                            </form>

                            <hr className='my-6 border-gray-300 w-full' />

                            <button
                                type='button'
                                onClick={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })}
                                className='rounded-md w-full block bg-white transition duration-300 ease-in-out hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold  px-4 py-3 border border-gray-300'
                            >
                                <div className='flex items-center justify-center'>
                                    <div className='w-5 h-5'>
                                        <Image src='/google.svg' layout='responsive' width={1} height={1} />
                                    </div>
                                    <span className='ml-4'> Register with Google</span>
                                </div>
                            </button>

                            <p className='mt-8'>
                                Already Have an Account? &nbsp;
                                <Link href='/account/login'>
                                    <span className='text-blue-500 transition duration-300 ease-in-out hover:text-blue-700 font-semibold cursor-pointer'>Sign In</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default register
