import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import DeviceForm from "../device/deviceForm";
import Item from "../../atoms/Item/Item";
import ListForManagement from "../../templates/ListForManagement";
import {
  selectDevicesData,
  setSelectedDevice,
} from "../../../store/slices/devicesSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import ListDataGrid from "../../molecules/device/ListDataGrid";

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
  const dispatch = useAppDispatch();
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const devices = useAppSelector(selectDevicesData);
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "id",
      width: 50,
    },
    {
      field: "title",
      headerName: t("title") ?? "title",
      width: 150,
    },
    {
      field: "type",
      headerName: t("type") ?? "type",
      width: 150,
    },
  ];
  React.useEffect(() => {
    const indexindata = devices.findIndex((it) => it._id === selectionModel[0]);
    dispatch(setSelectedDevice(devices?.[indexindata]));
  }, [selectionModel]);
  return (
    <>
      <Box className={"select-none"}>
        <Box sx={{ p: 1 }}>
          <Item>
            <div
              style={{
                fontFamily: 'var(--fontFamily)'
              }}
              className=" text-[20px]">{t("list")}</div>
          </Item>
        </Box>
        <Box sx={{ p: 1 }}>
          {/* {selectionModel?.[0]} */}
          <ListDataGrid
            RowsData={devices ?? []}
            columns={columns}
            title={"devices"}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
        </Box>
      </Box>
    </>
  );
}
