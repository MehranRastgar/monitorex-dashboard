import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import LayoutLogin from "../src/components/layout/LayoutLogin";
import Image from "next/image";
import imageLoader from "../src/components/imageLoader";
import Login from "../src/components/login/Login";
import Layout from "../src/components/layout/Layout";

function LoginPage() {
  const { t } = useTranslation();
  return (
    <LayoutLogin>
      <section className="max-h-full overflow-y-hidden w-[100%] mt-20 rounded-xl overflow-hidden justify-center flex items-center">
        <Image
          draggable={false}
          className="fixed z-[0] top-0 brightness-50 flex w-full min-w-[1800px] min-h-[400px]  object-fill  object-center h-full"
          loader={imageLoader}
          alt="InoMal Logo"
          src={"/loginpage.png"}
          unoptimized
          width={1800}
          height={800}
        />
        {/* <DashboardTables /> */}
        {/* <div className="fixed top-[20%] left-[30%] w-[30%] bg-ino-hgray rounded-xl h-[40%] z-[1]"> */}
        <Login />
        {/* </div> */}
      </section>
    </LayoutLogin>
  );
}

export default LoginPage;
