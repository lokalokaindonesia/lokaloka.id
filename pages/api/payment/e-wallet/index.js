import axios from 'axios';
import { EWallet } from '@/config/xendit'
const ew = new EWallet({});

export default async (req, res) => {
    try {
        const getExternalID = await axios.get(`${process.env.NEXT_URL}/api/generatePaymentID`)
        const externalID = getExternalID.data

        const resp = await ew.createEWalletCharge({
            referenceID: externalID,
            currency: 'IDR',
            amount: 10000,
            checkoutMethod: 'ONE_TIME_PAYMENT',
            channelCode: 'ID_OVO',
            channelProperties: {
                mobileNumber: '+6285855518752'
            }
        });

        return res.json(resp)
    } catch (error) {
        return res.json(error)
    }
}