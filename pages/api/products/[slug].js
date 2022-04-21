import axios from 'axios'

export default async (req, res) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?slug=${req.query.slug}`)

    if (!data) {
        return res.status(404).json({ error: 'no entry' })
    }

    return res.json(data[0])
}
