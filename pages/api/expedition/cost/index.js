import axios from "axios"
import NextCors from "nextjs-cors";

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_RAJA_ONGKIR_URL}/cost`, req.body, {
        headers: {
            key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY
        }
    })

    if (!data) {
        return res.json({ value: undefined })
    }

    return res.json(data.rajaongkir.results[0].costs[1].cost[0])
}