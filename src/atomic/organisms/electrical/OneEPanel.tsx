import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollContainer from "react-indiana-drag-scroll";
import { socket } from "../../../components/socketio";
import { useAppSelector } from "../../../store/hooks";
import { selectDevicesData } from "../../../store/slices/devicesSlice";
import ThingDevice, { DeviceThingProps } from "../../molecules/Thing/Device";
import ArrayOfElectrical from "./ArrayOfElectrical";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  idOfSub: string;
}
const OneEPanel: React.FC<Props> = (props) => {
  const [value, setValue] = useState<any | undefined>(undefined);
  const { t } = useTranslation();
  const devices = useAppSelector(selectDevicesData);

  useEffect(() => {
    socket.on(props.idOfSub, (data: any) => {
      console.log(data)
      setValue(data);
      // console.log(data)
    });
    return () => {
      socket.off(props.idOfSub);
    };
  }, []);

  useEffect(() => {
    const ifNotReceive = setTimeout(() => setValue(undefined), 35000)
    return () => {
      clearTimeout(ifNotReceive)
    }
  }, [value])

  const thingOption: DeviceThingProps = {
    mode: "diselected",
    arrOfAttributes: [t("port") + " " + "21"],
    width: 100,
    height: 60,
    title:
      devices.filter((de) => de._id === props?.idOfSub)?.[0].title ??
      "electrical",
    // badge: item.sensors?.length.toString() ?? undefined,
    icon: "ic:outline-electric-meter",
    iconSize: 60,
  };
  return (
    <>
      <div
        style={{
          fontFamily: 'var(--fontFamily)'
        }}
        className="flex  flex-wrap  justify-center items-end w-full">
        {/* <ThingDevice {...thingOption} /> */}
        {/* {value !== undefined
          ? new Date(value?.timestamp).toLocaleTimeString()
          : '- - -'} */}
        <div className="flex w-full">
          <h1 className="flex w-1/3 m-2 text-3xl">{devices.filter((de) => de._id === props?.idOfSub)?.[0].title}</h1>
          <h1 className="flex w-1/3 m-2 text-3xl justify-center"> {value !== undefined
            ? new Date(value?.timestamp).toLocaleTimeString()
            : '- - -'}</h1>
          <div className="flex w-1/3 justify-end">
            <h1 className="flex w-fit m-2 text-3xl">{devices.filter((de) => de._id === props?.idOfSub)?.[0].address?.multiPort}</h1>

            <h1 className="flex w-fit m-2 text-3xl">{devices.filter((de) => de._id === props?.idOfSub)?.[0].address?.sMultiPort}</h1>
          </div>
        </div>
        {/* <div> */}
        <ArrayOfElectrical
          eb={devices.filter((de) => de._id === props?.idOfSub)?.[0]}
          offset={0}
          byte={value?.metaField?.byte1}
        />
        {/* </div> */}
        {/* <div> */}
        <ArrayOfElectrical
          eb={devices.filter((de) => de._id === props?.idOfSub)?.[0]}
          offset={1}
          byte={value?.metaField?.byte2}
        />
        {/* </div> */}
        {/* <div> */}
        <ArrayOfElectrical
          eb={devices.filter((de) => de._id === props?.idOfSub)?.[0]}
          offset={2}
          byte={value?.metaField?.byte3}
        />
        {/* </div> */}
      </div>
    </>
  );
};

export default OneEPanel;
