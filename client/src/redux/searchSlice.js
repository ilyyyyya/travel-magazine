import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location: null,
    place: null,
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, action) => {
            state.type = action.payload.type
            state.place = action.payload.place
        },
    },
})

export const {search} = searchSlice.actions

export default searchSlice.reducer