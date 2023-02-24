import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useTranslation } from "react-i18next";

interface Props {
  column: { field: string; filter?: boolean }[];
  rowdata: {}[];
}

const AgGrid: React.FC<Props> = (props) => {
  const gridRef = useRef<any>(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState<any[]>(); // Set rowData to Array of Objects, one Object per Row
  const { t } = useTranslation();
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState(props.column);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({ sortable: true }), []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  const onBtNormal = useCallback(() => {
    var eGridDiv = document.querySelector("#myGrid") as HTMLElement;
    eGridDiv.style.width = "400px";
    eGridDiv.style.height = "200px";
    // Same as setting to 'normal' as it is the default
    gridRef.current.api.setDomLayout();
  }, []);
  const onBtPrinterFriendly = useCallback(() => {
    makeLighterData();
    var eGridDiv = document.querySelector("#myGrid") as HTMLElement;
    if (
      eGridDiv?.style?.width !== undefined &&
      eGridDiv?.style?.height !== undefined
    ) {
      eGridDiv.style.width = "";
      eGridDiv.style.height = "";
      gridRef.current.api.setDomLayout("print");
    }
  }, []);
  // Example load data from sever
  useEffect(() => {
    // fetch("https://www.ag-grid.com/example-assets/row-data.json")
    //   .then((result) => result.json())
    //   .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e: any) => {
    gridRef.current.api.deselectAll();
  }, []);

  function makeLighterData() {
    const divider = Math.floor(props.rowdata.length / 100);
    console.log(divider);
    const arr: any[] = [];
    props.rowdata.map((item, index) => {
      if (index % divider === 0 || index === 0) {
        arr.push(item);
      }
    });
    setRowData(arr);
  }

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  return (
    <div className="flex flex-wrap w-full justify-center">
      <div className="flex w-full justify-center">
        <button
          className="flex border p-2 rounded-lg bg-white-600 m-2 text-black font-Vazir-Medium"
          onClick={onBtPrinterFriendly}
        >
          {t("sensorsPointsData")}
        </button>
        {/* <button
          className="flex border p-2 rounded-lg bg-slate-600"
          onClick={onBtNormal}
        >
          Normal
        </button> */}
      </div>
      {/* Example using Grid's API */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ width: 0, height: 0 }}
      >
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
export default AgGrid;
