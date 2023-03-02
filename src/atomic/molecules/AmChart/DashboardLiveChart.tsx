import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ButtonRegular from "../../atoms/ButtonA/ButtonRegular";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import {
  Datum,
  reportSensorsAsync,
  selectEndDate,
  selectGroupNumber,
  selectSelectedSensorsAnalize,
  selectSensorReports,
  selectStartDate,
  selectStatusReportApi,
  SensorsReportType,
  setSelectedSensors,
  setStartDayjs,
} from "../../../store/slices/analizeSlice";
import UserGroupsContainer from "../../organisms/UserGroups/UserGroupsContainer";
import { socket } from "../../../components/socketio";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { selectUserGroups } from "../../../store/slices/userSlice";
import ProgressAndNoData from "../Progress/ProgressAndNoData";
import { LiveBlink } from "../../organisms/Charts/LiveChart";
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

interface Props {
  id: string;
}
export const Granolarity: number[] = [1, 2, 5, 10, 20, 50];

const DashboardLiveChart: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const selectDataOFChart = useAppSelector(selectSensorReports);
  const selectStatusOfApi = useAppSelector(selectStatusReportApi);
  const [blink, setBlink] = useState(false);
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const dispatch = useAppDispatch();
  const selectUserGr = useAppSelector(selectUserGroups);
  const GpNumber = useAppSelector(selectGroupNumber);
  const selectED = useAppSelector(selectEndDate);
  const [dataOfWebsocket, setDataOfWebsocket] = useState<any>();
  const [state, setState] = useState<any>();
  const [tempArr, setTempArr] = useState<any>();
  const [divideBy, setDivideBy] = useState<number>(0);
  const [continues, setcontinues] = useState(true);
  const [justPoint, setJustPoint] = useState(false);
  const [multiAxis, setIsMultiAxis] = useState(true);
  const [theme, setTheme] = useState(0);
  const [chartMode, setChartMode] = useState<"line" | "spline" | "column">(
    "spline"
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

  const handleClick = () => {
    if (
      selectUserGr !== undefined &&
      GpNumber !== undefined &&
      selectUserGr?.[GpNumber]?.sensors !== undefined
    ) {
      let publishDate = new Date(1000 * dayjs(dayjs()).unix());
      console.log(publishDate.toJSON());
      // dispatch(setStartDate(publishDate.toJSON()));
      dispatch(
        setStartDayjs(
          dayjs(
            new Date(selectED ?? 0).getTime() -
              (selectUserGr[GpNumber].timeRange ?? 0)
          ).toJSON()
        )
      );
      dispatch(setSelectedSensors(selectUserGr?.[GpNumber]?.sensors));
      const arr: string[] = [];
      selectUserGr?.[GpNumber]?.sensors.map((item) =>
        arr.push(item?._id ?? "")
      );
      dispatch(
        reportSensorsAsync({
          sensors: arr,
          start:
            dayjs(
              new Date(selectED ?? 0).getTime() -
                (selectUserGr?.[GpNumber]?.timeRange ?? 0)
            ).toJSON() ?? "",
          end: selectED ?? "",
        })
      );
    }
  };
  useEffect(() => {
    handleClick();
  }, [GpNumber]);
  useEffect(() => {
    // if (state?.chartOptions?.series?.[0]?.id !== undefined) {
    //   console.log(state?.chartOptions?.series);
    //   let newdata = [...state?.chartOptions?.series];
    //   newdata?.[0].data.push([
    //     new Date(dataOfWebsocket.createdAt),
    //     dataOfWebsocket.value,
    //   ]);
    //   let stater = {
    //     ...state,
    //     chartOptions: {
    //       ...state.chartOptions,
    //       series: [...newdata],
    //     },
    //   };
    //   setState({ ...stater });
    //   let arr = [...state?.chartOptions?.series];
    //   arr[0] = [...arr[0], [dataOfWebsocket.createdAt, dataOfWebsocket.value]];
    //   setState({
    //     ...state,
    //     chartOptions: {
    //       ...state.chartOptions,
    //       series: [...state.chartOptions.series],
    //     },
    //   });
    // }
  }, [dataOfWebsocket]);

  // useEffect(() => {
  //   const interval = setInterval((GpNumber, selectUserGr) => {
  //     if (selectStatusOfApi === "idle") {
  //       handleFetchData(selectUserGr, GpNumber);
  //       setTimeEnded((val) => !val);
  //     }
  //     setTimeEnded((val) => !val);
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [selectStatusOfApi, setTimeEnded]);

  // useEffect(() => {
  //   const timo = setInterval(() => {
  //     setBlink((val) => !val);
  //   }, 800);
  //   return () => {
  //     clearInterval(timo);
  //   };
  // }, []);

  useEffect(() => {
    if (selectDataOFChart?.[0]?._id !== undefined && state !== undefined)
      selectDataOFChart?.map((item: SensorsReceiveTpe, index) => {
        console.log(item);
        if (item?._id !== undefined)
          socket.on(item?._id, (data) => {
            if (data.value === 200000) {
              return;
            }
            setBlink((val) => !val);
            // setDataOfWebsocket(data);
            // console.log(state?.chartOptions?.series);
            const find = selectDataOFChart.findIndex(
              (theItem: any) => theItem?._id === data.sensorId
            );

            let newdata = [...state?.chartOptions?.series];
            newdata?.[find]?.data.push([
              new Date(data.createdAt).getTime(),
              data.value,
            ]);

            let stater = {
              ...state,
              chartOptions: {
                ...state.chartOptions,
                series: [...newdata],
              },
            };

            setState({ ...stater });
          });
      });
    return () => {
      selectDataOFChart?.map((item, index) => {
        socket.off(item?._id);
      });
    };
  }, [state]);

  const handleReport = () => {
    const arr: string[] = [];
    selectedSensorsSlice?.map((sensor) => {
      if (sensor._id !== undefined) arr.push(sensor?._id);
    });
    const timenow = new Date().setHours(0);
    const enddd = new Date().toISOString();
    if (enddd !== undefined)
      dispatch(
        reportSensorsAsync({
          sensors: arr,
          start: new Date(timenow).toISOString(),
          end: enddd,
        })
      );
  };
  function makeData(data: Datum[]) {
    const arr: any[] = [];
    data?.map((item, index) => {
      if (item?.x !== undefined && index % Granolarity[divideBy] === 0)
        if (item?.y !== undefined || continues)
          arr.push([new Date(item?.x).getTime(), item?.y ?? null]);
    });

    return arr;
  }
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
              name: sens.device.title + "-" + sens.sensor?.title,
              //   dashStyle: lineAccesible ? "dashDot" : "line",
              // pointInterval: 6e4, // one hour
              // relativeXValue: true,
              enablePolling: true,
              dataRefreshRate: 1,
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

              style: {
                color: "var(--text-color)",
              },
            },
            title: {
              text: sens.device.title + "-" + sens.sensor?.title,
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
            dashStyle: lineAccesible ? "line" : "line",
            enablePolling: true,
            dataRefreshRate: 1,
            // pointInterval: 6e4, // one hour
            // relativeXValue: true,
            data: [...makeData(sens?.data)],
          });
        }
      }
    });
    // console.log(arrSeries);
    setTempArr(arrSeries);
    if (arrSeries.length > 0) {
      if (multiAxis === true) {
        setState({
          chartOptions: {
            colors: [
              "var(--chart-color-1)",
              "var(--chart-color-2)",
              "var(--chart-color-3)",
              "blue",
              "green",
              "cyan",
              "yellow",
              "var(--text-color)",
            ],
            exporting: {
              enabled: false,
            },
            chart: {
              zoomType: "xy",
              alignTicks: true,
              backgroundColor: "var(--blur-bg)",
            },
            legend: {
              itemHiddenStyle: { color: "var(--dev-bgc-disable)" },
              itemHoverStyle: { color: "var(--dev-bgc-selected)" },
              itemStyle: { color: "var(--text-color)" },
              enabled: true,
              align: "left",
              alignColumns: true,
              backgroundColor: "var(--blur-bg)",
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
              selected: 1,
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
            colors: [
              "var(--chart-color-1)",
              "var(--chart-color-2)",
              "var(--chart-color-3)",
              "blue",
              "green",
              "cyan",
              "yellow",
              "var(--text-color)",
            ],
            exporting: {
              enabled: false,
            },
            chart: {
              alignTicks: true,
              zoomType: "xy",
              backgroundColor: "var(--blur-bg)",
            },
            legend: {
              itemHiddenStyle: { color: "var(--dev-bgc-disable)" },
              itemHoverStyle: { color: "var(--dev-bgc-selected)" },
              itemStyle: { color: "var(--text-color)" },
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
              selected: 1,
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
    if (
      selectedSensorsSlice?.length !== undefined &&
      selectedSensorsSlice?.length > 0
    ) {
      handleReport();
    }
  }, [selectedSensorsSlice]);

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
    <>
      <LiveBlink state={blink} />
      <div className="justify-start  w-full items-start">
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
            id={props?.id}
            highcharts={Highcharts}
            options={state?.chartOptions}
            constructorType={"stockChart"}
          />
        ) : (
          <>
            <ProgressAndNoData
              isLoading={selectStatusOfApi === "loading" ? true : false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default DashboardLiveChart;
{
  /* <div className="flex justify-center w-full h-[400px]">
              <CircularProgress size={120} color="secondary" />
            </div> */
}
