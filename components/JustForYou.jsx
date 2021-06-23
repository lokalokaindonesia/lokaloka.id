import ProductItem from '@/components/ProductItem'
import Button from '@/components/Button'

const HighlightedSection = ({ sectionTitle, href, data }) => {
    return (
        <div className='w-full flex space-y-6 my-8 flex-col px-4 xl:container xl:mx-auto xl:my-16'>
            {/* Section Title */}
            <div className='flex w-full justify-between items-center mb-4'>
                <div className='relative bottom-3 xl:bottom-4'>
                    <div className='absolute w-max h-auto bg-orange-500 px-2 left-1 -top-1'>
                        <span className='text-lg md:text-xl xl:text-2xl font-bold text-orange-500'>{sectionTitle}</span>
                    </div>
                    <div className='absolute w-max h-auto bg-blue-400 px-2'>
                        <span className='text-lg md:text-xl xl:text-2xl font-bold text-white'>{sectionTitle}</span>
                    </div>
                </div>
            </div>

            {/* Product Item */}
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                {data.map((product, index) => (
                    <ProductItem
                        key={index}
                        slug={product.slug}
                        imgSrc={product.images[0].formats.medium.url}
                        productName={product.name}
                        price={product.sellingPrice}
                        discount={product.discount ? product.discount : null}
                        isRecommended={product.isRecommended}
                    />
                ))}
            </div>
            <div className='w-full flex justify-center items-center'>
                <Button href='#' size='lg' type='secondary'>
                    Load More
                </Button>
            </div>
        </div>
    )
}

export default HighlightedSection
