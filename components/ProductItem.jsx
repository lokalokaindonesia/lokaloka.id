import Image from 'next/image'
import NumberFormat from 'react-number-format'
import Link from 'next/link'

const ProductItem = ({ imgSrc, productName, price, discount, isRecommended = false, slug }) => {
    const discountPrice = (price * discount) / 100
    const isDiscount = discount === null ? false : true

    return (
        <Link href={slug}>
            <div className='shadow-sm cursor-pointer w-full border border-gray-200 hover:bg-blue-100 transition ease-in-out duration-300'>
                {/* Product Image */}
                <Image src={imgSrc} width={255} height={340} layout='responsive' priority objectFit='cover' />
                <div className='flex flex-col space-y-1 p-2'>
                    <div className='line-clamp-2 text-md font-medium text-blueGray-900 leading-snug'>{productName}</div>
                    <div className='flex justify-between items-center leading-loose'>
                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} className='text-md font-extrabold text-blue-500' />
                        <NumberFormat
                            value={discountPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp. '}
                            className={isDiscount ? 'text-xs font-normal text-red-500 line-through' : 'hidden'}
                        />
                    </div>
                    <div className={isRecommended ? 'px-2 py-1 bg-green-100 text-xs font-bold text-green-500 w-max' : 'hidden'}>Recommended</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem
