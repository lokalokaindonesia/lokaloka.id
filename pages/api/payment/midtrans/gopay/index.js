import snap from "@/config/midtrans"
import axios from "axios"
import { getSession } from "next-auth/client"

export default async (req, res) => {
    const session = await getSession({ req })
    if (req.method != 'POST') {
        return res.status(405).json('METHOD NOT ALLOWED')
    }

    const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
    const externalID = getExternalID.data

    const data = {
        payment_type: "gopay",
        transaction_details: {
            gross_amount: req.body.amount,
            order_id: externalID,
        },
        gopay: {
            enable_callback: true,
            callback_url: `${process.env.NEXT_PUBLIC_API_CALLBACK}/api/wh/payment/gopay`
        },
        customer_details: {
            first_name: session.user.name,
            email: session.user.email,
        }
    }

    // const resp = await core.charge(data)

    const resp = await snap.createTransaction(data)

    return res.json({ resp, data })
}