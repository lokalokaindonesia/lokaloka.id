import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import Image from 'next/image'
import banner1 from '../../public/images/banner/banner1.jpg'
import banner2 from '../../public/images/banner/banner2.jpg'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const CarouselMobile = () => {
    return (
        <div className='my-4 lg:hidden md:my-8 px-4 2xl:px-0 container mx-auto'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                loop
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                centeredSlides={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                        <Image src={banner1} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' width={6} priority quality={100} height={3} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                        <Image src={banner2} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' width={6} priority quality={100} height={3} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default CarouselMobile
