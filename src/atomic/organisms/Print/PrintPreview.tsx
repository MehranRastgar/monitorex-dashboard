import { useState } from "react";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";
import FullPageModal from "../../molecules/modal/FullPage";
import { DataOfReportPrintMode } from "../analytics/DataOfReport";
import ReportHeader from "../analytics/ReportHeader";

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
      <section className="flex justify-center">
        <FullPageModal setOptions={setOptions}>
          <div className=" ">
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
            {options.printHasDataGrid ? <DataOfReportPrintMode /> : <></>}
          </div>
        </FullPageModal>
      </section>
    </>
  );
}
