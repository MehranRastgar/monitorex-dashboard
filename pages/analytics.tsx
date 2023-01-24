import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetDevices } from "../src/api/devices";
import ButtonRegular from "../src/atomic/atoms/ButtonA/ButtonRegular";
import Item from "../src/atomic/atoms/Item/Item";
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
        <Box sx={{ py: 1 }}>
          <div className="font-Vazir-Medium text-[20px]">{t("analytics")}</div>
        </Box>
        <Box sx={{ py: 1 }}>
          <SelectDevicesForAnalize />
        </Box>
        <Item className="flex justify-center flex-wrap w-full ">
          <Box className="m-4 flex flex-wrap w-[85%] border border-dashed rounded-lg p-4">
            <SensorSelectedForReport />
          </Box>

          <Box className="flex flex-wrap justify-center">
            <DateTimeAnalytic />
            <Box className="flex w-full justify-center">
              <ButtonRegular onClick={handleReport}>
                {t("takeReport")}
              </ButtonRegular>
            </Box>
          </Box>
        </Item>
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
