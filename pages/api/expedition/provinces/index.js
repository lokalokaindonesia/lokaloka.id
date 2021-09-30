import axios from "axios"
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        origin: '*',
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async (req, res) => {
    try {
        // Run cors
        await cors(req, res)

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_RAJA_ONGKIR_URL}/province`, {
            headers: {
                'key': process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY
            }
        })

        return res.status(201).json(data.rajaongkir.results)
    } catch ({ message }) {
        return res.status(400).json(message)
    }
}