import axios from "axios";
import { SensorsReceiveTpe } from "../../components/pages/sensors/sensorsTable";

export async function getDevices(): Promise<DevicesReceiveType[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/devices/`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.data;

  return result;
}

export async function putDevice(
  body: DevicesReceiveType,
  deviceId: string
): Promise<DevicesReceiveType> {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/devices/${deviceId}`,
    {
      ...body,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.data;

  return result;
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
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface Address {
  multiPort?: number;
  sMultiPort?: number;
}

export interface Factor {
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
