import Midtrans from 'midtrans-client'

let snap = new Midtrans.Snap({
    isProduction: process.env.NODE_ENV == 'development' ? false : true,
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

module.exports = snap
