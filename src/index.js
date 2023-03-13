// import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./components/redux/store/store";

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#013e87",
//         },
//         myCustomColor: {
//             main: red[400],
//             light: red[100],
//             dark: red[800],
//         },
//     },
//     typography: {
//         h1: {
//             fontSize: "3rem",
//             fontWeight: 600,
//         },
//         h2: {
//             fontSize: "1.75rem",
//             fontWeight: 600,
//         },
//     },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>
);
