import axios from "axios"
import { getSession } from "next-auth/client"

export default async (req, res) => {
    const session = await getSession({ req })
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts?user=${session.id}`, { headers: { Authorization: 'Bearer ' + session.jwt } })

    console.log(data)

    return res.json(data)
}