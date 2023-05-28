import { Button } from '@mui/material';
import React from 'react';

import classes from './ThemeButton.module.scss';

interface Props {
  type?: 'submit' | 'reject' | 'explore' | 'activate' | 'deactivate';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  children: any;
  disabled?: boolean;
  className?: string;
}
const FormThemeButton: React.FC<Props> = (props) => {
  return (
    <>
      {!props?.disabled ? (
        <button
          className={`${classes.btn} ${
            props.type === 'submit' && classes.submit
          } ${props.type === 'reject' && classes.reject} ${
            props.type === 'activate' && classes.activate
          } ${props.type === 'deactivate' && classes.deactivate} ${
            props.className
          }  ${props.type === 'explore' && classes.explore}  ${
            props.className
          }`}
          onClick={props.onClick}
          type={'submit'}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      ) : (
        <button
          className={`${classes.btn} ${classes.disabled}   ${props.className}`}
          onClick={props.onClick}
          type={'submit'}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      )}
    </>
  );
};

export default FormThemeButton;
