import React, { useEffect, useMemo, useRef, useState, } from 'react';
import { SensorWebsocketRealTimeDataType } from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
// import { useExportData } from 'react-table-plugins'
import { useExportData } from 'react-table-plugins';
import domtoimage from 'dom-to-image';

import filePdf from '@iconify/icons-uiw/file-pdf';
import plusIcon from '@iconify/icons-typcn/plus';
import chartLine from '@iconify/icons-healthicons/chart-line';
import pageHeaderEdit from '@iconify/icons-fluent-mdl2/page-header-edit';


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
import LoadingOne, { LoadingTwo } from 'src/components/loader/default';



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
  isDense?: boolean;
  rowNumbers?: number;
  ExportCsv?: boolean
  ExportExcel?: boolean
  ExportPdf?: boolean
  ExportPdfChart?: boolean
  ExportPdfChartHeader?: boolean
}
type ExportDataType<D extends Record<string, unknown>> = {
  exportData?: any;
}
const ReactTable: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
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
  const headerRef = useRef<HTMLDivElement>(document.getElementById('analytics-header') as HTMLDivElement);
  const [dense, setDense] = useState<boolean>(false);
  const [gotoNumber, setGotoNumber] = useState<string>('0')
  function handleGeneratePDF() {

  }
  function getExportFileBlob({ columns, data, fileType, fileName }: {
    columns: any; data: any; fileType: any;
    fileName: any;
  }): any {
    // setLoading(true)

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


      if (true) {
        html2canvas(document.getElementById('chart-analytics') as HTMLDivElement).then((canvas) => {
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

    if (fileType === "pdf+chart+header") {
      setLoading(true)
      const headerNames = columns.map((column: any) => column.exportValue);
      // const doc: any = new JsPDF();
      const refd = document.getElementById('analytics-header') as HTMLDivElement
      const options = { bgcolor: '#FFFFFF' };
      domtoimage.toPng(refd, { quality: 100, bgcolor: '#FFFFFF' }).then((dataUrl) => {
        var img = new Image()
        img.src = dataUrl

        html2canvas(document.getElementById('chart-analytics') as HTMLDivElement).then(async (canvas) => {
          //console.log('header')
          const imgData = canvas.toDataURL('image/png');
          // const imgDataOfHeader = canvasHeader.toDataURL('image/png');


          // document.body.appendChild(img)


          const doc: any = new JsPDF('p', 'px', 'a4');
          // doc.
          // const imgProps = doc.getImageProperties(img);

          // const pdfWidth = doc.internal.pageSize.getWidth();
          // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          const imgWidth = doc.internal.pageSize.getWidth();
          const imgHeight = canvas.height * imgWidth / canvas.width;

          const imgWidthHeader = doc.internal.pageSize.getWidth();
          const imgHeightHeader = img.height * imgWidthHeader / img.width;

          doc?.addImage(img, 'PNG', 0, 0, imgWidthHeader, imgHeightHeader);
          doc?.addImage(imgData, 'PNG', 0, imgHeightHeader, imgWidth, imgHeight);

          // doc.
          // doc.addPage();
          var cellStyles = {
            height: 4, // Set the cell height to 12 pixels
          };
          doc?.autoTable({
            head: [headerNames],
            body: data,
            margin: { top: 5 },
            startY: imgHeight + imgHeightHeader + 20,
            styles: {
              lineColor: [0, 0, 0], lineWidth: 0.5,
              minCellHeight: !dense ? 16 : 12,
              height: 8,
              halign: "center",
              valign: 'middle',
              fontSize: !dense ? 11 : 8,
              cellPadding: 0.5,
            },
            // columnStyles: {
            //   0: { valign: "top" },
            //   1: {
            //     fontStyle: 'bold',
            //     halign: 'center',
            //   },
            //   2: {
            //     fontStyle: 'bold',
            //     halign: 'center',
            //   },
            //   3: {
            //     fontStyle: 'bold',
            //     halign: 'center',
            //   },
            // },
            bodyStyles: {
              cellStyles: cellStyles,
            }, willDrawCell: function (data: any) {
              // check if the cell text is "no data"
              if (data.cell.text == "no data") {
                // change the fill color to red
                doc.setFillColor(255, 0, 0);
              }
            }


          })
          doc.save(`${fileName}.pdf`);
          setLoading(false)

        }).catch(function (err) {
          //console.log(err)
          setLoading(false)

        }).catch(function (err) {
          //console.log(err)
          setLoading(false)

        })

      })




      return false;
    }
    // Other formats goes here
    return false;
  }




  useEffect(() => {
    // pageOptions.length = 50
  }, [pageSizeOptions])




  const ExportButtons: any = () => {

    return <>
      {(props.ExportPdfChartHeader || props.ExportPdfChart || props.ExportCsv || props.ExportExcel || props.ExportPdf) &&
        <div className='flex w-full justify-end'>
          {props.ExportPdfChartHeader && <button
            className='flex bg-blue-900 border-[var(--text-color)] border p-1 items-center justify-center rounded-md m-1 w-[90px] h-[32px] text-[var(--text-color)]'
            onClick={() => {
              exportData("pdf+chart+header", true);
            }}
          >
            {!loading && <> <Icon icon={filePdf} color={'#f13232'} height="22" />
              <Icon icon={plusIcon} height="22" />
              <Icon icon={chartLine} color={'cyan'} height="22" />
              <Icon icon={plusIcon} height="22" />
              <Icon icon={pageHeaderEdit} color={'white'} height="22" /></>}
            {
              loading && <div className="flex h-fit scale-50">
                <LoadingOne /></div>
            }
          </button>}
          {props.ExportPdfChart && <button
            className='flex bg-blue-900 border-[var(--text-color)] border p-1 items-center justify-center rounded-md m-1 w-[68px] h-[32px] text-[var(--text-color)]'
            onClick={() => {
              exportData("pdf+chart", true);
            }}
          >
            <Icon icon={filePdf} color={'#f13232'} height="22" />
            <Icon icon={plusIcon} height="22" />
            <Icon icon={chartLine} color={'cyan'} height="22" />
          </button>}
          {props.ExportCsv && <button
            className='m-1 w-[32px] h-[32px] text-[var(--text-color)]'
            onClick={() => {
              exportData("csv", true);
            }}
          >
            <Icon icon="eos-icons:csv-file" height="32" />
          </button>}
          {props.ExportExcel && <button
            className='text-[#49ed49] m-1 w-[32px] h-[32px] text-[var(--text-color)]'
            onClick={() => {
              exportData("xlsx", true);
            }}
          >
            <Icon icon="icon-park-twotone:excel" height="32" />
          </button>}
          {props.ExportPdf && <button
            className='text-[#f13232] m-1 w-[32px] h-[32px] text-[var(--text-color)]'
            onClick={() => {
              exportData("pdf", true);
            }}
          >
            <Icon icon={filePdf} height="32" />
          </button>}
        </div>}
    </>
  }




  const ControlButtons: any = () => {

    return <>{props.hasPagination && (
      <div className="flex justify-center text-[24px] w-full h-10 mb-2 mt-2 scale-75">
        {props?.rowNumbers && <select
          className={classes.inpt + ' mx-2'}
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
        {props?.rowNumbers &&
          <div className='flex border-r border-l mx-2 px-2'>
            <input
              id='goto-input'
              className={classes.inpt + ' w-[100px] mx-2'}
              // value={gotoNumber}
              type='number'
            // onChange={(e) => {
            //   setGotoNumber((e.target.value));
            // }}
            />
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'explore'}
              onClick={() => gotoPage(Number((document?.getElementById('goto-input') as HTMLInputElement)?.value ?? 1) - 1)}
            // disabled={!canPreviousPage}
            >
              {t('goTo')}
            </ThemeButton>
          </div>
        }
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

        {props.isDense &&

          <div className='flex  mx-2 content'>
            <label className='flex mx-2' htmlFor={'isDense'}>dense</label>
            <div className="content2">
              <label className="checkBox2">
                <input
                  onClick={() => setDense(val => !val)}
                  checked={dense}
                  id="ch1" type="checkbox" />
                <div className="transition2"></div>
              </label>
            </div>
            {/* <label className='flex w-full' htmlFor={'isDense'}>dense</label>
            <input
              id='isDense'
              className={"flex text-center w-[20px] h-[20px]  text-[12px] items-center"}
              type='checkbox'
              onClick={() => setDense(val => !val)}
              checked={dense}
            /> */}
          </div>
        }
      </div>
    )}

    </>
  }





  return (
    <>
      {props.columns.length && props.data.length ? <div className="flex flex-wrap w-full h-fit items-start relative">
        <div className='flex w-full'>

          {props?.hasSearch && (
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          )}
          <ExportButtons />
        </div>
        {props?.isDense && <ControlButtons />}
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
                                // console.log('clicked', row.original._id);
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
        <ControlButtons />
      </div> : <div className='flex w-full h-full items-ceneter justify-center text-4xl'>
        No Data
      </div>}
    </>
  );
};

export default ReactTable;




