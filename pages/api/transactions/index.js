import axios from "axios"
import { getSession } from "next-auth/client"

export default async (req, res) => {
    if (req.method == 'GET') {
        return res.json('METHOD NOT ALLOWED')
    }

    if (req.method == 'POST') {
        try {
            const session = await getSession({ req })

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, req.body, { headers: { Authorization: `Bearer ${session.jwt}` } })

            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }
}