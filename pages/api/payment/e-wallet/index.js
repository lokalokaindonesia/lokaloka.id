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
            amount: req.body.amount,
            checkoutMethod: 'ONE_TIME_PAYMENT',
            channelCode: req.body.eWalletType,
            channelProperties: {
                mobileNumber?: req.body.phoneNumber,
                successRedirectURL?: req.body.successRedirectURL
            }
        });

        return res.json(resp)
    } catch (error) {
        return res.json(error)
    }
}