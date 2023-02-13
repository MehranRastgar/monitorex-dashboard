// import DemoDualAxes from "../molecules/AntChart/MultiLineChart";

import { Box, Grid, Typography } from "@mui/material";
import Item from "../atoms/Item/Item";
import LiveChart from "../organisms/Charts/LiveChart";
import OneEPanel from "../organisms/electrical/OneEPanel";
import GroupListComponent from "../organisms/UserGroups/GroupListComponent";
import classes from "./../../components/summary/Summary.module.scss";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  idOfSub?: string;
  mode: number;
}
const DashboardTemplate1: React.FC<Props> = (props) => {
  return (
    <>
      <section className="flex">
        <div className="flex flex-wrap w-1/4">
          <GroupListComponent />
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
        </div>
      </section>
    </>
  );
};
export default DashboardTemplate1;
{
  /* 
             <UserGropsList/>
              <AlarmsList/> */
}
