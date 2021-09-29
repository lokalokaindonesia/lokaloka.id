import { ColorSwatchIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import PaymentGatewayFooter from './PaymentGatewayFooter'
import Logo from '../../../public/logo.png'

const Footer = () => {
    return (
        <div className='text-blueGray-800'>
            <PaymentGatewayFooter />
            <div className='w-full h-auto bg-blueGray-200 py-8 md:py-12 '>
                <div className='container mx-auto px-4 2xl:px-0 grid lg:grid-flow-col lg:grid-cols-4 md:grid-flow-col md:grid-cols-4 gap-4 grid-cols-2'>
                    {/* 1 */}
                    <div className='flex flex-col space-y-4'>
                        <h1 className='block md:hidden lg:block text-xl md:text-2xl lg:text-4xl font-bold text-blue-500'>Lokaloka</h1>
                        <div className='hidden md:block lg:hidden md:w-10 md:h-10'>
                            <Image src={Logo} layout='responsive' quality={100} width={1} height={1} priority />
                        </div>
                        <div className='flex flex-col space-y-2 items-start text-sm md:text-base'>
                            <a href='https://instagram.com/lokaloka.official' className='flex space-x-2 items-center' rel='noopener' target='_blank'>
                                <div className='h-4 w-4 lg:h-5 lg:w-5'>
                                    <Image alt='Instagram Account' src='/images/social-media/instagram.png' layout='responsive' width={38} height={38} />
                                </div>
                                <span>@lokaloka.official</span>
                            </a>
                            <a href='https://facebook.com/lokalokaid.id' className='flex space-x-2 items-center' rel='noopener' target='_blank'>
                                <div className='h-4 w-4 lg:h-5 lg:w-5'>
                                    <Image alt='Facebook Account' src='/images/social-media/facebook.png' layout='responsive' width={38} height={38} />
                                </div>
                                <span>Lokaloka.id</span>
                            </a>
                        </div>
                    </div>

                    {/* 2 */}
                    <ul className='text-sm md:text-base flex flex-col space-y-2 md:space-y-4'>
                        <li className='font-bold md:mb-2'>Lokaloka</li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Tentang
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Blog
                            </Link>
                        </li>
                    </ul>

                    {/* 3 */}
                    <ul className='text-sm md:text-base flex flex-col space-y-2 md:space-y-4'>
                        <li className='font-bold md:mb-2'>Pelayanan</li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Kota Afiliasi
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Ekspedisi
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <a className='underline lg:no-underline cursor-pointer' href='https://kuloaja.com' rel='noopener' target='_blank'>
                                Kurir by KULO
                            </a>
                        </li>
                    </ul>

                    {/* 4 */}
                    <ul className='text-sm md:text-base flex flex-col space-y-2 md:space-y-4'>
                        <li className='font-bold md:mb-2'>Bantuan dan Panduan</li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Kebijakan Pribadi
                            </Link>
                        </li>
                        <li className='text-blueGray-600 hover:text-blueGray-700 underline'>
                            <Link className='underline lg:no-underline cursor-pointer' href='#'>
                                Syarat dan Ketentuan
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
