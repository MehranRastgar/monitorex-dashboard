import React, { useEffect } from 'react';
import { FieldArray, useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import { AbstractColDef } from 'ag-grid-community';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import FormThemeButton from 'src/atomic/atoms/ThemeButton/FormThemeButton';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectFormData,
  selectFormDataInit,
  selectFormMap,
  setFormData,
} from 'src/store/slices/formikSlice';
import Formine from 'src/class/form';
import { Convert } from 'src/class/device';
interface Props {
  // validationSchema?: object;
  // initialValues: object;
  // formMap: ContainerFormMapType[];
}
const FormFormik: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectformdata = useAppSelector(selectFormData);
  const selectformmap = useAppSelector(selectFormMap);
  const selectformdatainit = useAppSelector(selectFormDataInit);
  const formik = useFormik({
    initialValues: {
      ...selectformdatainit,
    },
    onSubmit: (values) => {
      // props.setFormData(values);
      alert(JSON.stringify(values, null, 2));
    },

    validate(values) {
      dispatch(setFormData(values));
      console.log('valiadata', values);
      // alert(JSON.stringify(values, null, 2));
    },
  });
  async function MakeJson(values: object) {
    const str = JSON.stringify(values, null, 2);
    console.log(JSON.parse(str), str);
  }
  useEffect(() => {
    console.log('selectformdatainit', selectformdatainit, selectformmap);
    formik.resetForm();
    selectformdatainit && formik.setValues(selectformdatainit);
  }, [selectformdatainit]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  function SaveForm(ev: any) {
    console.log("form data", selectformdata, selectformmap)
    ev.preventDefault();
    const elementsArray = [...(ev?.target?.elements ?? [])];
    const formData = elementsArray.reduce((acc, elem) => {
      if (elem.id) acc[elem.id] = elem.value;
      return acc;
    }, {});
    console.log('formData', formData);
    console.log("devConvert", formData);
    dispatch(setFormData(formData));
    Object.keys(formData).map((item, index) => { console.log(index, item) });
  }


  function mapkey() {
    let map = new Map();
    let recipeMap = new Map([
      ['cucumber.sector', 500],
      ['tomatoes', 350],
      ['onion', 50],
      ['onion2', 50]
    ]);

    map.set('1', 'str1');   // a string key
    map.set(1, 'num1');     // a numeric key
    map.set(true, 'bool1'); // a boolean key

    // remember the regular Object? it would convert keys to string
    // Map keeps the type, so these two are different:
    alert(map.get(1)); // 'num1'
    alert(map.get('1')); // 'str1'

    alert(map.size); // 3
    alert(recipeMap); // 3
  }



  return (
    <form
      className="flex w-full flex-wrap m-4"
      // onChange={(e) => formik.validateForm}
      // onSubmit={formik.handleSubmit}
      onChange={(e) => formik.validateForm}
      // onSubmit={SaveForm}
      onSubmit={mapkey}
    >
      {selectformmap?.map((maptype, indexSection) => (
        <section className="flex flex-wrap m-1 p-2 w-full" key={indexSection}>
          <h2 className="w-full">{maptype.header}</h2>
          {maptype?.section?.map((formItem: FormMapType, index) => (
            <>
              <div className={'flex-wrap mx-2 '} key={index}>
                <label className={classes.label + ''} htmlFor={formItem.id}>
                  {t(formItem.name)}
                </label>
                {formItem.model === 'absolute' ||
                  formItem.model === undefined ? (
                  <>
                    <input
                      id={formItem.id}
                      list={formItem.id + 'suggestion'}
                      name={formItem.id}
                      type={formItem.type}
                      onChange={formik.handleChange}
                      value={eval(formItem?.value)}
                      placeholder={formItem.name ?? ''}
                      className={`${classes?.inpt} ` + formItem.class}
                    />
                    {formItem?.suggestions?.length && (
                      <datalist id={formItem.id + 'suggestion'}>
                        {formItem?.suggestions?.map((suggestion, index) => (
                          <option key={index} value={suggestion} />
                        ))}
                      </datalist>
                    )}
                  </>
                ) : (
                  <select
                    id={formItem.id}
                    onChange={formik.handleChange}
                    value={eval(formItem?.value)}
                    placeholder={formItem.name ?? ''}
                    className={`${classes?.inpt} ` + formItem.class}
                  >
                    {formItem?.opstions?.map((value, index) => (
                      <option key={index} value={value ?? index}>
                        {value}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </>
          ))}
        </section>
      ))}
      <div className="flex w-full mt-4 h-fit">
        <FormThemeButton className="flex m-2" type="submit">
          {t('save')}
        </FormThemeButton>
      </div>
    </form>
  );
};
export default FormFormik;

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
