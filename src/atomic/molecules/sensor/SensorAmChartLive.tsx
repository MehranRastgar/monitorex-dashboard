import { MutableRefObject, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import LineChart from "../../../components/chart/LineChart";
import AreaAndRange from "../../../components/canvas/views/area charts/AreaAndRange";
import { SensorDateValueFilled } from "../../../api/sensors";
const AmStockLive = dynamic(
  () => import("../../organisms/AmChartsStock/AmStockLive"),
  { ssr: false }
);
export default function SensorAmChartLive({
  lastData,
  data,
  id,
}: {
  lastData?: SensorDateValueFilled[];
  data: { value: number; date: number }[];
  id: string;
}) {
  const [value, setValue] = useState<{ value: number; date: number }[]>();
  function createData() {
    if (lastData !== undefined) {
      const pu: { value: number; date: number }[] = [];
      lastData?.map((dt, index) => {
        if (dt.metaField?.value !== undefined)
          pu.push({
            value: dt.metaField?.value,
            date: new Date(dt.timestamp).getTime(),
          });
      });

      setValue(pu.reverse());
    }
  }
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      Am chartsss
      <AmStockLive dataReal={[...(value ?? []), ...data]} id={id} />
      {/* <AreaAndRange id={id} /> */}
      {data.length}
      {","}
      {lastData?.length ?? 0}
    </>
  );
}
