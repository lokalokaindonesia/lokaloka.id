import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: [],
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorite: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { setFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer