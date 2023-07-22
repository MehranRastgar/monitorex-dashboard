import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";
import CustomTable from "../src/components/tables/customTable/CustomTable";
import data from "../src/constants/sensors";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Button, PaginationItem } from "@mui/material";
import SensorsTable from "../src/components/pages/sensors/sensorsTable";
import ChartSensor from "../src/components/pages/sensors/SensorChart";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { selectSelectedSensors } from "../src/store/slices/sensorsSlice";
import Template from "../src/components/canvas/views/Template";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import {
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
} from "../src/store/slices/devicesSlice";
import { GetDevices } from "../src/api/devices";
import DeviceSummary from "../src/atomic/organisms/device/deviceSummary";
import EbDeviceObject from "../src/atomic/molecules/eb/EbDeviceObject";
export default function Devices() {
  const { t } = useTranslation();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [elem, setElem] = useState(false);

  const dispatch = useAppDispatch();
  const queryDevices = useQuery("devices", GetDevices);

  useEffect(() => {
    if (queryDevices.status === "success") {
      dispatch(setDevicesData(queryDevices.data));
      dispatch(setDevicesStatus("success"));
    }
  }, [queryDevices.isFetching, queryDevices.isSuccess]);
  return (
    <Layout>
      <section>
        <h1 className="flex font-Vazir-Medium text-2xl">{t("electricalBoards")}</h1>
        <EbDeviceObject />
      </section>
    </Layout>
  );
}
