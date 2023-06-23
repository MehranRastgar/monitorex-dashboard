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
import { SensorsReportType, selectSensorReports, selectStatusReportApi, setTable } from 'src/store/slices/analizeSlice';
import HighchartsData from 'src/class/chart';
import { selectCalendarMode } from 'src/store/slices/themeSlice';

interface Props { }
const TableDataOfReport: React.FC<Props> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const [selectedRow, setSelectedRow] = useState<string>('');

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
    const { columns, data } = chart.makeDataForTable(selectDataOFChart ?? [])
    setColumns(columns)
    setData(data)
    dispatch(setTable({ TableColumns: columns, TableDatas: data }))
    console.log(columns)
  }



  React.useEffect(() => {
    makeData()
    // makeData2(selectDataOFChart)
  }, [selectDataOFChart, selectCalendar]);

  return (
    <>
      <section className="flex items-start flex-wrap h-[auto] min-h-[600px] mb-[1rem]">
        <span className="mx-4 "> {t('sensors')}</span>{columns.length - 2}
        {selectDataOFChart?.map((item, index) =>
          <div key={index}>,{item?.data?.length},</div>
        )}
        {statusReportApi === 'success' && columns.length > 1 && (
          <ReactTable
            isDense={true}
            rowNumbers={50}
            downloadAsExcel='excel'
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