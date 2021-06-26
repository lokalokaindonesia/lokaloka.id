import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Button from '@/components/Button'
import ProductItem from '@/components/ProductItem'

const HighlightedSection = ({ sectionTitle, href, data }) => {
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

                <Button type='secondary' size='md' href='#'>
                    <span>Show More</span>
                    <ArrowRightIcon className='h-5' />
                </Button>
            </div>

            {/* Product Item */}
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                {data.map(
                    (product, index) => (
                        <ProductItem
                            key={index}
                            slug={product.slug}
                            category={product.product_category.slug}
                            imgSrc={product.images[0].formats.medium.url}
                            productName={product.name}
                            price={product.sellingPrice}
                            discount={product.discount ? product.discount : null}
                            isRecommended={product.isRecommended}
                        />
                    )
                    // console.log(product.images[0].formats.thumbnail.url)
                )}
            </div>
        </div>
    )
}

export default HighlightedSection
