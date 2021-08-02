import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@/redux/orderSlice'
export const store = configureStore({
    reducer: {
        order: orderSlice
    },
})