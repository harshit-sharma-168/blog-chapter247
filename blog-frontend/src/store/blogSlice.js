import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 blogs:[],
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog: (state, action) => {
        console.log('action', action);
        state.blogs = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setBlog } = blogSlice.actions

export default blogSlice.reducer