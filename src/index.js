import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./components/redux/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <App />
            <Analytics />
        </Provider>
    </>
);
