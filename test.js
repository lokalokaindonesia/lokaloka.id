const goodCustomers = (customer) => {
    if (!customer.isVerified) return console.log('visitor')

    if (customer.isMember && customer.hasPhone) return console.log('best customer')

    if (customer.hasPhone) return console.log('good customer')

    return console.log('kinda customer')
}

goodCustomers({
    isVerified: true,
    hasPhone: true,
    isMember: true
})