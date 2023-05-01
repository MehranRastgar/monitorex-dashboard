// import DemoDualAxes from "../molecules/AntChart/MultiLineChart";

import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SensorWebsocketRealTimeDataType } from "../../components/pages/sensors/sensorsTable";
import { socket } from "../../components/socketio";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGroupNumber } from "../../store/slices/analizeSlice";
import { selectDevicesData } from "../../store/slices/devicesSlice";
import { addNewRecordToSocket } from "../../store/slices/socketSlice";
import { selectUserGroups } from "../../store/slices/userSlice";
import { GroupItemType } from "../../types/types";
import Item from "../atoms/Item/Item";
import BarchartLive from "../molecules/AmChart/BarchartLive";
import LiveChart from "../organisms/Charts/LiveChart";
import OneEPanel from "../organisms/electrical/OneEPanel";
import LiveDataGrid from "../organisms/LiveDataGrid/LiveDataGrid";
import SensorsSummary from "../organisms/sensor/SensorsSummary";
import GroupListComponent from "../organisms/UserGroups/GroupListComponent";
import classes from "./../../components/summary/Summary.module.scss";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  idOfSub?: string;
  mode: number;
}
const DashboardTemplate1: React.FC<Props> = (props) => {
  const selectDevices = useAppSelector(selectDevicesData);
  // const Groups = useAppSelector(selectUserGroups);
  // const gpNumber = useAppSelector(selectGroupNumber);

  const [showdiv, setShowdiv] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const Groups = useAppSelector(selectUserGroups);
  const gpNumber = useAppSelector(selectGroupNumber);
  const [group, setGroup] = useState<GroupItemType | null>(null);

  useEffect(() => {
    if (gpNumber !== undefined && Groups?.[gpNumber] !== undefined)
      setGroup(Groups?.[gpNumber]);
  }, [Groups, gpNumber]);

  useEffect(() => {
    group?.sensors?.map((sens, index) => {
      if (sens?._id)
        socket.on(sens?._id, (data: SensorWebsocketRealTimeDataType) => {
          dispatch(addNewRecordToSocket(data));
          // console.log(data);
        });
    });
    return () => {
      group?.sensors?.map((sens, index) => {
        socket.off(sens?._id);
      });
    };
  }, [group]);

  useEffect(() => {
    setShowdiv(false);
    setTimeout(() => setShowdiv(true), 500);
  }, [group]);
  return (
    <>
      <section className="flex justify-center min-w-full -mt-6">
        <div className="flex justify-center flex-wrap min-w-full">
          <div className="flex flex-wrap justify-self-auto min-w-full m-1 border border-[var(--border-color)]">
            <div className="flex w-full md:w-1/2 lg:w-1/2">
              <GroupListComponent type="group" />
            </div>
            <div className="flex w-full md:w-1/2 lg:w-1/2">
              <GroupListComponent type="device" />
            </div>
          </div>
          <div className="flex justify-center min-w-full m-1 border border-[var(--border-color)] p-2">
            <LiveChart />
          </div>
          <div className="min-w-full min-h-[40vh] m-1 border border-[var(--border-color)]">
            {showdiv ? <LiveDataGrid /> : <>loading</>}
          </div>
          <div className="min-w-full max-h-[50vh] m-1 border border-[var(--border-color)] overflow-auto">
            <SensorsSummary />
          </div>
          {/* <div className="flex w-full justify-center lg:w-1/3 ">
            <BarchartLive id="barchart-live" />
          </div> */}
          {/* <div item xs={8}>
            <Item>
              {selectDevices?.map(({ _id, title, type }) => (
                <>
                  {type === "Electrical panel" && _id !== undefined ? (
                    <OneEPanel idOfSub={_id} />
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </Item>
          </div> */}
        </div>

        {/* 

        <div className="flex flex-wrap w-1/4">
          <GroupListComponent />
          <section className="flex w-[400PX] overflow-x-auto justify-end h-[300px]">
            <BarchartLive id="barchart-live" />
          </section>
          <div className="flex w-full h-[200px]">
            <Item className="w-full m-2">
              <Typography>alarms</Typography>
            </Item>
          </div>
        </div>
        <div className="flex flex-wrap w-3/4">
          <LiveChart />
          <Item className="mt-6">
            <OneEPanel idOfSub={"63b5f8b29d6c56acddc8b55a"} />
          </Item>
        </div> */}
      </section>
      <div className="flex h-[200px] w-full"></div>
    </>
  );
};
export default DashboardTemplate1;
{
  /* 
             <UserGropsList/>
              <AlarmsList/> */
}
