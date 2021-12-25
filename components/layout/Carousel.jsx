import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import Image from 'next/image'
import christmastBannerWeb from '../../public/images/banner/christmas-promo/christmas-web.jpg'
import christmastBannerMobile from '../../public/images/banner/christmas-promo/christmas-mobile.jpg'
import newYearBanner from '../../public/images/banner/new-year-promo/new-year-web.png'

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
                    {/* <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={newYearBanner} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={2} />
                        </div>
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={christmastBannerWeb} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={75} height={2} />
                        </div>
                    </SwiperSlide>
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
                            <Image src={christmastBannerMobile} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={3} />
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
