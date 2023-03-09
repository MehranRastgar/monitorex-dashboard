import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from "../../../components/pages/sensors/sensorsTable";
import { socket } from "../../../components/socketio";
import { useAppSelector } from "../../../store/hooks";
import { selectGroupNumber } from "../../../store/slices/analizeSlice";
import { selectSocketObject } from "../../../store/slices/socketSlice";
import { selectUserGroups } from "../../../store/slices/userSlice";
import { GroupItemType } from "../../../types/types";
import Item from "../../atoms/Item/Item";

interface Props {
  groups?: any;
}

const SensorsSummary: React.FC<Props> = ({ groups }) => {
  const Groups = useAppSelector(selectUserGroups);
  const gpNumber = useAppSelector(selectGroupNumber);
  const [group, setGroup] = useState<GroupItemType | null>(null);

  useEffect(() => {
    if (gpNumber !== undefined && Groups?.[gpNumber] !== undefined)
      setGroup(Groups?.[gpNumber]);
  }, [Groups, gpNumber]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {group?.sensors?.map((sensor, index) => (
          <div
            id={"sensorSummary-" + index}
            className="flex "
            key={"sensorSummary-" + index}
          >
            {sensor._id && <SensorObjectForSummary sensor={sensor} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default SensorsSummary;

interface PropsObj {
  sensor: SensorsReceiveTpe;
}

const SensorObjectForSummary: React.FC<PropsObj> = ({ sensor }) => {
  const Groups = useAppSelector(selectUserGroups);
  const gpNumber = useAppSelector(selectGroupNumber);
  const [sensorLive, setSensorLive] =
    useState<SensorWebsocketRealTimeDataType | null>(null);
  const socketObj = useAppSelector(selectSocketObject);
  useEffect(() => {
    const sss = setTimeout(() => {
      setSensorLive(null);
    }, 6000);
    if (sensor?._id !== undefined && socketObj?.[sensor?._id] !== undefined) {
      setSensorLive(socketObj?.[sensor?._id]);
    }
    return () => {
      clearTimeout(sss);
    };
  }, [socketObj]);

  useEffect(() => {}, [socketObj]);
  // useEffect(() => {
  //   ////console.log(sensor);
  //   const timo = setTimeout((timo) => {
  //     setSensorLive(null);
  //   }, 15000);

  //   if (sensor?._id !== undefined)
  //     socket.on(sensor?._id, (data: SensorWebsocketRealTimeDataType) => {
  //       // console.log(sensor?._id, data);
  //       setSensorLive(data);
  //     });
  //   return () => {
  //     // socket.off(sensor?._id);
  //     clearTimeout(timo);
  //   };
  // }, [gpNumber]);

  // useEffect(() => {
  //   if (sensorLive?.createdAt) {
  //     const dat = new Date(sensorLive?.createdAt);
  //     const now = new Date();
  //     const timevalue = now.getTime() - dat.getTime();
  //     //console.log("now time : ", timevalue);
  //   }
  // }, [sensorLive, sensor]);

  return (
    <>
      <Item className="flex p-[15px] justify-start flex-wrap w-[200px] h-[190px] text-xs m-4 font-Vazir-Medium">
        <SensorTitleDescribe title="ID" describe={sensor?._id} />
        <SensorTitleDescribe
          title="sensorName"
          describe={sensorLive?.sensorTitle + "," + sensorLive?.deviceTitle}
        />

        <SensorTitleDescribe title="sensorType" describe={sensor?.type} />
        <SensorTitleDescribe title="sensorUnit" describe={sensor?.unit} />
        <SensorTitleDescribe
          title="Last Data"
          describe={new Date(sensorLive?.createdAt ?? 0).toLocaleTimeString()}
        />
        <div
          className={`absolute translate-x-[-100px] translate-y-[100px] z-[50] flex p-2 text-md rounded-lg ${
            sensorLive?.value === 200000
              ? "bg-gray-400"
              : sensorLive?.value !== undefined
              ? "bg-green-600"
              : "bg-orange-600"
          }`}
        >
          {sensorLive?.value === 200000
            ? "no-data"
            : sensorLive?.value.toString() ?? (
                <CircularProgress size={15} color="secondary" />
              )}
        </div>
      </Item>
    </>
  );
};

interface PropsO {
  title: string;
  describe?: string;
}
const SensorTitleDescribe: React.FC<PropsO> = ({ title, describe }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex h-6 w-auto p-1 m-1 break-words text-clip overflow-hidden text-justify border-b">
        <span>{t(title)} : </span>
        {describe ?? "no name"}
      </div>
    </>
  );
};
