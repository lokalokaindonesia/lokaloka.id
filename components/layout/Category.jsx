import Image from 'next/image'
import Link from 'next/link'
// import food from '../../public/images/desain-juragan-kondang/fnb_icon.jpg'
// import fashion from '../../public/images/desain-juragan-kondang/fashion_icon.jpg'
// import craft from '../../public/images/desain-juragan-kondang/kerajinan_icon.jpg'
import food from '../../public/images/category/food.jpg'
import fashion from '../../public/images/category/fashion.jpg'
import craft from '../../public/images/category/craft.jpg'
import FancySectionTitle from '../ui/FancySectionTitle'

const Category = () => {
    return (
        <div className='container mx-auto px-4 md:px-12 lg:px-16 flex flex-col space-y-4'>
            {/* Category */}
            <FancySectionTitle title='Kategori' />
            <div className='drop-shadow grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 xl:gap-8 rounded-md'>
                <Link href='/makanan-dan-minuman'>
                    <div className='cursor-pointer grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-auto h-full rounded-md bg-white'>
                        <Image
                            src={food}
                            alt='kategori makanan dan minuman'
                            priority
                            layout='responsive'
                            objectFit='cover'
                            className='rounded-t-md md:rounded-l-md md:rounded-tr-none'
                            width={4}
                            quality={50}
                            height={2}
                        />
                        <span className='text-sm md:text-xl lg:text-2xl border border-slate-100 font-medium bottom-0 w-full h-auto flex items-center justify-start p-2 md:p-4 ld:p-6 text-slate-800 rounded-r-md'>
                            Makanan & Minuman
                        </span>
                    </div>
                </Link>
                <Link href='/kerajinan'>
                    <div className='cursor-pointer grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-auto h-full rounded-md bg-white'>
                        <Image
                            src={craft}
                            alt='kategori makanan dan minuman'
                            priority
                            layout='responsive'
                            objectFit='cover'
                            className='rounded-t-md md:rounded-l-md md:rounded-tr-none'
                            width={4}
                            quality={50}
                            height={2}
                        />
                        <span className='text-sm md:text-xl lg:text-2xl border border-slate-100 font-medium bottom-0 w-full h-auto flex items-center justify-start p-2 md:p-4 ld:p-6 text-slate-800 rounded-r-md'>
                            Kerajinan
                        </span>
                    </div>
                </Link>
                <Link href='/fashion'>
                    <div className='cursor-pointer grid grid-rows-2 md:grid-rows-none md:grid-cols-2 w-auto h-full rounded-md bg-white'>
                        <Image
                            src={fashion}
                            alt='kategori makanan dan minuman'
                            priority
                            layout='responsive'
                            objectFit='cover'
                            className='rounded-t-md md:rounded-l-md md:rounded-tr-none'
                            width={4}
                            quality={50}
                            height={2}
                        />
                        <span className='text-sm md:text-xl lg:text-2xl border border-slate-100 font-medium bottom-0 w-full h-auto flex items-center justify-start p-2 md:p-4 ld:p-6 text-slate-800 rounded-r-md'>
                            Fashion
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Category
