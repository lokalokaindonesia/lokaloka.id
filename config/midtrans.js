import Midtrans from 'midtrans-client'

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

module.exports = snap
