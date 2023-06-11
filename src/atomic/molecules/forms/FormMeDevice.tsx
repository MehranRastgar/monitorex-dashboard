import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import FormThemeButton from 'src/atomic/atoms/ThemeButton/FormThemeButton';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectFormData,
  selectFormDataInit,
  selectFormMap,
  setFormData,
} from 'src/store/slices/formikSlice';
import Formine from 'src/class/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import Device, { DeviceType } from 'src/class/device';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import { putDeviceAsync, removeDeviceAsync, selectDevicesStatus, selectPutStatus, selectSelectedDevice, setDevicesStatus, setPutStatus } from 'src/store/slices/devicesSlice';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';



// let renderCount = 0

interface Props {
  // validationSchema?: object;
  // initialValues: object;
  // formMap: ContainerFormMapType[];/
}
const FormMeDevice: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectformdata = useAppSelector(selectFormData);
  const selectformmap = useAppSelector(selectFormMap);
  const selectformdatainit = useAppSelector(selectFormDataInit) as DeviceType
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const queryDevices = useQuery('devices', GetDevices);
  const statusDevices = useAppSelector(selectPutStatus)
  const [sensorType, setSensorType] = useState('')
  const [changes, setChanges] = useState<boolean>(false)
  const devd = new Device({})
  const form = useForm<DeviceType>({
    defaultValues: {
      ...devd.getDeviceData()
    }
  })

  const { register, control, setValue, handleSubmit, formState, trigger } = form;
  const { errors, } = formState;
  function onSubmit(data: DeviceType) {
    // e.preventDefault()
    console.log(form.getValues());
    const Dev: DevicesReceiveType = {
      ...form.getValues() as DevicesReceiveType,
      _id: selectedDevice?._id ?? undefined
    }
    console.log(Dev);
    dispatch(putDeviceAsync(Dev));

  }
  const { fields, append, remove } = useFieldArray(
    {
      name: 'sensors',
      control
    },
  )
  const elecFields = useFieldArray(
    {
      name: 'electricals',
      control
    },
  )
  const factorFields = useFieldArray(
    {
      name: 'factors',
      control
    },
  )



  useEffect(() => {
    console.log('triged')
    if (form.getValues().type === 'Sensor Cotroller') {
      setValue('numberOfPorts', selectformdatainit?.sensors?.length ?? 0)
      setValue('electricals', [])
    }
    if (form.getValues().type === 'Electrical panel') {
      setValue('numberOfPorts', selectformdatainit?.electricals?.length ?? 0)
      setValue('sensors', [])
    }
  }, [changes])

  useEffect(() => {
    if (statusDevices === 'success') {
      queryDevices.refetch()
      dispatch(setPutStatus('initial'))
    }
  }, [statusDevices]);
  useEffect(() => {
    const dev = new Device(selectformdatainit as DevicesReceiveType)
    form.reset(dev.getDeviceData())
    setValue('numberOfPorts', selectformdatainit?.sensors?.length ?? 0)
  }, [selectformdatainit]);
  // renderCount++
  return (
    <div >

      <form
        onChange={() => {
          setChanges(value => !value)
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <div className='flex w-full mb-4'>
            <h1 className='w-full'>device info</h1>
            <span className='flex justify-end text-end'>{selectedDevice?._id}</span></div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='title'>{t('title')}</label>
            <input className={classes.inpt} type='text' {...register('title', { required: { value: true, message: t('title is required') } })} />
            <p className='text-red-300 tex-xs'>{errors?.title?.message && '!' + errors?.title?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='numberOfPorts'>N Ports</label>
            <input disabled={true} className={classes.inpt + ' w-[60px]'} type='number' value={form.getValues().type === 'Sensor Cotroller' ? form.getValues()?.sensors?.length : form.getValues()?.electricals?.length} />
            <p className='text-red-300 tex-xs'>{errors?.numberOfPorts?.message && '!' + errors?.numberOfPorts?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='address.sMultiPort'>S.MPort</label>
            <input className={classes.inpt + ' w-[60px]'} type='number'  {...register(`address.sMultiPort` as const, {
              validate: (feildvalue) => {
                if (feildvalue === undefined || feildvalue > 16 || feildvalue <= 0)
                  return 'not valid number'
                else return true
              },
            })} />
            <p className='text-red-300 tex-xs'>{errors?.address?.sMultiPort?.message && '!' + errors?.address?.sMultiPort?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='address.multiPort'>MPort</label>
            <input className={classes.inpt + ' w-[60px]'} type='number'  {...register(`address.multiPort` as const, {
              validate: (feildvalue) => {
                if (feildvalue === undefined || feildvalue > 16 || feildvalue <= 0)
                  return 'not valid number'
                else return true
              },
            })} />
            <p className='text-red-300 tex-xs'>{errors?.address?.multiPort?.message && '!' + errors?.address?.multiPort?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='type'>type</label>
            <select className={classes.inpt}   {...register(`type` as const, {
              validate: (feildvalue) => {
                // setChanges(feildvalue ?? '')
                if (feildvalue === 'Sensor Cotroller' || feildvalue === 'Electrical panel')
                  return true
                else return false
              },
            })}>
              <option value={'Sensor Cotroller'}>Sensor Cotroller</option>
              <option value={'Electrical panel'}>Electrical panel</option>
            </select>
          </div>
        </section>
        {form.getValues().type === 'Sensor Cotroller' && <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <h1 className='flex w-full mb-4'>list of sensors</h1>
          <div className={''} >
            {fields?.map((field, index) => {
              return (
                <div className={'flex flex-wrap'} key={field.id}>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`sensors.${index}.title`}>{t('title')}</label>
                    <input className={classes.inpt} type='text' {...register(`sensors.${index}.title` as const, { required: { value: true, message: t('title is required') } })} />
                    <p className='text-red-300 tex-xs'>{errors?.sensors?.[index]?.title?.message && '!' + errors?.sensors?.[index]?.title?.message}</p>
                    {index > 0 && <button type='button' onClick={() => remove(index)} className='h-fit text-[red] p-1 text-[8px]'>{t('Remove Senosr')}</button>}
                  </div>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`sensors.${index}.type`}>{t('type')}</label>
                    <input className={classes.inpt} type='text' {...register(`sensors.${index}.type` as const, { required: { value: true, message: 'type required' } })} />
                    <p className='text-red-300 tex-xs'>{errors?.sensors?.[index]?.type?.message && '!' + errors?.sensors?.[index]?.type?.message}</p>
                  </div>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`sensors.${index}.unit`}>{t('unit')}</label>
                    <input className={classes.inpt + ' w-[90px]'} type='text' {...register(`sensors.${index}.unit` as const, { required: { value: true, message: t('unit is required') } })} />
                    <p className='text-red-300 tex-xs'>{errors?.sensors?.[index]?.unit?.message && '!' + errors?.sensors?.[index]?.unit?.message}</p>
                  </div>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`sensors.${index}.maxAlarm`}>{t('maxAlarm')}</label>
                    <input className={classes.inpt + ' w-[60px]'} type='number' {...register(`sensors.${index}.maxAlarm` as const)} />
                  </div>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`sensors.${index}.minAlarm`}>{t('minAlarm')}</label>
                    <input className={classes.inpt + ' w-[60px]'} type='number' {...register(`sensors.${index}.minAlarm` as const)} />
                  </div>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`sensors.${index}.isRealTime`}>{t('real time')}</label>
                    <input className={classes.inpt + ' w-[60px]'} type='checkbox' {...register(`sensors.${index}.isRealTime` as const)} />
                  </div>
                </div>
              )
            }
            )}
            <button type='button' onClick={() => append({ title: '' })} className='h-fit'>{t('Add Senosr +')}</button>
          </div>
        </section>}
        {form.getValues().type === 'Electrical panel' && <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <h1 className='flex w-fit mb-4'>list of Electricals</h1>
          <div className={'flex flex-wrap'} >
            {elecFields?.fields?.map((field, index) => {
              return (
                <div className={'flex flex-wrap '} key={field.id}>
                  <div className={'flex-wrap mx-2 w-fit'} >
                    <label className={classes.label} htmlFor={`electricals.${index}.title`}>{t('title')}-{index + 1}</label>
                    <input className={classes.inpt} type='text' {...register(`electricals.${index}.deviceName` as const, { required: { value: true, message: t('title is required') } })} />
                    <p className='text-red-300 tex-xs'>{errors?.electricals?.[index]?.deviceName?.message && '!' + errors?.electricals?.[index]?.deviceName?.message}</p>
                    {index > 0 && <button type='button' onClick={() => elecFields.remove(index)} className='h-fit text-[red] p-1 text-[8px]'>{t('Remove Electrical')}</button>}
                  </div>
                </div>
              )
            }
            )}
            <button type='button' onClick={() => elecFields.append({ deviceName: '' })} className='h-fit w-full'>{t('Add Electrical +')}</button>
          </div>
        </section>}
        {form.getValues().type === 'Sensor Cotroller' && <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <h1 className='flex w-full mb-4'>factors</h1>
          <div className={''} >
            {factorFields?.fields?.map((field, index) => {
              return (
                <div className={'flex flex-wrap'} key={field.id}>
                  <div className={'flex-wrap mx-2 '} >
                    <label className={classes.label} htmlFor={`factors.${index}.factorName`}>{t('factorName')}-{index + 1}</label>
                    <input className={classes.inpt} type='text' {...register(`factors.${index}.factorName` as const, { required: { value: true, message: t('factorName is required') } })} />
                    <p className='text-red-300 tex-xs'>{errors?.factors?.[index]?.factorName?.message && '!' + errors?.factors?.[index]?.factorName?.message}</p>
                    {index > -1 && <button type='button' onClick={() => factorFields.remove(index)} className='h-fit text-[red] p-1 text-[8px]'>{t('Remove factor')}</button>}
                  </div>
                </div>
              )
            }
            )}
            <button type='button' onClick={() => factorFields.append({ factorName: '' })} className='h-fit'>{t('Add Factor +')}</button>
          </div>
        </section>}
        <div className="flex w-full justify-around mt-4 h-fit">
          {selectedDevice?._id ? <FormThemeButton
            className="flex m-2  h-fit" type="submit">
            {t('update')}
          </FormThemeButton>
            :
            <FormThemeButton
              className="flex m-2  h-fit" type="submit">
              {t('create')}
            </FormThemeButton>}
          {selectedDevice?._id && <ThemeButton
            type="reject"
            className="m-2 h-fit"
            onClick={(e) => {
              dispatch(removeDeviceAsync(selectedDevice));
            }}
          >
            {t('remove') + ' ' + t('device')}
          </ThemeButton>}
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div >
  );
};
export default FormMeDevice;

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
