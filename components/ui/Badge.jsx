const Badge = ({ text, color }) => {
    const colors = {
        green: 'bg-green-100 text-green-500',
        orange: 'bg-orange-100 text-orange-500',
        red: 'bg-red-100 text-red-500',
    }
    return <div className={`px-1 text-xs lg:px-2 lg:py-1 font-semibold lg:text-xs 2xl:px-3 2xl:py-1 2xl:font-semibold w-max 2xl:text-sm rounded ${colors[color]}`}>{text}</div>
}

export default Badge
