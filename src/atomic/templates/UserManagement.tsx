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
import { UserType } from '../../types/types';
import ThemeButton from '../atoms/ThemeButton/ThemeButton';
import UserFormMolecule from '../molecules/user/UserFormMolecule';
import FormMeUser from '../molecules/forms/FormMeUser';
import { setFormData, setFormikDataInit } from 'src/store/slices/formikSlice';
import User from 'src/class/user';

export default function UserManagement() {
  const queryUsers = useQuery('users', GetUsers);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function newUser() {
    const userd = new User()
    dispatch(setSelectedUser(userd.getNewUser()));
    // dispatch(setSelected)
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
    dispatch(setFormikDataInit({}))
    dispatch(setFormData({}))
  }, [])
  React.useEffect(() => {
    dispatch(setFormikDataInit({}))
    if (queryUsers.status === 'success' && queryUsers?.data !== undefined) {
      const dataUser: UserType[] = queryUsers.data;
      dispatch(setAllUsersData(dataUser));
      dispatch(setSignInFlag('initial'));
    }
  }, [queryUsers.isFetching, queryUsers.isSuccess]);

  return (
    <section className="flex flex-wrap w-full">
      <aside className="flex flex-wrap h-fit  lg:w-1/3 w-full ">
        <UserList />
        <div className="w-full">
          <ThemeButton
            type={'explore'}
            className="m-4 "
            onClick={() => {
              newUser();
            }}
          >
            {t('new user')}
          </ThemeButton>
        </div>
      </aside>
      <aside className='flex flex-wrap justify-start lg:w-1/3 w-full'>

        <FormMeUser />
      </aside>
    </section>
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
