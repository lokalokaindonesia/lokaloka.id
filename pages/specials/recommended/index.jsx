import axios from 'axios'
import Link from 'next/link'
import { ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('@/components/product/ProductCard'))
import Layout from '@/components/layout/Layout'

const index = ({ recommendeds }) => {
    return (
        <Layout title='Produk Rekomendasi Lokaloka'>
            <div className='container mx-auto px-4 2xl:px-0 my-4 md:my-5 2xl:my-6'>
                <div className='w-full hidden md:flex space-x-2 items-center my-3'>
                    <div className='text-orange-700 hover:text-orange-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-slate-800 font-bold hover:text-slate-800'>
                        <span>Rekomendasi</span>
                    </div>
                </div>
                <h1 className='text-lg md:text-2xl font-semibold text-slate-800 xl:my-2 2xl:my-3'>Rekomendasi</h1>
                <div className='flex space-x-8'>
                    <div className='w-full'>
                        {recommendeds.length == 0 && (
                            <div className='flex justify-center items-center h-full'>
                                <div className='text-base md:text-xl font-semibold'>Produk tidak ditemukan</div>
                            </div>
                        )}
                        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-8 mt-4'>
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
