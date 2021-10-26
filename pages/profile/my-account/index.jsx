import axios from 'axios'
import { getSession, useSession } from 'next-auth/client'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { useEffect, useRef } from 'react'
import Button from '@/components/ui/Button'
import MemberCard from '@/components/ui/MemberCard'
import { useState } from 'react'
import { useRouter } from 'next/router'

const index = ({ user }) => {
    const router = useRouter()
    const [session, loading] = useSession()

    const [gender, setGender] = useState(user.gender)
    const [phone, setPhone] = useState(user.phone)
    const [name, setName] = useState(user.name)
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)

    const ref = useRef(null)

    useEffect(() => {
        import('@lottiefiles/lottie-player')
    })

    const handlePhone = async (e) => {
        setPhone(e.target.value)
    }

    const handleName = async (e) => {
        setName(e.target.value)
    }

    const handleDateOfBirth = async (e) => {
        setDateOfBirth(e.target.value)
    }

    const updateUser = async () => {
        try {
            const updateData = {
                name,
                phone,
                gender,
                dateOfBirth,
            }

            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            })

            return router.reload()
        } catch (error) {
            return console.log(error)
        }
    }

    if (loading) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <lottie-player
                    src='https://assets3.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json'
                    id='verified'
                    ref={ref}
                    autoplay
                    mode='normal'
                    style={{ width: '40%', height: '40%' }}
                ></lottie-player>
            </div>
        )
    }

    return (
        <Layout title='Profil'>
            <div className='container mx-auto 2xl:px-0 my-3 md:my-4 xl:my-5 2xl:my-6 flex flex-col md:space-y-4 xl:space-y-5 2xl:space-y-6'>
                <div className='text-blueGray-800 px-4 md:px-0 font-extrabold leading-loose md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>Akun</div>
                {/* <MemberCard user={user} /> */}
                <div className='flex flex-col mt-4 md:mt-0 space-y-2 space-x-0 md:space-y-0 md:flex-row md:space-x-4 px-4 md:px-0'>
                    <div className='w-full md:w-2/12'>
                        <ul className='flex space-x-2 space-y-0 md:flex-col md:space-x-0 md:space-y-2'>
                            <li className='rounded text-sm md:text-base font-semibold text-blueGray-500'>
                                <Link href='/profile/my-account'>Akun</Link>
                            </li>
                            <li className='rounded text-sm md:text-base text-blueGray-500'>
                                <Link href='/profile/my-orders'>Pesanan saya</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full md:w-10/12'>
                        <div className='w-full h-full bg-white border border-blueGray-200 p-4 rounded-md flex flex-col space-y-2 md:space-y-4'>
                            <span className='text-base md:text-xl font-bold'>Profil</span>
                            <hr className='border border-blueGray-200' />
                            <div className='flex space-x-2 md:space-x-8 w-full items-center'>
                                <div className='w-full xl:w-10/12'>
                                    <div className='flex flex-col space-y-2 w-full'>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'>Username</div>
                                            <div className='md:w-8/12 xl:w-10/12'>{user.username}</div>
                                        </div>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'>Nama</div>
                                            <div className='md:w-8/12 xl:w-10/12'>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    defaultValue={name}
                                                    onChange={handleName}
                                                    id='name'
                                                    autoComplete='given-name'
                                                    className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm border-blueGray-200 rounded-md'
                                                />
                                                {/* {user.name} */}
                                            </div>
                                        </div>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'>Email</div>
                                            <div className='md:w-8/12 xl:w-10/12'>{user.email}</div>
                                        </div>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'>Nomor Telepon</div>
                                            <div className='md:w-8/12 xl:w-10/12'>
                                                {/* {user.phone} */}
                                                <input
                                                    type='text'
                                                    name='phone'
                                                    id='phone'
                                                    onChange={handlePhone}
                                                    defaultValue={phone}
                                                    autoComplete='phone'
                                                    className='mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm border-blueGray-200 rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'>Jenis Kelamin</div>
                                            <div className='md:w-8/12 xl:w-10/12'>
                                                <div className='flex space-x-4'>
                                                    <div className='flex items-center'>
                                                        <input
                                                            id='gender-male'
                                                            checked={gender == 'laki-laki' ? true : false}
                                                            name='gender'
                                                            type='radio'
                                                            onChange={() => setGender('laki-laki')}
                                                            defaultValue='laki-laki'
                                                            className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300'
                                                        />
                                                        <label htmlFor='gender-male' className='ml-3 block text-sm md:text-base font-medium text-gray-700'>
                                                            Laki-laki
                                                        </label>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <input
                                                            id='gender-female'
                                                            name='gender'
                                                            onChange={() => setGender('perempuan')}
                                                            defaultValue='perempuan'
                                                            checked={gender == 'perempuan' ? true : false}
                                                            type='radio'
                                                            className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300'
                                                        />
                                                        <label htmlFor='gender-female' className='ml-3 block text-sm md:text-base font-medium text-gray-700'>
                                                            Perempuan
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'>Tanggal Lahir</div>
                                            <div className='md:w-8/12 xl:w-10/12 w-full'>
                                                <input
                                                    id='dateOfBirth'
                                                    name='dateOfBirth'
                                                    type='date'
                                                    onChange={handleDateOfBirth}
                                                    defaultValue={dateOfBirth}
                                                    className='focus:ring-orange-500 px-2 py-1 rounded text-xs md:text-sm shadow-sm border-blueGray-200'
                                                />
                                            </div>
                                        </div>
                                        <div className='text-sm md:text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:items-center'>
                                            <div className='md:w-4/12 xl:w-2/12'></div>
                                            <div className='hidden md:block md:w-4/12 xl:w-2/12'>
                                                <div onClick={() => updateUser()}>
                                                    <Button size='base' width='max' display='flex' type='primary' href={() => {}}>
                                                        Perbarui
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex w-full justify-end md:hidden md:w-4/12 xl:w-2/12'>
                                                <div onClick={() => updateUser()}>
                                                    <Button size='sm' width='max' display='flex' type='primary' href={() => {}}>
                                                        Perbarui
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden items-center justify-center'>
                                    <div className='w-40 h-40'>
                                        <Image
                                            src={user?.avatar || session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
                                            layout='responsive'
                                            className='rounded-full'
                                            width={1}
                                            height={1}
                                            quality={100}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    const session = await getSession({ ctx })
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })

    return {
        props: {
            user: data,
        },
    }
}

export default index
