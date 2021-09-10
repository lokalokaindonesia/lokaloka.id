import core from "@/config/midtrans"
import axios from "axios"

export default async (req, res) => {
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data

        const resp = await core.charge({
            payment_type: "gopay",
            transaction_details: {
                gross_amount: req.body.amount,
                order_id: externalID,
            },
            gopay: {
                enable_callback: true,
                callback_url: `${process.env.NEXT_PUBLIC_API_CALLBACK}/api/wh/payment/gopay`
            }
        })

        return res.json(resp)
    } catch (error) {
        return res.json(error)
    }
}