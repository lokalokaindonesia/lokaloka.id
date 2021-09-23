import axios from 'axios'
import Link from 'next/link'
import { ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import ProductCard from '@/components/product/ProductCard'
import Layout from '@/components/layout/Layout'

const index = ({ recommendeds }) => {
    return (
        <Layout title='Special Promo'>
            <div className='container mx-auto lg:px-4 2xl:px-0 lg:my-5 2xl:my-6'>
                <div className='w-full flex space-x-2 items-center my-3'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800 font-bold hover:text-blueGray-800'>
                        <span>Recommended</span>
                    </div>
                </div>
                <h1 className='text-2xl font-semibold text-blueGray-800 xl:my-2 2xl:my-3'>Recommended</h1>
                <div className='flex space-x-8'>
                    <div className='w-full'>
                        {recommendeds.length == 0 && (
                            <div className='flex justify-center items-center h-full'>
                                <div className='text-xl font-semibold text-blueGray-800'>Products not found</div>
                            </div>
                        )}
                        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 lg:gap-4 2xl:gap-8 mt-4'>
                            {recommendeds.map((product, index) => (
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
                    {/* Filter */}
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?isRecommended=true`)

    if (!data) {
        return {
            props: {
                recommendeds: [],
            },
        }
    }

    return {
        props: {
            recommendeds: data,
        },
    }
}

export default index
