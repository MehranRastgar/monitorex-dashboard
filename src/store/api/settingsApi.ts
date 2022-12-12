import { Settings } from "../../types/types";

export async function fetchSettings(): Promise<Settings[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/settings/`,
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
