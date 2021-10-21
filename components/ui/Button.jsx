import Link from 'next/link'
const Button = ({ children, type = 'primary', size = 'base', href, width = 'max', display = 'block', buttonType = 'button' }) => {
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        base: 'px-4 py-2',
        md: 'px-6 py-2 text-md',
        lg: 'px-8 py-3 text-lg',
        xl: 'px-10 py-4 text-xl',
        ghostSize: 'px-4 py-3',
    }
    const types = {
        primary: `rounded-md drop-shadow-sm bg-orange-500 text-white font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-orange-600`,
        secondary: `rounded-md drop-shadow-sm bg-orange-100 text-orange-500 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-orange-200`,
        tertiary: `rounded-md drop-shadow-sm bg-orange-500 text-white font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-orange-600`,
        tertiaryAccent: `rounded-md drop-shadow-sm bg-orange-100 text-orange-500 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-orange-200`,
        logout: `rounded-md drop-shadow-sm bg-red-100 text-red-500 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-red-200`,
        ghost: `rounded-md drop-shadow-sm border border-blueGray-200 bg-white text-blueGray-800 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-white`,
    }

    const widthStyles = {
        max: 'w-max',
        full: 'w-full',
    }

    const displayStyles = {
        flex: 'flex justify-between items-center space-x-8',
        block: 'text-center',
    }

    const pickedtype = types[type]
    const pickedSize = sizes[size]
    const pickedWidth = widthStyles[width]
    const pickedDisplay = displayStyles[display]

    return (
        <button type={buttonType} onClick={href} className={` ${pickedtype} ${pickedSize} ${pickedWidth} ${pickedDisplay}`}>
            {children}
        </button>
    )
}

export default Button
