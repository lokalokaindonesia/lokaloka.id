import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@/redux/orderSlice'
import filterSlice from '@/redux/filterSlice'
import productsSlice from './productsSlice'

export const store = configureStore({
    reducer: {
        order: orderSlice,
        products: productsSlice,
        filter: filterSlice,
    },
})