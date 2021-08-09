import axios from "axios"

export default async (req, res) => {
    try {
        const { data } = await axios.get(`${process.env.RAJA_ONGKIR_URL}/province`, {
            headers: {
                'key': process.env.RAJA_ONGKIR_API_KEY
            }
        })

        return res.status(201).json(data.rajaongkir.results)
    } catch ({ message }) {
        return res.status(400).json(message)
    }
}