const xendit = require('xendit-node');
const xConfig = new xendit({
    // ! Dev
    secretKey: process.env.XENDIT_KEY,
});

module.exports = xConfig