import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import { FetchSensorXY } from "../../../api/sensors";

export default function DemoLine({
  chartData,
}: {
  chartData: FetchSensorXY[];
}) {
  const [data, setData] = useState([{}]);

  function createData() {
    const tempdata: { date: string; temp: number }[] = [];
    chartData?.map((item, index) => {
      if (item?.timestamp !== undefined) {
        const datess = new Date(item.timestamp);
        tempdata.push({
          temp: Number(item?.metaField?.value),
          date: datess.toLocaleTimeString(),
        });
      }
      setData(tempdata);
    });
  }
  useEffect(() => {
    createData();
    // asyncFetch();
  }, []);

  // const asyncFetch = () => {
  //   fetch(
  //     "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log("fetch data failed", error);
  //     });
  // };
  const config = {
    data,

    padding: "auto",
    xField: "date",
    yField: "temp",
    xAxis: {
      // type: 'timeCat',
      tickCount: 15,
    },
    annotations: [
      {
        type: "line",

        start: ["min", 35],

        end: ["max", 35],
        text: {
          content: "ماکسیموم",
          position: "right",
          offsetY: 18,
          style: {
            textAlign: "right",
          },
        },
        style: {
          lineDash: [4, 4],
        },
      },
      {
        type: "line",

        start: ["min", 15],

        end: ["max", 15],
        text: {
          content: "مینیموم",
          position: "right",
          offsetY: -6,
          style: {
            textAlign: "right",
            fill: "lightblue",
          },
        },
        style: {
          lineDash: [4, 4],
          stroke: "lightblue",
        },
      },
    ],
    smooth: true,
  };

  return <Line {...config} />;
}
