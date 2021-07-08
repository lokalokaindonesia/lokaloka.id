import axios from "axios"

export default async (req, res) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/coupons`)
    return res.json(data)
}