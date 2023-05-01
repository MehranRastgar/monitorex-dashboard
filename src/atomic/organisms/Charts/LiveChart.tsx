import { NoSsr, Typography } from "@mui/material";
import Item from "../../atoms/Item/Item";
import DashboardLiveChart from "../../molecules/AmChart/DashboardLiveChart";
import { selectUserGroups } from "../../../store/slices/userSlice";
import {
  reportSensorsAsync,
  selectEndDate,
  selectGroupNumber,
  selectSensorReports,
  selectStatusReportApi,
  setSelectedGroupNumber,
} from "../../../store/slices/analizeSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import dynamic from "next/dynamic";
import CustomerForm from "../../molecules/forms/ClientForm";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { GroupItemType } from "../../../types/types";
import XYChartJS from "../ChartJs/XYchartJS";
// import BarchartLive from "../../molecules/AmChart/BarchartLive";
// const XYChart = dynamic(() => import("../../molecules/AmChart/XYChart"), {
//   ssr: false,
// });
interface Props {
  id?: string;
}

const LiveChart: React.FC<Props> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const GpNumber = useAppSelector(selectGroupNumber);
  const selectStatusOfApi = useAppSelector(selectStatusReportApi);
  const dataOfReport = useAppSelector(selectSensorReports);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeEnded, setTimeEnded] = useState<boolean>(false);
  function handleFetchData(
    selectUserGr2?: GroupItemType[],
    GpNumber2?: number
  ) {
    const arr: string[] = [];
    ////console.log(selectUserGr2, GpNumber2);
    if (selectUserGr !== undefined && GpNumber !== undefined) {
      ////console.log("handleFetchData");
      selectUserGr?.[GpNumber]?.sensors.map((item, index) => {
        if (item?._id !== undefined) arr.push(item?._id);
      });
      dispatch(
        reportSensorsAsync({
          sensors: arr,
          start: dayjs().subtract(72, "hour").toISOString(),
          end: new Date().toJSON(),
        })
      );
    } else {
      dispatch(setSelectedGroupNumber(0));
    }
  }

  useEffect(() => {
    handleFetchData(selectUserGr, GpNumber);
  }, [GpNumber]);

  return (
    <>
      <section className="flex flex-wrap w-full bg-[var(--blur-bg)] p-2">
        <DashboardLiveChart id={"id-" + props.id} />
      </section>
    </>
  );
};

export default LiveChart;

interface PropsBlink {
  state?: boolean;
}
const LiveBlink: React.FC<PropsBlink> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const GpNumber = useAppSelector(selectGroupNumber);
  const [blink, setBlink] = useState(props.state);

  useEffect(() => {
    const timo = setTimeout(() => {
      setBlink((val) => !val);
    }, 300);
    const timo2 = setTimeout(() => {
      setBlink(false);
    }, 2500);
    return () => {
      clearTimeout(timo);
      clearTimeout(timo2);
    };
  }, [props.state]);

  return (
    <>
      <section className="flex w-full items-start justify-end bg-[var(--sidebar)] p-1">
        <div className="flex w-full m-4 font-Vazir-Medium">
          {GpNumber !== undefined && selectUserGr !== undefined
            ? selectUserGr?.[GpNumber]?.groupTitle
            : ""}
        </div>
        <div className="items-center flex m-2">
          Live
          <div
            className={`flex items-center m-2 rounded-full w-[10px] h-[10px] ${
              blink ? "bg-red-600 " : "bg-gray-600 "
            }`}
          ></div>
        </div>
      </section>
    </>
  );
};
export { LiveBlink };
{
  /* <NoSsr>
            <XYChart
              isLoading={selectStatusOfApi === "loading" ? true : false}
              data={dataOfReport?.length ? [...dataOfReport] : undefined}
              id={"id225"}
            />
          </NoSsr> */
}
{
  /* <CustomerForm /> */
}
