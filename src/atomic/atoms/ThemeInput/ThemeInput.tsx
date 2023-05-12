import { Button } from '@mui/material';
import React from 'react';

import classes from './ThemeInput.module.scss';

interface Props {
  label?: string;
  onChange?: any;
  value?: string;
}
const ThemeInput: React.FC<Props> = (props) => {
  return (
    <>
      <input
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
