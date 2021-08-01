import { ColorSwatchIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import PaymentGatewayFooter from './PaymentGatewayFooter'

const Footer = () => {
    return (
        <div>
            <PaymentGatewayFooter />
            <div className='w-full h-auto bg-gray-300 py-12 '>
                <div className='container mx-auto grid grid-flow-col grid-cols-4'>
                    {/* 1 */}
                    <div className='flex flex-col space-y-4'>
                        <ColorSwatchIcon className='h-16 w-16 text-blueGray-900' />
                        <div className='flex space-x-2 items-center'>
                            <a href='https://instagram.com/lokaloka.official' rel='noopener' target='_blank'>
                                <div className='h-8 w-8'>
                                    <Image alt='Instagram Account' src='/images/social-media/instagram.png' rel='noopener' layout='responsive' width={38} height={38} />
                                </div>
                            </a>
                            <a href='https://facebook.com/lokaloka.id' target='_blank'>
                                <div className='h-8 w-8'>
                                    <Image alt='Facebook Account' src='/images/social-media/facebook.png' layout='responsive' width={38} height={38} />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* 2 */}
                    <ul>
                        <li className='text-xl font-bold mb-2'>Useful Links</li>
                        <li>
                            <Link href='#'>
                                <div className='underline lg:no-underline cursor-pointer'>About</div>
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <div className='underline lg:no-underline cursor-pointer'>Blog</div>
                            </Link>
                        </li>
                    </ul>

                    {/* 3 */}
                    <ul>
                        <li className='text-xl font-bold mb-2'>Services</li>
                        <li>
                            <Link href='#'>
                                <div className='underline lg:no-underline cursor-pointer'>Affiliate City</div>
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <div className='underline lg:no-underline cursor-pointer'>Expedition</div>
                            </Link>
                        </li>
                        <li>
                            <a href='https://kuloaja.com' target='_blank'>
                                <div className='underline lg:no-underline cursor-pointer'>Courier by KULO</div>
                            </a>
                        </li>
                    </ul>

                    {/* 4 */}
                    <ul>
                        <li className='text-xl font-bold mb-2'>Help and Guide</li>
                        <li>
                            <Link href='#'>
                                <div className='underline lg:no-underline cursor-pointer'>Privacy Policy</div>
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <div className='underline lg:no-underline cursor-pointer'>Terms and Condition</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
