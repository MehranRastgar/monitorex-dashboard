import React, { useEffect, useMemo, useRef, useState, } from 'react';
import { SensorWebsocketRealTimeDataType } from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
// import { useExportData } from 'react-table-plugins'
import { useExportData } from 'react-table-plugins';


import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  HeaderGroup,
  HeaderPropGetter,
  TableInstance,
  usePagination,
  UsePaginationInstanceProps,
  UseSortByInstanceProps,
  UsePaginationState,
  UseFiltersInstanceProps,
  UseGlobalFiltersInstanceProps,
  TableState,
  UseGlobalFiltersOptions,
  UseFiltersColumnOptions,
  UseGlobalFiltersColumnOptions,
  UseGroupByColumnOptions,
  UseResizeColumnsColumnOptions,
  UseSortByColumnOptions,
  UseFiltersColumnProps,
  UseGroupByColumnProps,
  UseResizeColumnsColumnProps,
  UseSortByColumnProps,
  Column,
  HeaderGroupPropGetter,
  CellPropGetter,
  useRowSelect,
  TableOptions,

} from 'react-table';
import Papa from "papaparse";
import XLSX from "xlsx"
import JsPDF from "jspdf"
import "jspdf-autotable";

// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));
import classes from './table.module.scss';
import { GlobalFilter } from '../Table/GlobalFilter';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import html2canvas from 'html2canvas';



export type TableInstanceWithHooks<T extends object> =
  TableInstance<T> &
  UseFiltersInstanceProps<T> &
  UseGlobalFiltersInstanceProps<T> &
  TableState &
  UsePaginationInstanceProps<T> &
  ExportDataType<any> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T> & UseGlobalFiltersOptions<T>;
  };

export interface ColumnInstance<
  D extends Record<string, unknown> = Record<string, unknown>,
> extends UseFiltersColumnProps<D>,
  UseGroupByColumnProps<D>,
  UseResizeColumnsColumnProps<D>,
  // UseExportDataState<D>,
  UseSortByColumnProps<D> { }


interface Props {
  hasPagination?: boolean;
  hasSearch?: boolean;
  data: object[];
  columns: Column<any>[];
  tHeight?: string;
  setSelectedRow?: any;
  selectedRow: string;
  index?: number;
  downloadAsExcel?: string
  isDense?: boolean;
  rowNumbers?: number;
}
type ExportDataType<D extends Record<string, unknown>> = {
  exportData?: any;
}
const ReactTable: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(
    () => props.columns,

    [props.columns],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    pageOptions,
    preGlobalFilteredRows,
    gotoPage,
    setGlobalFilter,
    setPageSize,
    state,
    exportData
  } = useTable<any>(
    {
      columns,
      data,
      getExportFileBlob
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
    useExportData as any
  ) as TableInstanceWithHooks<any>;

  const { globalFilter, pageIndex, pageSize } = state;
  const pageSizeOptions = [10, 50, 100];
  const chartRef = useRef<HTMLDivElement>(document.getElementById('chart-analytics') as HTMLDivElement);
  const [dense, setDense] = useState<boolean>(false);

  function handleGeneratePDF() {

  }
  function getExportFileBlob({ columns, data, fileType, fileName }: { columns: any; data: any; fileType: any; fileName: any; }): any {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns.map((col: any) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example
      const header = columns.map((c: any) => c.exportValue);
      const compatibleData = data.map((row: any) => {
        const obj: any = {};
        header.forEach((col: any, index: number) => {
          obj[col] = row[index];
        });
        return obj;
      });

      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    if (fileType === "pdf") {
      const headerNames = columns.map((column: any) => column.exportValue);
      const doc: any = new JsPDF('p', 'px', 'a4');
      var cellStyles = {
        height: 8, // Set the cell height to 12 pixels
      };
      // doc.// Set the starting position for the table
      // var startX = 5;
      // var startY = 5;

      // // Set the cell dimensions
      // var cellWidth = 30;
      // var cellHeight = 5;

      // // Draw the table headers
      // doc?.setFontSize(12);
      // // doc?.setFontStyle("bold");
      // for (var i = 0; i < headerNames.length; i++) {
      //   doc.cell(startX + i * cellWidth, startY, cellWidth, 0, headerNames[i], i);
      // }

      // // Draw the table rows
      // doc?.setFontSize(8);
      // // doc?.setFontStyle("normal");
      // for (var i = 0; i < data.length; i++) {
      //   for (var j = 0; j < columns.length; j++) {
      //     doc.cell(startX + j * cellWidth, 15 + (i + 1) * cellHeight, cellWidth, i !== 0 ? 25 : 25, data[i][j].toString(), i);
      //   }
      // }

      doc?.autoTable({
        head: [headerNames],
        body: data,
        margin: { top: 5 },
        styles: {
          lineColor: [0, 0, 0], lineWidth: 0.5,
          minCellHeight: !dense ? 16 : 12,
          height: 12,
          halign: "center",
          valign: "center",
          fontSize: !dense ? 11 : 8,
          cellPadding: 0.5,
        },
        bodyStyles: {
          cellStyles: cellStyles,
        },
      });

      doc.save(`${fileName}.pdf`);

      return false;
    }
    if (fileType === "pdf+chart") {
      const headerNames = columns.map((column: any) => column.exportValue);
      // const doc: any = new JsPDF();
      const chart = chartRef.current;


      if (chart) {
        html2canvas(chart).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const doc: any = new JsPDF('p', 'px', 'a4');
          // doc.
          const imgWidth = doc.internal.pageSize.getWidth();
          const imgHeight = canvas.height * imgWidth / canvas.width;
          doc?.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          // doc.
          // doc.addPage();
          var cellStyles = {
            height: 8, // Set the cell height to 12 pixels
          };
          doc?.autoTable({
            head: [headerNames],
            body: data,
            margin: { top: 5 },
            startY: imgHeight + 20,
            styles: {
              lineColor: [0, 0, 0], lineWidth: 0.5,
              minCellHeight: !dense ? 16 : 12,
              height: 12,
              halign: "center",
              valign: "center",
              fontSize: !dense ? 11 : 8,
              cellPadding: 0.5,
            },
            bodyStyles: {
              cellStyles: cellStyles,
            }, willDrawCell: function (data: any) {
              // check if the cell text is "no data"
              if (data.cell.text == "no data") {
                // change the fill color to red
                doc.setFillColor(255, 0, 0);
              }
            }
          });

          doc.save(`${fileName}.pdf`);
        });
      }
      return false;
    }

    // Other formats goes here
    return false;
  }




  useEffect(() => {
    // pageOptions.length = 50
  }, [pageSizeOptions])




  return (
    <>
      {props.columns.length && props.data.length ? <div className="flex flex-wrap w-full h-fit items-start relative">
        <div className='flex w-full'>

          {props?.hasSearch && (
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          )}
          {props.downloadAsExcel && <div className='flex w-full justify-end'>
            <button
              className='flex border p-1 items-center justify-center rounded-md m-1 w-[68px] h-[32px] text-[var(--text-color)]'
              onClick={() => {
                exportData("pdf+chart", true);
              }}
            >
              <Icon icon="uiw:file-pdf" color={'#f13232'} height="22" />
              <Icon icon="typcn:plus" height="22" />
              <Icon icon="healthicons:chart-line" color={'cyan'} height="22" />
            </button>
            <button
              className='m-1 w-[32px] h-[32px] text-[var(--text-color)]'
              onClick={() => {
                exportData("csv", true);
              }}
            >
              <Icon icon="eos-icons:csv-file" height="32" />
            </button>
            <button
              className='text-[#49ed49] m-1 w-[32px] h-[32px] text-[var(--text-color)]'
              onClick={() => {
                exportData("xlsx", true);
              }}
            >
              <Icon icon="icon-park-twotone:excel" height="32" />
            </button>
            <button
              className='text-[#f13232] m-1 w-[32px] h-[32px] text-[var(--text-color)]'
              onClick={() => {
                exportData("pdf", true);
              }}
            >
              <Icon icon="uiw:file-pdf" height="32" />
            </button>
          </div>}
        </div>
        {props.hasPagination && props?.isDense && (
          <div className="flex justify-center w-full h-10 mt-2 scale-75">
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'activate'}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {t('prev')}
            </ThemeButton>
            <span className="mx-2">
              {pageIndex + 1} / {pageOptions?.length}
            </span>
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'activate'}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {t('next')}
            </ThemeButton>
            {props?.rowNumbers && <select
              className={classes.inpt}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {pageSizeOptions?.map((size) => (
                <option key={size} value={size}>
                  Show {size} per Page
                </option>
              ))}
            </select>}
            {props?.rowNumbers && <select
              className={classes.inpt + ' mx-2'}
              value={pageIndex}
              onChange={(e) => {
                gotoPage(Number(e.target.value));
              }}
            >
              {pageOptions?.map((size) => (
                <option key={size} value={size}>
                  Goto page {size + 1}
                </option>
              ))}
            </select>}
            {props.isDense && <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={dense ? 'explore' : 'deactivate'}
              onClick={() => setDense(val => !val)}
            // disabled={!canPreviousPage}
            >
              {t('dense')}
            </ThemeButton>}
          </div>
        )}
        <div
          className={`flex h-full items-start flex-wrap w-full overflow-y-scroll ${props?.tHeight !== undefined ? ` ${props?.tHeight} ` : ' h-[15rem] '
            } `}
        >
          <div className="w-full">
            <table className={classes.table} {...getTableProps()}>
              <thead>
                {headerGroups?.map((headerGroup, indexOne) => (
                  <tr
                    key={indexOne + 'headerGroups'}
                    {...(headerGroup?.getHeaderGroupProps() as HeaderGroupPropGetter<any>)}
                  >

                    {headerGroup.headers.map((columns: any, colIndex) => (
                      // {columns?.getSortByToggleProps() !== undefined && (
                      <th
                        key={colIndex + 'colindex'}
                        className=" border  p-1"
                        {...columns.getHeaderProps(columns?.getSortByToggleProps() !== undefined &&
                          columns.getSortByToggleProps() as HeaderPropGetter<object>,
                        )}
                      >
                        {columns.render('Header')}
                        <span className="text-xs mx-1">
                          {columns.isSorted
                            ? columns.isSortedDesc
                              ? '▼'
                              : '▲'
                            : ''}
                        </span>
                      </th>
                      // )}
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="justify-center overflow-y-auto  "
                {...getTableBodyProps()}
              >
                {props?.hasPagination ? (
                  <>
                    {page.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          className={dense ? classes.table_dense : ""}
                          key={index}
                          {...(row.getRowProps() as HeaderGroupPropGetter<any>)}
                        >
                          {row.cells.map((cell, indexw) => (
                            <td
                              onClick={() => { props?.setSelectedRow(row.original._id) }}
                              key={indexw + 'index-xw'}
                              className={
                                'p-1 border ' &&
                                  row.original._id === props.selectedRow
                                  ? classes.table_selected
                                  : ''
                              }
                              {...(cell.getCellProps() as CellPropGetter<any>)}
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {rows.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          className={dense ? classes.table_dense : ""}
                          key={index + "row-index"}
                          {...(row.getRowProps() as HeaderGroupPropGetter<any>)}
                        >
                          {row.cells.map((cell, indexw) => (
                            <td
                              onClick={() => {
                                console.log('clicked', row.original._id);
                                props?.setSelectedRow(row.original._id);
                              }}
                              key={indexw + 'indexw-prepare'}
                              className={
                                'p-1 border ' &&
                                  row.original._id === props.selectedRow
                                  ? classes.table_selected
                                  : ''
                              }
                              {...(cell.getCellProps() as CellPropGetter<any>)}
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {props.hasPagination && (
          <div className="flex justify-center w-full h-10 mt-2 scale-75">
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'activate'}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {t('prev')}
            </ThemeButton>
            <span className="mx-2">
              {pageIndex + 1} / {pageOptions?.length}
            </span>
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'activate'}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {t('next')}
            </ThemeButton>
            {props?.rowNumbers && <select
              className={classes.inpt}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {pageSizeOptions?.map((size) => (
                <option key={size} value={size}>
                  Show {size} per Page
                </option>
              ))}
            </select>}
            {props?.rowNumbers && <select
              className={classes.inpt + ' mx-2'}
              value={pageIndex}
              onChange={(e) => {
                gotoPage(Number(e.target.value));
              }}
            >
              {pageOptions?.map((size) => (
                <option key={size} value={size}>
                  Goto page {size + 1}
                </option>
              ))}
            </select>}
            {props.isDense && <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={dense ? 'explore' : 'deactivate'}
              onClick={() => setDense(val => !val)}
            // disabled={!canPreviousPage}
            >
              {t('dense')}
            </ThemeButton>}
          </div>
        )}
      </div> : <div className='flex w-full h-full items-ceneter justify-center text-4xl'>
        No Data
      </div>}
    </>
  );
};

export default ReactTable;