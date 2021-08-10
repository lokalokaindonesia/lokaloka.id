import axios from "axios"

export default async (req, res) => {
    const { data } = await axios.post(`${process.env.RAJA_ONGKIR_URL}/cost`, {
        origin: process.env.RAJA_ONGKIR_ORIGIN,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: process.env.RAJA_ONGKIR_COURIER
    }, {
        headers: {
            key: process.env.RAJA_ONGKIR_API_KEY
        }
    })

    return res.json(data.rajaongkir.results[0].costs[1].cost[0])
}