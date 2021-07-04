import Image from 'next/image'
import NumberFormat from 'react-number-format'
import Link from 'next/link'

const ProductItem = ({ imgSrc, category, productName, price, discount, isRecommended = false, slug }) => {
    const sellingPrice = price - (price * discount) / 100
    const isDiscount = discount == 0 ? false : true

    return (
        <Link href={`/${category}/${slug}`}>
            <div className='cursor-pointer hover:scale-95 shadow-sm w-full ring-1 ring-blueGray-200 hover:bg-blue-100 transition ease-in-out duration-300 rounded-md'>
                {/* Product Image */}
                <Image
                    className='rounded-t-md hover:scale-105 transition ease-in-out duration-300'
                    title={productName}
                    alt={productName}
                    src={imgSrc}
                    width={4}
                    height={5}
                    layout='responsive'
                    priority
                    objectFit='cover'
                />
                <div className='flex flex-col space-y-1 p-2'>
                    <a className='line-clamp-2 text-md font-medium text-blueGray-900 leading-snug'>{productName}</a>
                    <div className='flex justify-between items-center leading-loose'>
                        <NumberFormat
                            value={isDiscount ? sellingPrice : price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                            className='text-md font-extrabold text-blue-500'
                        />
                        {isDiscount && (
                            <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-xs font-normal text-red-500 line-through' />
                        )}
                    </div>
                    <div className={isRecommended ? 'px-2 py-1 bg-green-100 text-xs font-bold text-green-500 w-max' : 'hidden'}>Recommended</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem
