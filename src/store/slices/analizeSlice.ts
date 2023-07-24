import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { SensorsReceiveTpe } from '../../components/pages/sensors/sensorsTable';
import { reportEb, reportSensors } from '../api/analizeApi';
import { DevicesReceiveType } from '../api/devicesApi';
import dayjs, { Dayjs } from 'dayjs';

import type { AppState } from '../store';
import { GroupItemType } from 'src/types/types';
// import { fetchCount } from './../counterAPI'

export interface AnalizeState {
  startDate?: string;
  endDate?: string;
  startDayjs?: string;
  endDayjs?: string;
  selectedDevices?: DevicesReceiveType[];
  selectedDeviceNumber?: number;
  statusApi: statusApiType;
  selectedSensors?: SensorsReceiveTpe[];
  sensorsReport?: SensorsReportType[];
  sensorsLiveData?: SensorsReportType[];
  ebReport?: EbReportType[],
  statusReportApi: statusApiType;
  statusEbReportApi: statusApiType;
  selectedGroup?: number; /////// 
  selectedGroupWhole?: GroupItemType;
  selectionType?: 'device' | 'group';
  TableColumns?: object[],
  TableDatas?: object[]
  granolarity?: number

}

export interface EbReportType {
  _id?: string;
  data?: DatumEb[];
}

export interface DatumEb {
  x?: Date;
  y?: Y;
}

export interface Y {
  byte1?: number;
  byte2?: number;
  byte3?: number;
}

export interface SensorsReportType {
  _id?: string;
  data?: Datum[];
  sensor?: SensorInReport;
  device: DevicesReceiveType;
  max?: number
  min?: number
  average?: number
}

export interface Datum {
  x?: string;
  y?: number;
}

export interface SensorInReport {
  title?: string;
  type?: string;
  unit?: string;
  maxAlarm?: number;
  minAlarm?: number;
  resolution?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

type statusApiType = 'idle' | 'loading' | 'success' | 'failed' | 'unauthorize';
const initialState: AnalizeState = {
  statusApi: 'idle',
  statusReportApi: 'idle',
  statusEbReportApi: 'idle',
  granolarity: 1
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const reportSensorsAsync = createAsyncThunk(
  'analize/reportSensors',

  async (report: { sensors: string[]; start: string; end: string }) => {
    const data = await reportSensors(report);
    // The value we return becomes the `fulfilled` action payload
    return data;
  },
);
export const reportEbAsync = createAsyncThunk(
  'analize/ebReport',

  async (report: { deviceId: string; start: string; end: string }) => {
    const data = await reportEb(report);
    // The value we return becomes the `fulfilled` action payload
    return data;
  },
);
export const analizeSlice = createSlice({
  name: 'analize',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSensorsLiveData: (state, action: PayloadAction<SensorsReportType[] | undefined>) => {
      state.sensorsLiveData = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<GroupItemType | undefined>) => {
      state.selectedGroupWhole = action.payload;
    },
    setSelectedGroupNumber: (state, action: PayloadAction<number | undefined>) => {
      state.selectedGroup = action.payload;
    },
    setTable: (state, action: PayloadAction<{ TableColumns: object[], TableDatas: object[] }>) => {
      state.TableColumns = action.payload.TableColumns;
      state.TableDatas = action.payload.TableDatas;
    },
    setSelectedDeviceNumber: (state, action: PayloadAction<number>) => {
      state.selectedDeviceNumber = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setSelectionType: (state, action: PayloadAction<'device' | 'group'>) => {
      state.selectionType = action.payload;
    },
    setStartDayjs: (state, action: PayloadAction<string>) => {
      state.startDayjs = action.payload;
    },
    setEndDayjs: (state, action: PayloadAction<string>) => {
      state.endDayjs = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setGranularity: (state, action: PayloadAction<number>) => {
      state.granolarity = action.payload;
    },
    setSelectedDevicesAnalize: (
      state,
      action: PayloadAction<DevicesReceiveType[]>,
    ) => {
      state.selectedDevices = action.payload;
    },
    setAnalizeApiStatus: (state, action: PayloadAction<statusApiType>) => {
      state.statusApi = action.payload;
    },
    setSelectedSensors: (state, action: PayloadAction<SensorsReceiveTpe[]>) => {
      state.selectedSensors = action.payload;
    },
    setSelectedSensorsAdvanced: (
      state,
      action: PayloadAction<SensorsReceiveTpe>,
    ) => {
      const index = state?.selectedSensors?.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (index !== undefined && index >= 0) {
        return;
      }
      const sens: SensorsReceiveTpe[] =
        state?.selectedSensors !== undefined ? [...state?.selectedSensors] : [];
      sens.push(action.payload);
      state.selectedSensors = sens;
    },
    addSelectedSensors: (state, action: PayloadAction<SensorsReceiveTpe>) => {
      const arr: SensorsReceiveTpe[] = [...(state?.selectedSensors ?? [])];
      if (arr.findIndex((item) => item._id === action.payload._id) < 0) {
        arr.push(action.payload);
      }
      state.selectedSensors = [...arr];
      state.selectedGroup = undefined;
    },
    removeSelectedSensors: (state, action: PayloadAction<string>) => {
      const arr: SensorsReceiveTpe[] = [];
      state?.selectedSensors?.map((sensor, index) => {
        if (sensor._id !== action.payload) {
          arr.push(sensor);
        }
      });
      state.selectedSensors = [...arr];
      state.selectedGroup = undefined;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

  extraReducers: (builder) => {
    builder
      .addCase(reportSensorsAsync.pending, (state) => {
        state.statusReportApi = 'loading';
        state.sensorsReport = []
      })
      .addCase(
        reportSensorsAsync.fulfilled,
        (state, action: PayloadAction<SensorsReportType[]>) => {
          state.sensorsReport = action.payload;
          state.statusReportApi = 'success';
          // if (action?.payload?.status < 400) {
          //   state.statusReportApi = "success";
          //   state.sensorsReport = action.payload.data as SensorsReportType[];
          // } else {
          //   state.statusReportApi = "failed";
          // }
        },
      )
      .addCase(
        reportSensorsAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.statusReportApi = 'failed';
          state.sensorsReport = undefined;
        },
      )
      //=========================================================
      .addCase(
        reportEbAsync.pending,
        (state, action: PayloadAction<any>) => {
          state.statusEbReportApi = 'loading';
          state.ebReport = undefined;
        },
      )
      .addCase(
        reportEbAsync.fulfilled,
        (state, action: PayloadAction<EbReportType[]>) => {
          state.statusEbReportApi = 'success';
          state.ebReport = action.payload;
        },
      )
      .addCase(
        reportEbAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.statusEbReportApi = 'failed';
          state.ebReport = undefined;
        },
      );
    //=========================================================

  },
});

export const {
  setSelectedGroupNumber,
  setSelectedDeviceNumber,
  setStartDayjs,
  setEndDayjs,
  setStartDate,
  setEndDate,
  setSelectedDevicesAnalize,
  addSelectedSensors,
  setSelectedSensors,
  removeSelectedSensors,
  setSelectionType,
  setSelectedSensorsAdvanced,
  setTable,
  setGranularity,
  setSelectedGroup,
  setSensorsLiveData
} = analizeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectStartDate = (state: AppState) => state.analize.startDate;
export const selectEndDate = (state: AppState) => state.analize.endDate;
export const selectSelectedDevicesAnalize = (state: AppState) =>
  state.analize.selectedDevices;
export const selectAnalizeApiStatus = (state: AppState) =>
  state.analize.statusApi;
export const selectSelectedSensorsAnalize = (state: AppState) =>
  state.analize.selectedSensors;
export const selectSensorReports = (state: AppState) =>
  state.analize.sensorsReport;
export const selectEbReports = (state: AppState) =>
  state.analize.ebReport;
export const selectSensorLiveData = (state: AppState) =>
  state.analize.sensorsLiveData;
export const selectStatusReportApi = (state: AppState) =>
  state.analize.statusReportApi;
export const selectStartDayjs = (state: AppState) => state.analize.startDayjs;
export const selectEndDayjs = (state: AppState) => state.analize.endDayjs;
export const selectGroupNumber = (state: AppState) =>
  state.analize.selectedGroup;
export const selectDeviceNumber = (state: AppState) =>
  state.analize.selectedDeviceNumber;
export const selectSelectionType = (state: AppState) =>
  state.analize.selectionType;
export const selectTableColumns = (state: AppState) =>
  state.analize.TableColumns;
export const selectTableDatas = (state: AppState) =>
  state.analize.TableDatas;
export const selectGranularity = (state: AppState) =>
  state.analize.granolarity;
export const selectSelectedGroup = (state: AppState) =>
  state.analize.selectedGroupWhole;
export const selectEbStatusApi = (state: AppState) =>
  state.analize.statusEbReportApi;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default analizeSlice.reducer;
