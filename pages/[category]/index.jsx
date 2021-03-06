import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { CheckIcon, ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '@/components/layout/Layout'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import 'next-pagination/dist/index.css'
import Pagination from 'next-pagination'
const ProductCard = dynamic(() => import('@/components/product/ProductCard'))

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const Category = ({ category, products, page, productLength }) => {
    const filter = useSelector((state) => state.filter.value)

    const router = useRouter()

    const [price, setPrice] = useState(filter[0])
    const [recommended, setRecommended] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [params, setParams] = useState(price.query)

    useEffect(() => {
        setParams(price.query)
    }, [price])

    const recommendedHandle = (e) => {
        setRecommended(!recommended)
        if (!recommended) {
            return setParams(params.concat('&isRecommended=true'))
        }
        if (recommended) {
            return setParams(params.replace('&isRecommended=true', ''))
        }
    }

    const discountHandle = (e) => {
        setDiscount(!discount)
        if (!discount) {
            return setParams(params.concat('&discountGt=0'))
        }
        if (discount) {
            return setParams(params.replace('&discountGt=0', ''))
        }
    }

    const minPriceHandle = (e) => {
        if (e.target.value == '') return setParams(``)
        return setParams(`&sellingPriceGt=${e.target.value}`)
    }

    const maxPriceHandle = (e) => {
        if (e.target.value == '') return setParams(``)
        return setParams(`&sellingPriceLt=${e.target.value}`)
    }

    return (
        <Layout title={`${category.name} - Lokaloka`}>
            <div className='container mx-auto px-4 md:px-12 lg:px-16 my-4 md:my-5 2xl:my-6'>
                <div className='w-full hidden md:flex space-x-2 items-center my-3'>
                    <div className='text-orange-500 hover:text-orange-600'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5 text-slate-500' />
                    <div className='text-slate-800 font-bold hover:text-slate-800'>
                        <span>{category.name}</span>
                    </div>
                </div>
                <h1 className='text-lg md:text-2xl font-semibold text-slate-800 mb-2'>{category.name}</h1>
                <div className='flex justify-between items-center mb-4'>
                    <p className='text-xs md:text-sm'>
                        <span>{products.length} produk dari </span> <span className='font-semibold'>"Kategori {category.name}"</span>
                    </p>
                </div>
                <div className='flex flex-col-reverse space-y-4 md:flex-row md:space-y-0 md:space-x-8'>
                    <div className='w-full mt-4 md:mt-0 '>
                        {products.length == 0 && (
                            <div className='flex justify-center items-center h-full'>
                                <div className='text-xl font-semibold text-slate-800'>Produk tidak ada</div>
                            </div>
                        )}
                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-6 2xl:gap-8'>
                            {products.map((product, index) => (
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
                        <div className='flex space-x-4 mt-5 justify-between'>
                            <Pagination total={productLength} />
                        </div>
                    </div>
                    {/* Filter */}
                    {/* TODO: ! FILTER SUCKS */}
                    <div className='mt-4 md:w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/4 drop-shadow-sm'>
                        <div className='sticky md:top-28 flex flex-col space-y-2 2xl:space-y-4 border border-slate-200 bg-white rounded-md p-2 md:p-4'>
                            <details className='list-none'>
                                <summary className='list-none select-none'>
                                    <div className='flex justify-between items-center'>
                                        <h1 className='text-base md:text-lg 2xl:text-xl font-semibold text-slate-700'>Filter</h1>
                                    </div>
                                </summary>
                                <hr className='my-2' />
                                <div className='flex flex-col space-y-2 2xl:space-y-4'>
                                    {/* Sort By */}
                                    <Listbox value={price} onChange={setPrice}>
                                        {({ open }) => (
                                            <div className='flex flex-col xl:space-y-1 2xl:space-y-2'>
                                                <Listbox.Label className='text-sm 2xl:text-base block font-medium text-slate-800'>Urutkan</Listbox.Label>
                                                <div className='mt-1 relative w-full'>
                                                    <Listbox.Button className='relative w-full bg-white border border-slate-300 rounded-md shadow-sm pl-3 pr-10 py-1 2xl:py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm'>
                                                        <span className='flex items-center'>
                                                            <span className='block truncate text-sm md:text-base'>{price.value}</span>
                                                        </span>
                                                        <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                                            <SelectorIcon className='h-5 w-5 text-slate-400' aria-hidden='true' />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition show={open} as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                                                        <Listbox.Options
                                                            static
                                                            className='absolute md:text-base z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm ring-1 ring-slate-800 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
                                                        >
                                                            {filter.map((filter) => (
                                                                <Listbox.Option
                                                                    key={filter.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'text-white bg-orange-600' : 'text-slate-900',
                                                                            'cursor-default select-none relative md:py-1 2xl:py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={filter}
                                                                >
                                                                    {({ price, active }) => (
                                                                        <Fragment>
                                                                            <div className='flex items-center'>
                                                                                <span className={classNames(price ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {filter.value}
                                                                                </span>
                                                                            </div>
                                                                            {price ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? 'text-white' : 'text-orange-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                                                                </span>
                                                                            ) : null}
                                                                        </Fragment>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </div>
                                        )}
                                    </Listbox>
                                    {/* Discount and Recommended */}
                                    <div className='flex md:space-y-2 2xl:space-y-4 flex-col text-sm md:text-base'>
                                        <div className='flex items-center'>
                                            <div className='flex items-center'>
                                                <input
                                                    id='recommended'
                                                    name='recommended'
                                                    onChange={recommendedHandle}
                                                    type='checkbox'
                                                    className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-slate-300 rounded'
                                                />
                                            </div>
                                            <div className='ml-2 2xl:ml-3'>
                                                <label htmlFor='recommended' className='xl:text-sm 2xl:text-base font-medium text-slate-800'>
                                                    Rekomendasi
                                                </label>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='flex items-center'>
                                                <input
                                                    id='discount'
                                                    onChange={discountHandle}
                                                    name='discount'
                                                    type='checkbox'
                                                    className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-slate-300 rounded'
                                                />
                                            </div>
                                            <div className='ml-2 2xl:ml-3'>
                                                <label htmlFor='discount' className='xl:text-sm 2xl:text-base font-medium text-slate-800'>
                                                    Promo
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Price Range */}
                                    <div className='flex space-x-4 items-center text-sm md:text-base'>
                                        <div className='w-full'>
                                            <label htmlFor='min' className='block text-sm font-medium text-slate-800'>
                                                Min
                                            </label>
                                            <input
                                                type='text'
                                                name='min'
                                                onChange={minPriceHandle}
                                                placeholder='5.000'
                                                id='min'
                                                className='mt-1 text-xs py-1 xl:px-2 2xl:py-2 2xl:px-3 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor='max' className='block text-sm font-medium text-slate-800'>
                                                Maks
                                            </label>
                                            <input
                                                type='text'
                                                onChange={maxPriceHandle}
                                                placeholder='200.000'
                                                name='max'
                                                id='max'
                                                className='mt-1 text-xs py-1 xl:px-2 2xl:py-2 2xl:px-3 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md'
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        href={() => {
                                            router.push(`/${category.slug}?page=${+page}${params}`)
                                        }}
                                        width='full'
                                    >
                                        Filter
                                    </Button>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ params, query: { page = 1, sort = '', size = 20, isRecommended = '', discountGt = '', sellingPriceGt = '', sellingPriceLt = '' } }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product-categories?slug_eq=${params.category}`)
    const data = await res.data

    const IRQuery = isRecommended == '' ? '' : `&isRecommended=${isRecommended}`
    const DQuery = discountGt == '' ? '' : `&discount_gt=${discountGt}`
    const SPGTQuery = sellingPriceGt == '' ? '' : `&sellingPrice_gt=${sellingPriceGt}`
    const SPLTQuery = sellingPriceLt == '' ? '' : `&sellingPrice_lt=${sellingPriceLt}`
    const SORTQuery = sort == '' ? '' : `&_sort=sellingPrice:${sort}`
    const start = page ? size * (+page - 1) : 0

    const getProduct = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?product_category=${data[0].id}&_limit=${size}&_start=${start}${IRQuery}${DQuery}${SPGTQuery}${SPLTQuery}${SORTQuery}`
    )
    const productData = await getProduct.data

    const countProduct = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/count?product_category=${data[0].id}${IRQuery}${DQuery}${SPGTQuery}${SPLTQuery}${SORTQuery}`)
    const countData = await countProduct.data

    if (data.length === 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: { category: data[0], products: productData, page, productLength: countData },
    }
}

export default Category
