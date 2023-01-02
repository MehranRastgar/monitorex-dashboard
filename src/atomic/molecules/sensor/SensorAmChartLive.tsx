import { MutableRefObject, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import LineChart from "../../../components/chart/LineChart";
import AreaAndRange from "../../../components/canvas/views/area charts/AreaAndRange";
const AmStockLive = dynamic(
  () => import("../../organisms/AmChartsStock/AmStockLive"),
  { ssr: false }
);
export default function SensorAmChartLive({
  data,
  id,
}: {
  data: { value: number; date: number }[];
  id: string;
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="w-[1200px] h-[200px]">
        Am chartsss
        <AmStockLive dataReal={data} id={id} />
        {/* <AreaAndRange id={id} /> */}
        {data.length}
      </div>
    </>
  );
}
