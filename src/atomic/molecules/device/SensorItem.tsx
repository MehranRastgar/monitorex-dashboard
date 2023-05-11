import React, { useEffect, useState } from 'react';
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { useAppSelector } from 'src/store/hooks';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
interface Props {
  index: number;
  sensor: SensorsReceiveTpe;
  time?: string;
}
const SensorItem: React.FC<Props> = (props) => {
  const socketObj: socketObType = useAppSelector(selectSocketObject);
  const [sensorData, setSensorData] = useState<
    SensorWebsocketRealTimeDataType | undefined
  >(undefined);

  useEffect(() => {
    // if (props?.sensor?._id !== undefined)
    //   setSensorData(socketObj?.[props?.sensor?._id]);
    if (props?.sensor?._id)
      socket.once(
        props?.sensor?._id,
        (data: SensorWebsocketRealTimeDataType) => {
          console.log('sensorsocket:', data);
          setSensorData(data);
        },
      );

    return () => {};
  }, [props.time]);

  return (
    <section
      className={
        'flex flex-wrap items-center justify-center border-[var(--border-color)] border-b h-[4vh] w-full text-[1.2vw] xl:text-xl overflow-x-auto overflow-y-hidden '
      }
    >
      <div className="flex w-full justify-center items-center border-l border-[var(--border-color)] px-1">
        <div className="text-center justify-center w-1/2 ">
          {props?.sensor?.title}
        </div>
      </div>
    </section>
  );
};

export default SensorItem;
