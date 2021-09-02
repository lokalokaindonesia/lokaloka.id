import { QrCode } from '@/config/xendit'
import axios from 'axios'

const qr = new QrCode({})

export default async (req, res) => {
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data

        const resp = await qr.createCode({
            externalID,
            callbackURL: 'https://lokaloka-next.vercel.app/api/wh/payment/qrcode',
            type: 'DYNAMIC',
            amount: req.body.amount
        })

        return res.json(resp)
    } catch (error) {
        return res.status(error.status).json(error)
    }
}