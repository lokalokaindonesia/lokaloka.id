import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@/redux/orderSlice'
import filterSlice from '@/redux/filterSlice'
import productsSlice from '@/redux/productsSlice'
import paymentMethodSlice from '@/redux/paymentMethod'

export const store = configureStore({
    reducer: {
        order: orderSlice,
        products: productsSlice,
        paymentMethod: paymentMethodSlice,
        filter: filterSlice,
    },
})