import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import DeviceForm from "./deviceForm";
import ListDataGrid from "../../molecules/device/ListDataGrid";
import Item from "../../atoms/Item/Item";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectDevicesData,
  setDevicesData,
  setDevicesStatus,
  setSelectedDevice,
} from "../../../store/slices/devicesSlice";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { GetDevices } from "../../../api/devices";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { DevicesReceiveType } from "../../../store/api/devicesApi";

export default function DeviceList() {
  const { t } = useTranslation();
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
    const datapush: DevicesReceiveType[] = [];
    datapush.push(devices?.[indexindata]);
    dispatch(setSelectedDevice(datapush));
  }, [selectionModel]);

  return (
    <>
      <Box className={"select-none"}>
        <Box sx={{ p: 1 }}>
          <Item>
            <div className="font-Vazir-Medium text-[20px]">{t("list")}</div>
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
