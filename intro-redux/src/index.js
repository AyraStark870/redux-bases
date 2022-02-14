import React from "react";
import ReactDOM from "react-dom";
import App, { reducer } from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { asyncMiddleware } from "./App";

const store = createStore(reducer, applyMiddleware(asyncMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
