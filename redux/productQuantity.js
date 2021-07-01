import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quantity: 1,
}

export const productQuantitySlice = createSlice({
    name: 'productQuantity',
    initialState,
    reducers: {
        increment: (state) => {
            state.quantity += 1
        },
        decrement: (state) => {
            state.quantity -= 1
        },
    },
})

export const { increment, decrement } = productQuantitySlice.actions

export default productQuantitySlice.reducer