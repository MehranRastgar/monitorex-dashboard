import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetDevices } from "../src/api/devices";
import Item from "../src/atomic/atoms/Item/Item";
import DateTimeAnalytic from "../src/atomic/organisms/analytics/DateTimeAnalytic";
import MultiReportChartContainer from "../src/atomic/organisms/analytics/MultiReportChartContainer";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import DeviceSummary from "../src/atomic/organisms/device/deviceSummary";
import SelectDevicesForAnlize from "../src/atomic/organisms/SelectDevicesForAnlize";
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
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

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
        <Box sx={{ py: 1 }}>
          <Item>
            <div className="font-Vazir-Medium text-[20px]">
              {t("analytics")}
            </div>
          </Item>
        </Box>
        <DateTimeAnalytic />
        <Box sx={{ py: 1 }}>
          <SelectDevicesForAnlize />
        </Box>
        <div className="flex"></div>
        <Button
          className="my-10"
          variant={"contained"}
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
                  endDate !== undefined ? new Date(endDate).toISOString() : "",
              })
            );
          }}
        >
          get report
        </Button>
      </section>
      <section className="my-10">
        <MultiReportChartContainer />
      </section>
    </Layout>
  );
}

{
  /* <DeviceList moreItems={true} /> */
}
{
  /* <DeviceSummary /> */
}
