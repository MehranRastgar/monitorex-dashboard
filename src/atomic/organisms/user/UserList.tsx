import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import ListDataGrid from "../../molecules/device/ListDataGrid";
import Item from "../../atoms/Item/Item";
import {
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
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
import {
  selectUsersData,
  setSelectedUser,
} from "../../../store/slices/clientSlice";

export default function UserList({ moreItems }: { moreItems?: boolean }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const users = useAppSelector(selectUsersData);
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "id",
      width: 50,
    },
    {
      field: "username",
      headerName: t("username") ?? "username",
      width: 150,
    },
    {
      field: "isAdmin",
      headerName: t("isAdmin") ?? "isAdmin",
      width: 150,
    },
  ];
  const columnsMore: GridColDef[] = [
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
    {
      field: "sensors",
      headerName: t("sensors") ?? "type",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.sensors?.map((sensor: SensorsReceiveTpe, index: number) => {
          return sensor?.title;
        }),
    },
    {
      field: "unit",
      headerName: t("unit") ?? "unit",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.sensors?.map((sensor: SensorsReceiveTpe, index: number) => {
          return sensor?.unit;
        }),
    },
    {
      field: "numberOfPorts",
      headerName: t("numberOfPorts") ?? "numberOfPorts",
      width: 150,
    },
  ];
  React.useEffect(() => {
    const indexindata = users.findIndex((it) => it._id === selectionModel[0]);
    dispatch(setSelectedUser(users?.[indexindata]));
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
            RowsData={users ?? []}
            columns={moreItems ? columnsMore : columns}
            title={"users"}
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
