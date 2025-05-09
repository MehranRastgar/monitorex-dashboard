import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../store";
import type { PropertyProperty } from "../../types/types";
import { SensorsReceiveTpe } from "../../components/pages/sensors/sensorsTable";
import { fetchSensors } from "../api/sensorsApi";

export type ApiFetchStatus = "initial" | "request" | "rejected" | "success";

export interface Sensors {
  data?: SensorsReceiveTpe[];
  selectedSensor?: SensorsReceiveTpe[];
  status: ApiFetchStatus;
  sensorHasWork: number;
  sensorHasNotWork: number;
}

const initialState: Sensors = {
  data: [],
  sensorHasWork: 0,
  sensorHasNotWork: 0,
  status: "initial",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchSensorsAsync = createAsyncThunk(
  "sensors/fetchSensors",
  async () => {
    const response = await fetchSensors();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSensorsData: (state, action: PayloadAction<SensorsReceiveTpe[]>) => {
      state.data = action.payload;
      let number = 0;
      action.payload?.map((item) => {
        if (item?.sensorLastSerie?.timestamp !== undefined) {
          const timedate = new Date(item?.sensorLastSerie?.timestamp);
          const now = new Date();
          const dif = now.getTime() - timedate.getTime();
          if (dif / 1000 / 60 < 15) number++;
        }
      });
      state.sensorHasWork = number;
      state.sensorHasNotWork = state?.data?.length - number;
    },
    setSensorsStatus: (state, action: PayloadAction<ApiFetchStatus>) => {
      state.status = action.payload;
    },

    setSelectedSensor: (state, action: PayloadAction<SensorsReceiveTpe[]>) => {
      state.selectedSensor = action.payload;
    },
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

  extraReducers: (builder) => {
    builder
      .addCase(fetchSensorsAsync.pending, (state) => {
        state.status = "request";
      })
      .addCase(fetchSensorsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        // state.categories = action?.payload?.[index] ?? [];
      })
      .addCase(fetchSensorsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.data = [];
      });
  },
});

export const { setSensorsData, setSelectedSensor, setSensorsStatus } =
  sensorsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSensorsData = (state: AppState) => state.sensors.data;
export const selectSensorsStatus = (state: AppState) => state.sensors.status;
export const selectSelectedSensors = (state: AppState) =>
  state.sensors.selectedSensor;
export const selectSensorsLength = (state: AppState) =>
  state.sensors.data?.length;
export const selectSensorsHasWork = (state: AppState) =>
  state.sensors.sensorHasWork;

export const selectSensorsHasNotWork = (state: AppState) =>
  state.sensors.sensorHasNotWork;
// export const selectUserInfo = (state: AppState) => state.client.value;
// We can also write thunks by hand, which may contain both sync and async logi c.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default sensorsSlice.reducer;
