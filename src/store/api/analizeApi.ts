import axios, { AxiosError, AxiosResponse } from "axios";
import {
  SensorLastSerie,
  SensorsReceiveTpe,
} from "../../components/pages/sensors/sensorsTable";

export async function reportSensors(report: {
  sensors: string[];
  start: string;
  end: string;
}): Promise<AxiosResponse | AxiosError> {
  const accessToken: string | null = localStorage.getItem("access_token");

  const postConfig: {
    sensors: string[];
    start: string;
    end: string;
  } = {
    ...report,
  };
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/sensors/report`,
      postConfig,
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
