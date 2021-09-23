import { ColorSwatchIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import PaymentGatewayFooter from './PaymentGatewayFooter'

const Footer = () => {
    return (
        <div className='text-blueGray-800'>
            <PaymentGatewayFooter />
            <div className='w-full h-auto bg-blueGray-200 py-12 '>
                <div className='container mx-auto px-4 2xl:container 2xl:mx-auto 2xl:px-0 grid lg:grid-flow-col lg:grid-cols-4 md:grid-flow-col md:grid-cols-4'>
                    {/* 1 */}
                    <div className='flex flex-col space-y-4'>
                        <ColorSwatchIcon className='h-16 w-16 text-blueGray-800' />
                        <div className='flex space-x-2 items-center'>
                            <a href='https://instagram.com/lokaloka.official' rel='noopener' target='_blank'>
                                <div className='h-8 w-8'>
                                    <Image alt='Instagram Account' src='/images/social-media/instagram.png' layout='responsive' width={38} height={38} />
                                </div>
                            </a>
                            <a href='https://facebook.com/lokaloka.id' rel='noopener' target='_blank'>
                                <div className='h-8 w-8'>
                                    <Image alt='Facebook Account' src='/images/social-media/facebook.png' layout='responsive' width={38} height={38} />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* 2 */}
                    <ul className='flex flex-col space-y-4'>
                        <li className='text-xl font-bold mb-2'>Useful Links</li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                About
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Blog
                            </Link>
                        </li>
                    </ul>

                    {/* 3 */}
                    <ul className='flex flex-col space-y-4'>
                        <li className='text-xl font-bold mb-2'>Services</li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Affiliate City
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Expedition
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <a className='underline lg:no-underline cursor-pointer' href='https://kuloaja.com' rel='noopener' target='_blank'>
                                Courier by KULO
                            </a>
                        </li>
                    </ul>

                    {/* 4 */}
                    <ul className='flex flex-col space-y-4'>
                        <li className='text-xl font-bold mb-2'>Help and Guide</li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Privacy Policy
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Terms and Condition
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='w-full h-auto bg-blueGray-100 py-4 flex items-center justify-center'>
                &copy; Lokaloka, With ❤️ from &nbsp; <b>Lokaloka Group</b>
            </div>
        </div>
    )
}

export default Footer
