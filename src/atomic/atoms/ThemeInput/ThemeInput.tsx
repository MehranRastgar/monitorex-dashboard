import { Button } from '@mui/material';
import React from 'react';

import classes from './ThemeInput.module.scss';

interface Props {
  id?: string;
  label?: string;
  onChange?: any;
  value?: string;
}
const ThemeInput: React.FC<Props> = (props) => {
  return (
    <>
      <input
        id={props?.id ?? props?.label ?? undefined}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        placeholder={props?.label ?? 'palce'}
        className={`${classes?.inpt} `}
        value={props?.value}
      ></input>
    </>
  );
};

export default ThemeInput;
