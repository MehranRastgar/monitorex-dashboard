import React, { useEffect } from 'react';
import { FieldArray, useFormik } from 'formik';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import { useTranslation } from 'react-i18next';
import classes from './formik.module.scss';
import { AbstractColDef } from 'ag-grid-community';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import FormThemeButton from 'src/atomic/atoms/ThemeButton/FormThemeButton';
interface Props {
  validationSchema?: object;
  initialValues: object;
  formMap: ContainerFormMapType[];
  setFormData: any;
  // selectedForm: object;
}
const FormFormik: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      ...props.initialValues,
    },

    onSubmit: (values) => {
      // props.setFormData(values);
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },

    validate(values) {
      props.setFormData(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  // useEffect(() => {
  //   // formik.resetForm({
  //   //   values: { ...props.selectedForm },
  //   // });
  //   formik.resetForm();
  // }, [props.selectedForm]);

  return (
    <form
      className="flex w-full flex-wrap m-4"
      onChange={() => formik.validateForm}
      onSubmit={formik.handleSubmit}
    >
      {props.formMap.map((maptype, indexSection) => (
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
                      list={formItem.id + 'suggestiom'}
                      name={formItem.id}
                      type={formItem.type}
                      onChange={formik.handleChange}
                      value={eval(formItem?.value)}
                      placeholder={formItem.name ?? ''}
                      className={`${classes?.inpt} ` + formItem.class}
                    />
                    {formItem?.suggestions?.length && (
                      <datalist id={formItem.id + 'suggestiom'}>
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
