const Badge = ({ text, color }) => {
    const colors = {
        green: 'bg-green-100 text-green-500',
        blue: 'bg-blue-100 text-blue-500',
        red: 'bg-red-100 text-red-500',
    }
    return <div className={`px-4 py-1 font-semibold w-max text-sm ${colors[color]}`}>{text}</div>
}

export default Badge
