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
  reportSensorsAsync,
  selectSelectedSensorsAnalize,
  setEndDate,
  setEndDayjs,
  setSelectedGroup,
  setSelectedSensors,
  setSelectedSensorsAdvanced,
  setStartDate,
  setStartDayjs,
} from 'src/store/slices/analizeSlice';
import { useTranslation } from 'react-i18next';
import { GetOwnUser } from 'src/api/users';
import dayjs, { Dayjs } from 'dayjs';
import { GroupItemType } from 'src/types/types';
import User from 'src/class/user';
import { selectOwnUser, updateUserData } from 'src/store/slices/userSlice';

interface Props {
  index?: number;
}

const GroupTable: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const userOwn = useQuery('userOwn', () => GetOwnUser());
  const userOwnInRedux = useAppSelector(selectOwnUser);

  const selectedSensorRedux = useAppSelector(selectSelectedSensorsAnalize);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [groupA, setgroupA] = useState<GroupItemType | undefined>();
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
        Header: '#',
        id: 'index',
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: 'group name',
        accessor: 'groupTitle',
      },
      {
        Header: 'sensor',
        accessor: 'sensors.length',
      },
      {
        Header: 'time range',
        id: 'timeRange',
        accessor: (row: any, i: number) =>
          row.timeRange / 1000 / 60 / 60 + '-' + t('hours'),
      },
    ],

    [],
  );
  const columnsSensor = React.useMemo(
    () => [
      {
        Header: '#',
        id: 'index',
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: 'sensor name',
        accessor: 'title',
      },
      {
        Header: 'type',
        accessor: 'type',
      },
      {
        Header: 'unit',
        // id: 'unit',
        accessor: 'unit',
        // accessor: (row: any, i: number) =>
        //   row.timeRange / 1000 / 60 / 60 + ' ساعت ',
      },
    ],

    [],
  );

  async function handleRemoveGp(gpId?: string) {
    if (userOwn.isSuccess === true && gpId) {
      const user = new User(userOwn.data);
      const ss = await user.removeGroup(gpId);
      // console.log(ss);
      if (ss)
        dispatch(updateUserData(ss));
    }
  }

  const GetReport = (group: GroupItemType) => {
    let publishDate = new Date(1000 * dayjs().unix());

    dispatch(setEndDate(publishDate.toJSON()));
    dispatch(
      setStartDate(
        new Date(dayjs().unix() * 1000 - group.timeRange).toLocaleString(),
      ),
    );

    dispatch(setSelectedSensors(group.sensors));
    const arr: string[] = [];
    group?.sensors.map((item) => arr.push(item?._id ?? ''));
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: new Date(
          dayjs().unix() * 1000 - group.timeRange,
        ).toLocaleString(),
        end: publishDate.toJSON(),
      }),
    );
  };

  useEffect(() => {
    userOwn.refetch();
  }, [userOwnInRedux]);

  useEffect(() => {
    const group = userOwn?.data?.groups?.find(
      (item) => item?._id === selectedRow,
    );
    if (group?.sensors !== undefined) {
      // dispatch(setSelectedSensors(group?.sensors));
      GetReport(group);
      setgroupA(group);
      dispatch(setSelectedGroup(group))

    }
    // console.log(group?.sensors);
  }, [selectedRow]);

  return (
    <div className="flex justify-center flex-wrap min-h-[25rem] ">
      <section className="flex items-start flex-wrap h-[20rem] max-w-[30rem] w-[30rem]  mb-[4rem]">
        <span className="mx-4 "> {t('devices')}</span>
        {data !== undefined && (
          <ReactTable
            hasSearch={true}
            hasPagination={true}
            setSelectedRow={setSelectedRow}
            tHeight="h-[15rem]"
            columns={columns}
            data={data}
            selectedRow={selectedRow}
          />
        )}
      </section>
      <section className="flex items-start flex-wrap h-[20rem] max-w-[30rem] w-[30rem] ">
        <div className="mx-4 "> {t('sensors')}</div>
        <div className='flex'>
          <div className="mx-4 ">
            {' '}
            {t('group')}: {groupA?.groupTitle}
          </div>
          <div className="flex items-center h-fit m-1">
            <button
              onClick={() => {
                handleRemoveGp(groupA?._id);
              }}
              className="mx-2 border p-1 rounded-lg button-remove h-fit"
              type="button"
              disabled={undefined === groupA?._id}
            >
              {t('delete') + ' ' + t('group')}
            </button>
          </div>
        </div>
        {selectedSensorRedux !== undefined && (
          <ReactTable
            hasSearch={false}
            hasPagination={false}
            setSelectedRow={setSelectedRow}
            tHeight="h-[15rem]"
            columns={columnsSensor}
            data={selectedSensorRedux}
            selectedRow={selectedRow}
          />
        )}
      </section>
    </div>
  );
};

export default GroupTable;
