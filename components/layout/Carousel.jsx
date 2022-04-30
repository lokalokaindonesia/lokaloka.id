import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import Image from 'next/image'
import janMobile from '../../public/images/desain-juragan-kondang/januari_lokaloka_pc.jpg'
import janDesktop from '../../public/images/desain-juragan-kondang/januari_lokaloka.jpg'
import desainKondangDesktop from '../../public/images/desain-juragan-kondang/banner_pc.jpg'
import desainkondangMobile from '../../public/images/desain-juragan-kondang/banner_mobile.jpg'
import myDsWeb from '../../public/images/banner/lebaran-promo/Lebaran02042022.jpg'
import myDsMobile from '../../public/images/banner/lebaran-promo/Lebaran02042022.jpg'
import banner1Web from '../../public/images/banner/lebaran-promo/Lebaranvibes042022.jpg'
import banner1Mobile from '../../public/images/banner/lebaran-promo/Lebaranvibes042022.jpg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const Carousel = () => {
    const itemLength = 1
    return (
        <>
            <div className='my-4 hidden lg:block md:my-8 px-4 md:px-12 lg:px-16 drop-shadow-lg container mx-auto'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    autoplay
                    loop={itemLength > 1 ? true : false}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                >
                    <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={myDsWeb} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={75} height={2} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                       <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                           <Image src={banner1Web} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={2} />
                       </div>
                   </SwiperSlide>
                    {/* <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={desainKondangDesktop} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={75} height={2} />
                        </div>
                    </SwiperSlide> */}
                </Swiper>
            </div>
            <div className='my-4 lg:hidden md:my-8 px-4 md:px-12 lg:px-16 drop-shadow-md container mx-auto'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    autoplay
                    loop={itemLength > 1 ? true : false}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                >
                    <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={myDsMobile} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={3} />
                        </div>
                    </SwiperSlide>
                     <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={banner1Mobile} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={3} />
                        </div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={newYearBanner} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={3} />
                        </div>
                    </SwiperSlide> */}
                </Swiper>
            </div>
        </>
    )
}

export default Carousel
