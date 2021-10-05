import { RetailOutlet } from '@/config/xendit'
import axios from 'axios'

const ro = new RetailOutlet({})

export default async (req, res) => {
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = await getExternalID.data

        const resp = await ro.createFixedPaymentCode({
            externalID,
            retailOutletName: req.body.retail,
            name: req.body.name,
            expectedAmt: req.body.amount,
            isSingleUse: true,
        })

        return res.json(resp)
    } catch (error) {
        return res.status(500).json(error)
    }
}