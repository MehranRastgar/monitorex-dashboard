import { Box } from "@mui/material";
import {
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectSensorReports,
  SensorsReportType,
} from "../../../store/slices/analizeSlice";
import {
  selectDevicesData,
  setSelectedDevice,
} from "../../../store/slices/devicesSlice";
import Item from "../../atoms/Item/Item";
import DataGridReports, {
  DataGridReportsPrintMode,
} from "../../molecules/DataGrid/DataGridReports";
import ListDataGrid from "../../molecules/device/ListDataGrid";
interface TableOfReport {
  _id: number;
  x: string;
}
export default function DataOfReport() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = React.useState<any[]>([]);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [colu, setCulu] = React.useState<GridColDef[]>([]);
  const selectDataOFChart = useAppSelector(selectSensorReports);

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "row",
      width: 50,
    },
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

  function makeData(dataR: SensorsReportType[] | undefined) {
    const arr: object[] = [];
    const columnsMakes: GridColDef[] = [
      {
        field: "index",
        headerName: "row",
        width: 80,
      },
    ];
    if (dataR === undefined) {
      return;
    }
    dataR?.[0]?.data?.map((sensorxy, index) => {
      if (index % 1 === 0) {
        const obj = Object.create({
          index: index,
        });
        dataR?.map((ite, ind) => {
          obj[ite.sensor?.title?.toString() ?? "noname"] =
            ite.data?.[index]?.y ?? "no data";
          const date = new Date(ite?.data?.[index]?.x ?? "");
          obj["date"] = date.toLocaleDateString();
          obj["time"] = date.toLocaleTimeString();
        });
        arr.push(obj);
      }
    });
    columnsMakes.push({
      field: "date",
      headerName: "date",
      width: 150,
    });
    columnsMakes.push({
      field: "time",
      headerName: "time",
      width: 150,
    });
    dataR?.map((item, index) => {
      if (item?.data !== undefined && item?.data?.length > 0) {
        columnsMakes.push({
          field: item?.sensor?.title?.toString() ?? "noname",
          headerName: item?.sensor?.title?.toString(),
          width: 150,
        });
      }
    });

    setTableData(arr);
    setCulu(columnsMakes);
  }

  React.useEffect(() => {
    makeData(selectDataOFChart);
   //console.log(
      "selectDataOFChart selectDataOFChart selectDataOFChart",
      selectDataOFChart
    );
  }, [selectionModel, selectDataOFChart]);

  return (
    <>
      <section className="flex flex-wrap mt-5">
        {true ? (
          <DataGridReports
            toolbar={false}
            reportData={{
              columns: [...colu],
              rows: [...tableData],
            }}
          />
        ) : (
          <></>
        )}
        {/* <Box className={"w-full select-none"}>
          <Box sx={{ p: 1 }}>
            <Item>
              <div className="font-Vazir-Medium text-[20px]">{t("report")}</div>
            </Item>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListDataGrid
              RowsData={devices ?? []}
              columns={columnsMore}
              title={"reports"}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
              width={"100%"}
            />
          </Box>
        </Box> */}
      </section>
    </>
  );
}

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AgGrid from "../../molecules/AgGrid/AgGridReact";

// const theme = createTheme({
//   typography: {
//     h2: {
//       fontSize: "2rem",
//       fontWeight: 700,
//       borderBottom: "2px solid black",
//       "@media print": {
//         fontSize: "8rem",
//         borderBottom: "20px solid red",
//         color: "blue",
//       },
//     },
//   },
// });

export function DataOfReportPrintMode() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = React.useState<any[]>([]);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [colu, setCulu] = React.useState<GridColDef[]>([]);
  const selectDataOFChart = useAppSelector(selectSensorReports);

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "row",
      width: 50,
    },
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

  function makeData(dataR: SensorsReportType[] | undefined) {
    const arr: object[] = [];
    const columnsMakes: GridColDef[] = [
      {
        field: "index",
        headerName: "row",
        width: 80,
      },
    ];
    if (dataR === undefined) {
      return;
    }
    dataR?.[0]?.data?.map((sensorxy, index) => {
      if (index % 1 === 0) {
        const obj = Object.create({
          index: index,
        });
        dataR?.map((ite, ind) => {
          obj[ite.sensor?.title?.toString() ?? "noname"] =
            ite?.data?.[index]?.y ?? "no data";
          const date = new Date(ite?.data?.[index]?.x ?? "");
          obj["date"] = date?.toLocaleDateString();
          obj["time"] = date?.toLocaleTimeString();
        });

        arr.push(obj);
      }
    });
    columnsMakes.push({
      field: "date",
      headerName: "date",
      width: 150,
    });
    columnsMakes.push({
      field: "time",
      headerName: "time",
      width: 150,
    });
    dataR?.map((item, index) => {
      columnsMakes.push({
        field: item?.sensor?.title?.toString() ?? "noname",
        headerName: item?.sensor?.title?.toString(),
        width: 150,
      });
    });

    setTableData(arr);
    setCulu(columnsMakes);
   //console.log("arr", arr);
  }

  React.useEffect(() => {
    makeData(selectDataOFChart);
  }, [selectionModel, selectDataOFChart]);

  return (
    <>
      <section className="flex flex-wrap mt-0">
        {tableData?.length > 0 && colu?.length > 0 ? (
          <AgGrid column={[...colu]} rowdata={[...tableData]} />
        ) : (
          // <DataGridReportsPrintMode
          //   reportData={{
          //     columns: [...colu],
          //     rows: [...tableData],
          //   }}
          // />
          <></>
        )}
        {/* <Box className={"w-full select-none"}>
          <Box sx={{ p: 1 }}>
            <Item>
              <div className="font-Vazir-Medium text-[20px]">{t("report")}</div>
            </Item>
          </Box>
          <Box sx={{ p: 1 }}>
            <ListDataGrid
              RowsData={devices ?? []}
              columns={columnsMore}
              title={"reports"}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
              width={"100%"}
            />
          </Box>
        </Box> */}
      </section>
    </>
  );
}
