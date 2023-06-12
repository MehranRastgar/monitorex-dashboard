import { useRef, useState } from "react";
import Item from "../../atoms/Item/Item";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
// import {
//   exportComponentAsJPEG,
//   exportComponentAsPDF,
//   exportComponentAsPNG,
// } from "react-component-export-image";
import html2canvas from "html2canvas";
import DataGridReports from "../../molecules/DataGrid/DataGridReports";
import DataOfReport from "./DataOfReport";
import FullPageModal from "../../molecules/modal/FullPage";
import { PrintPreview } from "../Print/PrintPreview";
import DateTimeReport from "../../molecules/Report/DateTime";
import ReportHeader from "./ReportHeader";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
export default function MultiReportChartContainer() {
  const componentRef = useRef<HTMLInputElement | null>(null);
  const handleDownloadImage = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element as HTMLElement);
    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <>
      <div ref={componentRef}>
        {/* <Item className="p-4"> */}
        {/* <ReportHeader /> */}
        <MultiLineChart id={"multilineChart-1"} />
        <DataOfReport />
        <PrintPreview />
        {/* </Item> */}
      </div>
    </>
  );
}
