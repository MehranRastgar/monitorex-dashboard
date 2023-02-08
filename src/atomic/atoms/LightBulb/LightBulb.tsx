import React from "react";

import classes from "./lightBulb.module.scss";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  OnOff?: boolean;
}
const LightBulb: React.FC<Props> = (props) => {
  return (
    <>
      {props.OnOff ? (
        <>
          <div className={classes.bulb_container}>
            <div className={classes.bulb_on}></div>
            <div className={classes.blure_circle_on}></div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.bulb_container}>
            <div className={classes.bulb_off}></div>
            <div className={classes.blure_circle_off}></div>
          </div>
        </>
      )}
    </>
  );
};

export default LightBulb;
