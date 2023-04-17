import axios from "axios";
import { useEffect } from "react";
import { SensorsReceiveTpe } from "../components/pages/sensors/sensorsTable";
import {
  getDevices,
  getSensors,
  getSensorSeries,
  getSensorSeriesFilled,
  getUsers,
} from "../constants/apis";
import { Client, ClientType, UserType } from "../types/types";

export async function GetUsers(): Promise<UserType[]> {
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
  const { data: data, status } = await axios.get(getUsers, getConfig);

  const datares: UserType[] = [...data];
  return datares;
}

export async function GetOwnUser(): Promise<UserType> {
  const accessToken: string | null = localStorage.getItem("access_token");
  const user: string | null = localStorage.getItem("user");
  const USER: UserType = user && JSON?.parse(user);

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
  const { data: data, status } = await axios.get(
    `${getUsers}/${USER._id}`,
    getConfig
  );

  const datares: UserType = { ...data };
  return datares;
}
