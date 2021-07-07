import axios from "axios"

export default async (req, res) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product-categories?slug_eq=${req.query.slug}`)
    return res.json(data[0])
}