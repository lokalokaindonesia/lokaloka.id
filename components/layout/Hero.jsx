import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
const Hero = () => {
    const router = useRouter()
    const backgroundImage = {
        backgroundImage: 'url("./images/hero-images-min.jpg")',
        maxWidth: '100%',
        height: 'auto',
        position: 'relative',
        display: 'block',
        backgroundRepeat: 'no-repeat',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
    return (
        <div className='' style={backgroundImage}>
            <div className='w-full px-4 py-24 xl:container xl:mx-auto xl:py-52 flex flex-col space-y-12 md:space-y-14 xl:space-y-16'>
                <div className='flex flex-col space-y-4'>
                    <div className='flex space-x-2 items-center'>
                        <SparklesIcon className='h-5 w-5 md:h-6 md:w-6 xl:h-8 xl:w-8 text-red-500' />
                        <span className='text-lg md:text-xl xl:text-2xl font-bold text-red-500'>New Semester 2021/2022</span>
                    </div>
                    <h1 className='text-4xl md:text-5xl xl:text-6xl font-extrabold text-white filter drop-shadow'>Don't Waste Your</h1>
                    <h1 className='text-4xl md:text-5xl xl:text-6xl font-extrabold text-white filter drop-shadow'>Holiday Moment</h1>
                </div>
                <div className='flex flex-col space-y-2'>
                    <p className='text-base md:text-lg xl:text-xl font-normal text-white filter drop-shadow'>
                        Buy souvenirs no <b>need to bother</b> !!!
                    </p>
                    <p className='text-base md:text-lg xl:text-xl font-normal text-white filter drop-shadow'>
                        Order only at <b>Lokaloka</b>, take an <b>advantage</b> of your time for vacation.
                    </p>
                </div>
                <Button size='xl' type='primary' display='flex' width='max' href={() => router.push(`/`)}>
                    <span className=''>Show Now</span>
                    <ArrowRightIcon className='h-5' />
                </Button>
            </div>
        </div>
    )
}

export default Hero
