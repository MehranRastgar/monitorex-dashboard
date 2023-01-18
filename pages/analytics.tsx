import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetDevices } from "../src/api/devices";
import Item from "../src/atomic/atoms/Item/Item";
import DateTimeAnalytic from "../src/atomic/organisms/analytics/DateTimeAnalytic";
import MultiReportChartContainer from "../src/atomic/organisms/analytics/MultiReportChartContainer";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import DeviceSummary from "../src/atomic/organisms/device/deviceSummary";
import Layout from "../src/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import {
  reportSensorsAsync,
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectStartDate,
} from "../src/store/slices/analizeSlice";
import {
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
} from "../src/store/slices/devicesSlice";

export default function Analytics() {
  const { t } = useTranslation();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [elem, setElem] = useState(false);
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);
  const startDate = useAppSelector(selectEndDate);
  const endDate = useAppSelector(selectStartDate);

  const dispatch = useAppDispatch();
  const queryDevices = useQuery("devices", GetDevices);

  useEffect(() => {
    console.log(queryDevices);
    if (queryDevices.status === "success") {
      dispatch(setDevicesData(queryDevices.data));
      dispatch(setDevicesStatus("success"));
    }
  }, [queryDevices.isFetching, queryDevices.isSuccess]);
  return (
    <Layout>
      <section>
        <DateTimeAnalytic />
        <Item>
          <Button
            onClick={() => {
              const arr: string[] = [];
              selectedSensorsSlice?.map((sensor) => {
                if (sensor._id !== undefined) arr.push(sensor?._id);
              });
              dispatch(
                reportSensorsAsync({
                  sensors: arr,
                  start:
                    startDate !== undefined
                      ? new Date(startDate).toISOString()
                      : "",
                  end:
                    endDate !== undefined
                      ? new Date(endDate).toISOString()
                      : "",
                })
              );
            }}
          >
            get report
          </Button>
        </Item>
        {/* <DeviceList moreItems={true} /> */}
        {/* <DeviceSummary /> */}
      </section>
      <section>
        <div>what about report</div>
        <MultiReportChartContainer />
      </section>
    </Layout>
  );
}
