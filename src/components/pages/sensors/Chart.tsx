import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetSensorsSeries, GetSensorsSeriesFilled } from "../../../api/sensors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SensorsReceiveTpe } from "./sensorsTable";

export default function Chart({
  itemSelected,
}: {
  itemSelected: SensorsReceiveTpe;
}) {
  const [userData, setUserData] = useState<any>();
  const query = useQuery("sensorseries", () =>
    GetSensorsSeriesFilled(String(itemSelected._id))
  );

  function createData() {
    const tempdata: {
      value?: number;
      timeMinute: string;
    }[] = [];
    //console.log(query.data);
    query.data?.[0]?.data?.map((item, index) => {
      if (item?.x !== undefined && index % 20 === 0) {
        const datess = new Date(item.x);
        tempdata.push({
          value: Number(item?.y),
          timeMinute: datess.toLocaleTimeString(),
        });
        // tempdata.push(Number(item?.metaField?.value));
      }
    });
    setUserData(tempdata);
  }

  useEffect(() => {
    createData();
  }, [query.status]);
  return (
    <>
      {/* <div style={{ width: 1200 }}>
        {userData !== undefined ? <LineChart chartData={userData} /> : <></>}
      </div> */}
      {/* <Example /> */}

      <div style={{ width: 1200, height: 600 }}>
        {userData?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={1200}
              height={500}
              data={userData}
              throttleDelay={500}
              desc="true"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <ReferenceLine
                y={itemSelected.sensorLastSerie?.metaField?.max}
                label="Max"
                stroke="red"
              />
              <ReferenceLine
                y={itemSelected.sensorLastSerie?.metaField?.min}
                label="min"
                stroke="green"
              />
              <CartesianGrid strokeDasharray="6 6" />
              <XAxis dataKey="timeMinute" interval="preserveStart" />
              <YAxis
                allowDataOverflow
                domain={[
                  (itemSelected?.sensorLastSerie?.metaField?.min ?? 0) - 1,
                  (itemSelected?.sensorLastSerie?.metaField?.max ?? 0) + 1,
                ]}
                axisType="yAxis"
                interval="preserveStartEnd"
              />
              <Tooltip />
              <Legend />

              <Line
                activeDot={{ r: 4 }}
                dot={{ r: 0.2 }}
                type="natural"
                dataKey="value"
                stroke="#5c009d"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
