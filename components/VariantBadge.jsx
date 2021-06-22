const VariantBadge = ({ text }) => {
    return (
        <div className='text-blueGray-800 border-2 border-blueGray-800 hover:text-white hover:bg-blueGray-800 cursor-pointer transition duration-100 ease-in px-4 text-center w-max'>
            {text}
        </div>
    )
}

export default VariantBadge
