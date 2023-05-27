import React from 'react';
import { useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
interface Props {
  initialValues: object;
  formMap: FormMapType[];
}
const FormFormik: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      ...props.initialValues,
    },
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className="flex m-4" onSubmit={formik.handleSubmit}>
      {props?.formMap?.map((formItem: FormMapType, index) => (
        <>
          <div className="flex flex-wrap" key={index}>
            <label
              className={classes.label + ' flex w-full'}
              htmlFor={formItem.name}
            >
              {t(formItem.name)}
            </label>
            <input
              id={formItem.name}
              name={formItem.name}
              type={formItem.type}
              onChange={formik.handleChange}
              value={eval(formItem.value)}
              placeholder={formItem.name ?? ''}
              className={`${classes?.inpt} `}
            />
          </div>
        </>
      ))}
      {/* <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      /> */}
      <button type="submit">Submit</button>
    </form>
  );
};
export default FormFormik;

const deviceFormMap: FormMapType[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
  },
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
  },
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
  },
  {
    id: 'title',
    name: 'title',
    type: 'text',
    value: 'formik.values.title',
  },
];

interface FormMapType {
  id: string;
  name: string;
  type: string;
  value: string;
  calss?: string;
}
