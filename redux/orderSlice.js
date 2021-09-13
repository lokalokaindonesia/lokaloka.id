import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: undefined,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.value = action.payload
            localStorage.setItem('order', JSON.stringify(action.payload))
        }
    },
})

export const { setOrder } = orderSlice.actions

export default orderSlice.reducer