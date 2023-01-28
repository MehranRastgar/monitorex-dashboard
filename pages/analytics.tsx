import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetDevices } from "../src/api/devices";
import ButtonRegular from "../src/atomic/atoms/ButtonA/ButtonRegular";
import Item from "../src/atomic/atoms/Item/Item";
import GaugeDevice from "../src/atomic/molecules/AmChart/GaugeDevice";
import { SensorSelectedForReport } from "../src/atomic/molecules/SelectDevice/SelectDevice";
import DateTimeAnalytic from "../src/atomic/organisms/analytics/DateTimeAnalytic";
import MultiReportChartContainer from "../src/atomic/organisms/analytics/MultiReportChartContainer";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import DeviceSummary from "../src/atomic/organisms/device/deviceSummary";
import SelectDevicesForAnalize from "../src/atomic/organisms/SelectDevicesForAnalize";
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

  const handleReport = () => {
    const arr: string[] = [];
    selectedSensorsSlice?.map((sensor) => {
      if (sensor._id !== undefined) arr.push(sensor?._id);
    });
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: startDate !== undefined ? new Date(startDate).toISOString() : "",
        end: endDate !== undefined ? new Date(endDate).toISOString() : "",
      })
    );
  };
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
        <Box sx={{ py: 0 }}>
          <div className="font-Vazir-Medium text-[16px]">{t("analytics")}</div>
        </Box>
        <Box sx={{ py: 1 }}>
          <SelectDevicesForAnalize />
        </Box>
        <Item className="flex justify-start flex-wrap w-full ">
          <Box className="flex justify-start flex-wrap w-[95%] rounded-lg p-2 m-2">
            <SensorSelectedForReport />
          </Box>
          <Box className="flex flex-wrap justify-start">
            <DateTimeAnalytic />
            <div className="flex h-fit w-full justify-start mx-4">
              <ButtonRegular onClick={handleReport}>
                <Typography className="text-lg font-Vazir-Bold">
                  {t("takeReport")}
                </Typography>
              </ButtonRegular>
            </div>
          </Box>
        </Item>
      </section>
      <section className="my-2">
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
