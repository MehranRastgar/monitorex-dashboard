import React, { useEffect, useState } from "react";
// import Chart from "chart.js/auto";
// import { Line } from "react-chartjs-2";
// import { CategoryScale } from "chart.js";
import { useQuery } from "react-query";
import { GetSensorsSeries } from "../../../api/sensors";
import DemoLine from "./ChartAnt";

export default function ChartSensor() {
  const [userData, setUserData] = useState<any>();
  const query = useQuery("sensorseries", GetSensorsSeries);

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
  }, [query.status]);
  return (
    <>
      {/* <div style={{ width: 1200 }}>
        {userData !== undefined ? <LineChart chartData={userData} /> : <></>}
      </div> */}
      <div style={{ width: 1200 }}>
        {query.status === "success" ? (
          <DemoLine chartData={query.data} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function LineChart({ chartData }: { chartData: any }) {
  return <>{/* <Line data={chartData} /> */}</>;
}

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
