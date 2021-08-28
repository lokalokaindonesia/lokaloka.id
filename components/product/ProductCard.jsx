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
                        className='rounded-t-md transition ease-in-out duration-300'
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
                    <span className='line-clamp-2 text-sm font-medium text-left text-blueGray-900 leading-snug'>{productName}</span>
                    <div className='flex justify-between items-center leading-snug'>
                        <NumberFormat
                            value={isDiscount ? sellingPrice : price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                            className='font-extrabold text-blue-500'
                        />
                        {isDiscount && (
                            <NumberFormat
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp. '}
                                className='text-xs font-normal text-red-500 line-through leading-snug'
                            />
                        )}
                    </div>
                    <div className={isRecommended ? 'px-2 py-1 bg-green-100 text-xs font-bold text-green-500 w-max' : 'hidden'}>Recommended</div>
                </div>
            </button>
        </Link>
    )
}

export default ProductCard
