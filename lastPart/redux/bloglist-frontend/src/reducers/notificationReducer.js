import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return null
    }
  },
})

export const setNotification = (message, type, seconds) => {
  return async dispatch => {
    dispatch(set({ message, type }))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { set, clear } = slice.actions
export default slice.reducer