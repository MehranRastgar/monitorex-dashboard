import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import FormThemeButton from 'src/atomic/atoms/ThemeButton/FormThemeButton';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectFormData,
  selectFormDataInit,
  selectFormMap,
  setFormData,
  setFormikDataInit,
} from 'src/store/slices/formikSlice';
import Formine from 'src/class/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import Device, { DeviceType } from 'src/class/device';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import { putDeviceAsync, removeDeviceAsync, selectDevicesStatus, selectPutStatus, selectSelectedDevice, setDevicesStatus, setPutStatus } from 'src/store/slices/devicesSlice';
import { useQuery } from 'react-query';
import { GetUsers } from 'src/api/users';
import { createUser, selectSelectedUser, selectUpdateFlag, setSelectedUser, setUserUpdateFlag, updateUserData } from 'src/store/slices/userSlice';
import User from 'src/class/user';
import { UserType } from 'src/types/types';
import { set } from 'mongoose';




interface Props {
  // validationSchema?: object;
  // initialValues: object;
  // formMap: ContainerFormMapType[];/
}
const FormMeUser: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectformdatainit = useAppSelector(selectFormDataInit) as UserType
  const selectedUser = useAppSelector(selectSelectedUser);
  // const queryUsers = useQuery('users', GetUsers);
  // const statusUsers = useAppSelector(selectUpdateFlag)
  // const [changes, setChanges] = useState('')
  // const [renderCount, setRenderCount] = useState(1)






  const sformdata = useMemo(() => {
    const userd = new User(selectedUser ?? { username: '' })
    return userd.getUserData()

  }, [selectedUser])

  const form = useForm<UserType>({
    defaultValues: {
      ...sformdata
    }
  })
  const { register, control, setValue, handleSubmit, formState } = form;
  const { errors } = formState;




  // const formdataRedux: DevicesReceiveType | undefined =
  //   useAppSelector(selectFormData);
  const onSubmit = (userFormData: UserType) => {
    if (userFormData._id !== undefined) {
      dispatch(updateUserData(userFormData));
    } else {
      const user: UserType = { ...userFormData };
      dispatch(createUser(user));
    }
  };


  useEffect(() => {
    form.reset(selectedUser)
    // console.log('selectedUser', selectedUser)
  }, [selectedUser]);

  return (
    <div
      id={selectedUser?._id + 'userId'}
      key={selectedUser?._id + 'userId'}
      className="flex flex-wrap items-start min-w-[800px] mx-2 -mt-1 p-2 border border-[var(--border-color)] rounded-md">
      {selectedUser?.username && <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="flex flex-wrap  m-1 p-2 w-full" >
          <div className='flex w-full mb-4'>
            <h1 className='w-full'>user info</h1>
            <span className='flex justify-end text-end'>{selectedUser?._id}</span></div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='username'>{t('user name')}</label>
            <input className={classes.inpt} type='text' {...register('username', { required: { value: true, message: t('username is required') } })} />
            <p className='text-red-300 tex-xs'>{errors?.username?.message && '!' + errors?.username?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='email'>{t('email')}</label>
            <input className={classes.inpt} type='email' {...register('email', { required: { value: true, message: t('email is required') } })} />
            <p className='text-red-300 tex-xs'>{errors?.username?.message && '!' + errors?.username?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='family'>{t('family')}</label>
            <input className={classes.inpt} type='text' {...register('family',)} />
            <p className='text-red-300 tex-xs'>{errors?.family?.message && '!' + errors?.family?.message}</p>
          </div>
        </section>
        <section className="flex flex-wrap border-b m-1 p-2 w-full" >

          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='name'>{t('name')}</label>
            <input className={classes.inpt} type='text' {...register('name',)} />
            <p className='text-red-300 tex-xs'>{errors?.name?.message && '!' + errors?.name?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='nationalId'>{t('nationalId')}</label>
            <input className={classes.inpt} type='text' {...register('nationalId',)} />
            <p className='text-red-300 tex-xs'>{errors?.nationalId?.message && '!' + errors?.nationalId?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='password'>{t('password')}</label>
            <input className={classes.inpt} type='password' {...register('password',)} />
            <p className='text-red-300 tex-xs'>{errors?.password?.message && '!' + errors?.password?.message}</p>
          </div>
        </section>
        <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <h1 className='w-full'>{t('access controll')}</h1>

          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='accessControll.devices'>{t('devices')}</label>
            <select className={classes.inpt}  {...register('accessControll.devices',)} >
              {accessControll.map((op, index) =>
                <option value={op} key={index}>{op}</option>
              )}
            </select>
            <p className='text-red-300 tex-xs'>{errors?.accessControll?.devices?.message && '!' + errors?.accessControll.devices?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='accessControll.profile'>{t('own profile')}</label>
            <select className={classes.inpt}  {...register('accessControll.profile',)} >
              {accessControll.map((op, index) =>
                <option value={op} key={index}>{op}</option>
              )}
            </select>
            <p className='text-red-300 tex-xs'>{errors?.accessControll?.profile?.message && '!' + errors?.accessControll.profile?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='accessControll.reports'>{t('reports')}</label>
            <select className={classes.inpt}  {...register('accessControll.reports',)} >
              {accessControll.map((op, index) =>
                <option value={op} key={index}>{op}</option>
              )}
            </select>
            <p className='text-red-300 tex-xs'>{errors?.accessControll?.reports?.message && '!' + errors?.accessControll.reports?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='accessControll.users'>{t('users')}</label>
            <select className={classes.inpt}  {...register('accessControll.users',)} >
              {accessControll.map((op, index) =>
                <option value={op} key={index}>{op}</option>
              )}
            </select>
            <p className='text-red-300 tex-xs'>{errors?.accessControll?.users?.message && '!' + errors?.accessControll.users?.message}</p>
          </div>
        </section>

        <div className="flex w-full justify-around mt-4 h-fit">
          {selectedUser?._id ? <FormThemeButton
            className="flex m-2  h-fit" type="submit">
            {t('update')}
          </FormThemeButton>
            :
            <FormThemeButton
              className="flex m-2  h-fit" type="submit">
              {t('create')}
            </FormThemeButton>}
          {selectedUser?._id && selectedUser.username !== 'admin' && <ThemeButton
            type="reject"
            className="m-2 h-fit"
            onClick={(e) => {
              dispatch(removeDeviceAsync(selectedUser));
            }}
          >
            {t('remove') + ' ' + t('profile')}
          </ThemeButton>}
        </div>
      </form>}
      {/* <DevTool control={control} /> */}
    </div >
  );
};
export default FormMeUser;

export interface ContainerFormMapType {
  header: string;
  section: FormMapType[];
}
export interface FormMapType {
  id: string;
  name: string;
  type: string;
  value: string;
  class?: string;
  model?: 'absolute' | 'select';
  opstions?: any[];
  suggestions?: string[] | number[];
}

const accessControll = [
  'manage',
  'create',
  'delete',
  'update',
  'read',
]