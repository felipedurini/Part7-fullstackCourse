import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        },
    },
})

export const { set } = slice.actions

export const setUser = (loggeduser) => (dispatch) => {
    dispatch(set(loggeduser))
}

export default slice.reducer
