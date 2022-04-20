import axios from 'axios'

export default async (req, res) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?product_category=${req.query.id}&_limit=6`)

    if (!data) {
        return res.json({ messages: 'no products' })
    }

    return res.json(data)
}
