import { useRef, useState } from "react";
import Item from "../../atoms/Item/Item";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import html2canvas from "html2canvas";
import FullPageModal from "../../molecules/modal/FullPage";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../store/hooks";
import {
  selectEndDate,
  selectSensorReports,
  selectStartDate,
} from "../../../store/slices/analizeSlice";
import AdapterJalali from "@date-io/date-fns-jalali";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";
interface Props {
  title: string;
  desc?: string;
  ct?: string;
  cx?: string;
}
const TitleDesc: React.FC<Props> = (props) => {
  return (
    <>
      {props.desc !== undefined ? (
        <Box
          className={props.ct ?? "flex w-full justify-start font-Vazir-Bold"}
        >
          <Typography className={props.cx ?? "flex mx-2 font-Vazir-Bold w-1/3"}>
            {props.title}
          </Typography>
          <Typography className="flex mx-2 font-Vazir-Medium">
            {" : "}
          </Typography>
          <Typography
            className={
              props.cx ?? "flex mx-2 font-Vazir-Medium justify-end w-1/2"
            }
          >
            {props.desc}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default TitleDesc;
// dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').year(2009).toString()
