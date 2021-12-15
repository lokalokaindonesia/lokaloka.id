const Button = ({ children, disabled = false, type = 'primary', size = 'base', href, width = 'max', display = 'block', buttonType = 'button' }) => {
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        base: 'px-4 py-2',
        md: 'px-6 py-2 text-md',
        lg: 'px-8 py-3 text-lg',
        xl: 'px-10 py-4 text-xl',
        ghostSize: 'px-4 py-3',
    }
    const types = {
        primary: `rounded-md shadow-lg shadow-orange-500/30 bg-orange-500 text-white font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-orange-600`,
        secondary: `rounded-md shadow-lg shadow-orange-400/30 bg-orange-400 text-white font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-orange-400`,
        tertiary: `rounded-md shadow-lg shadow-orange-500/20 bg-white border-2 border-orange-500 text-orange-500 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:border-orange-600`,
        tertiaryAccent: `rounded-md shadow-lg shadow-blue-400/30 bg-white border border-blue-400 text-blue-400 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:border-blue-500`,
        logout: `rounded-md shadow-lg shadow-red-100/30 bg-red-100 text-red-500 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-red-200`,
        ghost: `rounded-md shadow-lg shadow-slate-500/30 border border-slate-200 bg-white text-slate-800 font-bold transiton duration-300 ease-in-out hover:scale-95 hover:bg-white`,
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
        <button
            disabled={disabled}
            type={buttonType}
            onClick={href}
            className={`${disabled && 'cursor-default'} ${
                disabled ? 'rounded-md drop-shadow-sm bg-slate-400 text-white font-bold' : pickedtype
            } ${pickedSize} ${pickedWidth} ${pickedDisplay}`}
        >
            {children}
        </button>
    )
}

export default Button
