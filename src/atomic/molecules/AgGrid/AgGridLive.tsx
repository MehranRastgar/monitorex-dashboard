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

// import "../../../../styles/index.css";
interface Props {
  column: { field: string; filter?: boolean }[];
  rowdata: {}[];
}

const AgGridLive: React.FC<Props> = (props) => {
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState<any[]>(); // Set rowData to Array of Objects, one Object per Row
  const socketObj = useAppSelector(selectSocketObject);
  const Groups = useAppSelector(selectUserGroups);
  const gpNumber = useAppSelector(selectGroupNumber);
  const [group, setGroup] = useState<GroupItemType | null>(null);

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

  useEffect(() => {
    if (true) {
      const newda: any[] = rowData ?? [];
      let obj = Object.create({
        index: newda?.length ?? "0",
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
        }
      });

      setRowData([obj, ...newda.slice(0, 200)]);
      console.log(obj);
      console.log(rowData);
    }
    return () => {};
  }, [socketObj]);

  useEffect(() => {
    ////console.log("this is row data", rowData);
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
