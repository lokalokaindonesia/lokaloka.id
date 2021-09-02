import { Invoice } from '@/config/xendit'
import axios from 'axios';
import { getSession } from 'next-auth/client';
const va = new Invoice();

export default async (req, res) => {
    const session = getSession({ req })
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data
        const resp = await va.createInvoice({
            externalID,
            amount: 230000,
            payerEmail: session.email,
            description: 'Order Products',
        });
        return res.json(resp)
    } catch (error) {
        return res.status(error.status).json(error)
    }
}
