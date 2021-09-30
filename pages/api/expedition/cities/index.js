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

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_RAJA_ONGKIR_URL}/city`, {
            headers: {
                key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY
            }
        })

        return res.status(201).json(data.rajaongkir.results)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}