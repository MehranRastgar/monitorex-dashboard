import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectSelectedDevice } from "../../../store/slices/devicesSlice";
import { SensorChartWebsocket } from "../../molecules/device/SensorChartWebsocket";

export default function DeviceSummary() {
  // const refTitle = useRef<React.MutableRefObject<HTMLInputElement>>();
  const { t } = useTranslation();
  //itemShouldRender
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const dispatch = useAppDispatch();

  // setDevice(selectedDevice);
  // setNumberOfPorts(selectedDevice?.numberOfPorts?.toString());
  // setMultiPort(selectedDevice?.address?.multiPort?.toString());
  // setSMultiPort(selectedDevice?.address?.sMultiPort?.toString());
  // setDeviceType(selectedDevice?.type?.toString());
  // if (selectedDevice !== undefined) pushChange();
  useEffect(() => {}, [selectedDevice]);

  if (selectedDevice !== undefined)
    return (
      <>
        <Box className={"select-none"} sx={{ flexGrow: 1, padding: 1 }}>
          <Item>
            {selectedDevice.title}
            <Box className={"select-none"} sx={{ flexGrow: 1, margin: 1 }}>
              {selectedDevice?.sensors?.map((sensor, index) => (
                <>
                  <Item key={index + "-sensorsummary"} sx={{ margin: 1 }}>
                    <Grid container spacing={2}>
                      <Grid>
                        <Box
                          className={"select-none"}
                          sx={{ textAlign: "start", flexGrow: 1 }}
                        >
                          {t("port")}: {index + 1}
                        </Box>
                        <Box
                          className={"select-none"}
                          sx={{ textAlign: "start", flexGrow: 1 }}
                        >
                          {t("title")}: {sensor.title}
                        </Box>
                        <Box
                          className={"select-none"}
                          sx={{ textAlign: "start", flexGrow: 1 }}
                        >
                          {t("unit")}: {sensor.unit}
                        </Box>
                        <Box
                          className={"select-none"}
                          sx={{ textAlign: "start", flexGrow: 1 }}
                        >
                          {t("id")}: {sensor._id}
                        </Box>
                      </Grid>
                      <Grid>
                        <Box
                          className={"select-none"}
                          sx={{ textAlign: "start", flexGrow: 1 }}
                        ></Box>
                      </Grid>
                      <Grid>
                        <Box
                          className={"select-none"}
                          sx={{ textAlign: "start", flexGrow: 1 }}
                        >
                          <SensorChartWebsocket
                            key={sensor?._id ?? index}
                            idSubScribe={sensor?._id ?? ""}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Item>
                </>
              ))}
            </Box>
          </Item>
        </Box>
      </>
    );
  else return <></>;
}
