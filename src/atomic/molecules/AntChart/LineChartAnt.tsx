import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { deepMix } from "@antv/util";
import { Line } from "@ant-design/plots";
import { Column, G2 } from "@ant-design/plots";

export default function DemoTinyLine() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        //console.log("fetch data failed", error);
      });
  };
  const theme = G2.getTheme("dark");
  const ty: "horizontal" | "vertical" | undefined = "horizontal";
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    xAxis: {
      type: "time",
    },
    yAxis: {
      label: {
        //
        formatter: (v: string) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },

    theme: deepMix({}, theme, {
      components: {
        scrollbar: {
          //
          default: {
            style: {
              trackColor: "rgba(255,255,255,0.05)",
              thumbColor: "rgba(255,255,255,0.25)",
            },
          },
          // hover
          hover: {
            style: {
              thumbColor: "rgba(255,255,255,0.6)",
            },
          },
        },
      },
    }),
    scrollbar: {
      type: ty,
    },
  };

  return <Line {...config} />;
}
