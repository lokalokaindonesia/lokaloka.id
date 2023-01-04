import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";
import janMobile from "../../public/images/banner/lokalokaMagerMobile.jpg";
import janDesktop from "../../public/images/banner/lokalokaalfa.png";
import coverMobile from "../../public/images/banner/coverAndroid.jpg";
import coverDesktop from "../../public/images/banner/coverWeb.jpg";
import comboHotelDesktop from "../../public/images/banner/ComboHotelWeb.jpg";
import comboHotelAndroid from "../../public/images/banner/ComboHotelAndroid.jpg";

import myDsWeb from "../../public/images/banner/valentine/ValentineWeb.png";
import myDsMobile from "../../public/images/banner/valentine/ValentineMobile.png";
import samaraDesktop from "../../public/images/banner/samarahotel.jpg";
import samaraMobile from "../../public/images/banner/samaraMobile.jpg";
import zamzamDesktop from "../../public/images/banner/zamzam.jpg";
import zamzamMobile from "../../public/images/banner/zamzamAndroid.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Carousel = () => {
  const itemLength = 1;
  return (
    <>
      <div className="my-4 hidden lg:block md:my-8 px-4 md:px-12 lg:px-16 drop-shadow-lg container mx-auto">
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
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={comboHotelDesktop}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={2}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={coverDesktop}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={2}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={janDesktop}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={2}
              />
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
                        <div className='w-full h-full cursor-pointer bg-slate-600 rounded-md'>
                            <Image src={myDsWeb} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={75} height={2} />
                        </div>
                    </SwiperSlide> */}

          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={samaraDesktop}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={75}
                height={2}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={zamzamDesktop}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={75}
                height={2}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="my-4 lg:hidden md:my-8 px-4 md:px-12 lg:px-16 drop-shadow-md container mx-auto">
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
                            <Image src={myDsMobile} alt='Promo' className='rounded-md' layout='responsive' width={6} priority quality={100} height={3} />
                        </div>
                    </SwiperSlide>  */}
          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={comboHotelAndroid}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={3}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={coverMobile}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={3}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={janMobile}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={3}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={samaraMobile}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={3}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full cursor-pointer bg-slate-600 rounded-md">
              <Image
                src={zamzamMobile}
                alt="Promo"
                className="rounded-md"
                layout="responsive"
                width={6}
                priority
                quality={100}
                height={3}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
