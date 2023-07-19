import { useEffect, useRef, useState } from "react";
import Item from "../../atoms/Item/Item";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import html2canvas from "html2canvas";
import DataGridReports from "../../molecules/DataGrid/DataGridReports";
import DataOfReport, { DataOfReportPrintMode } from "./DataOfReport";
import FullPageModal from "../../molecules/modal/FullPage";
import DateTimeReport from "../../molecules/Report/DateTime";
import ModulesReports from "../../molecules/Report/ModulesReport";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TitleDesc from "../../molecules/Report/TitleDesc";
import { useAppSelector } from "../../../store/hooks";
import { selectUserInfo } from "../../../store/slices/clientSlice";

export default function ReportHeader() {
  const [options, setOptions] = useState<{
    printHasChart: boolean;
    printHasDataGrid: boolean;
    printHasHeader: boolean;
  }>({
    printHasChart: true,
    printHasDataGrid: true,
    printHasHeader: true,
  });
  const componentRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const selectuserinfo = useAppSelector(selectUserInfo);
  // const select
  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    if (window !== undefined) {
      const ui = localStorage?.getItem("user");
      if (ui !== null) setUserInfo(JSON?.parse(ui).user);
    }
  }, []);

  return (
    <>
      <section className="border rounded-lg p-4">
        <Typography className="mb-10 font-Vazir-Bold text-2xl">
          {t("report")}
        </Typography>
        <div className="flex flex-wrap">
          <DateTimeReport />
          <div className=" flex w-full border-b"></div>
          <ModulesReports />
        </div>
        <div className="flex w-full border-b"></div>
        <TitleDesc
          ct="flex w-full justify-start font-Vazir-Bold"
          cx="flex mx-2 font-Vazir-Medium"
          title={t("userName")}
          desc={userInfo?.username}
        />
      </section>
    </>
  );
}

export function ReportHeaderPrintMode() {
  const [options, setOptions] = useState<{
    printHasChart: boolean;
    printHasDataGrid: boolean;
    printHasHeader: boolean;
  }>({
    printHasChart: true,
    printHasDataGrid: true,
    printHasHeader: true,
  });
  const componentRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const selectuserinfo = useAppSelector(selectUserInfo);
  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    if (window !== undefined) {
      const ui = localStorage?.getItem("user");
      if (ui !== null) setUserInfo(JSON?.parse(ui).user);
    }
  }, []);

  return (
    <>
      <section className="border rounded-lg p-2 bg-white">
        <li>
          <ul>
            <Typography className="mb-6 font-Vazir-Bold text-2xl bg-white text-black">
              {t("report")}
            </Typography>
          </ul>
          <ul className="border">
            <TitleDesc
              ct="flex w-full justify-start font-Vazir-Bold text-black"
              cx="flex mx-2 font-Vazir-Medium"
              title={t("userName")}
              desc={userInfo?.username}
            />
          </ul>
          <ul className="border">
            <div className="flex flex-wrap bg-white text-black">
              <DateTimeReport />
              <div className=" flex w-full border-b text-black"></div>
              <ModulesReports />
            </div>
          </ul>
        </li>
      </section>
    </>
  );
}
