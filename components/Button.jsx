import Link from 'next/link'
const Button = ({ children, type, size, href = '#', width = 'max', display = 'block' }) => {
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        base: 'px-4 py-1',
        md: 'px-6 py-2 text-md',
        lg: 'px-8 py-3 text-lg',
        xl: 'px-10 py-4 text-xl',
    }
    const types = {
        primary: `bg-blue-500 text-white font-bold transiton duration-300 ease-in-out hover:bg-blue-600`,
        secondary: `bg-blue-100 text-blue-500 font-bold transiton duration-300 ease-in-out hover:bg-blue-200`,
        tertiary: `bg-orange-500 text-white font-bold transiton duration-300 ease-in-out hover:bg-orange-600`,
        tertiaryAccent: `bg-orange-100 text-orange-500 font-bold transiton duration-300 ease-in-out hover:bg-orange-200`,
        logout: `bg-red-100 text-red-500 font-bold transiton duration-300 ease-in-out hover:bg-red-200`,
    }

    const widthStyle = {
        max: 'w-max',
        full: 'w-full',
    }

    const displayStyle = {
        flex: 'flex justify-between items-center space-x-8',
        block: 'text-center',
    }

    const pickedtype = types[type]
    const pickedSize = sizes[size]
    const pickedWidth = widthStyle[width]
    const pickedDisplay = displayStyle[display]

    return (
        <Link href={`${href}`}>
            <div className={`rounded-md ${pickedtype} ${pickedSize} ${pickedWidth} ${pickedDisplay}`}>{children}</div>
        </Link>
    )
}

export default Button
