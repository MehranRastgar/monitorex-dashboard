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
import { useAppSelector } from "../src/store/hooks";
import { selectSelectedSensors } from "../src/store/slices/sensorsSlice";
import Template from "../src/components/canvas/views/Template";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
export default function Devices() {
  const { t } = useTranslation();
  const selectedsensors = useAppSelector(selectSelectedSensors);
  const [elem, setElem] = useState(false);

  useEffect(() => {}, []);
  return (
    <Layout>
      <section>
        <DeviceList props={{ title: "devices" }} />
      </section>
    </Layout>
  );
}
