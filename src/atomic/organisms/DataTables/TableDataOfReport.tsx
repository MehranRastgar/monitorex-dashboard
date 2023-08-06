import React, { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import ListDataGrid from '../../molecules/device/ListDataGrid';
import Item from '../../atoms/Item/Item';
import {
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectDevicesData,
  setDevicesData,
  setDevicesStatus,
  setSelectedDevice,
} from '../../../store/slices/devicesSlice';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { GetDevices } from '../../../api/devices';
import { SensorsReceiveTpe } from '../../../components/pages/sensors/sensorsTable';
import ReactTable from 'src/atomic/molecules/Table/ReactTable';
import { SensorsReportType, selectGranularity, selectSensorReports, selectStatusReportApi, setGranularity, setTable } from 'src/store/slices/analizeSlice';
import HighchartsData from 'src/class/chart';
import { selectCalendarMode } from 'src/store/slices/themeSlice';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import classes from '/src/atomic/molecules/Table/table.module.scss'
interface Props { }
const TableDataOfReport: React.FC<Props> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const granularity = useAppSelector(selectGranularity)
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  // const [granularity, setGranularity] = React.useState<number>(1);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [update, setUpdate] = useState<boolean>(false);

  const selectDataOFChart = useAppSelector(selectSensorReports);
  const selectCalendar = useAppSelector(selectCalendarMode);
  const statusReportApi = useAppSelector(selectStatusReportApi);
  const [data, setData] = useState<object[]>([])
  const [columns, setColumns] = useState<{
    Header: string,
    id?: string,
    accessor: any
  }[]>([])

  // const data = React.useMemo(
  //   () =>
  //     queryDevices.isSuccess === true
  //       ? queryDevices.data
  //       : [{ title: 'no data' }],
  //   [queryDevices?.data],
  // );
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'N',
  //       id: 'index',
  //       accessor: (_row: any, i: number) => i + 1,
  //     },
  //     {
  //       Header: 'device name',
  //       accessor: 'title',
  //     },
  //     {
  //       Header: 'ports',
  //       accessor: 'sensors.length',
  //     },
  //   ],

  //   [],
  // );





  function makeData() {
    const chart = new HighchartsData([])
    chart.dateJalali = selectCalendar === 'fa'
    const { columns, data } = chart.makeDataForTable(selectDataOFChart ?? [], granularity ?? 1)
    setColumns(columns)
    setData(data)
    // dispatch(setTable({ TableColumns: columns, TableDatas: data }))
    // console.log(columns)
  }



  React.useEffect(() => {
    makeData()
    // makeData2(selectDataOFChart)
  }, [selectDataOFChart, selectCalendar, granularity]);


  return (
    <>
      <section className="flex items-start flex-wrap h-[auto] min-h-[600px] mb-[1rem]">
        <div className='flex h-auto'>
          <SetGranularity />
        </div>
        {/* <span className="mx-4 "> {t('sensors')}</span>{columns.length - 2}
        {selectDataOFChart?.map((item, index) =>
          <div key={index}>,{item?.data?.length},</div>
        )} */}
        {statusReportApi === 'success' && columns.length > 1 && (
          <ReactTable
            ExportExcel={true}
            ExportCsv={false}
            // ExportPdfChart={true}
            ExportPdfChartHeader={true}
            isDense={true}
            rowNumbers={50}
            hasSearch={true}
            hasPagination={true}
            setSelectedRow={() => { }}
            tHeight=" h-[auto]"
            columns={columns}
            data={data}
            selectedRow={''}
          />
        )}
      </section>
    </>
  );
}
export default TableDataOfReport;


export const SetGranularity: any = () => {

  const dispatch = useAppDispatch();
  const granularity = useAppSelector(selectGranularity)
  const gran = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]



  return <div className='flex m-2 h-fit flex-wrap mx-4'>
    <label className='flex w-full h-fit' htmlFor='Granularity'>Step Devider</label>
    <select id='Granularity' className={classes.inpt + ' max-h-[40px]'} onChange={(e) => {
      dispatch(setGranularity(parseInt(e.target.value)))
    }} value={granularity?.toString() ?? 1}>
      {gran.map((item, index) =>
        <option value={item} key={index}>{item}</option>
      )
      }
    </select>
  </div>
}




// 'use strict';

// import { createRoot } from 'react-dom/client';
// import { AgGridReact } from '@ag-grid-community/react';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// // import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
// // import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
// // import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-alpine.css';

// import { ModuleRegistry } from '@ag-grid-community/core';
// // Register the required feature modules with the Grid
// ModuleRegistry.registerModules([ClientSideRowModelModule,]);

// // this is a hook, but we work also with classes
// function MyRenderer(params) {
//   return (
//     <span className="my-renderer">
//       <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
//       {params.value}
//     </span>
//   );
// }

// function GridExample() {

//   // never changes, so we can use useMemo
//   const columnDefs = useMemo(() => [
//     { field: 'athlete' },
//     { field: 'age', cellRenderer: MyRenderer },
//     { field: 'country' },
//     { field: 'year' },
//     { field: 'date' },
//     { field: 'sport' },
//     { field: 'gold' },
//     { field: 'silver' },
//     { field: 'bronze' },
//     { field: 'total' }
//   ], []);

//   // never changes, so we can use useMemo
//   const defaultColDef = useMemo(() => ({
//     resizable: true,
//     sortable: true
//   }), []);

//   // changes, needs to be state
//   const [rowData, setRowData] = useState();

//   // gets called once, no dependencies, loads the grid data
//   useEffect(() => {
//     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//       .then(resp => resp.json())
//       .then(data => setRowData(data));
//   }, []);

//   return (
//     <AgGridReact
//       className="ag-theme-alpine"
//       animateRows="true"
//       columnDefs={columnDefs}
//       defaultColDef={defaultColDef}
//       enableRangeSelection="true"
//       rowData={rowData}
//       rowSelection="multiple"
//       suppressRowClickSelection="true"
//     />
//   );
// }

// const root = createRoot(document.getElementById('root'));
// root.render(<GridExample />);;