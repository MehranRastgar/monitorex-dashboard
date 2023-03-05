import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useTranslation } from "react-i18next";
import { selectSensorReports } from "../../../store/slices/analizeSlice";
import { useAppSelector } from "../../../store/hooks";
import {
  SensorsReceiveTpe,
  SensorWebsocketReaktimeDataType,
} from "../../../components/pages/sensors/sensorsTable";
import { socket } from "../../../components/socketio";
// import "../../../../styles/index.css";
interface Props {
  column: { field: string; filter?: boolean }[];
  rowdata: {}[];
}

const AgGridLive: React.FC<Props> = (props) => {
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState<any[]>(); // Set rowData to Array of Objects, one Object per Row

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
    console.log("cellClicked", event);
  }, []);

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

  useEffect(() => {
    if (selectDataOFChart?.[0]?._id !== undefined)
      selectDataOFChart?.map((item: SensorsReceiveTpe, index) => {
        // console.log(item);
        if (item?._id !== undefined)
          socket.on(item?._id, (data: SensorWebsocketReaktimeDataType) => {
            if (data.value === 200000) {
              return;
            }
            // setDataOfWebsocket(data);
            // console.log(state?.chartOptions?.series);

            const newda: any[] = rowData ?? [];
            const ind = rowData?.[rowData.length - 1]?.index ?? 0;
            // console.log(ind);
            const obj = Object.create({
              index: newda?.length ?? 0,
            });
            //   console.log("newdanewda", newda);
            // const find = columnDefs?.findIndex(
            //   (theItem: any) => theItem.id === data.sensorId
            // );
            // console.log("finded series", find, data, newdata);
            // const title = newdata?.[find].data.title;
            // console.log("this is data of websocket", data);
            obj[data?.sensorTitle?.toString() ?? "noname"] =
              data.value ?? "no data";
            const date = new Date(data?.createdAt ?? "");
            obj["date"] = date?.toLocaleDateString();
            obj["time"] = date?.toLocaleTimeString();
            // newda.push(obj);

            //   setRowData([]);
            //   setRowData(newda);

            // setRowData([]);

            setRowData([obj, ...newda.slice(0, 200)]);
          });
      });
    return () => {
      selectDataOFChart?.map((item, index) => {
        socket.off(item?._id);
      });
    };
  }, [selectDataOFChart, rowData]);

  useEffect(() => {
    // console.log("this is row data", rowData);
  }, [rowData]);

  return (
    <div className="flex flex-wrap w-full justify-center">
      <div className="flex w-full justify-center">
        {/* <button
          className="flex border p-2 rounded-lg bg-white-600 m-2 text-black font-Vazir-Medium"
          onClick={onBtPrinterFriendly}
        >
          {t("sensorsPointsData")}
        </button> */}
        {/* <button
          className="flex border p-2 rounded-lg bg-slate-600"
          onClick={onBtNormal}
        >
          Normal
        </button> */}
      </div>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine-dark" style={{ width: 500, height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};
export default AgGridLive;
