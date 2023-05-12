import React, { useEffect, useMemo, useState } from 'react';
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
import SensorItem from './SensorItem';
import SensorUnit from './SensorUnit';
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
} from 'react-table';

import mockdata from './MOCK_DATA.json';
// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));
import classes from './devicetable.module.scss';
import { GlobalFilter } from '../Table/GlobalFilter';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import ReactTable from '../Table/ReactTable';
import { Icon } from '@iconify/react';
import {
  removeSelectedSensors,
  selectSelectedSensorsAnalize,
  setSelectedSensors,
  setSelectedSensorsAdvanced,
} from 'src/store/slices/analizeSlice';
import { useTranslation } from 'react-i18next';

interface Props {
  index?: number;
}

const DeviceTable: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const queryDevices = useQuery('devices', GetDevices);
  const selectedSensorRedux = useAppSelector(selectSelectedSensorsAnalize);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [selectedRowSensor, setSelectedRowSensor] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<
    DevicesReceiveType | undefined
  >(undefined);

  const dispatch = useAppDispatch();

  function ClickSelectSensor(sensor: SensorsReceiveTpe) {
    // console.log(sensor);
    dispatch(setSelectedSensorsAdvanced(sensor));
  }

  const data = React.useMemo(
    () =>
      queryDevices.isSuccess === true
        ? queryDevices.data
        : [{ title: 'no data' }],
    [queryDevices?.data],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'device name',
        accessor: 'title',
      },
      {
        Header: 'ports',
        accessor: 'sensors.length',
      },
    ],

    [],
  );
  const columnsSensor = React.useMemo(
    () => [
      {
        Header: 'sensor name',
        accessor: 'title',
      },
      {
        Header: 'port number',
        accessor: 'type',
      },
    ],

    [],
  );
  const columnsSensorInGroup = React.useMemo(
    () => [
      {
        Header: 'Sensor InGroup',
        accessor: 'title',
      },
      {
        Header: 'type',
        accessor: 'type',
      },
    ],

    [],
  );

  useEffect(() => {
    setSelectedDevice(
      queryDevices.data?.find((item) => item._id === selectedRow),
    );
    // console.log(queryDevices.data?.find((item) => item._id === selectedRow));
  }, [selectedRow]);

  return (
    <>
      {/* {queryDevices.data[0].DeviceUniqueName} */}
      <div className="flex justify-center flex-wrap h-[25rem] ">
        <section className="flex items-start flex-wrap h-[20rem] max-w-[20rem] w-[20rem]">
          <span className="mx-4 "> {t('devices')}</span>
          {queryDevices.isSuccess === true && (
            <ReactTable
              hasSearch={true}
              hasPagination={true}
              setSelectedRow={setSelectedRow}
              tHeight=" h-[15rem] "
              columns={columns}
              data={data}
              selectedRow={selectedRow}
            />
          )}
        </section>
        <section className="flex flex-wrap h-[20rem] max-w-[15rem] overflow-hidden w-[20rem]">
          <span className="mx-4 mb-[23px]"> {t('sensors')}</span>
          {selectedDevice?.sensors?.length !== undefined && (
            <ReactTable
              hasPagination={false}
              setSelectedRow={setSelectedRowSensor}
              tHeight=" h-[15rem] "
              columns={columnsSensor}
              data={selectedDevice?.sensors}
              selectedRow={selectedRowSensor}
            />
          )}
        </section>
        <div className="flex flex-wrap w-fit justify-between items-center h-[20rem]">
          <div>
            <aside className="flex items-center h-fit m-1">
              <button
                onClick={() => {
                  const seni = selectedDevice?.sensors?.find(
                    (item) => item._id === selectedRowSensor,
                  );
                  if (seni !== undefined) ClickSelectSensor(seni);
                }}
                className={'mx-2 border p-1 rounded-lg button-add'}
                type="button"
                disabled={
                  undefined ===
                    selectedDevice?.sensors?.find(
                      (item) => item._id === selectedRowSensor,
                    ) ||
                  undefined !==
                    selectedSensorRedux?.find(
                      (item: SensorsReceiveTpe) =>
                        item._id === selectedRowSensor,
                    )
                }
              >
                <Icon icon={'material-symbols:add'} />
              </button>
            </aside>
            <div className="flex w-full justify-center">
              {selectedSensorRedux?.length}
            </div>
            <aside className="flex items-center h-fit m-1">
              <button
                onClick={() => {
                  const seni = selectedDevice?.sensors?.find(
                    (item) => item._id === selectedRowSensor,
                  );
                  if (selectedRowSensor !== undefined)
                    dispatch(removeSelectedSensors(selectedRowSensor));
                }}
                className="mx-2 border p-1 rounded-lg button-remove"
                type="button"
                disabled={
                  undefined ===
                  selectedSensorRedux?.find(
                    (item: SensorsReceiveTpe) => item._id === selectedRowSensor,
                  )
                }
              >
                <Icon icon={'material-symbols:remove'} />
              </button>
            </aside>
          </div>
        </div>
        <section className="flex flex-wrap h-[20rem] max-w-[15rem] overflow-hidden w-[20rem]">
          <span className="mx-4 mb-[23px]"> {t('group')}</span>
          {selectedSensorRedux?.length && (
            <span className="mx-4 mb-[23px]">
              {selectedSensorRedux.length} {t('pcs')} {t('sensor')}
            </span>
          )}
          {selectedSensorRedux?.length !== undefined && (
            <ReactTable
              hasPagination={false}
              setSelectedRow={setSelectedRowSensor}
              tHeight=" h-[15rem] "
              columns={columnsSensorInGroup}
              data={selectedSensorRedux}
              selectedRow={selectedRowSensor}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default DeviceTable;
