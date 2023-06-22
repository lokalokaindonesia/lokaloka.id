// import { HomeIcon, SparklesIcon, UserIcon } from '@heroicons/react/solid'
import { HomeIcon, SparklesIcon, UserIcon } from '@heroicons/react/outline'
import BottomActiveLink from './BottomActiveLink'

const BottomMenuBar = () => {
    return (
        <div className='sticky bottom-0 md:hidden flex justify-between h-14 border border-slate-100 bg-white'>
            <div className='w-full h-full flex items-center justify-center'>
                <BottomActiveLink href='/'>
                    <div className='flex flex-col items-center justify-center text-sm'>
                        <HomeIcon className='w-6 h-6' />
                        {/* <span className='text-xs'>Home</span> */}
                    </div>
                </BottomActiveLink>
            </div>
            <div className='w-full h-full flex items-center justify-center'>
                <BottomActiveLink href='/specials/recommended'>
                    <div className='flex flex-col items-center justify-center text-sm'>
                        <SparklesIcon className='w-6 h-6' />
                        {/* <span className='text-xs'>Rekomendasi</span> */}
                    </div>
                </BottomActiveLink>
            </div>
            <div className='w-full h-full flex items-center justify-center'>
                <BottomActiveLink href='/profile/my-account'>
                    <div className='flex flex-col items-center justify-center text-sm'>
                        <UserIcon className='w-6 h-6' />
                        {/* <span className='text-xs'>Akun</span> */}
                    </div>
                </BottomActiveLink>
            </div>
        </div>
    )
}

export default BottomMenuBar
