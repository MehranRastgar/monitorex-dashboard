import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import DeviceList from "../organisms/device/DeviceList";
import DeviceForm from "../organisms/device/deviceForm";
import { GetDevices } from "../../api/devices";
import { useQuery } from "react-query";
import {
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
  setSelectedDevice,
} from "../../store/slices/devicesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Item from "../atoms/Item/Item";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DevicesReceiveType, Factor } from "../../store/api/devicesApi";
import { sensor } from "../../interfaces/Sensor";
import { SensorsReceiveTpe } from "../../components/pages/sensors/sensorsTable";

export default function DeviceManagement() {
  const dispatch = useAppDispatch();
  const queryDevices = useQuery("devices", GetDevices);
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const { t } = useTranslation();

  function newDevice() {
    dispatch(setSelectedDevice(newDeviceInitialize));
  }
  function newFromSelectedDevice() {
    const sensors: SensorsReceiveTpe[] = [];
    selectedDevice?.sensors?.map((sensor) => {
      sensors.push({
        ...sensor,
        updatedAt: undefined,
        __v: undefined,
        _id: undefined,
      });
    });
    const factors: Factor[] = [];
    selectedDevice?.factors?.map((factor) => {
      factors.push({ ...factor, _id: undefined });
    });

    dispatch(
      setSelectedDevice({
        ...selectedDevice,
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        __v: undefined,
        title: selectedDevice.title + "dunplicate",
        sensors: [...sensors],
        factors: [...factors],
        address: {
          ...selectedDevice.address,
          _id: undefined,
        },
      })
    );
  }

  React.useEffect(() => {
    if (queryDevices.status === "success") {
      dispatch(setDevicesData(queryDevices.data));
      dispatch(setDevicesStatus("success"));
    }
  }, [queryDevices.isFetching, queryDevices.isSuccess]);

  return (
    <>
      <Box className={"select-none"} sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5} columns={{ xs: 4, sm: 4, md: 12 }}>
          <Grid lg={4} md={8}>
            <DeviceList />
            <Box sx={{ flexGrow: 1, padding: 1 }}>
              <Item>
                <Button
                  onClick={() => {
                    newDevice();
                  }}
                >
                  {t("new device")}
                </Button>
              </Item>
            </Box>
            {selectedDevice?._id !== undefined ? (
              <Box sx={{ flexGrow: 1, padding: 1 }}>
                <Item>
                  <Button
                    onClick={() => {
                      newFromSelectedDevice();
                    }}
                  >
                    {t("new from this device")}
                  </Button>
                </Item>
              </Box>
            ) : (
              <></>
            )}
          </Grid>
          <Grid xs={8}>
            <DeviceForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
// { xs: 0.3, sm: 0.5, md: 1, lg: 2, xl: 3 }
const newDeviceInitialize: DevicesReceiveType = {
  title: "",
  sensors: [
    {
      title: "",
      type: "",
      unit: "",
    },
  ],
  type: "Sensor Cotroller",
  numberOfPorts: 4,
  address: {
    sMultiPort: 1,
    multiPort: 1,
  },
};
