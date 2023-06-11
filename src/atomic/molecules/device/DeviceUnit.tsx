import React, { useEffect, useState } from 'react';
import { SensorWebsocketRealTimeDataType, SensorsReceiveTpe } from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
import SensorUnit from './SensorUnit';
import { reportSensorsAsync, selectDeviceNumber, setEndDate, setSelectedDeviceNumber, setSelectedSensors, setStartDate } from 'src/store/slices/analizeSlice';
import { Sensors } from 'src/store/slices/settingsSlice';
import dayjs, { Dayjs } from 'dayjs';

// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));

interface Props {
  index: number;
}
const DeviceUnit: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const selectDeviceN = useAppSelector(selectDeviceNumber)
  const [time, setTime] = useState(new Date());
  const devices = useAppSelector(selectDevicesData);
  const [device, setDevice] = useState<DevicesReceiveType | undefined>(
    devices?.[props?.index ?? 0],
  );
  const socketObj: socketObType = useAppSelector(selectSocketObject);
  const [deviceData, setDeviceData] = useState<
    SensorWebsocketRealTimeDataType | undefined
  >(undefined);
  const GetReport = async (sensors: SensorsReceiveTpe[]) => {
    let publishDate = new Date(1000 * dayjs().unix());

    dispatch(setEndDate(publishDate.toJSON()));
    dispatch(
      setStartDate(
        new Date(dayjs().unix() * 1000 - 8 * 1000).toLocaleString(),
      ),
    );

    // dispatch(setSelectedSensors(group.sensors));
    const arr: string[] = [];
    await Promise.all(sensors?.map((item) => {
      if (item.isRealTime)
        arr.push(item?._id ?? '')
    }));
    console.log('promise all', arr)
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: new Date(
          dayjs().unix() * 1000 - 8 * 1000,
        ).toLocaleString(),
        end: publishDate.toJSON(),
      }),
    );
  };
  useEffect(() => {
    if (device?._id)
      socket.once(device?._id, (data: SensorWebsocketRealTimeDataType) => {
        // console.log(data);
        setDeviceData(data);
      });

    return () => {
      // if (device?._id) socket.off(device?._id);
    };
  }, [devices, device, deviceData]);

  return (
    <section className={"flex flex-wrap border-[var(--border-color)] border h-[40vh] max-w-[350px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4" + `${props.index === selectDeviceN
      ? '   shadow-xl shadow-green-500 border'
      : ' '
      }`}>
      <ul className="cursor-pointer text-[1.2vw] xl:text-xl  w-full h-[6vh] justify-center items-center border-b border-[var(--border-color)]">
        <li
          onClick={() => {
            GetReport(devices?.[props?.index]?.sensors ?? []);
            dispatch(setSelectedDeviceNumber(props.index));
          }}
          className={"flex w-full h-[6vh] justify-center items-center border-b border-[var(--border-color)]" + `${props.index === selectDeviceN
            ? ' bg-green-400'
            : ' '
            } `}>
          <div className="text-center justify-center w-full p-3 text-[1.8vw] xl:text-xl">
            {device?.title},{device?.address?.multiPort},
            {device?.address?.sMultiPort}
          </div>
        </li>
        <li className="flex w-full h-[4vh] justify-center items-center border-b border-[var(--border-color)]">
          <div className=" text-center justify-center w-full p-3">
            {/* {deviceData?.deviceTitle ?? "- -"} */}
            {deviceData?.createdAt !== undefined
              ? new Date(deviceData?.createdAt).toLocaleTimeString()
              : '- - -'}
          </div>
        </li>
        <li className="overflow-auto w-full h-[30vh]">
          {device?.sensors?.map((sensor, index) => (
            <SensorUnit
              time={deviceData?.createdAt}
              index={index}
              sensor={sensor}
              key={index.toString()}
            />
          ))}
        </li>
      </ul>
    </section>
  );
};

export default DeviceUnit;
