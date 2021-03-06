import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import heroImage from '../../public/images/hero-images-min.jpg'

const Hero = () => {
    const router = useRouter()

    return (
        <div className='bg-blue-50 h-max py-32 flex items-center'>
            <div className='flex justify-between items-center flex-row-reverse container mx-auto px-4 md:px-12 lg:px-16'>
                <div className='md:w-3/4 xl:w-2/4 filter drop-shadow-2xl'>
                    <Image src={heroImage} layout='responsive' objectFit='cover' alt="Let's go Shopping" priority />
                </div>
                <div className='w-full flex flex-col space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16'>
                    <div className='flex space-x-2 items-center'>
                        {/* <SparklesIcon className='h-5 w-5 md:h-6 md:w-6 xl:h-8 xl:w-8 text-red-500' />
                        <span className='text-lg md:text-lg xl:text-2xl font-bold text-red-500'>Promo 10.10</span> */}
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <h1 className='text-2xl md:text-4xl xl:text-6xl font-extrabold text-blue-500 font-display filter drop-shadow leading-normal md:leading-none capitalize'>
                            Jangan lewatkan promo spesial DISKON 10%
                        </h1>
                        <span className='text-blue-500'>*Untuk setiap pembelian</span>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <p className='text-sm md:text-base xl:text-xl font-normal text-slate-700 filter drop-shadow'>
                            Beli oleh-oleh <b>secara mudah dan cepat !!!</b>
                        </p>
                        <p className='text-sm md:text-base xl:text-xl font-normal text-slate-700 filter drop-shadow'>
                            Pesan <b>Sekarang</b>, dapatkan <b>keuntungan</b> untuk liburanmu.
                        </p>
                    </div>
                    <div className='hidden md:block'>
                        <Button size='lg' type='primary' display='flex' width='max' href={() => router.push(`#scrollToHere`)}>
                            <span className=''>Beli oleh-oleh</span>
                            <ArrowRightIcon className='h-5' />
                        </Button>
                    </div>
                    <div className='block md:hidden'>
                        <Button size='base' type='primary' display='flex' width='max' href={() => router.push(`#scrollToHere`)}>
                            <span className=''>Beli oleh-oleh</span>
                            <ArrowRightIcon className='h-5' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
