import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import ProductItem from './ProductItem'

const HighlightedSection = ({ sectionTitle, href, data }) => {
    // console.log(products)
    return (
        <div className='w-full flex space-y-6 my-8 flex-col px-4 xl:container xl:mx-auto xl:my-12'>
            {/* Section Title */}
            <div className='flex w-full justify-between items-center'>
                <div className='relative bottom-3 xl:bottom-4'>
                    <div className='absolute w-auto h-auto bg-orange-500 px-2 left-1 -top-1'>
                        <span className='text-lg md:text-xl xl:text-2xl font-bold  text-orange-500'>{sectionTitle}</span>
                    </div>
                    <div className='absolute w-auto h-auto bg-blue-400 px-2'>
                        <span className='text-lg md:text-xl xl:text-2xl font-bold  text-white'>{sectionTitle}</span>
                    </div>
                </div>

                <Link href='#'>
                    <div className='cursor-pointer transition ease-in-out duration-300 px-3 py-1 text-sm xl:text-lg font-bold text-blue-500 flex space-x-2 xl:space-x-4 items-center bg-blue-100 hover:bg-blue-200'>
                        <span>Show More</span>
                        <ArrowRightIcon className='h-5' />
                    </div>
                </Link>
            </div>

            {/* Product Item */}
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                {data.map((product, index) => (
                    <ProductItem
                        key={index}
                        slug={product.slug}
                        imgSrc={product.thumbnail[0]}
                        productName={product.productName}
                        price={product.sellingPrice}
                        discount={product.discount ? product.discount : null}
                        isRecommended={product.isRecommended}
                    />
                ))}
            </div>
        </div>
    )
}

export default HighlightedSection
