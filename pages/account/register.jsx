import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import { useSession, signIn, getProviders } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

const register = () => {
    const errorToast = (msg) => toast.error(msg)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()

    const [session, loading] = useSession()

    if (session) return router.push('/')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (username == '') {
            setError(true)
            errorToast('Username tidak boleh kosong')
            return
        }
        if (name == '') {
            setError(true)
            errorToast('Nama tidak boleh kosong')
            return
        }
        if (email == '') {
            setError(true)
            errorToast('Email tidak boleh kosong')
            return
        }
        if (password == '') {
            setError(true)
            errorToast('Password tidak boleh kosong')
            return
        }
        if (passwordConfirm == '') {
            setError(true)
            errorToast('Konfirmasi Password tidak boleh kosong')
            return
        }

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
    }

    return (
        <div className='text-slate-800'>
            <Head>
                <title>Daftar akun baru - Lokaloka.id 😊</title>
            </Head>
            <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='py-24 md:py-0'>
                <section className='flex flex-col md:flex-row h-screen items-center'>
                    <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 lg:w-2/3 h-screen'>
                        <img src='https://source.unsplash.com/collection/1808212' className='object-cover w-full h-full' />
                    </div>

                    <div className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:w-1/3 h-screen px-4 md:px-6 xl:px-6 lg:px-6 flex items-center justify-center md:overflow-y-auto lg:py-6'>
                        <div className='w-full h-auto'>
                            <h1 className='pt-12 text-2xl md:text-4xl lg:text-2xl 2xl:text-4xl font-bold leading-tight md:leading-loose'>Daftarkan dirimu, baru belanja</h1>

                            <form method='POST' className='flex flex-col space-y-4 mt-6' onSubmit={() => handleSubmit(event)}>
                                <div>
                                    <label htmlFor='username' className='block text-gray-700'>
                                        Username
                                    </label>
                                    <input
                                        type='username'
                                        value={username}
                                        id='username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='sukaJajan_99'
                                        className='rounded-md w-full text-sm md:text-base px-2 py-2 md:px-4 md:py-3 transition duration-300 ease-in-out bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
                                    />
                                </div>

                                <div className=''>
                                    <label htmlFor='name' className='block text-gray-700'>
                                        Nama
                                    </label>
                                    <input
                                        type='name'
                                        value={name}
                                        id='name'
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Nama Lengkap'
                                        className='rounded-md w-full text-sm md:text-base md:px-4 transition duration-300 ease-in-out md:py-3 px-2 py-2 bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
                                    />
                                </div>

                                <div className=''>
                                    <label htmlFor='email' className='block text-gray-700'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='jajanin_pacar@gmail.com'
                                        className='rounded-md w-full text-sm md:text-base md:px-4 transition duration-300 ease-in-out md:py-3 px-2 py-2 bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                        autoFocus='autofocus'
                                        autoComplete='autocomplete'
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
                                        placeholder='****'
                                        minLength={6}
                                        className='rounded-md w-full text-sm md:text-base md:px-4 transition duration-300 ease-in-out md:py-3 px-2 py-2 bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                    />
                                </div>

                                <div className=''>
                                    <label htmlFor='password-confirm' className='block text-gray-700'>
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type='password'
                                        value={passwordConfirm}
                                        id='password-confirm'
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        placeholder='****'
                                        minLength={6}
                                        className='rounded-md w-full text-sm md:text-base md:px-4 transition duration-300 ease-in-out md:py-3 px-2 py-2 bg-gray-100 mt-2 border border-gray-300 focus:border-orange-600 focus:bg-white focus:outline-none'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='rounded-md w-full text-sm md:text-base block bg-orange-500 transition duration-300 ease-in-out hover:bg-orange-600 focus:bg-orange-600 text-white font-semibold px-2 py-2 md:px-4 md:py-3 '
                                >
                                    Daftar
                                </button>
                            </form>

                            <hr className='my-6 border-gray-300 w-full' />

                            <button
                                type='button'
                                onClick={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })}
                                className='rounded-md w-full block bg-white transition duration-300 ease-in-out hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold px-2 py-2 text-sm md:text-base md:px-4 md:py-3 border border-gray-300'
                            >
                                <div className='flex items-center justify-center'>
                                    <div className='w-5 h-5'>
                                        <Image src='/google.svg' layout='responsive' width={1} height={1} />
                                    </div>
                                    <span className='ml-4'> Daftar dengan Google</span>
                                </div>
                            </button>

                            <p className='mt-8'>
                                Sudah punya akun? &nbsp;
                                <Link href='/account/login'>
                                    <span className='text-orange-500 transition duration-300 ease-in-out hover:text-orange-700 font-semibold cursor-pointer'>Masuk</span>
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
