import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <Layout>
      <section>
        <h2 className="title">{t("dashboard")}</h2>
        <Summary />
        <SaleChart />
        {/* <DashboardTables /> */}
      </section>
    </Layout>
  );
}

export default Dashboard;
