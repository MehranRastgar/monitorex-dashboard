import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import {
  Datum,
  selectSensorReposts,
  SensorsReportType,
} from "../../../store/slices/analizeSlice";
import { useAppSelector } from "../../../store/hooks";
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

// Apply the theme

export default function MultiLineChart({ id }: { id: string }) {
  const selectDataOFChart = useAppSelector(selectSensorReposts);
  // const [hoverData, setddata] = useState()
  // const selectSensorsData =
  const [state, setState] = useState<any>();
  const [continus, setContinus] = useState(false);
  const [justPoint, setJustPoint] = useState(false);
  const [theme, setTheme] = useState(0);
  const [chartMode, setChartMode] = useState<"line" | "spline" | "column">(
    "line"
  );

  function makeData(data: Datum[]) {
    const arr: any[] = [];
    data.map((item, index) => {
      if (item?.x !== undefined)
        if (item?.y !== undefined || continus)
          arr.push([new Date(item?.x), item?.y ?? null]);
    });
    return arr;
  }

  function sumOfdata(data: SensorsReportType[]) {
    const arrSeries: { name: string; data: any[] }[] = [];
    data?.map((sens, index) => {
      if (sens?.data !== undefined) {
        arrSeries.push(
          {
            lineWidth: justPoint ? 0 : 1,
            marker: {
              enabled: justPoint,
              radius: 2,
            },
            id: sens.sensor?._id,
            type: chartMode,
            name: "sensor-" + sens.sensor?.title,
            // pointInterval: 6e4, // one hour
            // relativeXValue: true,
            data: [...makeData(sens?.data)],
          }
          // {
          //   type: "column",
          //   id: sens.sensor?._id,
          //   name: "sensor-" + sens.sensor?.title,
          //   data: [...makeData(sens?.data)],
          //   yAxis: 1,
          // }
        );
      }
    });
    console.log(arrSeries);
    if (arrSeries.length > 0) {
      setState({
        chartOptions: {
          colors: ["#ff0000", "blue", "gray", "cyan"],
          chart: {
            alignTicks: true,
            backgroundColor: `${
              theme === 0
                ? "var(--bgc)"
                : `${
                    theme === 1
                      ? "var(--pending-bgc)"
                      : `${theme === 2 ? "var(--approved-bgc)" : "white"}`
                  }`
            }`,
          },
          legend: {
            enabled: true,
            align: "left",
            alignColumns: true,
            backgroundColor: "gray",
            floating: false,
          },
          // tooltip: {
          //   shared: true,
          // },
          tooltip: {
            pointFormat:
              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true,
          },
          plotOptions: {
            series: {
              showInLegend: true,
              accessibility: {
                exposeAsGroupOnly: true,
              },
            },
          },
          rangeSelector: {
            buttons: [
              {
                type: "hour",
                count: 6,
                text: "6h",
              },
              {
                type: "hour",
                count: 12,
                text: "12h",
              },
              {
                type: "day",
                count: 1,
                text: "1d",
              },
              {
                type: "day",
                count: 7,
                text: "7d",
              },
              {
                type: "day",
                count: 14,
                text: "14d",
              },
              {
                type: "month",
                count: 1,
                text: "1m",
              },
              {
                type: "month",
                count: 3,
                text: "3m",
              },
              {
                type: "all",
                text: "All",
              },
            ],
            selected: 7,
          },

          // chart: {
          //   zoomType: "y",
          // },
          title: {
            text: "Report Sensors",
            floating: true,
            align: "center",
            x: -30,
            y: 30,
          },
          scrollbar: {
            barBackgroundColor: "gray",
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: "gray",
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: "none",
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: "#CCC",
          },
          series: [...arrSeries],
        },
      });
    }
  }

  useEffect(() => {
    if (selectDataOFChart !== undefined && selectDataOFChart?.length > 0) {
      sumOfdata(selectDataOFChart);
    }
  }, [selectDataOFChart, continus, justPoint, chartMode, theme]);

  return (
    <div className="h-[600px]">
      <div className="flex ">
        <button
          className={
            "flex border m-2 p-2 " +
            `${continus ? "bg-red-400" : "bg-green-400"}`
          }
          onClick={(e) => {
            setContinus((val) => !val);
          }}
        >
          continus
        </button>
        <button
          className={
            "flex border m-2 p-2 " +
            `${!justPoint ? "bg-red-400" : "bg-green-400"}`
          }
          onClick={(e) => {
            setJustPoint((val) => !val);
          }}
        >
          just points
        </button>
        <button
          className={
            "flex border m-2 p-2 " +
            `${
              chartMode === "line"
                ? "bg-pink-600"
                : `${chartMode === "spline" ? "bg-cyan-400" : "bg-gray-400"}`
            }`
          }
          onClick={(e) => {
            if (chartMode === "line") {
              setChartMode("column");
              return;
            }
            if (chartMode === "column") {
              setChartMode("spline");
              return;
            }
            if (chartMode === "spline") {
              setChartMode("line");
              return;
            }
          }}
        >
          chart mode: {chartMode}
        </button>
        <button
          className={
            "flex border m-2 p-2 " +
            `${
              chartMode === "line"
                ? "bg-pink-600"
                : `${chartMode === "spline" ? "bg-cyan-400" : "bg-gray-400"}`
            }`
          }
          onClick={(e) => {
            if (theme < 3) setTheme(theme + 1);
            else setTheme(0);
          }}
        >
          theme: {theme}
        </button>
      </div>

      {state?.chartOptions !== undefined ? (
        <HighchartsReact
          id={id}
          constructorType={"stockChart"}
          highcharts={Highcharts}
          options={state.chartOptions}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
