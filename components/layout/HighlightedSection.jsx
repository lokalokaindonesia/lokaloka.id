import { ArrowRightIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('@/components/product/ProductCard'))
import FancySectionTitle from '@/components/ui/FancySectionTitle'

const HighlightedSection = ({ sectionTitle, href, data, bgColor = '' }) => {
    const router = useRouter()
    return (
        <div className={`${bgColor} relative`}>
            <div className='w-full flex space-y-4 my-4 md:py-0 py-4 flex-col container mx-auto px-4 2xl:px-0'>
                {/* Section Title */}
                <div className='flex lg:hidden w-full justify-between items-center'>
                    <FancySectionTitle title={sectionTitle} />

                    <Button size='sm' href={() => router.push(href)} type='tertiary' size='sm' display='flex' width='max'>
                        <span className='text-xs'>Lihat semua</span>
                        <ArrowRightIcon className='h-4' />
                    </Button>
                </div>
                <div className='hidden lg:flex w-full justify-between items-center'>
                    <FancySectionTitle title={sectionTitle} />

                    <Button href={() => router.push(href)} type='tertiary' size='sm' display='flex' width='max'>
                        <span>Lihat semua</span>
                        <ArrowRightIcon className='h-5' />
                    </Button>
                </div>

                {/* Product Item */}
                <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 2xl:gap-8'>
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
        </div>
    )
}

export default HighlightedSection
