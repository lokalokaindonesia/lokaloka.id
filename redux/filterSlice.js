import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: [
        { id: 0, value: 'Default', query: '' },
        { id: 1, value: 'Harga terendah', query: '&sort=asc' },
        { id: 2, value: 'Harga tertinggi', query: '&sort=desc' },
    ],
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
