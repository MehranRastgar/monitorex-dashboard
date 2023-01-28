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
  const [continues, setcontinues] = useState(false);
  const [justPoint, setJustPoint] = useState(false);
  const [multiAxis, setIsMultiAxis] = useState(false);
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
              lineWidth: justPoint ? 0 : 1,
              marker: {
                enabled: justPoint,
                radius: 2,
              },
              id: sens.sensor?._id,
              type: chartMode,
              yAxis: index,
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
            },
            series: [...arrSeries],
            yAxis: [...arrAxisY],
          },
        });
      } else {
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
            // title: {
            //   text: "Report Sensors",
            //   floating: false,
            //   align: "center",
            //   x: -30,
            //   y: 30,
            // },
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
  ]);

  return (
    <div className="w-full h-[450px]">
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
