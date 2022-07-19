import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import unicafeReducer from "./reducers/unicafeReducer";
import { createStore } from "@reduxjs/toolkit";

const store = createStore(unicafeReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
