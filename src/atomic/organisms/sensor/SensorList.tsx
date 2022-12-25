import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import DeviceForm from "../device/deviceForm";
import Item from "../../atoms/Item/Item";
import ListForManagement from "../../templates/ListForManagement";

export default function SensorList({
  props,
}: {
  props: {
    title?: string;
    data?: string[];
    time?: string;
  };
}) {
  const { t } = useTranslation();
  //itemShouldRender

  return (
    <>
      <ListForManagement>
        <Grid xs={4}>
          <Item sx={{ fontSize: 24 }}>{t(props?.title ?? "")}</Item>
          <Item>xs=4</Item>
          <Item>xs=4</Item>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=4</Item>

          {/* <DeviceForm props={{ data: [] }} /> */}
        </Grid>
      </ListForManagement>
    </>
  );
}
