import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartProducts: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: async (state, action) => {
            state.cartProducts = action.payload
        },
    },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer