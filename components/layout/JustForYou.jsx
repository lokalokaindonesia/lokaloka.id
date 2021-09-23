import ProductCard from '@/components/product/ProductCard'
import FancySectionTitle from '@/components/ui/FancySectionTitle'

const HighlightedSection = ({ sectionTitle, href, data }) => {
    return (
        <div className='w-full flex space-y-6 py-8 flex-col xl:px-4 2xl:px-0 2xl:container 2xl:mx-auto 2xl:py-16'>
            {/* Section Title */}
            <div className='flex w-full justify-between items-center mb-4'>
                <FancySectionTitle title={sectionTitle} />
            </div>

            {/* Product Item */}
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                {data.map((product, index) => (
                    <ProductCard
                        key={index}
                        slug={product.slug}
                        category={product.product_category.slug}
                        imgSrc={product.images[0].url}
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
