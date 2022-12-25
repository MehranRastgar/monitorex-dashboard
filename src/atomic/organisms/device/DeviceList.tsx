import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import DeviceForm from "./deviceForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--bgc)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "var(--primary)",
}));

export default function DeviceList({
  props,
}: {
  props: {
    title?: string;
    devieData?: Device;
    time?: string;
  };
}) {
  const { t } = useTranslation();
  //itemShouldRender

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item sx={{ fontSize: 24 }}>{t(props.title ?? "")}</Item>
          <Item>xs=4</Item>
          <Item>xs=4</Item>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>{/* <DeviceForm  /> */}</Grid>
      </Grid>
    </Box>
  );
}

export interface factors {
  factorName: string;
  factorPosition:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 12
    | 13
    | 14
    | 15
    | 16;
  factorValue: number;
}
export interface deviceAddress {
  multiPort: number;
  sMultiPort: number;
}
export interface Device {
  title: string;
  address: deviceAddress;
  type: "Electrical panel" | "Sensor Cotroller";
  DeviceUniqueName: string;
  factors: factors[];
}
