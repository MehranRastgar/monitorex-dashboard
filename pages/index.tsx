import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";
import ThingDevice, {
  DeviceThingProps,
} from "../src/atomic/molecules/Thing/Device";

function Dashboard() {
  const { t } = useTranslation();
  const thingOption: DeviceThingProps = {
    mode: "selected",
    onClick: "handleClick",
    arrOfAttributes: ["فارسی 20", "mos"],
    width: 120,
    height: 130,
    title: "سنسور",
    icon: "material-symbols:sensors-rounded",
  };
  return (
    <Layout>
      <section>
        <h2 className="title">{t("dashboard")}</h2>
        <Summary />
        {/* <SaleChart /> */}
        {/* <DashboardTables /> */}
        <div className="flex justify-center w-full">
          <ThingDevice {...thingOption} />
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
