import axios, { AxiosError, AxiosResponse } from "axios";
import {
  SensorLastSerie,
  SensorsReceiveTpe,
} from "../../components/pages/sensors/sensorsTable";

export async function getDevices(): Promise<AxiosResponse | AxiosError> {
  const accessToken: string | null = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/devices/`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken ?? 0}`,
        },
      }
    );
    // const result = await response.data;

    // if (response.status >= 400) {
    //   console.log("access token removes");
    //   localStorage.removeItem("access_token");
    // }
    return response;
  } catch (err: any) {
    return err;
  }
}

export async function putDevice(
  body: DevicesReceiveType,
  deviceId?: string
): Promise<AxiosResponse | AxiosError> {
  let response: AxiosResponse;
  const accessToken: string | null = localStorage.getItem("access_token");
  try {
    if (deviceId === undefined) {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/devices`,
        {
          ...body,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken ?? 0}`,
          },
        }
      );
    } else {
      response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/devices/${deviceId}`,
        {
          ...body,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken ?? 0}`,
          },
        }
      );
    }
    // const result = await response;

    return response;
  } catch (err: any) {
    return err;
  }
}

export interface DevicesReceiveType {
  _id?: string;
  title?: string;
  address?: Address;
  type?: string;
  DeviceUniqueName?: string;
  numberOfPorts?: number;
  factors?: Factor[];
  sensors?: SensorsReceiveTpe[];
  sensorLastSerie?: SensorLastSerie[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface Address {
  _id?: string;
  multiPort?: number;
  sMultiPort?: number;
}

export interface Factor {
  _id?: string;
  factorName?: string;
  factorPosition: number;
  factorValue: number;
}

// | 1
// | 2
// | 3
// | 4
// | 5
// | 6
// | 7
// | 8
// | 9
// | 10
// | 12
// | 13
// | 14
// | 15
// | 16;
