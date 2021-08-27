import { ArrowRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import FancySectionTitle from '@/components/ui/FancySectionTitle'

const HighlightedSection = ({ sectionTitle, href, data, bgColor = '' }) => {
    const router = useRouter()
    return (
        <div className={`${bgColor} relative`}>
            <div className='w-full flex space-y-6 py-8 flex-col xl:container xl:mx-auto xl:py-10'>
                {/* Section Title */}
                <div className='flex w-full justify-between items-center'>
                    <FancySectionTitle title={sectionTitle} />

                    <Button href={() => router.push(`/${sectionTitle.toLowerCase()}`)} type='secondary' display='flex' width='max'>
                        <span>Show More</span>
                        <ArrowRightIcon className='h-5' />
                    </Button>
                </div>

                {/* Product Item */}
                <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8'>
                    {data.map(
                        (product, index) => (
                            <ProductCard
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
        </div>
    )
}

export default HighlightedSection
