import { Typography } from "@mui/material";
import Item from "../../atoms/Item/Item";
import DashboardLiveChart from "../../molecules/AmChart/DashboardLiveChart";
import { selectUserGroups } from "../../../store/slices/userSlice";
import {
  reportSensorsAsync,
  selectEndDate,
  selectGroupNumber,
  selectSensorReports,
  selectStatusReportApi,
} from "../../../store/slices/analizeSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import dynamic from "next/dynamic";
import CustomerForm from "../../molecules/forms/ClientForm";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
const XYChart = dynamic(() => import("../../molecules/AmChart/XYChart"), {
  ssr: false,
});
interface Props {
  id?: string;
}

const LiveChart: React.FC<Props> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const GpNumber = useAppSelector(selectGroupNumber);
  const selectStatusOfApi = useAppSelector(selectStatusReportApi);
  const dataOfReport = useAppSelector(selectSensorReports);
  const [blink, setBlink] = useState(false);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | undefined>(undefined);

  function handleFetchData() {
    const arr: string[] = [];
    console.log(selectUserGr, GpNumber);
    if (selectUserGr !== undefined && GpNumber !== undefined) {
      console.log("handleFetchData");
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
    }
  }

  useEffect(() => {
    handleFetchData();
  }, [GpNumber]);

  // useEffect(() => {
  //   const timo = setInterval(() => {
  //     setBlink((val) => !val);
  //   }, 800);
  //   return () => {
  //     clearInterval(timo);
  //   };
  // }, []);
  return (
    <>
      <Item className="flex flex-wrap w-full h-fit  p-2">
        <section className="flex w-full items-start justify-end">
          <div className="flex m-4 font-Vazir-Medium">
            {GpNumber !== undefined && selectUserGr !== undefined
              ? selectUserGr[GpNumber].groupTitle
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
        <section className="flex w-full">
          {/* <DashboardLiveChart id={"id-" + props.id} /> */}
          <XYChart
            isLoading={selectStatusOfApi === "loading" ? true : false}
            data={dataOfReport?.length ? [...dataOfReport] : undefined}
            id={"id225"}
          />
          {/* <CustomerForm /> */}
        </section>
      </Item>
    </>
  );
};

export default LiveChart;
