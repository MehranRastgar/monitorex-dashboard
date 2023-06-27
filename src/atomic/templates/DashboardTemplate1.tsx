// import DemoDualAxes from "../molecules/AntChart/MultiLineChart";

import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { SensorWebsocketRealTimeDataType } from '../../components/pages/sensors/sensorsTable';
import { socket } from '../../components/socketio';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectGroupNumber, setSelectedGroupNumber } from '../../store/slices/analizeSlice';
import { selectDevicesData } from '../../store/slices/devicesSlice';
import { addNewRecordToSocket } from '../../store/slices/socketSlice';
import { selectOwnUser, selectUserGroups } from '../../store/slices/userSlice';
import { GroupItemType } from '../../types/types';
import Item from '../atoms/Item/Item';
import BarchartLive from '../molecules/AmChart/BarchartLive';
import DeviceUnit from '../molecules/device/DeviceUnit';
import OneEPanel from '../organisms/electrical/OneEPanel';
import LiveDataGrid from '../organisms/LiveDataGrid/LiveDataGrid';
import SensorsSummary from '../organisms/sensor/SensorsSummary';
import GroupListComponent from '../organisms/UserGroups/GroupListComponent';
import classes from './../../components/summary/Summary.module.scss';
import LiveChart from '../organisms/Charts/LiveChart';
import ThemeButton from '../atoms/ThemeButton/ThemeButton';
import GroupUnit from '../molecules/device/GroupUnit';
import { useTranslation } from 'react-i18next';
import LiveSensorValue from '../organisms/LiveDataGrid/LiveSensorValue';
import MultiAxisChart from '../organisms/HighCharts/MultiAxisChart';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  idOfSub?: string;
  mode: number;
}
const DashboardTemplate1: React.FC<Props> = (props) => {
  const selectDevices = useAppSelector(selectDevicesData);
  const { t } = useTranslation();
  // const Groups = useAppSelector(selectUserGroups);
  // const gpNumber = useAppSelector(selectGroupNumber);

  const [showdiv, setShowdiv] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const Groups = useAppSelector(selectUserGroups);
  const ownUser = useAppSelector(selectOwnUser)
  const gpNumber = useAppSelector(selectGroupNumber);
  const [group, setGroup] = useState<GroupItemType | null>(null);
  const [groupOrDevice, setGroupOrDevice] = useState<'group' | 'device'>(
    'device',
  );

  useEffect(() => {
    if (gpNumber !== undefined && Groups?.[gpNumber] !== undefined)
      setGroup(Groups?.[gpNumber]);
  }, [Groups, gpNumber]);

  useEffect(() => {
    group?.sensors?.map((sens, index) => {
      if (sens?._id)
        socket.once(sens?._id, (data: SensorWebsocketRealTimeDataType) => {
          dispatch(addNewRecordToSocket(data));
          // console.log(data);
        });
    });
    return () => {
      group?.sensors?.map((sens, index) => {
        // socket.off(sens?._id);
      });
    };
  }, [group]);

  useEffect(() => {
    setShowdiv(false);
    setTimeout(() => setShowdiv(true), 500);
  }, [group]);
  return (
    <>
      <section className="flex justify-center min-w-full -mt-6">
        <div className="mt-10 m-1 flex justify-center flex-wrap min-w-full">
          <div className="flex w-full justify-center m-10">
            <ThemeButton
              onClick={() => {
                setGroupOrDevice('device')
                dispatch(setSelectedGroupNumber(undefined))
              }}
              type={groupOrDevice === 'device' ? 'activate' : 'deactivate'}
            >
              {t('devices')}
            </ThemeButton>
            <ThemeButton
              onClick={() => {
                setGroupOrDevice('group')
                dispatch(setSelectedGroupNumber(undefined))
              }}
              type={groupOrDevice === 'group' ? 'activate' : 'deactivate'}
            >
              {t('groups')}
            </ThemeButton>
          </div>
          {/* <div className="flex flex-wrap justify-self-auto min-w-full m-1 border border-[var(--border-color)]"> */}
          <ScrollContainer
            vertical={false}
            hideScrollbars={false}
            className="overflow-y-hidden flex border border-[var(--border-color)] rounded-md w-full m-0 p-2"
          >
            {groupOrDevice === 'device' && (
              <div
                className={groupOrDevice === 'device' ? 'flex p-2 ' : 'hidden'}>
                {selectDevices !== null ? <>{selectDevices.map((dev, index) => (
                  <DeviceUnit key={index.toString()} index={index} />
                ))}</> : (
                  <>
                    <section className="flex flex-wrap items-center border-[var(--border-color)] border h-[40vh] max-w-[350px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4">
                      <h1 className='w-full text-center text-xl'>there is no device</h1>
                    </section>
                  </>
                )}
              </div>
            )}
            {groupOrDevice === 'group' && (
              <div className={groupOrDevice === 'group' ? 'flex' : 'hidden'}>
                {Groups !== null && Groups !== undefined && Groups.length !== 0 ? (
                  <>
                    {Groups?.map((dev, index) => (
                      <GroupUnit key={dev._id} index={index} />
                    ))}
                  </>
                ) : (
                  <>
                    <section className="flex flex-wrap items-center border-[var(--border-color)] border h-[40vh] max-w-[350px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4">
                      <h1 className='w-full text-center text-xl'>there is no group</h1>
                    </section>
                  </>
                )}
              </div>
            )}
          </ScrollContainer>
          {/* </div> */}
          {/* <div className="flex flex-wrap justify-self-auto min-w-full m-1 border border-[var(--border-color)]">
            <div className="flex w-full md:w-1/2 lg:w-1/2">
              <GroupListComponent type="group" />
            </div>
            <div className="flex w-full md:w-1/2 lg:w-1/2">
              <GroupListComponent type="device" />
            </div>
          </div> */}
          <Item className="flex justify-center min-w-full rounded-md border border-[var(--border-color)] p-2 m-3">
            {/* <LiveChart /> */}
            <MultiAxisChart liveChart={true} chartSettings={{}} />
          </Item>
          {/* <div className="min-w-full min-h-[40vh] rounded-md m-1 border border-[var(--border-color)]">
            <LiveSensorValue />
          </div> */}
          {/* {showdiv ? <LiveDataGrid /> : <>loading</>} */}
          {/* <div className="min-w-full max-h-[50vh] m-1 border border-[var(--border-color)] overflow-auto">
            <SensorsSummary />
          </div> */}
          {/* <div className="flex w-full justify-center lg:w-1/3 ">
            <BarchartLive id="barchart-live" />
          </div> */}
          {/* <div item xs={8}>
            <Item>
              {selectDevices?.map(({ _id, title, type }) => (
                <>
                  {type === "Electrical panel" && _id !== undefined ? (
                    <OneEPanel idOfSub={_id} />
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </Item>
          </div> */}
        </div>

        {/* 
        <div className="flex flex-wrap w-1/4">
          <GroupListComponent />
          <section className="flex w-[400PX] overflow-x-auto justify-end h-[300px]">
            <BarchartLive id="barchart-live" />
          </section>
          <div className="flex w-full h-[200px]">
            <Item className="w-full m-2">
              <Typography>alarms</Typography>
            </Item>
          </div>
        </div>
        <div className="flex flex-wrap w-3/4">
          <LiveChart />
          <Item className="mt-6">
            <OneEPanel idOfSub={"63b5f8b29d6c56acddc8b55a"} />
          </Item>
        </div> */}
      </section>
      <div className="flex h-[200px] w-full"></div>
    </>
  );
};
export default DashboardTemplate1;
{
  /* 
             <UserGropsList/>
              <AlarmsList/> */
}
