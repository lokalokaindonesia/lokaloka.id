export default async (req, res) => {
    const date = new Date()
    const id = `TRX_LK_${date.getDate()}${date.getMonth()}${date.getFullYear()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
    return res.json(id)
}