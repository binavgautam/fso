import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      state = {
        message: action.payload.message,
        type: action.payload.type,
      };
      return state;
    },
    clear() {
      return initialState;
    },
  },
});

export default notificationSlice.reducer;
export const { set, clear } = notificationSlice.actions;

export const setNotification = (message, type = "success") => {
  return async (dispatch) => {
    dispatch(set({ message, type }));
    setTimeout(() => {
      dispatch(clear());
    }, 1000);
  };
};
