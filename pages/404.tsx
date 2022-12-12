import React, { useEffect } from "react";
// import Router from "next/router";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";

export default function Error404() {
  const { t } = useTranslation();
  useEffect(() => {
    //Router.push("/");
  });

  return (
    <>
      {" "}
      <section>
        <h2 className="flex w-full title">مسیر مورد نظر موجود نیست 404</h2>
      </section>
    </>
  );
}
