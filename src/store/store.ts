import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import clientReducer from "./slices/clientSlice";
import themeReducer from "./slices/themeSlice";
import settingsReducer from "./slices/settingsSlice";
import orderReducer from "./slices/orderSlice";
import sensorsReducer from "./slices/sensorsSlice";
import devicesReducer from "./slices/devicesSlice";
import analizeReducer from "./slices/analizeSlice";
import userReducer from "./slices/userSlice";
import chartReducer from "./slices/chartSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      sensors: sensorsReducer,
      counter: counterReducer,
      user: userReducer,
      client: clientReducer,
      theme: themeReducer,
      settings: settingsReducer,
      order: orderReducer,
      devices: devicesReducer,
      analize: analizeReducer,
      chart: chartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: sensorsReducer,
        },
        serializableCheck: false,
      }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
