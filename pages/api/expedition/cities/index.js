import axios from "axios"

export default async (req, res) => {
    try {
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