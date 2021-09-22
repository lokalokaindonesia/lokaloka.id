import axios from 'axios'
import Link from 'next/link'
import { ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import ProductCard from '@/components/product/ProductCard'
import Layout from '@/components/layout/Layout'
import { getSession } from 'next-auth/client'

const index = ({ favorites }) => {
    return (
        <Layout title='Special Promo'>
            <div className='container mx-auto my-6'>
                <div className='w-full flex space-x-2 items-center my-4'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/profile'>Profile</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800 font-bold hover:text-blueGray-800'>
                        <span>Favorites</span>
                    </div>
                </div>
                <h1 className='text-2xl font-semibold text-blueGray-800 my-3'>Favorites</h1>
                <div className='flex space-x-8'>
                    <div className='w-full'>
                        {favorites.length == 0 && (
                            <div className='flex justify-center items-center h-full'>
                                <div className='text-xl font-semibold text-blueGray-800'>Products not found</div>
                            </div>
                        )}
                        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-4'>
                            {favorites.map((product, index) => (
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

export const getServerSideProps = async (ctx) => {
    const session = await getSession({ ctx })
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
    })

    if (!data.favorites) {
        return {
            props: {
                favorites: [],
            },
        }
    }

    return {
        props: {
            favorites: data.favorites,
        },
    }
}

export default index
