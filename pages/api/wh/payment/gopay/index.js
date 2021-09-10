import axios from "axios"

export default async (req, res) => {
    try {
        const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?code=${req.query.order_id}`)

        const transaction = await getTransaction.data[0]

        const updateEWalletTransaction = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`,
            { paymentStatus: req.query.result.toUpperCase() }
        )
        const data = await updateEWalletTransaction.data

        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}