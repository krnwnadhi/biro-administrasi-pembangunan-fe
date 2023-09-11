import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUserURL } from "../../../../utils/baseURL";
import secureLocalStorage from "react-secure-storage";

//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            const { data } = await axios.post(
                `${baseUserURL}/register`,
                user,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//login action
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            const { data } = await axios.post(
                `${baseUserURL}/login`,
                userData,
                config
            );
            // save to local storage
            secureLocalStorage.setItem("logInfo", JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get user from local storage and place it into the store
const userLoginFormStorage = secureLocalStorage.getItem("logInfo")
    ? JSON.parse(secureLocalStorage.getItem("logInfo"))
    : null;

//logout from local storage
export const logoutUserAction = createAsyncThunk(
    "user/logout",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            secureLocalStorage.removeItem("logInfo");
            // secureLocalStorage.removeItem("logInfo", JSON.stringify(userData));
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//slices
const usersSLices = createSlice({
    name: "users",
    initialState: {
        userAuth: userLoginFormStorage,
    },
    extraReducers: (builder) => {
        //register users
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.registered = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //login user
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = action?.payload;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //logout user
        builder.addCase(logoutUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(logoutUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default usersSLices.reducer;
