import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifMessage(state, action) {
      state.message = action.payload
    },
    clearNotifMessage(state, action) {
      state.message = ''
    }
  }
})

export const { setNotifMessage, clearNotifMessage } = notificationSlice.actions

export const setNotification = (message, timeInSeconds) => {
  return dispatch => {
    dispatch(setNotifMessage(message))
    setTimeout(() => {
      dispatch(clearNotifMessage())
    }, timeInSeconds*1000)
  }
}

export default notificationSlice.reducer