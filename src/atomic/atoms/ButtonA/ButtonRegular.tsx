import { Button } from "@mui/material";
import React from "react";

// import classes from "./Button.module.scss";

interface Props {
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  children: any;
  disabled?: boolean;
  className?: string;
}
const ButtonRegular: React.FC<Props> = (props) => {
  return (
    <Button
      size={"small"}
      className={
        `flex w-fit text-justify my-1 max-h-[20px] font-Vazir-Medium text-xs ${
          props?.disabled === true
            ? "bg-gray-600"
            : "bg-[var(--button-primary)]"
        } ` + props.className
      }
      variant={"contained"}
      onClick={props.onClick}
      type={props?.type}
    >
      {props.children}
    </Button>
  );
};

export default ButtonRegular;
