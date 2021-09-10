import { RetailOutlet } from '@/config/xendit'
import axios from 'axios'
import { getSession } from 'next-auth/client'

const ro = new RetailOutlet({})

export default async (req, res) => {
    try {
        const session = await getSession({ req })
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = await getExternalID.data

        const resp = await ro.createFixedPaymentCode({
            externalID,
            retailOutletName: req.body.retail,
            name: session.user.name,
            expectedAmt: req.body.amount,
            isSingleUse: true,
        })

        return res.json(resp)
    } catch (error) {
        return res.json(error)
    }
}