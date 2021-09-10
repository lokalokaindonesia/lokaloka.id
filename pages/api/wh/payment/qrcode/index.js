import axios from "axios"

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json("Method not Allowed")
    }

    try {
        const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?code=${req.body.qr_code.external_id}`)

        const transaction = await getTransaction.data[0]
        if (!transaction) {
            return res.status(404).json('Not found')
        }
        const updateEWalletTransaction = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`,
            { paymentStatus: req.body.status }
        )
        const data = await updateEWalletTransaction.data

        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}