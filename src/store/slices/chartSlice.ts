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
  chartOptions: object;
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
  chartOptions: {}
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,

  reducers: {
    setChartSettings: (state, action: PayloadAction<chartSettingsType>) => {
      state.chartSettings = action.payload;
    },
    setChartOptions: (state, action: PayloadAction<object>) => {
      state.chartOptions = action.payload;
    }
  },

});

export const { setChartSettings, setChartOptions } = chartSlice.actions;
export const selectChartSettings = (state: AppState) => state.chart.chartSettings;
export const selectChartOptions = (state: AppState) => state.chart.chartOptions;




export default chartSlice.reducer;

