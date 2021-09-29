import axios from "axios"

export default async (req, res) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product-categories`)
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}