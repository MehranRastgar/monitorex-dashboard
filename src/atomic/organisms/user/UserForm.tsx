import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import classes from './formik.module.scss';

import { setSelectedDevice } from '../../../store/slices/devicesSlice';
import {
  createUser,
  selectSelectedUser,
  setSelectedUser,
  updateUserData,
} from '../../../store/slices/userSlice';
import { UserType } from '../../../types/types';
import ButtonRegular from '../../atoms/ButtonA/ButtonRegular';
import User from 'src/class/user';
import { useForm } from 'react-hook-form';
import { selectFormDataInit } from 'src/store/slices/formikSlice';
import FormThemeButton from 'src/atomic/atoms/ThemeButton/FormThemeButton';

interface UserFormProps {
  user: UserType;
  onSave: (user: UserType) => void;
  isAdmin?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, isAdmin }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectformdatainit = useAppSelector(selectFormDataInit) as UserType
  const selectedUser = useAppSelector(selectSelectedUser);

  // const sformdata = useMemo(() => {
  //   const userd = new User({})
  //   return userd.getNewUser()

  // }, [selectedUser])

  const form = useForm<UserType>({
    defaultValues: {
      ...selectedUser
    }
  })
  const { register, control, setValue, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (userFormData: UserType) => {
    if (userFormData._id !== undefined) {
      dispatch(updateUserData(userFormData));
    } else {
      const user: UserType = { ...userFormData };
      dispatch(createUser(user));
    }
  };

  const getUser = async () => {
    const usr = localStorage.getItem('user')
    if (usr) {
      const userd = await JSON.parse(usr)
      console.log('local storage', userd,)
      form.reset(userd)
      dispatch(setSelectedUser(userd))
    }
  }
  useEffect(() => {
    getUser()
    // form.reset(selectedUser)
    // console.log('selectedUser', selectedUser)
  }, []);

  return (
    <div
      id={'userId'}
      key={'userId'}
      className="flex flex-wrap items-start min-w-[800px] mx-2 -mt-1 p-2   rounded-md">
      {selectedUser?.username && <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="flex flex-wrap  m-1 p-2 w-full" >
          <div className='flex w-full mb-4'>
            <h1 className='w-full'>{t('userInfo')}</h1>
            <span className='flex justify-end text-end'>{selectedUser?._id}</span></div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='username'>{t('userName')}</label>
            <input className={classes.inpt} type='text' {...register('username', { required: { value: true, message: t('username is required') } })} />
            <p className='text-red-300 tex-xs'>{errors?.username?.message && '!' + errors?.username?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='password'>{t('password')}</label>
            <input className={classes.inpt} type='password' {...register('password',)} />
            <p className='text-red-300 tex-xs'>{errors?.password?.message && '!' + errors?.password?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='email'>{t('email')}</label>
            <input className={classes.inpt} type='email' {...register('email', { required: { value: true, message: t('email is required') } })} />
            <p className='text-red-300 tex-xs'>{errors?.username?.message && '!' + errors?.username?.message}</p>
          </div>

        </section>
        <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='family'>{t('family')}</label>
            <input className={classes.inpt} type='text' {...register('family',)} />
            <p className='text-red-300 tex-xs'>{errors?.family?.message && '!' + errors?.family?.message}</p>
          </div>
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
          {/* {selectedUser?._id && selectedUser.username !== 'admin' && <ThemeButton
            type="reject"
            className="m-2 h-fit"
            onClick={(e) => {
              dispatch(removeDeviceAsync(selectedUser));
            }}
          >
            {t('remove') + ' ' + t('profile')}
          </ThemeButton>} */}
        </div>
      </form>}
      {/* <DevTool control={control} /> */}
    </div >
  );
};

export default UserForm;

const UserPermissions: React.FC = () => {
  const selectedUser = useAppSelector<any>(selectSelectedUser);
  const [showitems, setShowitems] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const permisionOptions = ['manage', 'create', 'read', 'update', 'delete'];
  const fields = [
    { name: 'devices', label: 'devices', type: 'text', size: 150 },
    { name: 'profile', label: 'profile', type: 'text', size: 150 },
    { name: 'reports', label: 'reports', type: 'text', size: 150 },
    { name: 'users', label: 'users', type: 'text', size: 150 },
  ];

  useEffect(() => { }, [selectedUser]);

  return (
    <>
      {fields?.map(({ name, label, type, size }, index) => (
        <>
          <div key={index} className="m-2">
            {selectedUser && name && (
              <FormControl
                variant="filled"
                sx={{ ...style, width: size ?? 150 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  {t(label)}
                </InputLabel>
                <Select
                  // id={idPrefix + "numberOfPorts"}
                  labelId="demo-simple-select-standard-label"
                  value={selectedUser?.accessControll?.[name] ?? ''}
                  onChange={(e) => {
                    dispatch(
                      setSelectedUser({
                        ...selectedUser,
                        accessControll: {
                          ...selectedUser?.accessControll,
                          [name]: e?.target?.value?.toString(),
                        },
                      }),
                    );
                  }}
                  label={label}
                >
                  {/* <MenuItem value=""></MenuItem> */}
                  {permisionOptions?.map((nPSe, index) => (
                    <MenuItem key={index} value={nPSe}>
                      {nPSe.toString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
        </>
      ))}
    </>
  );
};

const style = {
  width: 250,
  boxShadow: 2,
  bgcolor: 'var(--card-bgc)',
  '.MuiFormLabel-root': {
    color: 'var(--approved-bgc)',
  },
  '.MuiInputBase-input': {
    color: 'var(--text-color)',
    fontSize: 16,
  },
  '.MuiInputLabel-filled': {
    color: 'var(--text-color)',
    fontSize: 16,
  },
};
