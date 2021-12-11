const VariantBadge = ({ text }) => {
    return (
        <div className='rounded-md text-slate-800 border-2 border-slate-300 hover:text-white hover:border-slate-800 hover:bg-slate-800 cursor-pointer transition duration-100 ease-in px-4 text-center w-max'>
            {text}
        </div>
    )
}

export default VariantBadge
