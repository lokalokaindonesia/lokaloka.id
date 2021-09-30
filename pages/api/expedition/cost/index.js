import axios from "axios"

export default async (req, res) => {
    if (req.method != 'POST') return res.status(405).json('METHOD NOT ALLOWED')
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_RAJA_ONGKIR_URL}/cost/`, req.body, {
            headers: {
                key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY,
            },
        })

        if (!data) {
            return res.json({ value: undefined })
        }

        return res.json(data.rajaongkir.results[0].costs[1].cost[0])
    } catch (error) {
        return res.json(error)
    }
}