import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmin: false,
}

const adminSlice = createSlice({
  name: 'admin',

  initialState,

  reducers: {

    enableAdminMode(state) {
      state.isAdmin = true
    },

    disableAdminMode(state) {
      state.isAdmin = false
    },

    toggleAdminMode(state) {
      state.isAdmin = !state.isAdmin
    },

  },
})


export const {
  enableAdminMode,
  disableAdminMode,
  toggleAdminMode,
} = adminSlice.actions


export default adminSlice.reducer
