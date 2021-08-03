import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CheckIcon, ChevronRightIcon, SelectorIcon } from '@heroicons/react/solid'
import Layout from '@/components/layout/Layout'
import ProductCard from '@/components/product/ProductCard'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const people = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Tom Cook',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 5,
        name: 'Tanya Fox',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 6,
        name: 'Hellen Schmidt',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 7,
        name: 'Caroline Schultz',
        avatar: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 8,
        name: 'Mason Heaney',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 9,
        name: 'Claudie Smitham',
        avatar: 'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 10,
        name: 'Emil Schaefer',
        avatar: 'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const Category = ({ category, products }) => {
    const router = useRouter()
    const [selected, setSelected] = useState(people[3])

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
                <h1 className='text-2xl font-semibold text-blueGray-800 my-4'>{category.name}</h1>
                <div className='flex justify-between items-center'>
                    <p className='text-sm'>
                        <span>Found {products.length} items from </span> <span className='font-semibold'>"{category.name} Category"</span>
                    </p>
                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <div className='mt-1 relative w-56'>
                                    <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                                        <span className='flex items-center'>
                                            <img src={selected.avatar} alt='' className='flex-shrink-0 h-6 w-6 rounded-full' />
                                            <span className='ml-3 block truncate'>{selected.name}</span>
                                        </span>
                                        <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                            <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                        </span>
                                    </Listbox.Button>

                                    <Transition show={open} as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                                        <Listbox.Options
                                            static
                                            className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
                                        >
                                            {people.map((person) => (
                                                <Listbox.Option
                                                    key={person.id}
                                                    className={({ active }) =>
                                                        classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9')
                                                    }
                                                    value={person}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className='flex items-center'>
                                                                <img src={person.avatar} alt='' className='flex-shrink-0 h-6 w-6 rounded-full' />
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{person.name}</span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
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
                            </>
                        )}
                    </Listbox>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-4'>
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
        props: { category: data, products },
    }
}

export default Category
