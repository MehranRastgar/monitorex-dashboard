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
  const [lastTime, setLastTime] = useState<any>(undefined);
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
        new Date(dayjs().unix() * 1000 - 60 * 1000 * 60 * 5).toLocaleString(),
      ),
    );

    // dispatch(setSelectedSensors(group.sensors));
    const arr: string[] = [];
    await Promise.all(sensors?.map((item) => {
      if (item.isRealTime)
        arr.push(item?._id ?? '')
    }));
    // console.log('promise all', arr)
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: new Date(
          dayjs().unix() * 1000 - 60 * 1000 * 60 * 5,
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


  useEffect(() => {


  }, []);

  return (
    <section
      onClick={() => {
        GetReport(devices?.[props?.index]?.sensors ?? []);
        dispatch(setSelectedDeviceNumber(props.index));
      }}
      style={{
        backgroundImage: "var(--device-item)"
      }}
      className={"m-1 flex flex-wrap rounded-md h-[40vh] max-w-[350px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4" + `${props.index === selectDeviceN
        ? '   border-[var(--text-color)] border border-b-0 '
        : ' overflow-hidden border border-[var(--border-color)] p-1 '
        }`}>
      <ul className="cursor-pointer text-[1.2vw] xl:text-xl  w-full h-[6vh] justify-center items-center border-b border-[var(--border-color)]">
        <li
          // onClick={() => {
          //   GetReport(devices?.[props?.index]?.sensors ?? []);
          //   dispatch(setSelectedDeviceNumber(props.index));
          // }}
          className={"flex w-full h-[6vh] justify-center items-center border-b border-[var(--border-color)] p-1" + `${props.index === selectDeviceN
            ? ' '
            : ' '
            } `}>
          <div className="flex text-center justify-center w-full  p-3 text-[1.8vw] xl:text-xl ">
            {device?.title}
          </div>
          <span className='flex text-[8px]  p-2'>{device?.address?.multiPort}</span>
          <span className='flex text-[8px]  p-2'>{device?.address?.sMultiPort}</span>
        </li>
        <li className="flex w-full h-[4vh] justify-center items-center border-b border-[var(--border-color)] ">
          <div className=" text-center justify-center w-full p-3">
            {/* {deviceData?.deviceTitle ?? "- -"} */}
            {lastTime !== undefined
              ? new Date(lastTime).toLocaleTimeString()
              : '- - -'}
          </div>
        </li>
        <li className="overflow-auto w-full h-[30vh] p-1">
          {device?.sensors?.map((sensor, index) => (
            <SensorUnit
              setLastTime={setLastTime}
              time={deviceData?.createdAt}
              index={index}
              sensor={sensor}
              key={index.toString()}
            />
          ))}
        </li>
      </ul>
      {props.index === selectDeviceN && <div className='translate-y-[16.5vh] bg-green-500 rounded-b-md h-[1vh] w-full'></div>}
    </section>
  );
};

export default DeviceUnit;
