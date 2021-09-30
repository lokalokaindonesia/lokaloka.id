import axios from "axios"
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)
export default async (req, res) => {
    try {
        // Run cors
        await cors(req, res)

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