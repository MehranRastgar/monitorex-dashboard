import React, { useEffect } from 'react';
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



let renderCount = 0

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

  const form = useForm<DeviceType>({
    defaultValues: {
      title: selectformdatainit?.title ?? ''
    }
  })
  const { register, control, setValue, getValues, handleSubmit, formState } = form;
  const { errors } = formState

  function onSubmit(data: DeviceType) {
    // e.preventDefault()
    console.log(data)
    console.log(form.getValues())
  }


  const { fields, append, remove } = useFieldArray(
    {
      name: 'sensors',
      control
    }
  )



  useEffect(() => {
    // console.log(formik.values);
    const dev = new Device(selectformdatainit as DevicesReceiveType)
    form.reset(dev.getDeviceData())
    setValue('numberOfPorts', selectformdatainit?.sensors?.length ?? 0)
  }, [selectformdatainit]);
  renderCount++
  return (
    <div>
      {/* <h1>count {renderCount / 2}</h1> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <h1 className='flex w-full mb-4'>device info</h1>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='title'>{t('title')}</label>
            <input className={classes.inpt} type='text' {...register('title', { required: { value: true, message: t('title is required') } })} />
            <p className='text-red-300 tex-xs'>{errors?.title?.message && '!' + errors?.title?.message}</p>
          </div>
          <div className={'flex-wrap mx-2 '} >
            <label className={classes.label} htmlFor='numberOfPorts'>N Ports</label>
            <input disabled={true} className={classes.inpt + ' w-[60px]'} type='number' value={form.getValues()?.sensors?.length} />
          </div>
        </section>
        <section className="flex flex-wrap border-b m-1 p-2 w-full" >
          <h1 className='flex w-full mb-4'>list of sensors</h1>
          <div className={''} >

            {fields.map((field, index) => {
              return (
                <div className={'flex-wrap mx-2 '} key={field.id}>
                  <label className={classes.label} htmlFor={`sensors.${index}.title`}>{t('title')}</label>
                  <input className={classes.inpt} type='text' {...register(`sensors.${index}.title` as const, { required: { value: true, message: t('title is required') } })} />
                  {/* <p className='text-red-300 tex-xs'>{errors?.sensors?.index?.title?.message && '!' + errors?.title?.message}</p> */}
                  {index > 0 && <button type='button' onClick={() => remove(index)} className='h-fit text-[red] p-1 text-[8px]'>{t('Remove Senosr')}</button>}
                </div>
              )
            }
            )}
            <button type='button' onClick={() => append({ title: '' })} className='h-fit'>{t('Add Senosr +')}</button>
          </div>
        </section>

        <div className="flex w-full mt-4 h-fit">
          <FormThemeButton className="flex m-2" type="submit">
            {t('save')}
          </FormThemeButton>
        </div>
      </form>
      <DevTool control={control} />
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
