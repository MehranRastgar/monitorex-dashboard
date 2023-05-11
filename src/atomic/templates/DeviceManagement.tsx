import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import DeviceList from '../organisms/device/DeviceList';
import DeviceForm from '../organisms/device/deviceForm';
import { GetDevices } from '../../api/devices';
import { useQuery } from 'react-query';
import {
  selectDevicesStatus,
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
  setSelectedDevice,
} from '../../store/slices/devicesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Item from '../atoms/Item/Item';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DevicesReceiveType, Factor } from '../../store/api/devicesApi';
import { sensor } from '../../interfaces/Sensor';
import { SensorsReceiveTpe } from '../../components/pages/sensors/sensorsTable';
import ThemeButton from '../atoms/ThemeButton/ThemeButton';

export default function DeviceManagement() {
  const dispatch = useAppDispatch();
  const queryDevices = useQuery('devices', GetDevices);
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const selectStateOfDeviceSlice = useAppSelector(selectDevicesStatus);
  const { t } = useTranslation();

  function newDevice() {
    dispatch(setSelectedDevice(newDeviceInitialize));
  }
  function newFromSelectedDevice() {
    const sensors: SensorsReceiveTpe[] = [];
    selectedDevice?.sensors?.map((sensor) => {
      sensors.push({
        ...sensor,
        updatedAt: undefined,
        __v: undefined,
        _id: undefined,
      });
    });
    const factors: Factor[] = [];
    selectedDevice?.factors?.map((factor) => {
      factors.push({ ...factor, _id: undefined });
    });

    dispatch(
      setSelectedDevice({
        ...selectedDevice,
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        __v: undefined,
        title: selectedDevice.title + 'dunplicate',
        sensors: [...sensors],
        factors: [...factors],
        address: {
          ...selectedDevice.address,
          _id: undefined,
        },
      }),
    );
  }

  React.useEffect(() => {
    if (queryDevices.status === 'success') {
      dispatch(setDevicesData(queryDevices.data));
      // dispatch(setDevicesStatus("success"));
    }
  }, [queryDevices.isFetching, queryDevices.isSuccess]);
  React.useEffect(() => {
    if (selectStateOfDeviceSlice === 'success') {
      // queryDevices.refetch();
      dispatch(setDevicesStatus('initial'));
    }
  }, [selectStateOfDeviceSlice]);
  return (
    <>
      <DeviceList />

      <ThemeButton
        type={'explore'}
        className=" mx-2"
        onClick={() => {
          newDevice();
        }}
      >
        {t('new_device')}
      </ThemeButton>

      <ThemeButton
        type={'explore'}
        disabled={selectedDevice?._id === undefined}
        className="mx-2"
        onClick={() => {
          newFromSelectedDevice();
        }}
      >
        {t('new_from_this_device')}
      </ThemeButton>

      <DeviceForm />
    </>
  );
}
// { xs: 0.3, sm: 0.5, md: 1, lg: 2, xl: 3 }
const newDeviceInitialize: DevicesReceiveType = {
  title: '',
  sensors: [
    {
      title: '',
      type: '',
      unit: '',
    },
  ],
  type: 'Sensor Cotroller',
  numberOfPorts: 4,
  address: {
    sMultiPort: 1,
    multiPort: 1,
  },
};
