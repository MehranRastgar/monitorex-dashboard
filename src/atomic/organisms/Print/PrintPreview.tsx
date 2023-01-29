import { useState } from "react";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import FullPageModal from "../../molecules/modal/FullPage";
import { DataOfReportPrintMode } from "../analytics/DataOfReport";
import ReportHeader from "../analytics/ReportHeader";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { PreviewA4 } from "@diagoriente/react-preview-a4";
import AgGrid from "../../molecules/AgGrid/AgGridReact";

export function PrintPreview() {
  const [options, setOptions] = useState<{
    printHasChart: boolean;
    printHasDataGrid: boolean;
    printHasHeader: boolean;
  }>({
    printHasChart: true,
    printHasDataGrid: true,
    printHasHeader: true,
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  return (
    <>
      <section className="flex justify-center">
        <FullPageModal setOptions={setOptions}>
          <div className="">
            {/* {options.printHasHeader ? <ReportHeaderPrintMode /> : <></>} */}
            <ReportHeader />

            {options.printHasChart ? (
              <>
                {" "}
                <MultiLineChart id={"multilineChart-1"} />
              </>
            ) : (
              <></>
            )}
            {options.printHasDataGrid ? (
              <>
                <DataOfReportPrintMode />
              </>
            ) : (
              <></>
            )}
          </div>
        </FullPageModal>
      </section>
    </>
  );
}
