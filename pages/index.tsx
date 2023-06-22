import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";
import ThingDevice, {
  DeviceThingProps,
} from "../src/atomic/molecules/Thing/Device";
import ObjectElectrical from "../src/atomic/molecules/electrical/ObjectElectrical";
import ArrayOfElectrical from "../src/atomic/organisms/electrical/ArrayOfElectrical";
import OneEPanel from "../src/atomic/organisms/electrical/OneEPanel";
import Item from "../src/atomic/atoms/Item/Item";
import DashboardTemplate1 from "../src/atomic/templates/DashboardTemplate1";
import ButtonPupup from "../src/atomic/molecules/Pupup/ButtonPupup";
import LogBox from "../src/atomic/molecules/Log/LogBox";
import {
  useAppSelector,
  useSocketDatas,
  useSocketId,
} from "../src/store/hooks";
import { selectUserGroups } from "../src/store/slices/userSlice";
import { selectGroupNumber } from "../src/store/slices/analizeSlice";

function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <Layout>
        <section>
          {/* <h2 className="title">{t("dashboard")}</h2> */}
          {/* <Summary /> */}
          {/* <SaleChart /> */}
          {/* <DashboardTables /> */}

          <DashboardTemplate1 mode={1} />

          {/* <DashboardContainer/> */}
        </section>
      </Layout>
      <ButtonPupup title="terminal">
        <section className="flex w-full bg-blackout-black h-[300px] ">
          <LogBox title="real time log" id="terminal" />
          <LogBox title="real time alarms" id="alarms" />
        </section>
      </ButtonPupup>
    </>
  );
}

export default Dashboard;

//create a NEXT component to for Line chart with  Amcharts library
