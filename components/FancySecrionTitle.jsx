const FancySecrionTitle = ({ title }) => {
    return (
        <div className='relative bottom-3 xl:bottom-4'>
            <div className='absolute w-max h-auto bg-orange-500 px-2 left-1 -top-1'>
                <span className='text-lg md:text-xl xl:text-2xl font-bold  text-orange-500'>{title}</span>
            </div>
            <div className='absolute w-max h-auto bg-blue-400 px-2'>
                <span className='text-lg md:text-xl xl:text-2xl font-bold  text-white'>{title}</span>
            </div>
        </div>
    )
}

export default FancySecrionTitle