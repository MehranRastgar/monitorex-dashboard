import { CircularProgress, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../../atoms/Item/Item";
import LightBulb from "../../atoms/LightBulb/LightBulb";
import classes from "./ObjectElectrical.module.scss";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  OnOrOff?: boolean;
  number: number;
}
const ObjectElectrical: React.FC<Props> = (props) => {
  const [reverse, setReverse] = useState(false);
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  return (
    <>
      {props.OnOrOff !== undefined ? (
        <div
          onClick={() => {
            setReverse((value) => !value);
          }}
        >
          <div className={classes.container}>
            {props.OnOrOff ? (
              <div className={classes.badge}>{props?.number}</div>
            ) : (
              <div className={classes.badge}>{props?.number}</div>
            )}
            {/* <LightBulb OnOff={props.OnOrOff} /> */}
            {/* <Switch {...label} defaultChecked color="secondary" /> */}
          </div>
        </div>
      ) : (
        <>
          <div className="flex m-2">
            <CircularProgress color="secondary" />
          </div>
        </>
      )}
    </>
  );
};

export default ObjectElectrical;
