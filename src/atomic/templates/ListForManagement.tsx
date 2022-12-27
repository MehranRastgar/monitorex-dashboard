import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import DeviceList from "../organisms/device/DeviceList";
import DeviceForm from "../organisms/device/deviceForm";

export default function ListForManagement() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
          <Grid xs={4}>
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
