import { SensorsReceiveTpe } from "../../components/pages/sensors/sensorsTable";

export async function fetchDevices(): Promise<DevicesReceiveType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/sensors/`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();

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
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  sensors?: any[];
}

export interface Address {
  multiPort?: number;
  sMultiPort?: number;
}

export interface Factor {
  factorName: string;
  factorPosition:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 12
    | 13
    | 14
    | 15
    | 16;
  factorValue: number;
}
