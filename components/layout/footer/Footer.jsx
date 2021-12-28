import { ColorSwatchIcon, LocationMarkerIcon, MailIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import PaymentGatewayFooter from './PaymentGatewayFooter'
import Logo from '../../../public/logo.png'
import { FaFacebook, FaFacebookF, FaFacebookSquare, FaInstagram, FaInstagramSquare, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='text-slate-800 bg-white border-t'>
            {/* <PaymentGatewayFooter /> */}
            <div className='w-full h-auto py-8 md:py-12 container mx-auto px-4 md:px-12 lg:px-16 flex flex-col space-y-4 md:flex-row md:space-y-0 md:justify-between'>
                <div className='flex flex-col space-y-1 md:space-y-3'>
                    <h4 className='text-base md:underline md:decoration-blue-400 md:decoration-2 font-bold'>Hubungi Kami</h4>
                    <div className='flex flex-col space-y-2 text-xs md:text-sm'>
                        <span className='flex space-x-2 items-center'>
                            <LocationMarkerIcon className='w-4 h-4' />
                            <a
                                href='https://www.google.com/maps/search/+Jl.+Pangeran+Diponegoro+No.5,+RT.02%2FRW.02,+Tulungrejo,+Kec.+Bumiaji,+Kota+Batu,+Jawa+Timur+65336/@-7.8230066,112.5275527,17z/data=!3m1!4b1'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Jl. Pangeran Diponegoro No.5, 02/02, Tulungrejo, Bumiaji, Kota Batu, 65336
                            </a>
                        </span>
                        <span className='flex space-x-2 items-center'>
                            <MailIcon className='w-4 h-4' />
                            <a href='mailto:indonesialokaloka@gmail.com'>indonesialokaloka@gmail.com</a>
                        </span>
                        <span className='flex space-x-2 items-center'>
                            <FaWhatsapp className='w-4 h-4' />
                            <a href='wa.me/+62813355008005'>081335008005 (Chat only)</a>
                        </span>
                    </div>
                </div>
                <div className='flex flex-col space-y-1 md:space-y-3'>
                    <h4 className='text-base md:underline md:decoration-blue-400 md:decoration-2 font-bold'>Ikuti Kami</h4>
                    <div className='flex flex-col space-y-2 text-xs md:text-sm'>
                        <span className='flex space-x-2 items-center'>
                            <FaFacebookSquare className='w-4 h-4' />
                            <a href='https://facebook.com/Lokaloka-103240051730770' target='_blank' rel='noopener noreferrer'>
                                Lokaloka
                            </a>
                        </span>
                        <span className='flex space-x-2 items-center'>
                            <FaInstagram className='w-4 h-4' />
                            <a href='https://instagram.com/lokaloa.official' target='_blank' rel='noopener noreferrer'>
                                Lokaloka Official
                            </a>
                        </span>
                    </div>
                </div>
                <div className='flex flex-col space-y-1 md:space-y-3'>
                    <h4 className='text-base md:underline md:decoration-blue-400 md:decoration-2 font-bold'>Metode Pembayaran</h4>
                    <div className='grid grid-cols-4 gap-1 text-xs md:text-sm'>
                        <div className='h-auto w-16'>
                            <Image
                                alt='BNI Virtual Account'
                                src='/images/payment-gateway/bni.png'
                                layout='responsive'
                                objectFit='contain'
                                width={3}
                                height={1}
                                quality={75}
                                priority
                            />
                        </div>
                        <div className='h-auto w-16'>
                            <Image
                                alt='BRI Virtual Account'
                                src='/images/payment-gateway/briva.png'
                                layout='responsive'
                                objectFit='contain'
                                width={3}
                                height={1}
                                quality={75}
                                priority
                            />
                        </div>
                        <div className='h-auto w-16 -mt-1'>
                            <Image
                                alt='Link Aja'
                                src='/images/payment-gateway/linkaja2.png'
                                layout='responsive'
                                objectFit='contain'
                                width={162}
                                height={65}
                                quality={75}
                                priority
                            />
                        </div>
                        <div className='h-auto w-16'>
                            <Image alt='Dana' src='/images/payment-gateway/dana2.png' layout='responsive' objectFit='contain' width={143} height={40} quality={75} priority />
                        </div>
                        <div className='h-auto w-16'>
                            <Image
                                alt='Permata Bank'
                                src='/images/payment-gateway/permatabank.png'
                                layout='responsive'
                                objectFit='contain'
                                width={186}
                                height={64}
                                quality={75}
                                priority
                            />
                        </div>
                        <div className='h-auto w-16 mt-1'>
                            <Image alt='QRIS' src='/images/payment-gateway/qris.png' layout='responsive' objectFit='contain' width={251} height={74} quality={75} priority />
                        </div>
                        <div className='h-auto w-16'>
                            <Image alt='Mandiri' src='/images/payment-gateway/mandiri.png' layout='responsive' objectFit='contain' width={202} height={64} quality={75} priority />
                        </div>
                        <div className='h-auto w-16 mt-1'>
                            <Image alt='GOPAY' src='/images/payment-gateway/gopay.png' layout='responsive' objectFit='contain' width={174} height={41} quality={75} priority />
                        </div>
                        <div className='h-auto w-16'>
                            <Image alt='OVO' src='/images/payment-gateway/ovo.png' layout='responsive' objectFit='contain' width={127} height={40} quality={75} priority />
                        </div>
                        {/* <div className='h-auto w-16'>
                            <Image
                                alt='ALFAMART'
                                src='/images/payment-gateway/alfamart.png'
                                layout='responsive'
                                objectFit='contain'
                                width={127}
                                height={40}
                                quality={75}
                                priority
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <div className='w-full h-auto text-sm md:text-base bg-slate-100 py-4 flex items-center justify-center'>
                Lokaloka &reg;, With ❤️ from &nbsp; <b>Lokaloka Group</b>
            </div> */}
        </div>
    )
}

export default Footer
