import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogsReducer";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: loginReducer,
    users: userReducer,
  },
});

export default store;
