import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@/redux/orderSlice'
import filterSlice from '@/redux/filterSlice'

export const store = configureStore({
    reducer: {
        order: orderSlice,
        filter: filterSlice,
    },
})