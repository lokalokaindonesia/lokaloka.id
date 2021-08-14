import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@/redux/orderSlice'
import blurDataSlice from './blurDataSlice'

export const store = configureStore({
    reducer: {
        order: orderSlice,
        blurData: blurDataSlice
    },
})