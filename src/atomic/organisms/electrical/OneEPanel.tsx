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
      setValue(data);
    });
    return () => {
      socket.off(props.idOfSub);
    };
  }, []);

  const thingOption: DeviceThingProps = {
    mode: "diselected",
    arrOfAttributes: [t("port") + " " + "21"],
    width: 130,
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
      <div className="flex items-end overflow-y-hidden">
        <ScrollContainer
          vertical={false}
          hideScrollbars={false}
          className="scroll-container px-2 product-slider-one-items overflow-y-hidden "
        >
          <div>
            <ThingDevice {...thingOption} />
          </div>
          <div>
            <ArrayOfElectrical
              eb_id={devices.filter((de) => de._id === props?.idOfSub)?.[0]._id}
              offset={0}
              byte={value?.metaField?.byte1}
            />
          </div>
          <div>
            <ArrayOfElectrical
              eb_id={devices.filter((de) => de._id === props?.idOfSub)?.[0]._id}
              offset={1}
              byte={value?.metaField?.byte2}
            />
          </div>
          <div>
            <ArrayOfElectrical
              eb_id={devices.filter((de) => de._id === props?.idOfSub)?.[0]._id}
              offset={2}
              byte={value?.metaField?.byte3}
            />
          </div>
        </ScrollContainer>
      </div>
    </>
  );
};

export default OneEPanel;
