import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { NodeNextRequest } from "next/dist/server/base-http/node";

export default function ListDataGrid({
  title,
  columns,
  RowsData,
  setSelectionModel,
  selectionModel,
  width,
  height,
}: {
  columns: GridColDef[];
  RowsData?: any[];
  title?: string;
  setSelectionModel: React.Dispatch<React.SetStateAction<GridSelectionModel>>;
  selectionModel: GridSelectionModel;
  width?: number | string;
  height?: number | string;
}) {
  const { t } = useTranslation();
  const data = useData(100, 1000);
  const data2 = {
    columns: [...columns],
    rows: [...(RowsData ?? [])],
  };
  // const [selectionModel, setSelectionModel] =
  //   React.useState<GridSelectionModel>([]);

  return (
    <>
      <div
        className={`flex  ${width ? `w-[${width}]` : "w-[100%]"} ${
          height ? `h-[${height}]` : "h-[40vh]"
        }`}
      >
        <DataGrid
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          getRowId={(row: any) => row?._id ?? "null"}
          {...data2}
          rows={RowsData ?? data.rows}
          columns={columns ?? columnsConst}
          columnBuffer={2}
          columnThreshold={2}
          // rowsPerPageOptions={}
          sx={{
            ".MuiDataGrid-row:hover": {
              backgroundColor: "var(--blur-bg)",
            },
            ".MuiDataGrid-virtualScroller": {
              display: "flex",
              justifyContent: "start",
            },
            ".MuiDataGrid-footerContainer": {
              display: "flex",
              justifyContent: "start",
            },
            ".MuiTablePagination-selectLabel": {
              display: "none",
            },
            ".MuiDataGrid-selectedRowCount": {
              display: "none",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontFamily: ["Source Sans Bold", "sans-serif"].join(","),
              fontSize: 14,
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
              display: "flex",
              textAlign: "center",
              color: "var(--header-text-color)",
              justifyItems: "flex-end",
            },
            "	.MuiDataGrid-cellCheckbox": {},

            boxShadow: 2,
            bgcolor: "var(--bgc)",
            border: 0.5,
            borderRadius: "5px",
            padding: 2,
            borderColor: "var(--bgc)",
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

export interface DataRowModel {
  id: GridRowId;
  [price: string]: number | string;
}
const columnsConst: GridColDef[] = [
  {
    field: "_id",
    headerName: "_id",
    width: 85,
  },
  {
    field: "title",
    headerName: "name",
    width: 85,
  },
  {
    field: "title",
    headerName: "name",
    width: 85,
  },
];
export interface GridData {
  columns: GridColDef[];
  rows: DataRowModel[];
}

function useData(rowLength: number, columnLength: number) {
  const [data, setData] = React.useState<GridData>({ columns: [], rows: [] });

  React.useEffect(() => {
    const rows: DataRowModel[] = [];

    for (let i = 0; i < rowLength; i += 1) {
      const row: DataRowModel = {
        id: i,
      };

      for (let j = 1; j <= columnLength; j += 1) {
        row[`price${j}M`] = `${i.toString()}, ${j} `;
      }

      rows.push(row);
    }

    const columns: GridColDef[] = [];

    for (let j = 1; j <= columnLength; j += 1) {
      columns.push({ field: `price${j}M`, headerName: `${j}M` });
    }

    setData({
      rows,
      columns,
    });
  }, [rowLength, columnLength]);

  return data;
}

export function ColumnVirtualizationGrid() {
  const data = useData(100, 1000);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid {...data} columnBuffer={2} columnThreshold={2} />
    </div>
  );
}
