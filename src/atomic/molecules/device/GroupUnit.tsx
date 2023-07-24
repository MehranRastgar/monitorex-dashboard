import React, { useEffect, useMemo, useState } from 'react';
import { SensorWebsocketRealTimeDataType } from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  reportSensorsAsync,
  selectGroupNumber,
  setEndDate,
  setSelectedGroupNumber,
  setSelectedSensors,
  setSelectedSensorsAdvanced,
  setStartDate,
} from 'src/store/slices/analizeSlice';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
import { selectOwnUser } from 'src/store/slices/userSlice';
import SensorUnit from './SensorUnit';
import dayjs, { Dayjs } from 'dayjs';
import { GroupItemType } from 'src/types/types';

// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));

interface Props {
  index?: number;
  rangeHour?: number
  handleClick: any
  setIsUpdate?: any
}
const GroupUnit: React.FC<Props> = (props) => {
  const [time, setTime] = useState(new Date());
  const [lastTime, setLastTime] = useState<any>(undefined);

  const devices = useAppSelector(selectDevicesData);
  const selectUSer = useAppSelector(selectOwnUser);
  const selectGPnumber = useAppSelector(selectGroupNumber);
  const group = useMemo(
    () => selectUSer?.groups?.[props?.index ?? 0],
    [selectUSer, props?.index],
  );
  const [device, setDevice] = useState<DevicesReceiveType | undefined>(
    devices?.[props?.index ?? 0],
  );
  const dispatch = useAppDispatch();
  const socketObj: socketObType = useAppSelector(selectSocketObject);
  const [deviceData, setDeviceData] = useState<
    SensorWebsocketRealTimeDataType | undefined
  >(undefined);

  useEffect(() => {
    // if (device?._id)
    // socket.once(device?._id, (data: SensorWebsocketRealTimeDataType) => {
    //   // console.log(data);
    //   setDeviceData(data);
    // });


    return () => {

      // if (device?._id) socket.off(device?._id);
    };
  }, [devices, device, deviceData]);


  const GetReport = (group: GroupItemType) => {
    let publishDate = new Date(1000 * dayjs().unix());

    dispatch(setEndDate(publishDate.toJSON()));
    dispatch(
      setStartDate(
        new Date(dayjs().unix() * 1000 - 60 * 1000 * 60 * ((props.rangeHour ?? 3) - 1)).toLocaleString(),
      ),
    );

    dispatch(setSelectedSensors(group.sensors));
    const arr: string[] = [];
    group?.sensors.map((item) => arr.push(item?._id ?? ''));
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: new Date(
          dayjs().unix() * 1000 - 60 * 1000 * 60 * ((props.rangeHour ?? 3) - 1),
        ).toLocaleString(),
        end: publishDate.toJSON(),
      }),
    );
  };

  return (
    <section
      onClick={() => {
        // console.log(group, props.index);
        if (group) {
          GetReport(group);
          props.handleClick(group)
          props?.setIsUpdate(false)
          if (props?.index !== undefined)
            dispatch(setSelectedGroupNumber(props.index));
          dispatch(setSelectedSensors(group.sensors));
        }
      }}
      style={{
        backgroundImage: "var(--device-item)"
      }}
      className={
        'm-1 flex flex-wrap rounded-md h-[40vh] max-w-[350px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4' +
        `${props.index === selectGPnumber
          ? '  border-[var(--text-color)] border border-b-0'
          : ' '
        }`
      }
    >
      <ul className="cursor-pointer text-[1.2vw] xl:text-xl  w-full h-[6vh] justify-center items-center border-b border-[var(--border-color)]">
        <li

          className={`cursor-pointer flex w-full h-[6vh] justify-center items-center border-b border-[var(--border-color)] ${props.index === selectGPnumber
            ? ''
            : ' '
            } `}
        >
          <div className="text-center justify-center w-full p-3 text-[1.8vw] xl:text-xl">
            {group?.groupTitle}
          </div>
        </li>
        <li className="flex w-full h-[4vh] justify-center items-center border-b border-[var(--border-color)] ">
          <div className=" text-center justify-center w-full p-3">
            {/* {deviceData?.deviceTitle ?? "- -"} */}
            {lastTime !== undefined
              ? new Date(lastTime).toLocaleTimeString()
              : '- - -'}
          </div>
        </li>

        <li className="overflow-auto w-full h-[30vh]">
          {group?.sensors?.map((sensor, index) => (
            <SensorUnit
              setLastTime={setLastTime}
              time={deviceData?.createdAt}
              index={index}
              sensor={sensor}
              key={sensor._id}
            />
          ))}
        </li>
      </ul>
      {props.index === selectGPnumber && <div className='translate-y-[16.5vh] bg-green-500 rounded-b-md h-[1vh] w-full'></div>}

    </section>
  );
};

export default GroupUnit;
