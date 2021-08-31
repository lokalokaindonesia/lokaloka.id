import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: {},
}

export const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { setPaymentMethod } = paymentMethodSlice.actions

export default paymentMethodSlice.reducer