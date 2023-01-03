import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectDevicesAlarms } from "../../../../store/slices/devicesSlice";

export default function Messages() {
  const dispatch = useAppDispatch();
  const selectAlarms = useAppSelector(selectDevicesAlarms);
  useEffect(() => {
    console.log(selectAlarms);
  }, [selectAlarms]);
  return (
    <>
      <div>{selectAlarms?.length}</div>
      <Button>alarms</Button>
    </>
  );
}

// type TextInputProps = {
//     className?:string;
//     type?:string;
//     id:string;
//     ref?: React.Ref<HTMLInputElement> | null
//     }
//     export type Ref = HTMLButtonElement;

//     function TextInput ({className, type, id, ref}:TextInputProps) {

//       switch(type){

//       case "text":
//         return   <input type='text' className={className} id={id}  ref={ref} />;
//         break;
//       case "number" :
//           return  <input type="number" className={className} id={id} ref={ref}  /> ;
//           break;
//       case "password":
//         return <input type="password" className={className} id={id} ref={ref} /> ;
//         break;
//       case "email":
//         return  <input type="email" className={className} id={id} ref={ref}  /> ;
//         break;
//       case "tel":
//         return <input type="tel" className={className} id={id} ref={ref}  />;
//         break;
//     default:
//       return <div></div>;

//     }};

//     export TextInput
