import axios from 'axios'
import cookie from 'cookie'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json('Method not Allowed')
    }

    const session = await getSession({ req })
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`
            }
        })

        return res.status(200).json(data)
    } catch (error) {
        return res.json(error)
    }
}