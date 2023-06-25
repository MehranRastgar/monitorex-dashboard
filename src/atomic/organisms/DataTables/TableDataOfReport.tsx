import React, { useState } from 'react';
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
        <div className='flex h-fit'>
          <SetGranularity />
        </div>
        {/* <span className="mx-4 "> {t('sensors')}</span>{columns.length - 2}
        {selectDataOFChart?.map((item, index) =>
          <div key={index}>,{item?.data?.length},</div>
        )} */}
        {statusReportApi === 'success' && columns.length > 1 && (
          <ReactTable
            ExportPdf={true}
            ExportCsv={true}
            ExportPdfChart={true}
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
    <label className='flex w-full h-fit' htmlFor='Granularity'>Granularity</label>
    <select id='Granularity' className={classes.inpt + ' max-h-[30px]'} onChange={(e) => {
      dispatch(setGranularity(parseInt(e.target.value)))
    }} value={granularity?.toString() ?? 1}>
      {gran.map((item, index) =>
        <option value={item} key={index}>{item}</option>
      )
      }
    </select>
  </div>
}