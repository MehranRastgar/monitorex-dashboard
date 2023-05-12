import React, { useEffect, useMemo, useState } from 'react';
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import classes from './devicetable.module.scss';
import { GlobalFilter } from 'src/atomic/molecules/Table/GlobalFilter';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import ReactTable from 'src/atomic/molecules/Table/ReactTable';
import { Icon } from '@iconify/react';
import {
  removeSelectedSensors,
  selectSelectedSensorsAnalize,
  setSelectedSensors,
  setSelectedSensorsAdvanced,
} from 'src/store/slices/analizeSlice';
import { useTranslation } from 'react-i18next';
import { GetOwnUser } from 'src/api/users';

interface Props {
  index?: number;
}

const GroupTable: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const userOwn = useQuery('userOwn', () => GetOwnUser());

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
      userOwn.isSuccess === true ? userOwn.data.groups : [{ title: 'no data' }],
    [userOwn?.data],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'group name',
        accessor: 'title',
      },
      {
        Header: 'sensor',
        accessor: 'sensors.length',
      },
      {
        Header: 'date time',
        accessor: 'date',
      },
    ],

    [],
  );

  useEffect(() => {
    setSelectedDevice(
      userOwn.data?.groups?.find((item) => item._id === selectedRow),
    );
    // console.log(queryDevices.data?.find((item) => item._id === selectedRow));
  }, [selectedRow]);

  return (
    <>
      {/* {queryDevices.data[0].DeviceUniqueName} */}
      <div className="flex justify-center flex-wrap h-[25rem] ">
        <section className="flex items-start flex-wrap h-[20rem] max-w-[30rem] w-[30rem]">
          <span className="mx-4 "> {t('devices')}</span>
          {data !== undefined && (
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
      </div>
    </>
  );
};

export default GroupTable;
