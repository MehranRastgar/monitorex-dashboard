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
export interface ChartState {
  chartSettings: chartSettingsType;
}

export interface chartSettingsType {
  theme: "dark" | "white" | "creame";
  garanularity: number;
}

const initialState: ChartState = {
  chartSettings: {
    garanularity: 1,
    theme: "dark",
  },
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,

  reducers: {
    setChartSettings: (state, action: PayloadAction<chartSettingsType>) => {
      state.chartSettings = action.payload;
    },
  },
});

export const selectChartSettings = (state: AppState) => state.user.signInFlag;
export const { setChartSettings } = chartSlice.actions;
export default chartSlice.reducer;
