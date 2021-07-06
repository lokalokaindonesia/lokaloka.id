import ProductCard from '@/components/product/ProductCard'
import FancySecrionTitle from '@/components/ui/FancySecrionTitle'

const HighlightedSection = ({ sectionTitle, href, data }) => {
    return (
        <div className='w-full flex space-y-6 my-8 flex-col px-4 xl:container xl:mx-auto xl:my-16'>
            {/* Section Title */}
            <div className='flex w-full justify-between items-center mb-4'>
                <FancySecrionTitle title={sectionTitle} />
            </div>

            {/* Product Item */}
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                {data.map((product, index) => (
                    <ProductCard
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
        </div>
    )
}

export default HighlightedSection
