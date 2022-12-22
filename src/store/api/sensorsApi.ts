import { SensorsReceiveTpe } from "../../components/pages/sensors/sensorsTable";

export async function fetchSensors(): Promise<SensorsReceiveTpe[]> {
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
