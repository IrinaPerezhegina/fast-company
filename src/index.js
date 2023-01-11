import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App/App";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "react-router-dom";
import { createStore } from "./App/store/createStore";
import { Provider } from "react-redux";
import history from "./App/utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
);

reportWebVitals();
