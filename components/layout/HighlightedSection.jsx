import { ArrowRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import FancySecrionTitle from '@/components/ui/FancySecrionTitle'

const HighlightedSection = ({ sectionTitle, href, data }) => {
    const router = useRouter()
    return (
        <div className='w-full flex space-y-6 my-8 flex-col px-4 xl:container xl:mx-auto xl:my-12'>
            {/* Section Title */}
            <div className='flex w-full justify-between items-center'>
                <FancySecrionTitle title={sectionTitle} />

                <Button href={() => router.push(`/${sectionTitle.toLowerCase()}`)} type='secondary' size='md' display='flex' width='max'>
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
    )
}

export default HighlightedSection
