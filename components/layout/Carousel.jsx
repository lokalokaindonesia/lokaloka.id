import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import banner from '../../public/images/banner/banner.png'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const Carousel = () => {
    return (
        <div className='my-4 md:my-8 px-4 xl:px-0 container mx-auto'>
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
                    <div className='w-full h-full cursor-pointer bg-blueGray-600 rounded-md'>
                        <Image src={banner} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' width={1320} priority quality={100} height={250} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full h-full cursor-pointer bg-blueGray-600 rounded-md'>
                        <Image src={banner} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' width={1320} priority quality={100} height={250} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full h-full cursor-pointer bg-blueGray-600 rounded-md'>
                        <Image src={banner} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' width={1320} priority quality={100} height={250} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full h-full cursor-pointer bg-blueGray-600 rounded-md'>
                        <Image src={banner} alt='Promo' className='rounded-md' placeholder='blur' layout='responsive' width={1320} priority quality={100} height={250} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Carousel
