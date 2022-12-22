import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetSensorsSeries } from "../../../api/sensors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { SensorsReceiveTpe } from "./sensorsTable";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function ChartSensor({
  itemSelected,
}: {
  itemSelected: SensorsReceiveTpe;
}) {
  const [userData, setUserData] = useState<any>();
  const query = useQuery("sensorseries", () =>
    GetSensorsSeries(String(itemSelected._id))
  );

  function createData() {
    const tempdata: {
      value: number;
      value2: number;
      value3: number;
      timeMinute: string;
    }[] = [];
    console.log(query.data?.length);
    query.data?.map((item, index) => {
      if (item?.timestamp !== undefined && index % 1 === 0) {
        const datess = new Date(item.timestamp);
        tempdata.push({
          value: Number(item?.metaField?.value),
          timeMinute: datess.toLocaleTimeString(),
          value2: Number(item?.metaField?.value) + 8,
          value3: Number(item?.metaField?.value) + 15,
        });
        // tempdata.push(Number(item?.metaField?.value));
      }
    });
    setUserData(tempdata);
  }

  useEffect(() => {
    //     if (query.status === "success")
    //       setUserData({
    //         labels: query.data.map((data) => {
    //           if (data?.timestamp !== undefined) {
    //             const time = new Date(data?.timestamp);
    //             return time.getMinutes();
    //           } else {
    //             return 0;
    //           }
    //         }),
    //         datasets: [
    //           {
    //             label: "Sensors",
    //             data: query.data.map((data) => data.metaField?.value),
    //             backgroundColor: [
    //               "rgba(75,192,192,1)",
    //               "#ecf0f1",
    //               "#50AF95",
    //               "#f3ba2f",
    //               "#2a71d0",
    //             ],
    //             borderColor: "gray",
    //             borderWidth: 0.5,
    //           },
    //         ],
    //       });
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
          <LineChart
            width={1200}
            height={500}
            data={userData}
            throttleDelay={1000}
            desc="true"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeMinute" interval="preserveStart" />
            <YAxis axisType="yAxis" interval="preserveStartEnd" />
            <Legend />
            <Line type="basis" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
//<DemoLine chartData={query.data} />

//<Line data={chartData} />
export const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];
