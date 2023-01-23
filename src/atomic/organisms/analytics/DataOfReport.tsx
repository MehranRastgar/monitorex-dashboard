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
  selectSensorReposts,
  SensorsReportType,
} from "../../../store/slices/analizeSlice";
import {
  selectDevicesData,
  setSelectedDevice,
} from "../../../store/slices/devicesSlice";
import Item from "../../atoms/Item/Item";
import DataGridReports from "../../molecules/DataGrid/DataGridReports";
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
  const selectDataOFChart = useAppSelector(selectSensorReposts);

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
          const date = new Date(ite?.data?.[index]?.x);
          obj["date"] = date.toLocaleDateString();
          obj["time"] = date.toLocaleTimeString();
        });

        arr.push(obj);
      }
    });
    console.log(arr);

    dataR?.map((item, index) => {
      columnsMakes.push({
        field: item?.sensor?.title?.toString() ?? "noname",
        headerName: item?.sensor?.title?.toString(),
        width: 150,
      });
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
    console.table(arr);
    setTableData(arr);
    setCulu(columnsMakes);
  }

  React.useEffect(() => {
    makeData(selectDataOFChart);
  }, [selectionModel, selectDataOFChart]);

  return (
    <>
      <section className="flex flex-wrap">
        {tableData?.length > 0 && colu?.length > 0 ? (
          <DataGridReports
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
