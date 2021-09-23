import Layout from '@/components/layout/Layout'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import axios from 'axios'
import ProductCard from '@/components/product/ProductCard'
import { useRouter } from 'next/router'

const index = ({ searchedProducts }) => {
    const router = useRouter()
    const query = router.query.s
    return (
        <Layout title='Search'>
            <div className='lg:container lg:mx-auto lg:px-4 2xl:px-0 lg:my-5 2xl:my-6'>
                <div className='w-full flex space-x-2 items-center lg:my-2 2xl:my-3'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800 font-bold hover:text-blueGray-800'>
                        <span>Search</span>
                    </div>
                </div>
                <h1 className='text-2xl font-semibold text-blueGray-800 lg:my-2 2xl:my-3 capitalize'>Search {query}</h1>
                <div className='flex justify-between items-center'>
                    <p className='text-sm'>
                        <span>Found {searchedProducts.length} product(s) from </span> <span className='font-semibold'>"{query}"</span>
                    </p>
                </div>
                <div className='flex space-x-8'>
                    <div className='w-full'>
                        {searchedProducts.length == 0 && (
                            <div className='flex justify-center items-center h-full'>
                                <div className='text-xl font-semibold text-blueGray-800'>Products not found</div>
                            </div>
                        )}
                        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-4 2xl:gap-8 mt-4'>
                            {searchedProducts.map((product, index) => (
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

export const getServerSideProps = async ({ query }) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?name_contains=${query.s}`)

    if (!data) {
        return {
            props: {
                searchedProducts: [],
            },
        }
    }

    return {
        props: {
            searchedProducts: data,
        },
    }
}

export default index
