import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";

import HighchartsReact from "highcharts-react-official";
import {
  Datum,
  selectSensorReports,
  SensorsReportType,
} from "../../../store/slices/analizeSlice";
import { useAppSelector } from "../../../store/hooks";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import ButtonRegular from "../../atoms/ButtonA/ButtonRegular";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

export default function GaugeDevice({
  id,
  val,
  minmax,
}: {
  id: string;
  val: number;
  minmax: { min: number; max: number };
}) {
  const [state, setState] = useState<any>(undefined);

  function makeData() {
    setState({
      chartOptions: {
        chart: {
          type: "solidgauge",
          backgroundColor: "none",
        },
        title: null,
        style: {
          background: "#55BF3B",
        },
        pane: {
          center: ["9%", "85%"],
          size: "100px",
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: "#EEE",
            innerRadius: "60%",
            outerRadius: "100%",
            shape: "arc",
          },
        },
        exporting: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        yAxis: {
          stops: [
            [0.1, "#55BF3B"], // green
            [0.5, "#DDDF0D"], // yellow
            [0.9, "#DF5353"], // red
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 1,
          tickColor: "#000",
          title: {
            text: "xpm",
            y: -30,
          },
          labels: {
            y: 16,
          },
          min: minmax?.min ?? 0,
          max: minmax?.max ?? 100,
        },
        series: [
          {
            name: "temp",
            data: [val],
            dataLabels: {
              format:
                '<div style="text-align:center;z-index: -1;">' +
                '<span style="font-size:12px;color:white">{y:.1f}</span><br/>' +
                '<span style="font-size:10px;color:white;opacity:0.9">' +
                "C" +
                "</span>" +
                "</div>",
            },
            tooltip: {
              valueSuffix: "revolutions/min",
            },
          },
        ],
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 8,
              borderWidth: 0,
              useHTML: true,
            },
          },
        },
        // responsive: {
        //   rules: [
        //     {
        //       condition: {
        //         maxWidth: 100,
        //       },
        //       chartOptions: {
        //         legend: {
        //           align: "center",
        //           verticalAlign: "bottom",
        //           layout: "horizontal",
        //         },
        //         yAxis: {
        //           labels: {
        //             align: "left",
        //             x: 0,
        //             y: -5,
        //           },
        //           title: {
        //             text: null,
        //           },
        //         },
        //         subtitle: {
        //           text: null,
        //         },
        //         credits: {
        //           enabled: false,
        //         },
        //       },
        //     },
        //   ],
        // },
      },
    });
  }

  useEffect(() => {
    setState(undefined);
    const tim = setTimeout(() => {
      makeData();
    }, 100);
    return () => {
      clearTimeout(tim);
    };
  }, [val]);
  return (
    <>
      <div className="w-[120px] flex h-[100px] ">
        {state?.chartOptions !== undefined ? (
          <HighchartsReact
            id={id}
            // constructorType={"solidgauge"}
            highcharts={Highcharts}
            options={state.chartOptions}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
