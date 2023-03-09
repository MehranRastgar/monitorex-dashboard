import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import { t } from "i18next";
import SensorAmChartLive from "../sensor/SensorAmChartLive";
import { useQuery } from "react-query";
import { GetSensorsSeriesDateVaLue } from "../../../api/sensors";
import GaugeDevice from "../AmChart/GaugeDevice";
import { socket } from "../../../components/socketio";

export function SensorChartWebsocket({ idSubScribe }: { idSubScribe: string }) {
  // const query = useQuery("sensorseries" + idSubScribe, () =>
  //   GetSensorsSeriesDateVaLue(String(idSubScribe))
  // );
  // const queryClient = useQueryClient();
  const [value, setValue] = useState<
    { value: number; max?: number; min?: number } | undefined
  >(undefined);
  const [addedValue, setAddedValue] = useState<
    { value: number; date: number }[]
  >([]);
  useEffect(() => {
    // setValue(undefined  );
    // socket.on("connect", () => {
    //  //console.log("connected");
    // });
    socket.on(idSubScribe, (data) => {
      setValue(data);

     //console.log("data:", data);
    });
    return () => {
      // socket.off("connect");
      socket.off(idSubScribe);
    };
  }, []);

  useEffect(() => {
    if (value?.value !== undefined) {
      let arr: { value: number; date: number }[] = [...addedValue];
      arr.push({ value: value?.value, date: new Date().getTime() });

      setAddedValue(arr.slice(-100));

     //console.log(addedValue);
    }

    return () => {};
  }, [value]);

  return (
    <>
      <div className="flex w-full" key={idSubScribe}>
        {value?.value !== undefined ? (
          <>
            {value?.value !== 200000 ? (
              <div className="flex" style={{ height: 200, width: "100%" }}>
                <GaugeDevice
                  id={idSubScribe + "-sensor-gauge" ?? "sensor"}
                  minmax={{ min: value?.min ?? 0, max: value?.max ?? 100 }}
                  val={value?.value}
                  // unit={"sensor"}
                />
                {value?.value}
                <div className="flex h-[10px] w-[10px]  rounded-full bg-green-600"></div>
                <SensorAmChartLive
                  // lastData={
                  //   query.status === "success" ? [...(query?.data ?? [])] : []
                  // }
                  data={addedValue}
                  id={idSubScribe}
                />
              </div>
            ) : (
              <div>
                {t("sensorDisconnected")}
                <div className="flex h-[10px] w-[10px] rounded-full bg-red-600"></div>
              </div>
            )}
          </>
        ) : (
          <div>wait for sample</div>
        )}
      </div>
    </>
  );
}
