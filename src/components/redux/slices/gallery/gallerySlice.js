import { baseGalleryURL, basePostURL } from "../../../../utils/baseURL";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

//action to redirect
const resetGalleryAction = createAction("gallery/add/reset");
const resetGalleryEditAction = createAction("gallery/edit/reset");
const resetGalleryDeleteAction = createAction("gallery/delete/reset");

//create action
export const createGalleryAction = createAsyncThunk(
    "gallery/created",
    async (gallery, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const formData = new FormData();
            formData.append("title", gallery?.title);
            // formData.append("images[]", gallery?.images);
            // for (let i = 0; i < gallery.length; i++) {
            //     formData.append("images[]", gallery[i].images);
            // }
            Array.from(gallery).forEach((item) => {
                formData.append("images[]", item);
            });

            const { data } = await axios.post(baseGalleryURL, formData, config);

            //dispatch action
            dispatch(resetGalleryAction());

            console.log(data);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch all gallery
export const fetchAllGalleryAction = createAsyncThunk(
    "gallery/fetchAll",
    async (gallery, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.get(`${baseGalleryURL}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch detail gallery action
export const fetchDetailGalleryAction = createAsyncThunk(
    "gallery/fetchDetailGallery",
    async (id, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.get(`${baseGalleryURL}/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//delete post action
export const deleteGalleryAction = createAsyncThunk(
    "gallery/deletePost",
    async (id, { rejectWithValue, getState, dispatch }) => {
        // get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };

        try {
            const { data } = await axios.delete(`${basePostURL}/${id}`, config);
            //dispatch
            dispatch(resetGalleryDeleteAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const gallerySlices = createSlice({
    name: "gallery",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(createGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        ////dispatch action add post
        builder.addCase(resetGalleryAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createGalleryAction.fulfilled, (state, action) => {
            state.galleryCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(createGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch all gallery
        builder.addCase(fetchAllGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllGalleryAction.fulfilled, (state, action) => {
            state.galleryList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchAllGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //fetch detail gallery
        builder.addCase(fetchDetailGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDetailGalleryAction.fulfilled, (state, action) => {
            state.galleryDetail = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(fetchDetailGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //delete gallery
        builder.addCase(deleteGalleryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetGalleryDeleteAction, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deleteGalleryAction.fulfilled, (state, action) => {
            state.galleryUpdated = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(deleteGalleryAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default gallerySlices.reducer;
