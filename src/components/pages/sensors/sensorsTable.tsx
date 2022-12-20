import React, { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { GetSensors } from "../../../api/sensors";
import classes from "./sensorsTable.module.scss";
import { useTranslation, withTranslation } from "react-i18next";
export default function SensorsTable() {
  const queryClient = useQueryClient();
  const query = useQuery("sensors", GetSensors);
  // const mutation = useMutation(postTodo, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries("todos");
  //   },
  // });
  const mutation = useMutation({
    mutationFn: GetSensors,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sensors"] });
    },
  });

  useEffect(() => {
    let timer1 = setTimeout((timer1) => mutation.mutate(), 60000);
    console.log(query);

    return () => {
      clearTimeout(timer1);
    };
  }, [query]);
  function handleClick() {}
  return (
    <>
      <PageSizeCustomOptions
        rowsData={query?.status === "success" ? query.data : []}
      />
    </>
  );
}
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { DemoDataReturnType, useDemoData } from "@mui/x-data-grid-generator";
import { alpha, styled } from "@mui/material";
import axios from "axios";
import { getSensorLastSerie } from "../../../constants/apis";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export interface SensorsReceiveTpe {
  resolution?: string;
  _id?: string;
  title?: string;
  multiport?: number;
  superMultiport?: number;
  type?: string;
  unit?: string;
  sensorUniqueName?: string;
  __v?: number;
  port?: number;
  metaField?: string;
  updatedAt?: Date;
  sensorLastSerie?: SensorLastSerie;
}

export interface SensorLastSerie {
  metaField?: MetaField;
  _id?: string;
  timestamp?: Date;
  sensorId?: string;
  date?: Date;
  __v?: number;
}

export interface MetaField {
  incremental?: number;
  value?: number;
  max?: number;
  min?: number;
  average?: number;
}

// import { DataGrid } from '@mui/x-data-grid';

export function PageSizeCustomOptions({
  rowsData,
}: {
  rowsData: SensorsReceiveTpe[];
}) {
  const { t } = useTranslation();
  const [val, setVal] = React.useState([{}]);
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "_id",
      width: 85,
      cellClassName: "text-blue-600",
      headerClassName: "text-red-600",
    },
    { field: "title", headerName: t("title") ?? "title", width: 130 },
    {
      field: "type",
      headerName: t("sensorType") ?? "Sensor Type",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${t(params.row.type) || ""}
        `,
    },
    {
      field: "unit",
      headerName: t("unit") ?? "Unit",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${t(params.row.unit) || ""}
      `,
    },
    {
      field: "lastValue",
      headerName: t("lastValue") ?? "Last Value",
      width: 80,
      valueGetter: (params: GridValueGetterParams) => {
        if (params?.row?.sensorLastSerie?.metaField.value !== undefined) {
          const value = params?.row?.sensorLastSerie?.metaField.value ?? "";
          return value.toLocaleString(); //date.toLocaleString();
        } else return t("notAvailable");
      },
    },
    {
      field: "max",
      headerName: t("max") ?? "max",
      width: 80,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.sensorLastSerie?.metaField?.max || ""}`,
    },
    {
      field: "min",
      headerName: t("min") ?? "min",
      width: 80,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.sensorLastSerie?.metaField?.min || ""}`,
    },
    {
      field: "average",
      headerName: t("average") ?? "average",
      width: 80,
      valueGetter: (params: GridValueGetterParams) =>
        `${
          params?.row?.sensorLastSerie?.metaField?.average
            ? Number(params?.row?.sensorLastSerie?.metaField?.average).toFixed(
                2
              )
            : ""
        }`,
    },
    {
      field: "lastUpdate",
      headerName: t("lastUpdate") ?? "Last Update",
      width: 180,
      valueGetter: (params: GridValueGetterParams) => {
        if (params?.row?.sensorLastSerie?.timestamp !== undefined) {
          const date = new Date(params?.row?.sensorLastSerie?.timestamp) ?? "";
          return date.toLocaleString(); //date.toLocaleString();
        } else {
          return "";
        }
      },
    },

    {
      field: "address",
      headerName: t("address") ?? "address",
      width: 80,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.superMultiport?.toString() || ""}_${
          params?.row?.multiport?.toString() || ""
        }_${params.row.port?.toString() || ""}`,
    },
    {
      field: "resolution",
      headerName: t("resolution") ?? "resolution",
      type: "string",
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${t(params.row.resolution) || ""}
        `,
    },
    {
      field: "report",
      headerName: t("report") ?? "report",
      type: "button",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => "گزارش گیری",
      cellClassName:
        "flex border bg-blue-200 rounded-md p-1 m-auto cursor-pointer",
    },
  ];
  // function getLastUpdate(_id: string) {
  //   console.log();

  //   axios
  //     .get(`${getSensorLastSerie}${_id.toString()}`)
  //     .then((data) => {
  //       setVal([
  //         { ...val },
  //         { _id: _id.toString(), time: data?.data?.timestamp },
  //       ]);
  //     })
  //     .catch((err) =>
  //       setVal([...val, { _id: _id.toString(), time: "not present" }])
  //     );

  //   return data;
  // }
  const [pageSize, setPageSize] = React.useState<number>(10);
  const data2 = {
    columns: [...columns],
    rows: [...rowsData],
  };
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 500,
    maxColumns: 20,
  });
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  useEffect(() => {
    console.table(selectionModel);
  }, [selectionModel]);

  return (
    <div
      className={classes.grid_container}
      style={{
        height: 600,
        width: "100%",
      }}
    >
      <DataGrid
        getRowId={(row: any) => row._id}
        // style={classes.grid_container}
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 14,
          },
          ".MuiDataGrid-cellContent": {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 14,
            fontWeight: 400,
            display: "-ms-inline-grid",
            textAlign: "center",
          },
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          ".MuiDataGrid-cell:hover": {
            color: "primary.main",
            textAlign: "center",
          },
        }}
        // experimentalFeatures={{ newEditingApi: true }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 50, 100]}
        pagination
        checkboxSelection
        paginationMode="client"
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        {...data2}
      />
    </div>
  );
}
