import axios from "axios"
import { getSession } from "next-auth/client"

export default async (req, res) => {
    const session = await getSession({ req })
    const cart = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`)
    const data = await cart.data

    if (!data) {
        return res.json({ message: 'data not found' })
    }

    return res.json(data)
}