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
    <button
      className={
        `overflow-hidden text- p-2 items-center rounded-lg flex w-auto my-1 max-h-[20px]  text-xs shadow-xl  ${props?.disabled === true
          ? "bg-gray-600"
          : "bg-[var(--dev-bgc-selected)]"
        } ` + props.className
      }
      onClick={props.onClick}
      type={props?.type}
    >
      {props.children}
    </button>
  );
};

export default ButtonRegular;
