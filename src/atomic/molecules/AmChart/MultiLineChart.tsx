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
export const Granolarity: number[] = [1, 2, 5, 10];

export default function MultiLineChart({ id }: { id: string }) {
  const selectDataOFChart = useAppSelector(selectSensorReposts);
  // const [hoverData, setddata] = useState()
  // const selectSensorsData =
  const [state, setState] = useState<any>();
  const [divideBy, setDivideBy] = useState<number>(0);
  const [continues, setcontinues] = useState(false);
  const [justPoint, setJustPoint] = useState(false);
  const [theme, setTheme] = useState(0);
  const [chartMode, setChartMode] = useState<"line" | "spline" | "column">(
    "line"
  );

  function makeData(data: Datum[]) {
    const arr: any[] = [];
    data.map((item, index) => {
      if (item?.x !== undefined && index % Granolarity[divideBy] === 0)
        if (item?.y !== undefined || continues)
          arr.push([new Date(item?.x), item?.y ?? null]);
    });
    console.log("len of array", arr.length);
    return arr;
  }
  //make a function to get date and time

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
          colors: [
            "red",
            "blue",
            "var(--text-color)",
            "cyan",
            "yellow",
            "green",
          ],
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
              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
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
            floating: false,
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
          exporting: {
            boost: {
              useGPUTranslations: false,
            },
            menuItemDefinitions: {
              // Custom definition
              //   label: {
              //     onclick: function () {
              //       this.renderer
              //         .label("You just clicked a custom menu item", 100, 100)
              //         .attr({
              //           fill: "#a4edba",
              //           r: 5,
              //           padding: 10,
              //           zIndex: 10,
              //         })
              //         .css({
              //           fontSize: "1.5em",
              //         })
              //         .add();
              //     },
              //     text: "Show label",
              //   },
              // },
              // buttons: {
              //   contextButton: {
              //     menuItems: [
              //       "downloadPNG",
              //       "downloadSVG",
              //       "downloadPDF",
              //       "downloadXLX",
              //       "separator",
              //       "label",
              //     ],
              //   },
            },
            enabled: true,
            csv: {
              annotations: {
                itemDelimiter: "; ",
                join: false,
              },
              columnHeaderFormatter: null,
              dateFormat: "%Y-%m-%d %H:%M:%S",
              decimalPoint: null,
              itemDelimiter: null,
              lineDelimiter: " ",
            },
            allowHTML: true,
            scale: 1,
            printMaxWidth: 1920,
            showTable: true,
          },
        },
      });
    }
  }

  useEffect(() => {
    if (selectDataOFChart !== undefined && selectDataOFChart?.length > 0) {
      sumOfdata(selectDataOFChart);
    }
  }, [selectDataOFChart, continues, justPoint, chartMode, theme, divideBy]);

  return (
    <div className="h-[450px]">
      <div className="flex ">
        <button
          className={
            "flex border m-2 p-2 " +
            `${continues ? "bg-red-400" : "bg-green-400"}`
          }
          onClick={(e) => {
            setcontinues((val) => !val);
          }}
        >
          continues
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
            if (divideBy < 3) setDivideBy((val) => val + 1);
          }}
        >
          Up
        </button>
        <div>gran {divideBy}</div>
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
            if (divideBy > 0) setDivideBy((val) => val - 1);
          }}
        >
          Down
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
