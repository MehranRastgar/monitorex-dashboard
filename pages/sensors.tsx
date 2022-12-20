import React, { useEffect } from "react";
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

function Sensors() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section>
        <h2 className="title">{t("sensors")}</h2>
        <SensorsTable />
        <div className="flex w-full justify-center my-20">
          {/* <ChartSensor /> */}
        </div>
      </section>
    </Layout>
  );
}

export default Sensors;
