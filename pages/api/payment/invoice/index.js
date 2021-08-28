import { Invoice } from '@/config/xendit'
import axios from 'axios';
const va = new Invoice();

export default async (req, res) => {
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data
        const resp = await va.createInvoice({
            externalID,
            amount: 230000,
            payerEmail: 'kampungvector@gmail.com',
            description: 'Test Invoice',
        });
        return res.json(resp)
    } catch (error) {
        return res.status(error.status).json(error)
    }
}
