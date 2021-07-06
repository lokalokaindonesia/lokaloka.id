import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state) => {
            state.cart
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        increment: (state, action) => {
            const index = state.cart.findIndex(item => {
                return item.id === action.payload.id
            })
            state.cart[index].quantity = action.payload.quantity
        },
        decrement: (state, action) => {
            state.cart -= 1
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setCart, removeCart, getCart } = cartSlice.actions

export default cartSlice.reducer