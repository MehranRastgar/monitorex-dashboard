import { Icon } from '@iconify/react';
import starSolid from '@iconify/icons-clarity/star-solid';

import React, { useEffect, useState } from 'react';
import {
  SensorsReceiveTpe,
  SensorWebsocketRealTimeDataType,
} from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addNewRecordToSocket, selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
interface Props {
  index: number;
  sensor: SensorsReceiveTpe;
  time?: string;
  setLastTime?: any
}
const SensorUnit: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const socketObj: socketObType = useAppSelector(selectSocketObject);
  const [sensorData, setSensorData] = useState<
    SensorWebsocketRealTimeDataType | undefined
  >(undefined);

  useEffect(() => {

    // if (props?.sensor?._id !== undefined)
    //   setSensorData(socketObj?.[props?.sensor?._id]);
    let soId: any
    if (props?.sensor?._id)
      soId = socket.on(props?.sensor?._id, (data: SensorWebsocketRealTimeDataType) => {
        // console.log('Sen Unit sensorsocket:', data);
        setSensorData(data);
        if (props.setLastTime)
          props.setLastTime(data?.createdAt)
        // dispatch(addNewRecordToSocket(data));
      });

    return () => {
      socket.off(props?.sensor?._id)
    };
  }, [props.time]);

  return (
    <section
      className={
        'flex flex-wrap items-center justify-center border-[var(--border-color)] border-b h-[4vh] w-full text-[1.2vw] xl:text-xl overflow-x-auto overflow-y-hidden ' +
        `${sensorData?.value === 200000
          ? 'bg-[var(--dev-bgc-deactive)] text-[var(--text-color)]'
          : `${props?.sensor?.maxAlarm &&
            sensorData?.value &&
            sensorData?.value >= props?.sensor?.maxAlarm
            ? 'bg-[var(--max-color)]'
            : `${props?.sensor?.minAlarm &&
            sensorData?.value &&
            sensorData?.value <= props?.sensor?.minAlarm &&
            'bg-[var(--min-color)]'
            }`
          }`
        }`
      }
    >
      <div className="flex w-full justify-center items-center border-l border-[var(--border-color)] px-1">
        <div className="text-center justify-center w-1/2 ">
          {props?.sensor?.title}
        </div>
        <div className={'text-center justify-center w-1/2 '}>
          {sensorData?.value === 200000
            ? 'bad Data'
            : sensorData?.value ?? '--'}
        </div>

        {/* {props?.sensor?.maxAlarm &&
          sensorData?.value &&
          sensorData?.value >= props?.sensor?.maxAlarm ? (
          <div>max</div>
        ) : (
          <></>
        )}
        {props?.sensor?.minAlarm &&
          sensorData?.value &&
          sensorData?.value <= props?.sensor?.minAlarm ? (
          <div>min</div>
        ) : (
          <></>
        )} */}
        {props?.sensor?.isRealTime ? <div className=''><Icon icon={starSolid} color="#FFC412" />
        </div> : <div className=''><Icon icon={starSolid} color="#0000" />
        </div>}
      </div>
    </section >
  );
};

export default SensorUnit;
