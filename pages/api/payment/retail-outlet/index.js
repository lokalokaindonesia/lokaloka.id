import { RetailOutlet } from '@/config/xendit'
import axios from 'axios'

const ro = new RetailOutlet({})

export default async (req, res) => {
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data

        const resp = await ro.createFixedPaymentCode({
            externalID,
            retailOutletName: 'ALFAMART',
            name: 'Arza Aldi K',
            expectedAmt: 100000
        })

        return res.json(resp)
    } catch (error) {
        return res.status(401).json(error)
    }
}