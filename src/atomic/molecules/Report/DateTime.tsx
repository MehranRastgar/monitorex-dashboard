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
import { Typography } from "@mui/material";

export default function DateTimeReport() {
  const selectST = useAppSelector(selectStartDate);
  const selectET = useAppSelector(selectEndDate);

  return (
    <>
      <Box>
        <Typography>{selectST}</Typography>
      </Box>
    </>
  );
}
