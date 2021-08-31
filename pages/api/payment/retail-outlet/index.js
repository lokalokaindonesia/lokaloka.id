import { RetailOutlet } from '@/config/xendit'
import axios from 'axios'
import { getSession } from 'next-auth/client'

const ro = new RetailOutlet({})

export default async (req, res) => {
    try {
        const session = await getSession({ req })
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data

        const resp = await ro.createFixedPaymentCode({
            externalID,
            retailOutletName: req.body.retail,
            name: session.name,
            expectedAmt: req.body.amount
        })

        return res.json(resp)
    } catch (error) {
        return res.status(401).json(error)
    }
}