import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import FormFormik, {
  ContainerFormMapType,
  FormMapType,
} from '../forms/FormFormik';
import { DevicesReceiveType } from 'src/store/api/devicesApi';

const DeviceFormFormik = () => {
  const { t } = useTranslation();
  const formData = {
    title: '',
    multiPort: 0,
    sMultiPort: 0,
  };
  const device: DevicesReceiveType = {
    address: {
      multiPort: 0,
      sMultiPort: 0,
    },
  };
  useEffect(() => {}, []);
  return (
    <div className="flex min-w-[800px] mx-2 m-4 p-2 border border-[var(--border-color)] rounded-md">
      <FormFormik
        formMap={[...DeviceWholeData]}
        initialValues={{
          ...formData,
        }}
      />
    </div>
  );
};
export default DeviceFormFormik;
const deviceFormMap: FormMapType[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
    suggestions: ['Cell 1', 'Cell 2', 'Cell N'],
  },
  {
    id: 'sMultiPort',
    name: 'Super MultiPort',
    type: 'number',
    value: 'formik.values.sMultiPort',
    class: 'w-[70px]',
  },
  {
    id: 'multiPort',
    name: 'MultiPort',
    type: 'number',
    value: 'formik.values.multiPort',
    class: 'w-[70px]',
  },
  {
    id: 'ports',
    name: 'number of ports',
    type: 'number',
    opstions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    value: 'formik.values.ports',
    model: 'select',
    class: 'w-[70px]',
  },
];

const addre: FormMapType[] = [
  {
    id: 'address.multiPort',
    name: 'number of ports',
    type: 'number',
    opstions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    value: 'formik.values.address.multiPort',
    model: 'select',
    class: 'w-[70px]',
  },
  {
    id: 'address.sMultiPort',
    name: 'number of ports',
    type: 'number',
    opstions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    value: 'formik.values.sMultiPort',
    model: 'select',
    class: 'w-[70px]',
  },
];

const DeviceWholeData: ContainerFormMapType[] = [
  {
    header: 'Device Info',
    section: deviceFormMap,
  },
  {
    header: 'address Info',
    section: addre,
  },
];
