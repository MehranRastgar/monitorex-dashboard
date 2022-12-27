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
  setDevicesData,
  setDevicesStatus,
} from "../../store/slices/devicesSlice";
import { useAppDispatch } from "../../store/hooks";

export default function DeviceManagement() {
  const dispatch = useAppDispatch();
  const queryDevices = useQuery("devices", GetDevices);

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
