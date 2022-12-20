import axios from "axios";
import { SensorsReceiveTpe } from "../components/pages/sensors/sensorsTable";
import { getSensors, getSensorSeries } from "../constants/apis";
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
export interface FetchSensorXY {
  metaField?: MetaField;
  _id?: string;
  timestamp?: Date;
}

export interface MetaField {
  value?: number;
}

export async function GetSensorsSeries(): Promise<FetchSensorXY[]> {
  //   return await fetch(getSensors);
  const { data: data } = await axios.get(
    getSensorSeries + "6399d1ee2ea92f84e75b2798",
    getConfig
  );
  const datares: FetchSensorXY[] = [...data];
  return datares;
}
