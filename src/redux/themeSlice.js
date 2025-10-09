import { createSlice } from '@reduxjs/toolkit'

const savedMode = JSON.parse(localStorage.getItem('darkMode')) || false

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    dark: savedMode,
  },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark
      localStorage.setItem('darkMode', JSON.stringify(state.dark))
      document.documentElement.setAttribute('data-theme', state.dark ? 'dark' : 'light')
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
