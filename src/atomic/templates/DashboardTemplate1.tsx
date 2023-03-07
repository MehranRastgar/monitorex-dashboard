// import DemoDualAxes from "../molecules/AntChart/MultiLineChart";

import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectDevicesData } from "../../store/slices/devicesSlice";
import Item from "../atoms/Item/Item";
import BarchartLive from "../molecules/AmChart/BarchartLive";
import LiveChart from "../organisms/Charts/LiveChart";
import OneEPanel from "../organisms/electrical/OneEPanel";
import LiveDataGrid from "../organisms/LiveDataGrid/LiveDataGrid";
import GroupListComponent from "../organisms/UserGroups/GroupListComponent";
import classes from "./../../components/summary/Summary.module.scss";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  idOfSub?: string;
  mode: number;
}
const DashboardTemplate1: React.FC<Props> = (props) => {
  const selectDevices = useAppSelector(selectDevicesData);
  useEffect(() => {
    console.log(selectDevices);
  });
  return (
    <>
      <section className="flex">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <GroupListComponent />
            </Item>
            <Item className="w-full mt-4">
              <BarchartLive id="barchart-live" />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item className="h-full">
              <LiveChart />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <LiveDataGrid />
            </Item>
          </Grid>
          {/* <Grid item xs={8}>
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
          </Grid> */}
        </Grid>
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
