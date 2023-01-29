import * as React from "react";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid, GridToolbar, GridToolbarExport } from "@mui/x-data-grid";
import { GridPrintExportOptions } from "@mui/x-data-grid";
import { useReactToPrint } from "react-to-print";

export default function DataGridReports({ reportData }: { reportData: any }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
    documentTitle: "report-data",
    onAfterPrint: () => alert("Print Success"),
  });
  // const { data, loading } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 40,
  //   maxColumns: 12,
  // });
  React.useEffect(() => {
    console.log("reportDatareportDatareportDatareportData::::", reportData);
  }, [reportData]);
  return (
    <>
      <div ref={inputRef} style={{ height: "800px", width: "100%" }}>
        <DataGrid
          {...reportData}
          getRowId={(row: any) => row.index}
          // loading={loading}
          components={{ Toolbar: GridToolbar }}
          sx={{
            ".MuiTablePagination-selectLabel": {
              display: "none",
            },
            ".MuiDataGrid-selectedRowCount": {
              display: "none",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontFamily: ["Source Sans Bold", "sans-serif"].join(","),
              fontSize: 18,
              color: "var(--header-text-color)",
            },
            ".MuiDataGrid-cellContent": {
              fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
              fontSize: 14,
              fontWeight: 400,
              display: "-ms-inline-grid",
              textAlign: "center",
              color: "var(--header-text-color)",
            },
            ".MuiTablePagination-toolbar": {
              fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
              fontSize: 14,
              fontWeight: 400,
              display: "-ms-inline-grid",
              textAlign: "center",
              color: "var(--header-text-color)",
            },
            "	.MuiDataGrid-cellCheckbox": {},
            boxShadow: 2,
            bgcolor: "var(--bgc)",
            border: 0.5,
            borderRadius: "5px",
            padding: 2,
            borderColor: "var(--sidebar)",
            ".MuiDataGrid-cell:hover": {
              color: "primary.main",
              textAlign: "center",
            },
          }}
        />
      </div>
      <button
        onClick={() => {
          handlePrint();
        }}
      >
        Print
      </button>
    </>
  );
}

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

export function DataGridReportsPrintMode({ reportData }: { reportData: any }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
    documentTitle: "report-data",
    onAfterPrint: () => alert("Print Success"),
  });

  React.useEffect(() => {
    console.log("reportDatareportDatareportDatareportData::::", reportData);
  }, [reportData]);
  return (
    <>
      <div ref={inputRef} style={{ height: "800px", width: "100%" }}>
        <DataGrid
          {...reportData}
          getRowId={(row: any) => row.index}
          // loading={loading}
          components={{ Toolbar: GridToolbar }}
          sx={{
            ".MuiTablePagination-selectLabel": {
              display: "none",
            },
            ".MuiDataGrid-selectedRowCount": {
              display: "none",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontFamily: ["Source Sans Bold", "sans-serif"].join(","),
              fontSize: 18,
              color: "var(--header-text-color)",
            },
            ".MuiDataGrid-cellContent": {
              fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
              fontSize: 14,
              fontWeight: 400,
              display: "-ms-inline-grid",
              textAlign: "center",
              color: "var(--header-text-color)",
            },
            ".MuiTablePagination-toolbar": {
              fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
              fontSize: 14,
              fontWeight: 400,
              display: "-ms-inline-grid",
              textAlign: "center",
              color: "var(--header-text-color)",
            },
            "	.MuiDataGrid-cellCheckbox": {},
            boxShadow: 2,
            bgcolor: "var(--bgc)",
            border: 0.5,
            borderRadius: "5px",
            padding: 2,
            borderColor: "var(--sidebar)",
            ".MuiDataGrid-cell:hover": {
              color: "primary.main",
              textAlign: "center",
            },
          }}
        />
      </div>
    </>
  );
}
