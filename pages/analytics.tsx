import { Icon } from '@iconify/react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import DeviceMA from 'src/atomic/organisms/device/DeviceMA';
import User from 'src/class/user';
import { SensorsReceiveTpe } from 'src/components/pages/sensors/sensorsTable';
import { GetDevices } from '../src/api/devices';
import ButtonRegular from '../src/atomic/atoms/ButtonA/ButtonRegular';
import Item from '../src/atomic/atoms/Item/Item';
import GaugeDevice from '../src/atomic/molecules/AmChart/GaugeDevice';
import { SensorSelectedForReport } from '../src/atomic/molecules/SelectDevice/SelectDevice';
import MultiReportChartContainer from '../src/atomic/organisms/analytics/MultiReportChartContainer';
import DeviceList from '../src/atomic/organisms/device/DeviceList';
import DeviceSummary from '../src/atomic/organisms/device/deviceSummary';
import SelectDevicesForAnalize from '../src/atomic/organisms/SelectDevicesForAnalize';
import UserGroupsContainer, {
  UserGroupsSaveContainer,
} from '../src/atomic/organisms/UserGroups/UserGroupsContainer';
import Layout from '../src/components/layout/Layout';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import {
  reportSensorsAsync,
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectStartDate,
} from '../src/store/slices/analizeSlice';
import {
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
} from '../src/store/slices/devicesSlice';
import {
  addGroupToUserData,
  selectOwnUser,
  updateUserData,
} from '../src/store/slices/userSlice';
import { GroupItemType, UserType } from '../src/types/types';
import { selectCalendarMode } from 'src/store/slices/themeSlice';
import dynamic from "next/dynamic";
import DataOfReport from 'src/atomic/organisms/analytics/DataOfReport';
import { PrintPreview } from 'src/atomic/organisms/Print/PrintPreview';
import TableDataOfReport, { SetGranularity } from 'src/atomic/organisms/DataTables/TableDataOfReport';
import HeaderMakeReport from 'src/atomic/molecules/Report/HeaderMakeReport';
const MultiAxisChart = dynamic(
  () => import("src/atomic/organisms/HighCharts/MultiAxisChart"),
  { ssr: false }
);
const DateTimeAnalytic = dynamic(
  () => import("../src/atomic/organisms/analytics/DateTimeAnalytic"),
  { ssr: false }
);
export default function Analytics() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [elem, setElem] = useState(false);
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const userData = useAppSelector(selectOwnUser);
  const selectLocale = useAppSelector(selectCalendarMode)
  const dispatch = useAppDispatch();
  const queryDevices = useQuery('devices', GetDevices);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--bgc)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleReport = () => {
    const arr: string[] = [];
    selectedSensorsSlice?.map((sensor: SensorsReceiveTpe) => {
      if (sensor._id !== undefined) arr.push(sensor?._id);
    });
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: startDate !== undefined ? new Date(startDate).toISOString() : '',
        end: endDate !== undefined ? new Date(endDate).toISOString() : '',
      }),
    );
  };

  const handleUpdateToGroup = async (gpId: string, name: string) => {
    const start = startDate !== undefined ? new Date(startDate).getTime() : 0;
    const end = endDate !== undefined ? new Date(endDate).getTime() : 0;
    const time = end - start;
    const userIns = new User(userData);
    if (selectedSensorsSlice !== undefined)
      dispatch(
        updateUserData(
          await userIns.updateThisGroup(gpId, {
            groupTitle: name,
            sensors: [...selectedSensorsSlice],
            timeRange: time,
          }) ?? {},
        ),
      );
  };
  const handleSaveToGroup = async (nameofGp: string) => {
    const start = startDate !== undefined ? new Date(startDate).getTime() : 0;
    const end = endDate !== undefined ? new Date(endDate).getTime() : 0;
    const time = end - start;

    const userIns = new User(userData);
    if (selectedSensorsSlice !== undefined)
      dispatch(
        updateUserData(
          await userIns.addNewGroup({
            groupTitle: nameofGp ?? 'unnamed',
            sensors: [...selectedSensorsSlice],
            timeRange: time,
          }),
        ),
      );
    setOpen(false);
  };

  useEffect(() => {
    //console.log(queryDevices);
    if (queryDevices.status === 'success') {
      dispatch(setDevicesData(queryDevices.data));
      dispatch(setDevicesStatus('success'));
    }
  }, [queryDevices.isFetching, queryDevices.isSuccess]);
  return (
    <Layout>
      <Item className="flex flex-wrap justify-center">
        <DeviceMA />
        <div className="flex flex-wrap justify-center w-full border border-[var(--border-color)] p-4 mt-2 rounded-md">
          {selectLocale === 'fa' ?
            <DateTimeAnalytic key={selectLocale} localeT={'fa'} /> :
            <DateTimeAnalytic key={selectLocale} localeT={'en'} />}
          <div className="flex justify-center w-full items-center">
            <div className="flex h-fit  justify-center items-center mx-4 my-2">
              <ThemeButton
                disabled={
                  selectedSensorsSlice === undefined ||
                    selectedSensorsSlice?.length === 0 ||
                    startDate === undefined
                    ? true
                    : false
                }
                type="submit"
                className="flex items-center h-[30px]"
                onClick={handleReport}
              >
                <div className="flex items-center justify-center">
                  <span className="flex mx-1 text-xs ">{t('takeReport')}</span>
                  <Icon fontSize={20} icon={'line-md:document-report'}></Icon>
                </div>
              </ThemeButton>
            </div>
            <div className="flex justify-center items-center mx-4 my-2">
              <ThemeButton
                disabled={
                  selectedSensorsSlice === undefined ||
                    selectedSensorsSlice?.length === 0 ||
                    startDate === undefined
                    ? true
                    : false
                }
                type="explore"
                className="flex h-[30px]"
                onClick={() => setOpen(true)}
              >
                <div className="flex items-center justify-center">
                  <span className="flex mx-1 text-xs ">
                    {t('saveInGroups')}
                  </span>
                  <Icon fontSize={20} icon={'ion:save'}></Icon>
                </div>
              </ThemeButton>
            </div>
            <div className="flex justify-center items-center mx-4 my-2">
              <SetGranularity />
            </div>

          </div>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UserGroupsSaveContainer
            handleUpdateToGroup={handleUpdateToGroup}
            handleSaveToGroup={handleSaveToGroup}
          />
        </Modal>
      </Item>
      <Item className="flex flex-wrap justify-center w-full border border-[var(--border-color)] p-4 mt-5 ">
        <MultiAxisChart chartSettings={{}} />
        {/* <MultiReportChartContainer /> */}
      </Item>
      <Item className="flex flex-wrap justify-center w-full border border-[var(--border-color)] p-4 mt-5 ">
        <TableDataOfReport />
      </Item>
      <Item className=" flex flex-wrap justify-center w-full border border-[var(--border-color)] p-4 mt-5">
        <HeaderMakeReport />
      </Item>
    </Layout>
  );
}
