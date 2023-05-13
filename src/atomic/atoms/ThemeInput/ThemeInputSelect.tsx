import { Button } from '@mui/material';
import React from 'react';

import classes from './ThemeInput.module.scss';

interface Props {
  label?: string;
  onChange?: any;
  value?: { id: string; title: string }[];
}
const ThemeInputSelect: React.FC<Props> = (props) => {
  return (
    <>
      <select
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        placeholder={props?.label ?? 'palce'}
        className={`${classes?.inpt} `}
      >
        <option key={'none'} value={'0'}>
          {undefined}
        </option>
        {props?.value?.map((value, index) => (
          <option key={index} value={value?.id ?? index}>
            {value.title}
          </option>
        ))}
      </select>
    </>
  );
};

export default ThemeInputSelect;
