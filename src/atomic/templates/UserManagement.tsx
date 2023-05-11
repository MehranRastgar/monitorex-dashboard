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
import UserList from '../organisms/user/UserList';
import { GetUsers } from '../../api/users';
import {
  setAllUsersData,
  setSelectedUser,
  setSignInFlag,
  setUsersData,
} from '../../store/slices/userSlice';
import { setUserAgent } from 'react-device-detect';
import UserAdministrator from '../organisms/user/UserAdministrator';
import { UserType } from '../../types/types';
import ThemeButton from '../atoms/ThemeButton/ThemeButton';

export default function UserManagement() {
  const queryUsers = useQuery('users', GetUsers);
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function newUser() {
    dispatch(setSelectedUser({}));
  }
  // function newFromSelectedDevice() {
  //   const sensors: SensorsReceiveTpe[] = [];
  //   selectedDevice?.sensors?.map((sensor) => {
  //     sensors.push({
  //       ...sensor,
  //       updatedAt: undefined,
  //       __v: undefined,
  //       _id: undefined,
  //     });
  //   });
  //   const factors: Factor[] = [];
  //   selectedDevice?.factors?.map((factor) => {
  //     factors.push({ ...factor, _id: undefined });
  //   });

  //   dispatch(
  //     setSelectedDevice({
  //       ...selectedDevice,
  //       _id: undefined,
  //       createdAt: undefined,
  //       updatedAt: undefined,
  //       __v: undefined,
  //       title: selectedDevice.title + "dunplicate",
  //       sensors: [...sensors],
  //       factors: [...factors],
  //       address: {
  //         ...selectedDevice.address,
  //         _id: undefined,
  //       },
  //     })
  //   );
  // }

  React.useEffect(() => {
    if (queryUsers.status === 'success' && queryUsers?.data !== undefined) {
      const dataUser: UserType[] = queryUsers.data;
      dispatch(setAllUsersData(dataUser));
      dispatch(setSignInFlag('initial'));
    }
  }, [queryUsers.isFetching, queryUsers.isSuccess]);

  return (
    <>
      <UserList />
      <ThemeButton
        type={'explore'}
        className="m-4 "
        onClick={() => {
          newUser();
        }}
      >
        {t('new user')}
      </ThemeButton>
      <UserAdministrator />
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
