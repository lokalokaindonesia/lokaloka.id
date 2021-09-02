import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: undefined,
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransaction: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setTransaction } = transactionSlice.actions

export default transactionSlice.reducer