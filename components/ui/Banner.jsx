/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
const Banner = ({ msg }) => {
    return (
        <div className='py-4 xl:container xl:mx-auto xl:px-4 2xl:px-0 bottom-0 sticky'>
            <div className='bg-gradient-to-r from-red-600 to-orange-600 rounded-md' id='banner'>
                <div className='px-3 py-3'>
                    <div className='flex items-center justify-between flex-wrap'>
                        <div className='w-0 flex-1 flex items-center'>
                            <span className='flex p-2 rounded-lg bg-red-800'>
                                <SpeakerphoneIcon className='h-6 w-6 text-white' aria-hidden='true' />
                            </span>
                            <p className='ml-3 font-medium text-white truncate'>
                                <span className='md:hidden'>{msg}</span>
                                <span className='hidden md:inline'>{msg}</span>
                            </p>
                        </div>
                        <div className='order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto'>
                            <a
                                href='#'
                                className='flex items-center justify-center px-4 py-2 border-2 border-white rounded-md shadow-sm text-sm font-bold text-white bg-transparent'
                            >
                                Learn more
                            </a>
                        </div>
                        {/* <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-3'>
                        <button type='button' className='-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'>
                            <span className='sr-only'>Dismiss</span>
                            <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                        </button>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
