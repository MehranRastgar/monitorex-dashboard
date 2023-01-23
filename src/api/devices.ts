import axios, { AxiosError } from "axios";
import { SensorsReceiveTpe } from "../components/pages/sensors/sensorsTable";
import {
  getDevices,
  getEBDevices,
  getSensors,
  getSensorSeries,
  getSensorSeriesFilled,
} from "../constants/apis";
import { DevicesReceiveType } from "../store/api/devicesApi";

export async function GetDevices(): Promise<DevicesReceiveType[]> {
  const accessToken: string | null = localStorage.getItem("access_token");
  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${accessToken ?? 0}`,
    },
  };
  //   return await fetch(getSensors);
  try {
    const { data: data } = await axios.get(getDevices, getConfig);

    const datares: DevicesReceiveType[] = [...data];
    return datares;
  } catch (err: any | AxiosError) {
    {
      return [];
    }
  }
}
export async function GetEBDevices(): Promise<DevicesReceiveType[]> {
  const accessToken: string | null = localStorage.getItem("access_token");
  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${accessToken ?? 0}`,
    },
  };
  //   return await fetch(getSensors);
  try {
    const { data: data } = await axios.get(getEBDevices, getConfig);

    const datares: DevicesReceiveType[] = [...data];
    return datares;
  } catch (err: any | AxiosError) {
    {
      return [];
    }
  }
}
