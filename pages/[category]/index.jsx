import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CheckIcon, ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '@/components/layout/Layout'
import ProductCard from '@/components/product/ProductCard'
import Button from '@/components/ui/Button'

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const Category = ({ category, productsData }) => {
    const filter = useSelector((state) => state.filter.value)

    const router = useRouter()
    const [selected, setSelected] = useState(filter[0])

    const products = productsData

    return (
        <Layout title={category.name}>
            <div className='container mx-auto my-6'>
                <div className='w-full flex space-x-2 items-center my-4'>
                    <div className='text-blue-700 hover:text-blue-800'>
                        <Link href='/'>Home</Link>
                    </div>
                    <ChevronRightIcon className='w-5 h-5' />
                    <div className='text-blueGray-800 font-bold hover:text-blueGray-800'>
                        <span>{category.name}</span>
                    </div>
                </div>
                <h1 className='text-2xl font-semibold text-blueGray-800 my-3'>{category.name}</h1>
                <div className='flex justify-between items-center'>
                    <p className='text-sm'>
                        <span>Found {products.length} items from </span> <span className='font-semibold'>"{category.name} Category"</span>
                    </p>
                </div>
                <div className='flex space-x-8'>
                    <div className=''>
                        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mt-4'>
                            {products.map((product, index) => (
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
                            ))}
                            {products.map((product, index) => (
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
                            ))}
                            {products.map((product, index) => (
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
                            ))}
                            {products.map((product, index) => (
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
                            ))}
                            {products.map((product, index) => (
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
                            ))}
                        </div>
                    </div>
                    <div className='mt-4 w-full max-w-xs'>
                        <div className='sticky top-28 flex flex-col space-y-4 border border-blueGray-200 bg-white drop-shadow-sm rounded-md p-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-semibold text-blueGray-700'>Filter</h1>
                                <span className='text-blueGray-400 underline'>Reset</span>
                            </div>
                            <hr />
                            {/* Sort By */}
                            <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                    <div className='flex flex-col space-y-2'>
                                        <Listbox.Label className='block font-medium text-blueGray-800'>Sort by</Listbox.Label>
                                        <div className='mt-1 relative w-full'>
                                            <Listbox.Button className='relative w-full bg-white border border-blueGray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'>
                                                <span className='flex items-center'>
                                                    <span className='block truncate'>{selected.value}</span>
                                                </span>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                                    <SelectorIcon className='h-5 w-5 text-blueGray-400' aria-hidden='true' />
                                                </span>
                                            </Listbox.Button>

                                            <Transition show={open} as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                                                <Listbox.Options
                                                    static
                                                    className='absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-blueGray-800 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
                                                >
                                                    {filter.map((filter) => (
                                                        <Listbox.Option
                                                            key={filter.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-blue-600' : 'text-blueGray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={filter}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <div className='flex items-center'>
                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                            {filter.value}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-blue-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </div>
                                )}
                            </Listbox>
                            <hr />
                            {/* Discount and Recommended */}
                            <div className='flex space-y-4 flex-col'>
                                <div className='flex items-center'>
                                    <div className='flex items-center h-5'>
                                        <input
                                            id='recommended'
                                            name='recommended'
                                            type='checkbox'
                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-blueGray-300 rounded'
                                        />
                                    </div>
                                    <div className='ml-3'>
                                        <label htmlFor='recommended' className='font-medium text-blueGray-800'>
                                            Recommended
                                        </label>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='flex items-center h-5'>
                                        <input id='discount' name='discount' type='checkbox' className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-blueGray-300 rounded' />
                                    </div>
                                    <div className='ml-3'>
                                        <label htmlFor='discount' className='font-medium text-blueGray-800'>
                                            Discount
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            {/* Price Range */}
                            <div className='flex space-x-4 items-center'>
                                <div className='w-full'>
                                    <label htmlFor='min' className='block text-sm font-medium text-blueGray-800'>
                                        Min
                                    </label>
                                    <input
                                        type='text'
                                        name='min'
                                        placeholder='Rp. 5.000'
                                        id='min'
                                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md'
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='max' className='block text-sm font-medium text-blueGray-800'>
                                        Max
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Rp. 200.000'
                                        name='max'
                                        id='max'
                                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            <hr />
                            <Button href={() => {}} type='secondary' width='full'>
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const res = await axios.get(`${process.env.NEXT_URL}/api/product-categories`)
    const categories = await res.data

    const paths = categories.map((category) => {
        return { params: { category: category.slug } }
    })

    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const res = await axios.get(`${process.env.NEXT_URL}/api/product-categories/${params.category}`)
    const data = await res.data

    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?product_category=${data.id}`)
    const products = await getProducts.data

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { category: data, productsData: products },
    }
}

export default Category
