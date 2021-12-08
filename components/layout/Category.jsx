import Image from 'next/image'
import Link from 'next/link'
import food from '../../public/images/category/food.jpg'
import fashion from '../../public/images/category/fashion.jpg'
import craft from '../../public/images/category/craft.jpg'

const Category = () => {
    return (
        <div>
            {/* Category */}
            <div className='container mx-auto flex md:hidden space-x-4 md:space-x-8 px-4 xl:px-0 rounded-md justify-between items-center'>
                <Link href='/makanan-dan-minuman'>
                    <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-orange-400 h-auto rounded-md relative'>
                        <Image src={food} alt='kategori makanan dan minuman' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={3} />
                        <span className='absolute md:text-xl lg:text-3xl md:pb-5 lg:pb-8 bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                            Makanan & Minuman
                        </span>
                    </div>
                </Link>
                <Link href='/kerajinan'>
                    <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-orange-400 h-auto rounded-md relative'>
                        <Image src={craft} alt='kategori kerajinan' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={3} />
                        <span className='absolute md:text-xl lg:text-3xl md:pb-5 lg:pb-8 bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                            Kerajinan
                        </span>
                    </div>
                </Link>
                <Link href='/fashion'>
                    <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-orange-400 h-auto rounded-md relative'>
                        <Image src={fashion} alt='kategori fashion' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={3} />
                        <span className='absolute md:text-xl lg:text-3xl md:pb-5 lg:pb-8 bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                            Fashion
                        </span>
                    </div>
                </Link>
            </div>
            <div className='container mx-auto mt-8 hidden md:flex space-x-4 md:space-x-8 px-4 xl:px-0 rounded-md justify-between items-center'>
                <Link href='/makanan-dan-minuman'>
                    <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-orange-400 h-auto rounded-md relative'>
                        <Image src={food} alt='kategori makanan dan minuman' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={1.5} />
                        <span className='absolute md:text-xl lg:text-3xl md:pb-5 lg:pb-8 bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                            Makanan & Minuman
                        </span>
                    </div>
                </Link>
                <Link href='/kerajinan'>
                    <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-orange-400 h-auto rounded-md relative'>
                        <Image src={craft} alt='kategori kerajinan' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={1.5} />
                        <span className='absolute md:text-xl lg:text-3xl md:pb-5 lg:pb-8 bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                            Kerajinan
                        </span>
                    </div>
                </Link>
                <Link href='/fashion'>
                    <div className='cursor-pointer transition duration-300 ease-in-out hover:scale-105 w-1/3 bg-orange-400 h-auto rounded-md relative'>
                        <Image src={fashion} alt='kategori fashion' priority layout='responsive' objectFit='cover' className='rounded-md' width={4} height={1.5} />
                        <span className='absolute md:text-xl lg:text-3xl md:pb-5 lg:pb-8 bottom-0 text-xs bg-gradient-to-t from-blueGray-700 to-transparent w-full h-full flex justify-center items-end p-2 text-white rounded-md'>
                            Fashion
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Category
