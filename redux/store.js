import { configureStore } from '@reduxjs/toolkit'
import productQuantity from '@/redux/productQuantity'

export const store = configureStore({
    reducer: {
        productQuantity: productQuantity
    },
})