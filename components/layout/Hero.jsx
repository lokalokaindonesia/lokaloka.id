import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import heroImage from '../../public/images/hero-images-min.jpg'

const Hero = () => {
    const router = useRouter()

    return (
        <div className=' bg-blue-50 h-max py-32 flex items-center'>
            <div className='flex justify-between items-center flex-row-reverse container mx-auto'>
                <div className='w-2/4 filter drop-shadow-2xl'>
                    <Image src={heroImage} layout='responsive' objectFit='cover' alt="Let's go Shopping" priority />
                </div>
                <div className='w-full px-4 xl:container xl:mx-auto flex flex-col space-y-12 md:space-y-14 xl:space-y-16'>
                    <div className='flex space-x-2 items-center'>
                        <SparklesIcon className='h-5 w-5 md:h-6 md:w-6 xl:h-8 xl:w-8 text-red-500' />
                        <span className='text-lg md:text-xl xl:text-2xl font-bold text-red-500'>New Semester 2021/2022</span>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <h1 className='text-4xl md:text-5xl xl:text-7xl font-extrabold text-blue-600 font-display filter drop-shadow'>Don't Waste Your</h1>
                        <h1 className='text-4xl md:text-5xl xl:text-7xl font-extrabold text-blue-600 font-display filter drop-shadow'>Holiday Moment</h1>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <p className='text-base md:text-lg xl:text-xl font-normal text-blueGray-700 filter drop-shadow'>
                            Buy souvenirs <b>with ease !!!</b>
                        </p>
                        <p className='text-base md:text-lg xl:text-xl font-normal text-blueGray-700 filter drop-shadow'>
                            Order at <b>Lokaloka</b>, take the <b>advantages</b> for your holiday.
                        </p>
                    </div>
                    <Button size='xl' type='primary' display='flex' width='max' href={() => router.push(`/`)}>
                        <span className=''>Get your package</span>
                        <ArrowRightIcon className='h-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
