import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SensorWebsocketRealTimeDataType } from "../../components/pages/sensors/sensorsTable";
import { AppState } from "../store";

interface socketsSl {
  socketIds: string[] | null;
  sensorSocketData: SensorWebsocketRealTimeDataType[];
  socketObj: socketObType;
}

interface socketObType {
  [key: string]: SensorWebsocketRealTimeDataType;
}

const initialState: socketsSl = {
  socketIds: null,
  sensorSocketData: [],
  socketObj: {},
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketIds: (state, action) => {
      state.socketIds = action.payload;
    },
    setSocketDatas: (state, action) => {
      state.sensorSocketData = action.payload;
    },
    addNewRecordToSocket: (
      state,
      action: PayloadAction<SensorWebsocketRealTimeDataType>
    ) => {
      let arr: socketObType = { ...state.socketObj };
      arr = {
        ...arr,
        [action.payload.sensorId]: action.payload,
      };
      state.socketObj = arr;
    },
  },
});

export const { setSocketIds, setSocketDatas, addNewRecordToSocket } =
  socketSlice.actions;

export const selectSocketDatas = (state: AppState) =>
  state.socket.sensorSocketData;
export const selectSocketObject = (state: AppState) => state.socket.socketObj;
export default socketSlice.reducer;
