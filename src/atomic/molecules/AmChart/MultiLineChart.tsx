import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
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
}

// Apply the theme
export const Granolarity: number[] = [1, 2, 5, 10, 20, 50];

export default function MultiLineChart({ id }: { id: string }) {
  const { t } = useTranslation();
  const selectDataOFChart = useAppSelector(selectSensorReports);
  // const [hoverData, setddata] = useState()
  // const selectSensorsData =
  const [state, setState] = useState<any>();
  const [divideBy, setDivideBy] = useState<number>(0);
  const [continues, setcontinues] = useState(true);
  const [justPoint, setJustPoint] = useState(false);
  const [multiAxis, setIsMultiAxis] = useState(false);
  const [theme, setTheme] = useState(0);
  const [chartMode, setChartMode] = useState<"line" | "spline" | "column">(
    "line"
  );
  const [lineAccesible, setLineAccesible] = useState(true);
  const [lineColors, setLineColors] = useState([
    "red",
    "blue",
    "green",
    "cyan",
    "yellow",
    "var(--text-color)",
  ]);

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
  function makeMultiAxis() {
    const arr: any[] = [];
  }
  //make a function to get date and time

  function sumOfdata(data: SensorsReportType[]) {
    const arrSeries: any[] = [];
    const arrAxisY: any[] = [];
    data?.map((sens, index) => {
      if (sens?.data !== undefined) {
        if (multiAxis === true) {
          arrSeries.push(
            {
              lineWidth: justPoint ? 0 : 2,
              marker: {
                enabled: justPoint,
                radius: 2,
              },
              id: sens.sensor?._id,
              type: chartMode,
              yAxis: index,
              name: "sensor-" + sens.sensor?.title,
              dashStyle: lineAccesible ? "dashDot" : "line",
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
          arrAxisY.push({
            // Primary yAxis
            labels: {
              format: "{value}" + sens.sensor?.unit,
              // style: {
              //   color: `{series.color}`,
              // },
            },
            title: {
              text: "sensor-" + sens.sensor?.title,
              // style: {
              //   color: `{series.color}`,
              // },
            },
            opposite: false,
          });
        } else {
          arrSeries.push({
            lineWidth: justPoint ? 0 : 1,
            marker: {
              enabled: justPoint,
              radius: 2,
            },
            id: sens.sensor?._id,
            type: chartMode,
            name: sens?.device?.title + ":" + sens?.sensor?.title,
            dashStyle: lineAccesible ? "dashDot" : "line",

            // pointInterval: 6e4, // one hour
            // relativeXValue: true,
            data: [...makeData(sens?.data)],
          });
        }
      }
    });
    // console.log(arrSeries);
    if (arrSeries.length > 0) {
      if (multiAxis === true) {
        setState({
          chartOptions: {
            exporting: {
              enabled: false,
            },

            colors: [
              "red",
              "blue",
              "green",
              "cyan",
              "yellow",
              "var(--text-color)",
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
              // snap: 1 / 24,
              // stickOnContact: true,
              pointFormat:
                '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
              valueDecimals: 1,
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
              enabled: false,

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
              enabled: false,
            },
            series: [...arrSeries],
            yAxis: [...arrAxisY],
          },
        });
      } else {
        setState({
          chartOptions: {
            exporting: {
              enabled: false,
            },
            colors: [
              "red",
              "blue",
              "green",
              "cyan",
              "yellow",
              "var(--text-color)",
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
            // title: {
            //   text: "Report Sensors",
            //   floating: false,
            //   align: "center",
            //   x: -30,
            //   y: 30,
            // },
            scrollbar: {
              enabled: false,
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
  }

  useEffect(() => {
    setState(undefined);
    const tim = setTimeout(() => {
      if (selectDataOFChart !== undefined && selectDataOFChart?.length > 0) {
        sumOfdata(selectDataOFChart);
      }
    }, 100);

    return () => {
      clearTimeout(tim);
    };
  }, [
    selectDataOFChart,
    continues,
    justPoint,
    chartMode,
    theme,
    divideBy,
    multiAxis,
    lineAccesible,
  ]);

  return (
    <div className="w-full h-[450px] rounded-lg border p-2">
      <Box className="flex items-center ">
        <ButtonRegular
          disabled={continues}
          onClick={(e) => {
            setcontinues((val) => !val);
          }}
        >
          {t("dataPasteTogegher")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <ButtonRegular
          disabled={!justPoint}
          onClick={(e) => {
            setJustPoint((val) => !val);
          }}
        >
          {t("justPoint")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <ButtonRegular
          disabled={!lineAccesible}
          onClick={(e) => {
            setLineAccesible((val) => !val);
          }}
        >
          {t("Line style")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2 text-blue-200"></div>
        <ButtonRegular
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
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <ButtonRegular
          onClick={(e) => {
            if (theme < 3) setTheme(theme + 1);
            else setTheme(0);
          }}
        >
          theme: {theme + 1}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <ButtonRegular
          disabled={multiAxis}
          onClick={() => {
            setIsMultiAxis((value) => !value);
          }}
        >
          {t("MultiAxis")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <button
          className="flex w-fit mx-2 text-blue-600"
          onClick={(e) => {
            if (divideBy < 5) setDivideBy((val) => val + 1);
          }}
        >
          <Icon
            width="40"
            height="40"
            icon="material-symbols:arrow-circle-up-outline"
          />
        </button>
        <div> {divideBy}</div>
        <button
          className="flex w-fit mx-2 text-blue-600"
          onClick={(e) => {
            if (divideBy > 0) setDivideBy((val) => val - 1);
          }}
        >
          <Icon
            width="40"
            height="40"
            icon="material-symbols:arrow-circle-down-outline"
          />
        </button>
      </Box>
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

export function MultiLineChartPrintMode({ id }: { id: string }) {
  const { t } = useTranslation();
  const selectDataOFChart = useAppSelector(selectSensorReports);
  // const [hoverData, setddata] = useState()
  // const selectSensorsData =
  const [state, setState] = useState<any>();
  const [divideBy, setDivideBy] = useState<number>(0);
  const [continues, setcontinues] = useState(true);
  const [justPoint, setJustPoint] = useState(false);
  const [multiAxis, setIsMultiAxis] = useState(false);
  const [theme, setTheme] = useState(0);
  const [chartMode, setChartMode] = useState<"line" | "spline" | "column">(
    "line"
  );
  const [lineAccesible, setLineAccesible] = useState(true);
  const [lineColors, setLineColors] = useState([
    "red",
    "blue",
    "green",
    "cyan",
    "yellow",
    "var(--text-color)",
  ]);

  function makeData(data: Datum[]) {
    const arr: any[] = [];
    data.map((item, index) => {
      if (item?.x !== undefined && index % Granolarity[divideBy] === 0)
        if (item?.y !== undefined || continues)
          arr.push([new Date(item?.x), item?.y ?? null]);
    });
    return arr;
  }
  function makeMultiAxis() {
    const arr: any[] = [];
  }
  //make a function to get date and time

  function sumOfdata(data: SensorsReportType[]) {
    const arrSeries: any[] = [];
    const arrAxisY: any[] = [];
    data?.map((sens, index) => {
      if (sens?.data !== undefined) {
        if (multiAxis === true) {
          arrSeries.push(
            {
              lineWidth: justPoint ? 0 : 2,
              marker: {
                enabled: justPoint,
                radius: 2,
              },
              id: sens.sensor?._id,
              type: chartMode,
              yAxis: index,
              name: "sensor-" + sens.sensor?.title,
              dashStyle: lineAccesible ? "dashDot" : "line",
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
          arrAxisY.push({
            // Primary yAxis
            labels: {
              format: "{value}" + sens.sensor?.unit,
              // style: {
              //   color: `{series.color}`,
              // },
            },
            title: {
              text: "sensor-" + sens.sensor?.title,
              // style: {
              //   color: `{series.color}`,
              // },
            },
            opposite: false,
          });
        } else {
          arrSeries.push({
            lineWidth: justPoint ? 0 : 2,
            marker: {
              enabled: justPoint,
              radius: 2,
            },
            id: sens.sensor?._id,
            type: chartMode,
            name: sens?.device?.title + ":" + sens?.sensor?.title,
            dashStyle: lineAccesible ? "line" : "line",

            // pointInterval: 6e4, // one hour
            // relativeXValue: true,
            data: [...makeData(sens?.data)],
          });
        }
      }
    });
    // console.log(arrSeries);
    if (arrSeries.length > 0) {
      if (multiAxis === true) {
        setState({
          chartOptions: {
            exporting: {
              enabled: false,
            },
            chart: {
              alignTicks: true,
            },
            legend: {
              enabled: true,
              align: "left",
              alignColumns: true,
              backgroundColor: "white",
              floating: false,
            },
            // tooltip: {
            //   shared: true,
            // },
            tooltip: {
              // snap: 1 / 24,
              // stickOnContact: true,
              pointFormat:
                '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
              valueDecimals: 1,
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
              enabled: false,

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
            title: {
              text: "Report Sensors",
              floating: false,
              align: "center",
              x: -30,
              y: 30,
            },
            scrollbar: {
              enabled: false,
            },
            series: [...arrSeries],
            yAxis: [...arrAxisY],
          },
        });
      } else {
        setState({
          chartOptions: {
            exporting: {
              enabled: false,
            },
            chart: {
              alignTicks: true,
            },
            legend: {
              enabled: true,
              align: "left",
              alignColumns: true,
              backgroundColor: "white",
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
              enabled: false,

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
            // title: {
            //   text: "Report Sensors",
            //   floating: false,
            //   align: "center",
            //   x: -30,
            //   y: 30,
            // },
            scrollbar: {
              enabled: false,

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
  }

  useEffect(() => {
    setState(undefined);
    const tim = setTimeout(() => {
      if (selectDataOFChart !== undefined && selectDataOFChart?.length > 0) {
        sumOfdata(selectDataOFChart);
      }
    }, 100);

    return () => {
      clearTimeout(tim);
    };
  }, [
    selectDataOFChart,
    continues,
    justPoint,
    chartMode,
    theme,
    divideBy,
    multiAxis,
    lineAccesible,
  ]);

  return (
    <div className="w-full h-[450px] bg-white">
      <Box className="flex items-center bg-white overflow-auto">
        <ButtonRegular
          disabled={continues}
          onClick={(e) => {
            setcontinues((val) => !val);
          }}
        >
          {t("dataPasteTogegher")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <ButtonRegular
          disabled={!justPoint}
          onClick={(e) => {
            setJustPoint((val) => !val);
          }}
        >
          {t("justPoint")}
        </ButtonRegular>
        <div className="flex h-[10px] border  "></div>
        <ButtonRegular
          className="flex border w-[150px] mx-2"
          disabled={!lineAccesible}
          onClick={(e) => {
            setLineAccesible((val) => !val);
          }}
        >
          {t("Line style")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2 text-blue-200"></div>
        <ButtonRegular
          className="flex border w-[200px] "
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
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        {/* <ButtonRegular
          onClick={(e) => {
            if (theme < 3) setTheme(theme + 1);
            else setTheme(0);
          }}
        >
          theme: {theme + 1}
        </ButtonRegular> */}
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <ButtonRegular
          disabled={multiAxis}
          onClick={() => {
            setIsMultiAxis((value) => !value);
          }}
        >
          {t("MultiAxis")}
        </ButtonRegular>
        <div className="flex h-[10px] border w-fit mx-2"></div>
        <button
          className="flex w-fit mx-2 text-blue-600"
          onClick={(e) => {
            if (divideBy < 5) setDivideBy((val) => val + 1);
          }}
        >
          <Icon
            width="20"
            height="20"
            icon="material-symbols:arrow-circle-up-outline"
          />
        </button>
        <div className="text-black"> {divideBy}</div>
        <button
          className="flex w-fit mx-2 text-blue-600"
          onClick={(e) => {
            if (divideBy > 0) setDivideBy((val) => val - 1);
          }}
        >
          <Icon
            width="20"
            height="20"
            icon="material-symbols:arrow-circle-down-outline"
          />
        </button>
      </Box>
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
// menuItemDefinitions: {
//   // Custom definition
//   //   label: {
//   //     onclick: function () {
//   //       this.renderer
//   //         .label("You just clicked a custom menu item", 100, 100)
//   //         .attr({
//   //           fill: "#a4edba",
//   //           r: 5,
//   //           padding: 10,
//   //           zIndex: 10,
//   //         })
//   //         .css({
//   //           fontSize: "1.5em",
//   //         })
//   //         .add();
//   //     },
//   //     text: "Show label",
//   //   },
//   // },
//   // buttons: {
//   //   contextButton: {
//   //     menuItems: [
//   //       "downloadPNG",
//   //       "downloadSVG",
//   //       "downloadPDF",
//   //       "downloadXLX",
//   //       "separator",
//   //       "label",
//   //     ],
//   //   },
// },
