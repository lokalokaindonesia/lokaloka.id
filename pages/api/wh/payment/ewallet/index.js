import axios from "axios"

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json("Method not Allowed")
    }

    try {
        const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?code=${req.body.data.reference_id}`)

        const transaction = await getTransaction.data[0]

        const updateEWalletTransaction = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`,
            { paymentStatus: req.body.data.status }
        )
        const data = await updateEWalletTransaction.data

        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}