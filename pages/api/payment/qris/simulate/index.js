import { QrCode } from '@/config/xendit'
import axios from 'axios'

const qr = new QrCode({})

export default async (req, res) => {
    try {
        const resp = await qr.simulate({ externalID: 'TRX_LK_1082021-111246429' })
        return res.json(resp)
    } catch (error) {
        return res.status(error.status).json(error)
    }
}