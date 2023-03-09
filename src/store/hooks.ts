import { ChangeEvent, useState } from "react";
import { useEffect, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SensorWebsocketRealTimeDataType } from "../components/pages/sensors/sensorsTable";
import {
  selectSocketDatas,
  setSocketDatas,
  setSocketIds,
} from "./slices/socketSlice";

import type { AppDispatch, AppState } from "./store";

export const useForm =
  <TContent>(defaultValues: TContent) =>
  (handler: (content: TContent) => void) =>
  async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.persist();

    const form = event.target as HTMLFormElement;
    const elements = Array.from(form.elements) as HTMLInputElement[];
    const data = elements
      .filter((element) => element.hasAttribute("name"))
      .reduce(
        (object, element) => ({
          ...object,
          [`${element.getAttribute("name")}`]: element.value,
        }),
        defaultValues
      );
    await handler(data);
    form.reset();
  };

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export function useSocketId() {
  const socketIds = useAppSelector((state) => state.socket.socketIds);
  const dispatch = useAppDispatch();

  function updateSocketIds(newSocketIds: string[]) {
    dispatch(setSocketIds(newSocketIds));
  }

  return [socketIds, updateSocketIds];
}

import { io, Socket } from "socket.io-client";

export function useSocketDatas() {
  const socketIds = useAppSelector((state) => state.socket.socketIds);
  const socketDatas = useAppSelector((state) => state.socket.sensorSocketData);
  const dispatch = useAppDispatch();
  const [soDa, setSoDa] = useState<SensorWebsocketRealTimeDataType[]>([]);

  function updateSocketDatas(newSocketIds: SensorWebsocketRealTimeDataType[]) {
    dispatch(setSocketIds(newSocketIds));
  }
  useEffect(() => {
    const socket = io("http://localhost:3051");
    const socketIdsbackup = socketIds;
    if (socketDatas) setSoDa(socketDatas);
    //console.log("count count count ", socketIds);
    socketIds?.map((id, index) => {
      socket.on(id, (data: SensorWebsocketRealTimeDataType) => {
        const socketDataArr: SensorWebsocketRealTimeDataType[] = [];
        if (data) socketDataArr.push(data);
        setSoDa(socketDataArr);
      });
    });
    return () => {
      socketIdsbackup?.map((id, index) => {
        socket.off(id);
        dispatch(setSocketDatas([]));
      });
      // socket.disconnect();
    };
  }, [socketIds]);

  useEffect(() => {
    dispatch(setSocketDatas([...soDa]));
  }, []);

  return [socketDatas, updateSocketDatas];
}

// export const useInterval = (callback: Function, delay: number) => {
//   const savedCallback = useRef<Function>();
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
//   useEffect(() => {
//     const handler = (...args: any) => savedCallback.current?.(...args);

//     if (delay !== null) {
//       const id = setInterval(handler, delay);
//       return () => clearInterval(id);
//     }
//     return {};
//   }, [delay]);
// };

// export const useUserData = (callback: Function, delay: number) => {
//   const savedCallback = useRef<Function>();

//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
//   useEffect(() => {
//     const handler = (...args: any) => savedCallback.current?.(...args);
//     if (delay !== null) {
//       const id = setInterval(handler, delay);
//       return () => clearInterval(id);
//     }
//     return {};
//   }, [delay]);
// };

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
