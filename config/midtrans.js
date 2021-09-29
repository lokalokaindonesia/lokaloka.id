import Midtrans from 'midtrans-client'

let core = new Midtrans.CoreApi({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

module.exports = snap
