import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";

function Dashboard() {
  const { t } = useTranslation();
  return <section>{t("users")}</section>;
}

export default Dashboard;
