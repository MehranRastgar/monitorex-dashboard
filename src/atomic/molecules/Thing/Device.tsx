import { Icon } from "@iconify/react";
import { Badge, Typography } from "@mui/material";
import { MutableRefObject, useEffect, useRef } from "react";
import classes from "./device.module.scss";

export interface DeviceThingProps {
  title?: string;
  arrOfAttributes?: string[];
  bgColor?: string;
  textColor?: string;
  mode: devicethingmodes;
  icon?: string;
  onClick?: any;
  width?: number;
  height?: number;
  badge?: string;
  iconSize?: number;
}
export type devicethingmodes = "disable" | "selected" | "diselected";
const ThingDevice: React.FC<DeviceThingProps> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (
      props.width !== undefined &&
      props.height !== undefined &&
      inputRef.current !== null
    ) {
      inputRef.current.style.width = `${String(props.width)}px`;
      inputRef.current.style.height = `${String(props.height)}px`;
    }
  }, [props.width, props.height]);

  return (
    <>
      <div onClick={() => { }} className={classes.box + " flex"}>
        <Badge color="info" badgeContent={props.badge}>
          <div className="flex  overflow-hidden rounded">
            {props?.icon !== undefined ? (
              <div className="absolute filter w-full saturate-50 opacity-75 z-[1] ">
                <div className="flex w-full justify-end p-2">
                  <Icon
                    color={"black"}
                    fontSize={props.iconSize ?? 50}
                    icon={props.icon}
                  ></Icon>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div
              ref={inputRef}
              className={
                classes.dev_body +
                "z-[2]  " +
                `${props.mode === "diselected"
                  ? ``
                  : `${props.mode === "disable"
                    ? `${classes.dev_body_disable}`
                    : `${classes.dev_body_selected}`
                  }`
                }`
              }
            >
              <Typography className="flex w-full text-[14px]   hover:break-all overflow-hidden">
                {props?.title ?? "no title"}
              </Typography>
              {props?.arrOfAttributes?.map((attr, index) => (
                <>
                  <Typography
                    className="w-full hover:break-all overflow-hidden rounded  text-[12px]"
                    key={index}
                  >
                    {attr}
                  </Typography>
                </>
              ))}
            </div>
          </div>
        </Badge>
      </div>
    </>
  );
};
export default ThingDevice;
