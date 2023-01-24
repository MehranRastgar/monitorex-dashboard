import { Button } from "@mui/material";
import React from "react";

// import classes from "./Button.module.scss";

interface Props {
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  children: any;
  disabled?: boolean;
}
const ButtonRegular: React.FC<Props> = (props) => {
  return (
    <Button
      className={`my-10 font-Vazir-Medium ${
        props?.disabled === true ? "bg-gray-600" : "bg-blue-600"
      }`}
      variant={"contained"}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default ButtonRegular;
