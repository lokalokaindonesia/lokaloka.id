import axios from "axios"

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json("Method not Allowed")
    }

    try {
        const getTransaction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions?code=${req.body.external_id}`)

        const transaction = await getTransaction.data[0]

        const updateInvoiceTransaction = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transaction.id}`,
            { paymentStatus: req.body.status }
        )
        const data = await updateInvoiceTransaction.data

        return res.json(data)
    } catch (error) {
        return res.status(400).json(error)
    }
}