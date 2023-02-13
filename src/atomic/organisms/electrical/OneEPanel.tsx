import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { socket } from "../../../components/socketio";
import ThingDevice, { DeviceThingProps } from "../../molecules/Thing/Device";
import ArrayOfElectrical from "./ArrayOfElectrical";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  idOfSub: string;
}
const OneEPanel: React.FC<Props> = (props) => {
  const [value, setValue] = useState<any | undefined>(undefined);
  const { t } = useTranslation();

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
    title: props?.idOfSub?.toString() ?? "electrical",
    // badge: item.sensors?.length.toString() ?? undefined,
    icon: "ic:outline-electric-meter",
    iconSize: 60,
  };
  return (
    <>
      <div className="flex items-end">
        <div>
          <ThingDevice {...thingOption} />
        </div>
        <div>
          <ArrayOfElectrical offset={0} byte={value?.metaField?.byte1} />
        </div>
        <div>
          <ArrayOfElectrical offset={1} byte={value?.metaField?.byte2} />
        </div>
        <div>
          <ArrayOfElectrical offset={2} byte={value?.metaField?.byte3} />
        </div>
      </div>
    </>
  );
};

export default OneEPanel;
