import axios from "axios"

export default async (req, res) => {
    try {
        const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?code=${req.body.data.reference_id}`)

        const transaction = await getTransaction.data[0]
        if (!transaction) {
            return res.status(404)
        }

        const updateEWalletTransaction = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`,
            { paymentStatus: req.body.data.status }
        )
        const data = await updateEWalletTransaction.data

        if (!data) {
            return res.status(404).json('data not found')
        }

        return res.json(data)
    } catch (error) {
        return res.status(400).json(error)
    }
}