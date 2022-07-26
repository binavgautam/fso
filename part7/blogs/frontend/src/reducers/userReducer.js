import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogService";
import loginService from "../services/loginService";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log(action);
      return action.payload;
    },
    removeUser() {
      return null;
    },
    isUser(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser, isUser } = userSlice.actions;

export const login = (newUser) => {
  console.log("g");
  return async (dispatch) => {
    const user = await loginService.login(newUser);
    console.log(user);
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    blogService.tokenSetter(user.token);
    dispatch(setUser(user));
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(removeUser());
  };
};

export const loggedIn = () => {
  return (dispatch) => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const user = JSON.parse(loggedInUser);
    if (loggedInUser) {
      blogService.tokenSetter(user.token);
    }
    dispatch(isUser(user));
  };
};
