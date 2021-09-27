export default async (req, res) => {
    const date = new Date()
    const id = `TRX-LK-${date.getDate()}${date.getMonth()}${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
    return res.json(id)
}