import axios from "axios"
import NextCors from "nextjs-cors";

export default async (req, res) => {
    try {
        // Run the cors middleware
        // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_RAJA_ONGKIR_URL}/cost`, req.body, {
            headers: {
                key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY
            }
        })

        if (!data) {
            return res.json({ value: undefined })
        }

        return res.json(data.rajaongkir.results[0].costs[1].cost[0])
    } catch (error) {
        return res.json(error)
    }
}