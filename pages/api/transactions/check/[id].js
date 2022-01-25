import axios from "axios"
import { getSession } from "next-auth/client"

export default async (req, res) => {
    if (req.method == 'GET') {
        try {
            const session = await getSession({ req })
            const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${req.query.id}`, {
                headers: {
                    Authorization: `Bearer ${session.jwt}`
                }
            })
            const transaction = await getTransaction.data

            return res.json(transaction)
        } catch (error) {
            return res.json(error)
        }
    }
}