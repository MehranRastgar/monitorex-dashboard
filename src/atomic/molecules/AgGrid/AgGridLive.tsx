import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { AgGridReact } from "ag-grid-react";
// import classes from "./aggrid.module.scss";
import { makeStyles } from "@material-ui/styles";
import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  GridToolbarExport,
} from "@mui/x-data-grid";

import { useTranslation } from "react-i18next";
import {
  selectGroupNumber,
  selectSensorReports,
} from "../../../store/slices/analizeSlice";
import { useAppSelector } from "../../../store/hooks";
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from "../../../components/pages/sensors/sensorsTable";
import { socket } from "../../../components/socketio";
import { selectSocketObject } from "../../../store/slices/socketSlice";
import { selectUserGroups } from "../../../store/slices/userSlice";
import { GroupItemType } from "../../../types/types";
import ListDataGrid from "../device/ListDataGrid";

// import "../../../../styles/index.css";
interface Props {
  column: { field: string; filter?: boolean }[];
  rowdata: {}[];
}
const useStyles = makeStyles({
  // your styles here
});
const AgGridLive: React.FC<Props> = (props) => {
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState<any[]>(); // Set rowData to Array of Objects, one Object per Row
  const socketObj = useAppSelector(selectSocketObject);
  const Groups = useAppSelector(selectUserGroups);
  const gpNumber = useAppSelector(selectGroupNumber);
  const [group, setGroup] = useState<GroupItemType | null>(null);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState(props?.column);
  const selectDataOFChart = useAppSelector(selectSensorReports);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    //console.log("cellClicked", event);
  }, []);
  useEffect(() => {
    if (gpNumber !== undefined && Groups?.[gpNumber] !== undefined)
      setGroup(Groups?.[gpNumber]);
  }, [Groups, gpNumber]);
  // Example load data from sever
  useEffect(() => {
    // fetch("https://www.ag-grid.com/example-assets/row-data.json")
    //   .then((result) => result.json())
    //   .then((rowData) => setRowData(rowData));
    // setRowData(props?.rowdata);
  }, []);

  // Example using Grid's API
  // const buttonListener = useCallback((e: any) => {
  //   gridRef?.current?.api?.deselectAll();
  // }, []);
  const classes = useStyles();

  useEffect(() => {
    if (true) {
      const newda: any[] = rowData ?? [];
      let obj = Object.create({
        id: "cossher",
        index: newda?.length ?? 0,
      });

      group?.sensors?.map((item: SensorsReceiveTpe, index) => {
        // console.log(item);
        if (item?._id !== undefined) {
          const data: SensorWebsocketRealTimeDataType = socketObj?.[item?._id];
          const ind = rowData?.[rowData.length - 1]?.index ?? 0;
          ////console.log(ind);

          if (data?.value === 200000 || data?.value === undefined) {
            obj[item?.title?.toString() ?? "noname"] = "no data";
          } else {
            if (item?.title) obj[item?.title] = data?.value ?? "no data";
          }
          const date = new Date(data?.createdAt ?? "");
          obj["date"] = date?.toLocaleDateString();
          obj["time"] = date?.toLocaleTimeString();
          obj["_id"] = rowData?.length;
        }
      });

      setRowData([obj, ...newda.slice(0, 200)]);
    }
    return () => {};
  }, [socketObj]);

  useEffect(() => {
    console.log("this is row data", rowData);
  }, [rowData]);

  return (
    <div className="flex min-w-full justify-start overflow-auto">
      <div className="flex min-w-[1200px] min-h-[40vh]">
        {rowData?.length && columns?.length && (
          <ListDataGrid
            RowsData={rowData ?? []}
            columns={columns}
            title={"data"}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
        )}
      </div>
    </div>
  );
};
export default AgGridLive;

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 120,
  },
  {
    field: "time",
    headerName: "Time",
    width: 130,
  },
  {
    field: "humidity",
    headerName: "Humidity",
    width: 120,
  },
  {
    field: "temp3",
    headerName: "Temp3",
    width: 120,
  },
  {
    field: "noname",
    headerName: "",
    width: 80,
  },
  {
    field: "temp",
    headerName: "Temp",
    width: 100,
  },
  {
    field: "temp2",
    headerName: "Temp2",
    width: 100,
  },
];

const row = [
  {
    date: "4/29/2023",
    humidity: 36.5,
    temp: 27.4,
    temp2: "no data",
    temp3: 25.3,
    time: "12:36:02 AM",
  },
  {
    date: "4/29/2023",
    humidity: 36.5,
    temp: 27.4,
    temp2: "43",
    temp3: 25.3,
    time: "12:36:03 AM",
  },
];
const column = [
  {
    field: "date",
    headerName: "date",
    width: 120,
  },
  {
    field: "time",
    headerName: "time",
    width: 130,
  },
  {
    field: "humidity",
    headerName: "humidity",
    width: 80,
  },
  {
    field: "temp3",
    headerName: "temp3",
    width: 80,
  },
  {
    field: "noname",
    width: 80,
  },
  {
    field: "temp",
    headerName: "temp",
    width: 80,
  },
  {
    field: "temp2",
    headerName: "temp2",
    width: 80,
  },
];
