import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { setOrder } = orderSlice.actions

export default orderSlice.reducer