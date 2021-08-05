import axios from "axios"

export default async (req, res) => {
    const { data } = await axios.get(`${process.env.RAJA_ONGKIR_URL}/province`, {
        headers: {
            'key': process.env.RAJA_ONGKIR_API_KEY
        }
    })

    return res.json(data.rajaongkir.results)
}