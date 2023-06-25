import React, { useEffect, useState } from "react";
import { socket } from "../../../components/socketio";
import { DevicesReceiveType, ElectricalPanelType } from "../../../store/api/devicesApi";
import { useAppSelector } from "../../../store/hooks";
import { selectDevicesData } from "../../../store/slices/devicesSlice";
import Item from "../../atoms/Item/Item";
import LightBulb from "../../atoms/LightBulb/LightBulb";
import ObjectElectrical from "../../molecules/electrical/ObjectElectrical";
import classes from "./ArrayOfElectrical.module.scss";

// const socket = io("http://localhost:3051");
const numb = 0b00000001;
const numberOfElectricalDevices = 7;

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  byte?: number;
  offset?: number;
  eb?: DevicesReceiveType;
}
const ArrayOfElectrical: React.FC<Props> = (props) => {
  const [reverse, setReverse] = useState(false);
  const [arrayOfElec, setArrayOfElec] = useState<number[]>([]);
  const devices = useAppSelector(selectDevicesData);
  function waitforme(millisec: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, millisec);
    });
  }
  async function HandleArr() {
    for (let i = numberOfElectricalDevices; i > 0; i--) {
      //   await waitforme(500);
      setArrayOfElec([...arrayOfElec, i]);
    }
  }
  const offs = (props?.offset ?? 0) * 7;

  useEffect(() => {
    if (arrayOfElec?.length < numberOfElectricalDevices) HandleArr();
  }, [arrayOfElec]);
  return (
    <>
      <div
        onClick={() => {
          if (arrayOfElec?.length > 0) {
            // setArrayOfElec([]);
          }
        }}
        className="flex transition-all duration-700 "
      >
        {props.eb?.electricals?.slice(offs, offs + 7)?.map((elec, index) =>
          <DeviceName
            index={index}
            byte={props.byte}
            elec={elec}
            key={index}
          >
            <ObjectElectrical
              // key={index}
              number={index + 1 + offs}
              OnOrOff={
                props?.byte !== undefined
                  ? (props?.byte & (0x00000001 << (6 - index))) === 0
                    ? false
                    : true
                  : undefined
              }
            />
          </DeviceName>
        )}
      </div>
    </>
  );
};

export default ArrayOfElectrical;

interface PropsDev {
  elec: ElectricalPanelType
  byte?: number;
  index: number;
  children: any
}
const DeviceName: React.FC<PropsDev> = ({
  index,
  byte,
  elec,
  children
}) => {


  return (
    <div
      className={`flex flex-wrap w-20 h-20 justify-center font-Vazir-Light m-2  ${byte !== undefined
        ? (byte & (0x00000001 << (6 - index))) === 0
          ? "bg-gray-600"
          : "bg-green-600"
        : undefined
        }`}
    >
      <div className="flex w-full ">
        {byte !== undefined
          ? (byte & (0x00000001 << (6 - index))) === 0
            ? "OFF"
            : "ON"
          : undefined}
      </div>
      <div className=" text-xs break-words text-clip text-justify overflow-hidden h-full">
        {/* {index + offs} */}
        <div className="max-h-8 h-8 text-justify w-full justify-center">
          {elec?.deviceName ?? "NA"}
        </div>

        {children}
      </div>
    </div>
  );
};
