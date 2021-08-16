const VariantBadge = ({ text }) => {
    return (
        <div className='rounded-md text-blueGray-800 border-2 border-blueGray-300 hover:text-white hover:border-blueGray-800 hover:bg-blueGray-800 cursor-pointer transition duration-100 ease-in px-4 text-center w-max'>
            {text}
        </div>
    )
}

export default VariantBadge
