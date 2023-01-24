import { useRef, useState } from "react";
import Item from "../../atoms/Item/Item";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import html2canvas from "html2canvas";
import DataGridReports from "../../molecules/DataGrid/DataGridReports";
import DataOfReport, { DataOfReportPrintMode } from "./DataOfReport";
import FullPageModal from "../../molecules/modal/FullPage";
import DateTimeReport from "../../molecules/Report/DateTime";

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

  return (
    <>
      <div>
        <Item>
          <DateTimeReport />
          jaye iran
        </Item>
      </div>
    </>
  );
}
