import axios from "axios";
import { SensorsReceiveTpe } from "../components/pages/sensors/sensorsTable";
import {
  getDevices,
  getSensors,
  getSensorSeries,
  getSensorSeriesFilled,
} from "../constants/apis";
import { DevicesReceiveType } from "../store/api/devicesApi";
const getConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "*/*",
  },
};
export async function GetDevices(): Promise<DevicesReceiveType[]> {
  //   return await fetch(getSensors);
  const { data: data } = await axios.get(getDevices, getConfig);
  const datares: SensorsReceiveTpe[] = [...data];
  return datares;
}
