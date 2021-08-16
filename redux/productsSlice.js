import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: [],
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer