import React, { useEffect, useState } from "react";
import { socket } from "../../../components/socketio";
import { DevicesReceiveType } from "../../../store/api/devicesApi";
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
  eb_id?: string;
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
  const offs = 1 + (props?.offset ?? 0) * 7;

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
        {arrayOfElec?.map((i, index) => (
          <>
            {/* <div
              key={index + "-ii"}
              className="flex rounded-lg p-2 transition-all duration-700 border m-2"
            > */}

            <DeviceName
              index={index}
              byte={props.byte}
              id={props.eb_id}
              portNumber={offs + index}
            >
              <ObjectElectrical
                key={index}
                number={index + 1 + (props?.offset ?? 0) * 7}
                OnOrOff={
                  props?.byte !== undefined
                    ? (props?.byte & (0x00000001 << (6 - index))) === 0
                      ? false
                      : true
                    : undefined
                }
              />
            </DeviceName>
            {/* </div> */}
          </>
        ))}
      </div>
    </>
  );
};

export default ArrayOfElectrical;

interface PropsDev {
  portNumber?: number;
  id?: string;
  children: React.ReactElement;
  byte?: number;
  index: number;
}
const DeviceName: React.FC<PropsDev> = ({
  portNumber,
  id,
  children,
  byte,
  index,
}) => {
  const devices = useAppSelector(selectDevicesData);
  const [arrDev, setArrDev] = useState<DevicesReceiveType>();

  useEffect(() => {
    const dev = devices.filter((de) => de.electricalId === id);
    console.log(dev);
    const ind = dev?.findIndex((dev) => dev.electricalPort === portNumber);
    setArrDev(dev[ind]);
    // console.log("dive filtered", dev);
  }, [id, portNumber, children]);

  return (
    <>
      {arrDev?.title && (
        <Item
          key={index}
          className={`flex w-20 h-20 justify-start font-Vazir-Light m-2  ${
            byte !== undefined
              ? (byte & (0x00000001 << (6 - index))) === 0
                ? "bg-red-600"
                : "bg-green-600"
              : undefined
          }`}
        >
          <div className=" text-md break-words text-clip text-justify overflow-hidden h-full">
            {/* {index + offs} */}
            <div>{arrDev?.title ?? "NA"}</div>
            {children}
          </div>
        </Item>
      )}
    </>
  );
};
