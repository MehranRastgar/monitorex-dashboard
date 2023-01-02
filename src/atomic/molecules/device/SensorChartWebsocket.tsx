import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import { io, Socket } from "socket.io-client";
import { t } from "i18next";
import SensorAmChartLive from "../sensor/SensorAmChartLive";
const socket = io("http://localhost:3051");

export function SensorChartWebsocket({ idSubScribe }: { idSubScribe: string }) {
  const [value, setValue] = useState<{ value: number } | undefined>(undefined);
  const [addedValue, setAddedValue] = useState<
    { value: number; date: number }[]
  >([]);
  useEffect(() => {
    // setValue(undefined  );
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on(idSubScribe, (data) => {
      setValue(data);

      console.log("data:", data);
    });
    return () => {
      socket.off("connect");
      socket.off(idSubScribe);
    };
  }, []);

  useEffect(() => {
    if (value?.value !== undefined) {
      let arr: { value: number; date: number }[] = [...addedValue];
      arr.push({ value: value?.value, date: new Date().getTime() });

      setAddedValue(arr.slice(-100));

      console.log(addedValue);
    }

    return () => {};
  }, [value]);

  return (
    <>
      <div key={idSubScribe}>
        {value?.value !== undefined ? (
          <>
            {value?.value !== 200000 ? (
              <div style={{ height: 400, width: "100%" }}>
                {value?.value}
                <div className="flex h-[10px] w-[10px]  rounded-full bg-green-600"></div>
                <SensorAmChartLive data={addedValue} id={idSubScribe} />
              </div>
            ) : (
              <div>
                {t("sensorDisconnected")}
                <div className="flex h-[10px] w-[10px] rounded-full bg-red-600"></div>
              </div>
            )}
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    </>
  );
}
