import { useSelector } from 'react-redux'

const index = () => {
    const paymentMethod = useSelector((state) => state.paymentMethod.value)
    console.log(paymentMethod)
    return <div>{paymentMethod.bank_code}</div>
}

export default index
