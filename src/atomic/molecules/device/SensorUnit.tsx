import React, { useEffect, useState } from "react";
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from "src/components/pages/sensors/sensorsTable";
import { socket } from "src/components/socketio";
import { useAppSelector } from "src/store/hooks";
import { selectSocketObject, socketObType } from "src/store/slices/socketSlice";
interface Props {
  index: number;
  sensor: SensorsReceiveTpe;
}
const SensorUnit: React.FC<Props> = (props) => {
  const socketObj: socketObType = useAppSelector(selectSocketObject);
  const [sensorData, setSensorData] = useState<
    SensorWebsocketRealTimeDataType | undefined
  >(undefined);

  useEffect(() => {
    // if (props?.sensor?._id !== undefined)
    //   setSensorData(socketObj?.[props?.sensor?._id]);
    if (props?.sensor?._id)
      socket.on(props?.sensor?._id, (data: SensorWebsocketRealTimeDataType) => {
        // console.log(data);
        setSensorData(data);
      });

    return () => {
      if (props?.sensor?._id) socket.off(props?.sensor?._id);
    };
  }, []);

  return (
    <section
      className={
        "flex flex-wrap items-center justify-center border-[var(--border-color)] border-b h-[4vh] w-full text-[1.2vw] xl:text-xl overflow-x-auto overflow-y-hidden " +
        `${
          sensorData?.value === 200000
            ? "bg-[var(--warning-bg)] text-[var(--warning-text)]"
            : ""
        }`
      }
    >
      <div className="flex w-full justify-center items-center border-l border-[var(--border-color)] px-1">
        <div className="text-center justify-center w-1/2 ">
          {props?.sensor?.title}
        </div>
        <div className={"text-center justify-center w-1/2 "}>
          {sensorData?.value === 200000
            ? "bad Data"
            : sensorData?.value ?? "--"}
        </div>
      </div>
    </section>
  );
};

export default SensorUnit;
