import axios from 'axios'
import { getSession, useSession } from 'next-auth/client'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { useEffect, useRef } from 'react'
import { BadgeCheckIcon, CheckCircleIcon } from '@heroicons/react/solid'
import Button from '@/components/ui/Button'

const index = ({ user }) => {
    const [session, loading] = useSession()

    const ref = useRef(null)
    useEffect(() => {
        import('@lottiefiles/lottie-player')
    })

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <Layout title='Profile'>
            <div className='container mx-auto my-6 flex flex-col space-y-6'>
                <div className='text-blueGray-800 font-extrabold leading-loose text-3xl'>My Account</div>
                <div className='rounded-lg w-full'>
                    <div className='relative'>
                        <Image src='/images/account/member.png' className='rounded-lg shadow' layout='responsive' width={1680} height={295} priority objectFit='cover' />
                        <div className='absolute top-12 left-12'>
                            <div className='flex items-center space-x-8'>
                                {!session.user.image && <img src={`https://ui-avatars.com/api/?name=${session.user.name}`} className='rounded-full w-44 h-44 shadow' />}
                                {session.user.image && <img src={session.user.image} className='rounded-full w-44 h-44 shadow' />}
                                <div className='flex flex-col space-y-8 h-full'>
                                    <div className='flex space-x-4 items-center'>
                                        <span className='text-2xl font-bold text-white'>{user.name}</span>
                                        <div className='flex space-x-2 items-center px-2 py-1 rounded bg-blue-500 bg-opacity-50'>
                                            <span className='text-white text-xs'>Verified</span>
                                            <lottie-player
                                                src='https://assets2.lottiefiles.com/packages/lf20_bvjhz66u.json'
                                                id='verified'
                                                ref={ref}
                                                autoplay
                                                mode='normal'
                                                style={{ width: '1.25rem', height: '1.25rem' }}
                                            ></lottie-player>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='text-sm text-blueGray-200'>Weekly Benefit</div>
                                        <div className='flex space-x-4'>
                                            <div className='rounded p-2 bg-gradient-to-tr from-blue-500 to-indigo-500'>
                                                <h3 className='text-xl font-bold text-white'>SELECTA20</h3>
                                                <span className='text-blueGray-200 text-xs'>Free Shipping Fee</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='absolute top-14 right-12'>
                            <div className='flex flex-col space-y-8 justify-between items-center'>
                                <div className='h-28 w-28'>
                                    <lottie-player
                                        id='medal'
                                        ref={ref}
                                        autoplay
                                        mode='normal'
                                        src='https://assets1.lottiefiles.com/packages/lf20_BCXrjU.json'
                                        style={{ width: 'auto', height: 'auto' }}
                                    ></lottie-player>
                                </div>
                                <h2 className='text-xl font-bold text-orange-500'>Gold Member</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-4'>
                    <div className='w-2/12'>
                        <ul className='flex flex-col space-y-2'>
                            <li className='p-2 bg-blueGray-100 rounded font-semibold text-blueGray-500'>
                                <Link href='/profile'>My Account</Link>
                            </li>
                            <li className='p-2 bg-blueGray-100 rounded text-blueGray-500'>
                                <Link href='/profile/my-orders'>My Order</Link>
                            </li>
                            <li className='p-2 bg-blueGray-100 rounded text-blueGray-500'>
                                <Link href='/profile/favorites'>Favorites</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-10/12'>
                        <div className='w-full h-full bg-blueGray-50 border border-blueGray-200 p-4 rounded-md flex flex-col'>
                            <span className='text-xl font-bold'>My Profile</span>
                            <span className='text-base font-normal text-blueGray-400'>Manage your account to control, protect, and secure your credentials</span>
                            <br />
                            <hr className='border border-blueGray-200' />
                            <br />
                            <div className='flex space-x-8 w-full items-center'>
                                <div className='w-9/12'>
                                    <div className='flex flex-col space-y-4 w-full'>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'>Username</div>
                                            <div className='w-10/12'>{user.username}</div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'>Name</div>
                                            <div className='w-10/12'>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    defaultValue={user.name}
                                                    id='name'
                                                    autoComplete='given-name'
                                                    className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-200 rounded-md'
                                                />
                                                {/* {user.name} */}
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'>Email</div>
                                            <div className='w-10/12'>{user.email}</div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'>Phone</div>
                                            <div className='w-10/12'>
                                                {/* {user.phone} */}
                                                <input
                                                    type='text'
                                                    name='phone'
                                                    id='phone'
                                                    defaultValue={user.phone}
                                                    autoComplete='phone'
                                                    className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-200 rounded-md'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'>Gender</div>
                                            <div className='w-10/12'>{user.gender.charAt(0).toUpperCase() + user.gender.substring(1)}</div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'>Date of Birth</div>
                                            <div className='w-10/12'>{user.dateOfBirth}</div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-2/12'></div>
                                            <div className='w-2/12'>
                                                <Button size='base' width='max' display='flex' type='primary' href={() => {}}>
                                                    Update Profile
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-3/12 flex items-center justify-center'>
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