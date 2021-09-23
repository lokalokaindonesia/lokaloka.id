const Badge = ({ text, color }) => {
    const colors = {
        green: 'bg-green-100 text-green-500',
        blue: 'bg-blue-100 text-blue-500',
        red: 'bg-red-100 text-red-500',
    }
    return <div className={`xl:px-2 xl:py-1 xl:font-semibold xl:text-xs 2xl:px-3 2xl:py-1 2xl:font-semibold w-max 2xl:text-sm rounded ${colors[color]}`}>{text}</div>
}

export default Badge
