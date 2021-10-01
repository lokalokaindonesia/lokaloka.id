import { useSession } from 'next-auth/client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const MemberCard = ({ user }) => {
    const [session, loading] = useSession()

    const ref = useRef(null)

    useEffect(() => {
        import('@lottiefiles/lottie-player')
    })

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
        <div>
            <div className='rounded-lg w-full'>
                <div className='relative'>
                    <div className='hidden px-4 md:px-0 md:block'>
                        <Image src='/images/account/member.png' className='rounded-lg shadow' layout='responsive' width={1680} height={295} priority objectFit='cover' />
                    </div>
                    <div className='static px-4 md:px-0 md:hidden'>
                        <Image src='/images/account/member.png' className='rounded-lg shadow' layout='responsive' width={5} height={2} priority objectFit='cover' />
                    </div>
                    <div className='absolute top-5 left-8 md:top-5 md:left-8 xl:top-8 xl:left-8 2xl:top-12 2xl:left-12'>
                        <div className='flex items-center space-x-2 md:space-x-8'>
                            {!session.user.image && (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${session.user.name}`}
                                    className='rounded-full w-16 h-16 md:w-20 xl:w-40 2xl:w-44 md:h-20 xl:h-40 2xl:h-44 shadow'
                                />
                            )}
                            {session.user.image && <img src={session.user.image} className='rounded-full md:w-20 xl:w-40 2xl:w-44 md:h-20 xl:h-40 2xl:h-44 shadow' />}
                            <div className='flex flex-col space-y-2 md:space-y-2 xl:space-y-6 2xl:space-y-8 h-full'>
                                <div className='flex space-x-4 items-center'>
                                    <span className='lg:text-xl xl:text-2xl font-bold text-white'>{user.name}</span>
                                    <div className='flex md:space-x-2 items-center px-1 md:px-2 md:py-1 md:bg-blue-500 rounded bg-opacity-50'>
                                        <span className='hidden md:block text-white text-xs'>Terverifikasi</span>
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
                                <div className='flex flex-col space-y-1 md:space-y-1 xl:space-y-2'>
                                    <div className='text-sm text-blueGray-200'>Keuntungan</div>
                                    <div className='flex space-x-4'>
                                        <div className='rounded md:p-1 xl:p-2 bg-gradient-to-tr from-blue-500 to-indigo-500'>
                                            <h3 className='p-1 md:text-sm lg:text-lg xl:text-xl font-bold text-white'>SELECTA20</h3>
                                            <span className='hidden lg:block text-blueGray-200 text-xs'>Gratis biaya pengiriman</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:absolute md:block md:top-4 md:right-8 xl:top-9 xl:right-8 2xl:top-14 2xl:right-12'>
                        <div className='flex flex-col md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-8 justify-between items-center'>
                            <div className='md:w-20 md:h-20 xl:h-24 xl:w-24'>
                                <lottie-player
                                    id='medal'
                                    ref={ref}
                                    autoplay
                                    mode='normal'
                                    src='https://assets1.lottiefiles.com/packages/lf20_BCXrjU.json'
                                    style={{ width: 'auto', height: 'auto' }}
                                ></lottie-player>
                            </div>
                            <h2 className='md:hidden lg:block lg:text-lg xl:text-xl font-bold text-orange-500'>Member Gold</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberCard
