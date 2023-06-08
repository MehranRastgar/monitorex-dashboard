import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addToCartApi,
    checkSignIn,
    fetchClient,
    PutUserApi,
    reduceFromCartApi,
    requestSms,
    signIn,
} from "../api/clientApi";

import type { AppState, AppThunk } from "../store";
import { ContainerFormMapType } from "src/atomic/molecules/forms/FormFormik";
export interface FormikState {
    FormDataInit?: object;
    FormData?: object;
    FormMap?: ContainerFormMapType[]
}


const initialState: FormikState = {
    // FormDataInit: {},
    // FormData: {},
    // FormMap: []
};

export const formikSlice = createSlice({
    name: "chart",
    initialState,

    reducers: {
        setFormikState: (state, action: PayloadAction<FormikState>) => {
            state = action.payload;
        },
        setFormikDataInit: (state, action: PayloadAction<object>) => {
            state.FormDataInit = action.payload;
        },
        setFormData: (state, action: PayloadAction<object>) => {
            state.FormData = action.payload;
        },
        setFormMap: (state, action: PayloadAction<ContainerFormMapType[]>) => {
            state.FormMap = action.payload;
        }
    },
});

export const selectFormDataInit = (state: AppState) => state.formik.FormDataInit;
export const selectFormData = (state: AppState) => state.formik.FormData;
export const selectFormMap = (state: AppState) => state.formik.FormMap;
export const { setFormikState, setFormikDataInit, setFormData, setFormMap } = formikSlice.actions;
export default formikSlice.reducer;
