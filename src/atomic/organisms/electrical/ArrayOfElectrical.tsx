import React, { useEffect, useState } from "react";
import { socket } from "../../../components/socketio";
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
}
const ArrayOfElectrical: React.FC<Props> = (props) => {
  const [reverse, setReverse] = useState(false);
  const [arrayOfElec, setArrayOfElec] = useState<number[]>([]);

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

  useEffect(() => {
    if (arrayOfElec?.length < numberOfElectricalDevices) HandleArr();
  }, [arrayOfElec]);
  return (
    <>
      <div
        onClick={() => {
          if (arrayOfElec?.length > 0) {
            setArrayOfElec([]);
          }
        }}
        className="flex  transition-all duration-700 "
      >
        {arrayOfElec?.map((i, index) => (
          <>
            <div
              key={index + "-ii"}
              className="flex transition-all duration-700 "
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
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ArrayOfElectrical;
