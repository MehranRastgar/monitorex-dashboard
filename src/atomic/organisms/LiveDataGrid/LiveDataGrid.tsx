import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectSensorReports,
  SensorsReportType,
} from "../../../store/slices/analizeSlice";
import AgGridLive from "../../molecules/AgGrid/AgGridLive";
import AgGrid from "../../molecules/AgGrid/AgGridReact";

interface Props {}

const LiveDataGrid: React.FC<Props> = (props) => {
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
      // {
      //   field: "index",
      //   headerName: "row",
      //   width: 80,
      // },
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
      width: 120,
    });
    columnsMakes.push({
      field: "time",
      headerName: "time",
      width: 130,
    });
    dataR?.map((item, index) => {
      columnsMakes.push({
        field: item?.sensor?.title?.toString() ?? "noname",
        headerName: item?.sensor?.title?.toString(),
        width: 80,
      });
    });

    setTableData(arr);
    setCulu(columnsMakes);
  }

  React.useEffect(() => {
    makeData(selectDataOFChart);
  }, [selectionModel, selectDataOFChart]);

  return (
    <>
      {tableData?.length > 0 && colu?.length > 0 ? (
        <AgGridLive column={[...colu]} rowdata={[...tableData]} />
      ) : (
        <></>
      )}
    </>
  );
};
export default LiveDataGrid;
