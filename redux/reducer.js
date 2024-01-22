// slices/visibilitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: {
    visible: false,
    mode:false
  },
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
    setMode :(state,action) =>{
      state.mode=action.payload
  }
  },
});

export const { setVisible,setMode } = visibilitySlice.actions;
export default visibilitySlice.reducer;
