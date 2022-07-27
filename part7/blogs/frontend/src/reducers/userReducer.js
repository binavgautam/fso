import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    console.log(users);
    dispatch(setUsers(users));
  };
};
