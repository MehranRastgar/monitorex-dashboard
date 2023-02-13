import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";

const DemoDualAxes = () => {
  const juBillData = [
    {
      time: "2018-09",
      value: 350,
      type: "ju",
    },
    {
      time: "2018-10",
      value: 350,
      type: "ju",
    },
    {
      time: "2018-11",
      value: 350,
      type: "ju",
    },
    {
      time: "2018-12",
      value: 350,
      type: "ju",
    },
    {
      time: "2019-01",
      value: 350,
      type: "ju",
    },
    {
      time: "2019-02",
      value: 350,
      type: "ju",
    },
    {
      time: "2019-04",
      value: 900,
      type: "ju",
    },
    {
      time: "2019-05",
      value: 300,
      type: "ju",
    },
    {
      time: "2019-06",
      value: 450,
      type: "ju",
    },
    {
      time: "2019-07",
      value: 470,
      type: "ju",
    },
    {
      time: "2019-03",
      value: 220,
      type: "rr",
    },
    {
      time: "2019-04",
      value: 300,
      type: "rr",
    },
    {
      time: "2019-05",
      value: 250,
      type: "rr",
    },
    {
      time: "2019-06",
      value: 220,
      type: "rr",
    },
    {
      time: "2019-07",
      value: 362,
      type: "rr",
    },
  ];
  const uvBillData = [
    {
      time: "2018-09",
      value: 350,
      type: "uv",
    },
    {
      time: "2018-10",
      value: 350,
      type: "uv",
    },
    {
      time: "2018-11",
      value: 350,
      type: "uv",
    },
    {
      time: "2018-12",
      value: 350,
      type: "uv",
    },
    {
      time: "2019-01",
      value: 350,
      type: "uv",
    },
    {
      time: "2019-02",
      value: 350,
      type: "uv",
    },
    {
      time: "2019-04",
      value: 900,
      type: "uv",
    },
    {
      time: "2019-05",
      value: 300,
      type: "uv",
    },
    {
      time: "2019-06",
      value: 450,
      type: "uv",
    },
    {
      time: "2019-07",
      value: 470,
      type: "uv",
    },
    {
      time: "2019-03",
      value: 220,
      type: "bill",
    },
    {
      time: "2019-04",
      value: 300,
      type: "bill",
    },
    {
      time: "2019-05",
      value: 250,
      type: "bill",
    },
    {
      time: "2019-06",
      value: 220,
      type: "bill",
    },
    {
      time: "2019-07",
      value: 362,
      type: "bill",
    },
  ];
  const transformData = [
    {
      time: "2019-03",
      count: 800,
      name: "a",
    },
    {
      time: "2019-04",
      count: 600,
      name: "a",
    },
    {
      time: "2019-05",
      count: 400,
      name: "a",
    },
    {
      time: "2019-06",
      count: 380,
      name: "a",
    },
    {
      time: "2019-07",
      count: 220,
      name: "a",
    },
    {
      time: "2019-03",
      count: 750,
      name: "b",
    },
    {
      time: "2019-04",
      count: 650,
      name: "b",
    },
    {
      time: "2019-05",
      count: 450,
      name: "b",
    },
    {
      time: "2019-06",
      count: 400,
      name: "b",
    },
    {
      time: "2019-07",
      count: 320,
      name: "b",
    },
    {
      time: "2019-03",
      count: 900,
      name: "c",
    },
    {
      time: "2019-04",
      count: 600,
      name: "c",
    },
    {
      time: "2019-05",
      count: 450,
      name: "c",
    },
    {
      time: "2019-06",
      count: 300,
      name: "c",
    },
    {
      time: "2019-07",
      count: 50,
      name: "c",
    },
  ];
  const config = {
    theme: "dark",
    data: [uvBillData, transformData, juBillData],
    xField: "time",
    yField: ["value", "count", "count2"],
    geometryOptions: [
      {
        geometry: "line",
        seriesField: "type",
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        smooth: true,
      },
      {
        geometry: "line",
        seriesField: "name",
        point: {},
      },
    ],
  };
  return <DualAxes {...config} />;
};
export default DemoDualAxes;
// ReactDOM.render(<DemoDualAxes />, document.getElementById("container"));
