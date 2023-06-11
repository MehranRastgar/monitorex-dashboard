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
  selectAllUsersData,
  setSelectedUser,
} from "../../../store/slices/userSlice";
import ReactTable from "src/atomic/molecules/Table/ReactTable";
import { GetUsers } from "src/api/users";

export default function UserList({ moreItems }: { moreItems?: boolean }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const users = useAppSelector(selectAllUsersData);
  const queryUsers = useQuery('users', GetUsers);
  const [selectedRow, setSelectedRow] = React.useState<string>('');

  const data = React.useMemo(
    () =>
      queryUsers.isSuccess === true
        ? queryUsers.data
        : [{ title: 'no data' }],
    [queryUsers?.data],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'N',
        id: 'index',
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: 'user name',
        accessor: 'username',
      },
      {
        Header: 'email',
        accessor: 'email',
      },
      {
        Header: 'family',
        accessor: 'family',
      },
    ],

    [],
  );
  React.useEffect(() => {
    const indexindata = users.findIndex((it) => it._id === selectedRow);
    dispatch(setSelectedUser(users?.[indexindata]));
  }, [selectedRow]);

  return (
    <>
      <section className="flex items-start flex-wrap h-[20rem] max-w-[20rem] w-[20rem] mb-[4rem]">
        <span className="mx-4 "> {t('users')}</span>
        {queryUsers.isSuccess === true && (
          <ReactTable
            hasSearch={true}
            hasPagination={true}
            setSelectedRow={setSelectedRow}
            tHeight=" h-[15rem] "
            columns={columns}
            data={data}
            selectedRow={selectedRow}
          />
        )}
      </section>
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
