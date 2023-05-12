import { Icon } from '@iconify/react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import DeviceMA from 'src/atomic/organisms/device/DeviceMA';
import { GetDevices } from '../src/api/devices';
import ButtonRegular from '../src/atomic/atoms/ButtonA/ButtonRegular';
import Item from '../src/atomic/atoms/Item/Item';
import GaugeDevice from '../src/atomic/molecules/AmChart/GaugeDevice';
import { SensorSelectedForReport } from '../src/atomic/molecules/SelectDevice/SelectDevice';
import DateTimeAnalytic from '../src/atomic/organisms/analytics/DateTimeAnalytic';
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
import { selectOwnUser, updateUserData } from '../src/store/slices/userSlice';
import { GroupItemType, UserType } from '../src/types/types';

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
    selectedSensorsSlice?.map((sensor) => {
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
  const handleSaveToGroup = async (nameofGp: string) => {
    const start = startDate !== undefined ? new Date(startDate).getTime() : 0;
    const end = endDate !== undefined ? new Date(endDate).getTime() : 0;
    const time = end - start;
    const userD = await JSON.parse(localStorage.getItem('user') ?? '');
    const arr: GroupItemType[] = userD?.groups ?? [];
    if (selectedSensorsSlice !== undefined)
      arr.push({
        groupTitle: nameofGp ?? 'unnamed',
        sensors: [...selectedSensorsSlice],
        timeRange: time,
      });
    const user: UserType = { ...userD, groups: [...arr] };
    //console.log(userD);
    dispatch(updateUserData(user));
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
      <section className="flex flex-wrap justify-center">
        <DeviceMA />
        <div className="flex flex-wrap justify-center w-full border border-[var(--border-color)] p-4 m-2 rounded-md">
          <DateTimeAnalytic />
          <div className="flex justify-center w-full">
            <div className="flex h-fit  justify-center mx-4 my-2">
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
            <div className="flex justify-center mx-4 my-2">
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
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UserGroupsSaveContainer handleSaveToGroup={handleSaveToGroup} />
        </Modal>
      </section>
      <section className="my-2">
        <MultiReportChartContainer />
      </section>
    </Layout>
  );
}
