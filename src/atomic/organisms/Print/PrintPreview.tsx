import { useState } from "react";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import FullPageModal from "../../molecules/modal/FullPage";
import { DataOfReportPrintMode } from "../analytics/DataOfReport";

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

  return (
    <>
      <section className="flex ">
        <FullPageModal setOptions={setOptions}>
          {/* {options.printHasHeader ? <ReportHeaderPrintMode /> : <></>} */}
          {options.printHasChart ? (
            <MultiLineChart id={"multilineChart-1"} />
          ) : (
            <></>
          )}
          {options.printHasDataGrid ? <DataOfReportPrintMode /> : <></>}
        </FullPageModal>
      </section>
    </>
  );
}
