import { useRef, useState } from "react";
import Item from "../../atoms/Item/Item";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import html2canvas from "html2canvas";
import FullPageModal from "../../molecules/modal/FullPage";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../store/hooks";
import {
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectSensorReports,
  selectStartDate,
} from "../../../store/slices/analizeSlice";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TitleDesc from "./TitleDesc";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fa";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export default function DateTimeReport() {
  const { t } = useTranslation();
  const selectST = useAppSelector(selectStartDate);
  const selectET = useAppSelector(selectEndDate);
  // const selectedDevice = useAppSelector();

  return (
    <>
      <Box>
        <ul className="flex flex-wrap">
          <li className="flex w-1/3">
            <TitleDesc
              ct={"flex w-[350px]"}
              cx="flex mx-1  justify-start  text-[14px]"
              title={t("reportDate")}
              desc={dayjs()
                .calendar("jalali")
                .locale("fa")
                .format("DD MMMM YYYY - hh:mm")}
            />
          </li>
          <li className="flex w-1/3  border-r">
            <TitleDesc
              title={t("endDate")}
              cx="flex mx-1  justify-start  text-[14px]"
              desc={dayjs(selectST)
                .calendar("jalali")
                .locale("fa")
                .format("DD MMMM YYYY - hh:mm")}
            />
          </li>
          <li className="flex w-1/3  border-r">
            <TitleDesc
              cx="flex mx-1  justify-start  text-[14px]"
              title={t("startDate")}
              desc={dayjs(selectET)
                .calendar("jalali")
                .locale("fa")
                .format("DD MMMM YYYY - hh:mm")}
            />
          </li>
        </ul>
      </Box>
    </>
  );
}
