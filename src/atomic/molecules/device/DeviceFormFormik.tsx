import React from 'react';
import { useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import FormFormik from '../forms/FormFormik';

const DevicesFormFormik = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <FormFormik
      formMap={[...deviceFormMap]}
      initialValues={{ title: '', firstName: '', lastName: '', email: '' }}
    />
  );
};
export default DevicesFormFormik;

const deviceFormMap: deviceFormMapType[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
  },
  {
    id: 'ports',
    name: 'ports',
    type: 'text',
    value: 'formik.values.ports',
  },
  {
    id: 'top',
    name: 'top',
    type: 'text',
    value: 'formik.values.top',
  },
  {
    id: 'god',
    name: 'god',
    type: 'text',
    value: 'formik.values.god',
  },
];

interface deviceFormMapType {
  id: string;
  name: string;
  type: string;
  value: string;
  calss?: string;
}
