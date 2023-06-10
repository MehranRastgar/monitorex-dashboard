import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import FormFormik, {
  ContainerFormMapType,
  FormMapType,
} from '../forms/FormFormik';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import DeviceForm from 'src/atomic/organisms/device/deviceForm';
import Device, { Convert } from 'src/class/device';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectSelectedDevice } from 'src/store/slices/devicesSlice';
import {
  selectFormData,
  selectFormDataInit,
  setFormMap,
  setFormikDataInit,
} from 'src/store/slices/formikSlice';
import { ConvertSensorsFormType, SensorsFormType } from './formtype';
import FormMeDevice from '../forms/FormMeDevice';

const DeviceFormFormik = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formdataRedux: DevicesReceiveType | undefined =
    useAppSelector(selectFormData);
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const selectformdatainit = useAppSelector(selectFormDataInit);

  async function handleInitFormMap() {
    const dev = new Device();

    if (selectedDevice?.type === 'Sensor Cotroller')
      dispatch(
        setFormMap(
          await dev.createArraysByNumberAndName(
            selectedDevice?.numberOfPorts ?? 0,
            'sensors',
          ),
        ),
      );
    else if (selectedDevice?.type === 'Electrical panel')
      dispatch(
        setFormMap(
          await dev.createArraysByNumberAndName(
            selectedDevice?.numberOfPorts ?? 0,
            'electricals',
          ),
        ),
      );
    else dispatch(setFormMap(dev.getFormMap()));
  }

  async function handleChangesPort() {
    const dev = new Device();
    if (formdataRedux?.type === 'Sensor Cotroller')
      dispatch(
        setFormMap(
          await dev.createArraysByNumberAndName(
            formdataRedux?.numberOfPorts ?? 0,
            'sensors',
          ),
        ),
      );
    else if (formdataRedux?.type === 'Electrical panel')
      dispatch(
        setFormMap(
          await dev.createArraysByNumberAndName(
            formdataRedux?.numberOfPorts ?? 0,
            'electricals',
          ),
        ),
      );
  }

  useEffect(() => {
    // handleInitFormMap();
    dispatch(setFormMap([]));
    dispatch(setFormikDataInit({}));
    setTimeout(() => {
      handleInitFormMap();
      dispatch(setFormikDataInit(selectedDevice));
    }, 50);
  }, [selectedDevice]);

  useEffect(() => {
    console.log('port changes');
    handleChangesPort();
    const device: SensorsFormType = selectedDevice as SensorsFormType

    formdataRedux && setFormikDataInit(selectedDevice);
  }, [formdataRedux?.numberOfPorts, formdataRedux?.type]);
  // setFormData(undefined);
  // setFormMap(dev.getFormMap());
  // await dev.createSensorByNumber(selectedDevice?.numberOfPorts ?? 0),

  return (
    <div className="flex flex-wrap items-start min-w-[800px] mx-2 -mt-1 p-2 border border-[var(--border-color)] rounded-md">
      {<FormMeDevice />}
    </div>
  );
};
export default DeviceFormFormik;
const deviceInfo: FormMapType[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
    suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
  },
  {
    id: 'numberOfPorts',
    name: 'number of ports',
    type: 'number',
    suggestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    value: 'formik.values.numberOfPorts',
    model: 'absolute',
    class: 'w-[75px]',
  },
  {
    id: 'type',
    name: 'type',
    model: 'select',
    opstions: ['Sensor Cotroller', 'Electrical panel'],
    type: 'text',
    value: 'formik.values.type',
    suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
  },
  // {
  //   id: 'realTimeView',
  //   name: 'Real Time',
  //   model: 'absolute',
  //   type: 'checkbox',
  //   value: 'formik.values.realTimeView',
  // },
];

const addre: FormMapType[] = [
  {
    id: 'address.multiPort',
    name: 'Multi Port',
    type: 'number',
    opstions: [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
    ],
    value: 'formik.values.address.multiPort',
    model: 'select',
    class: 'w-[75px]',
  },
  {
    id: 'address.sMultiPort',
    name: 'Super Multi Port',
    type: 'number',
    opstions: [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
    ],
    value: 'formik.values.address.sMultiPort',
    model: 'select',
    class: 'w-[75px]',
  },
];
const sensor: FormMapType[] = [
  {
    id: 'sensors[0].title',
    name: 'number of ports',
    type: 'number',
    opstions: [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
    ],
    value: 'formik.values.sensors[0].title',
    model: 'select',
    class: 'w-[75px]',
  },
];
const DeviceWholeData: ContainerFormMapType[] = [
  {
    header: 'device Info',
    section: deviceInfo,
  },
  {
    header: 'Address',
    section: addre,
  },
  {
    header: 'Address',
    section: [
      {
        id: 'sensors?.[0].title',
        name: 'sensor title',
        type: 'string',
        value: 'formik.values.sensors?.[0].title',
        model: 'absolute',
        class: 'w-[75px]',
      },
    ],
  },
];





