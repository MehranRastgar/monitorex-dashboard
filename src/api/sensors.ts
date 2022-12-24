import axios from "axios";
import { SensorsReceiveTpe } from "../components/pages/sensors/sensorsTable";
import {
  getSensors,
  getSensorSeries,
  getSensorSeriesFilled,
} from "../constants/apis";
const getConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "*/*",
  },
};
export async function GetSensors(): Promise<SensorsReceiveTpe[]> {
  //   return await fetch(getSensors);
  const { data: data } = await axios.get(getSensors, getConfig);
  const datares: SensorsReceiveTpe[] = [...data];
  return datares;
}
export interface FetchSensorXYFilled {
  _id: string;
  data: SensorXYFilled[];
}
export interface SensorXYFilled {
  x: Date;
  y?: string;
}
export interface FetchSensorXY {
  metaField?: MetaField;
  _id?: string;
  timestamp?: Date;
}
export interface MetaField {
  value?: number;
}

export async function GetSensorsSeries(id: string): Promise<FetchSensorXY[]> {
  //   return await fetch(getSensors);
  const { data: data } = await axios.get(getSensorSeries + id, getConfig);
  const datares: FetchSensorXY[] = [...data];
  return datares;
}
export async function GetSensorsSeriesFilled(
  id: string
): Promise<FetchSensorXYFilled[]> {
  //   return await fetch(getSensors);
  const { data: data } = await axios.get(getSensorSeriesFilled + id, getConfig);
  const datares: FetchSensorXYFilled[] = [...data];
  return datares;
}
