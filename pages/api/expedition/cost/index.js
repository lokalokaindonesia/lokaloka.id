import axios from "axios"
import request from 'request'

export default async (req, res) => {
    if (req.method != 'POST') return res.status(405).json('METHOD NOT ALLOWED')

    var options = {
        method: 'POST',
        url: 'https://api.rajaongkir.com/starter/cost',
        headers: { key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY, 'content-type': 'application/x-www-form-urlencoded' },
        form: { origin: '501', destination: '114', weight: 1700, courier: 'jne' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return res.json(body)
    })
    // try {
    //     const { data } = await axios.post(`${process.env.NEXT_PUBLIC_RAJA_ONGKIR_URL}/cost/`, req.body, {
    //         headers: {
    //             key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY,
    //         },
    //     })

    //     if (!data) {
    //         return res.json({ value: undefined })
    //     }

    //     return res.json(data.rajaongkir.results[0].costs[1].cost[0])
    // } catch (error) {
    //     return res.json(error)
    // }
}