import Image from 'next/image'
import NumberFormat from 'react-number-format'
import Link from 'next/link'

const ProductCard = ({ imgSrc, category, productName, price, discount, isRecommended = false, slug }) => {
    const sellingPrice = price - (price * discount) / 100
    const isDiscount = discount == 0 ? false : true

    return (
        <Link href={`/${category}/${slug}`}>
            <button className='drop-shadow-sm w-full flex flex-col space-y-1 justify-start bg-white ring-1 ring-blueGray-200 hover:bg-blue-100 transition ease-in-out duration-300 rounded-md'>
                {/* Product Image */}
                <div className='w-full'>
                    <Image
                        className='rounded-t-md transition ease-in-out duration-300 aspect-w-3 aspect-h-4'
                        title={productName}
                        alt={productName}
                        src={imgSrc}
                        width={4}
                        height={5}
                        layout='responsive'
                        priority
                        objectFit='cover'
                        quality={75}
                    />
                </div>
                <div className='flex flex-col space-y-1 p-2'>
                    <span className='line-clamp-2 text-base font-normal text-left leading-snug'>{productName}</span>
                    <div className='flex flex-col items-start space-y-1 leading-snug pb-1'>
                        <NumberFormat
                            value={isDiscount ? sellingPrice : price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                            className='text-sm xl:font-semibold 2xl:font-bold text-orange-500'
                        />
                        {isDiscount && (
                            <div className='flex space-x-4 items-center'>
                                <NumberFormat
                                    value={price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                    className='text-xs font-normal text-blueGray-500 line-through'
                                />
                                <NumberFormat
                                    value={discount}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'% off'}
                                    className='text-xs font-normal px-1 rounded text-white bg-red-500'
                                />
                            </div>
                        )}
                    </div>
                    <div className={isRecommended ? 'px-2 py-1 bg-green-100 text-xs font-bold text-green-500 w-max rounded' : 'hidden'}>Recommended</div>
                </div>
            </button>
        </Link>
    )
}

export default ProductCard
