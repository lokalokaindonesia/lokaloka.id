import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'

const register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const { user, register, error } = useContext(AuthContext)

    const router = useRouter()

    if (user) {
        router.push('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register({ email, password, username })
    }

    return (
        <div>
            <Head>
                <title>Register New Account - Lokaloka.id 😊</title>
            </Head>
            <div className=''>
                <section className='flex flex-col md:flex-row h-screen items-center'>
                    <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
                        <Image src='https://source.unsplash.com/collection/1808212' layout='responsive' width={1} height={1} objectFit='cover' priority />
                    </div>

                    <div className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
                        <div className='w-full h-100'>
                            <h1 className='text-2xl md:text-2xl font-bold leading-tight mt-12'>Register an Account 😁</h1>

                            <form className='mt-6' method='POST' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor='name' className='block text-gray-700'>
                                        Username
                                    </label>
                                    <input
                                        type='username'
                                        value={username}
                                        id='username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Enter Username'
                                        className='w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
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
                                        className='w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
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
                                        className='w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
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
                                        className='w-full px-4 transition duration-300 ease-in-out py-3  bg-gray-100 mt-2 border border-gray-300 focus:border-blue-600 focus:bg-white focus:outline-none'
                                        required
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full block bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold  px-4 py-3 mt-6'
                                >
                                    Register
                                </button>
                            </form>

                            <hr className='my-6 border-gray-300 w-full' />

                            <button
                                type='button'
                                className='w-full block bg-white transition duration-300 ease-in-out hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold  px-4 py-3 border border-gray-300'
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
