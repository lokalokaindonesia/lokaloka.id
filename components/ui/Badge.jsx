const Badge = ({ text, color }) => {
    const colors = {
        green: 'bg-green-100 text-green-500',
        orange: 'bg-orange-100 text-orange-500',
        red: 'bg-red-100 text-red-500',
    }
    return <div className={`px-2 py-1 text-xs font-semibold 2xl:font-semibold w-max rounded ${colors[color]}`}>{text}</div>
}

export default Badge
