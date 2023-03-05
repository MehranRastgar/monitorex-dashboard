import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
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
if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

interface Props {
  id: string;
}

interface Props {
  id: string;
}
export const Granolarity: number[] = [1, 2, 5, 10, 20, 50];

const BarchartLive: React.FC<Props> = (props) => {
  const [state, setState] = useState<any>();
  const selectDataOFChart = useAppSelector(selectSensorReports);
  const selectStatusOfApi = useAppSelector(selectStatusReportApi);
  // const [realTimeData,setRealTimeData] = useState(undefined)
  const [divideBy, setDivideBy] = useState<number>(0);
  const [continues, setcontinues] = useState(true);

  function makeData(data: Datum[]) {
    const arr: any[] = [];
    data.map((item, index) => {
      if (item?.x !== undefined && index % Granolarity[divideBy] === 0)
        if (item?.y !== undefined || continues)
          arr?.push([new Date(item?.x)?.getTime(), item?.y ?? null]);
    });

    // console.log("len of array", arr.length);
    return arr;
  }
  useEffect(() => {
    if (selectDataOFChart?.[0]?._id !== undefined && state !== undefined)
      selectDataOFChart?.map((item: SensorsReceiveTpe, index) => {
        // console.log(item);
        if (item?._id !== undefined)
          socket.on(item?._id, (data) => {
            if (data.value === 200000) {
              return;
            }
            // setDataOfWebsocket(data);
            // console.log(state?.chartOptions?.series);
            let newdata: any = [...state?.chartOptions?.series];
            const find = newdata?.findIndex(
              (theItem: any) => theItem.id === data.sensorId
            );
            // console.log("finded series", find, data, newdata);
            const title = newdata?.[find].data.title;
            newdata?.[find].data?.pop();
            newdata?.[find].data?.push([title, data?.value]);
            // console.log("newdata", newdata);
            let stater = {
              ...state,
              chartOptions: {
                ...state?.chartOptions,
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

  function sumOfdata(data: SensorsReportType[]) {
    const arrSeries: any[] = [];
    const arrAxisY: any[] = [];
    const cat: any[] = [];

    selectDataOFChart?.map(({ _id, device, data, sensor }, index) => {
      if (data === undefined || data?.[0] === undefined) return;
      const LastData: Datum[] = [];
      LastData?.push(data?.[0]);
      cat?.push(device?.title ?? "device" + "-" + sensor?.title ?? "title");
      arrSeries?.push({
        enablePolling: true,
        dataRefreshRate: 1,
        id: sensor?._id,
        name: device?.title ?? "device" + ":" + sensor?.title ?? "title",
        type: "column",
        data: [sensor?.title ?? "title", LastData?.[0]?.y],
      });
    });
    setState({
      chartOptions: {
        chart: {
          spacingBottom: 15,
          spacingTop: 10,
          spacingLeft: 10,
          spacingRight: 10,
          // Explicitly tell the width and height of a chart
          width: 500,
          height: 200,
          type: "column",
          zoomType: "xy",
          alignTicks: true,
          backgroundColor: "var(--blur-bg)",
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        title: {
          floating: true,
          align: "right",
        },
        legend: {
          itemHiddenStyle: { color: "var(--dev-bgc-disable)" },
          itemHoverStyle: { color: "var(--dev-bgc-selected)" },
          itemStyle: { color: "var(--text-color)" },
          align: "right",
          verticalAlign: "middle",
          layout: "vertical",
          backgroundColor: "var(--blur-bg)",
          color: "var(--text-color)",
        },

        xAxis: {
          type: "category",
          labels: {
            rotation: -45,
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
              color: "var(--text-color)",
            },
          },
        },
        yAxis: {
          title: {
            text: "Realt time sensor values",
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif",
              style: {
                fontSize: "13px",
                fontFamily: "Verdana, sans-serif",
                color: "var(--text-color)",
              },
            },
          },
        },
        // yAxis: {
        //   min: 0,
        //   title: {
        //     text: "Population (millions)",
        //     align: "high",
        //   },
        //   labels: {
        //     overflow: "justify",
        //   },
        // },
        exporting: {
          enabled: false,
        },
        series: [...arrSeries],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: "left",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                  color: "var(--text-color)",
                  style: {
                    fontSize: "13px",
                    fontFamily: "Verdana, sans-serif",
                    color: "var(--text-color)",
                  },
                },
                yAxis: {
                  labels: {
                    align: "left",
                    x: 0,
                    y: -5,
                    style: {
                      fontSize: "13px",
                      fontFamily: "Verdana, sans-serif",
                      color: "var(--text-color)",
                    },
                  },
                  title: {
                    text: "sensor real-time value",
                    style: {
                      fontSize: "13px",
                      fontFamily: "Verdana, sans-serif",
                      color: "var(--text-color)",
                    },
                  },
                },
                subtitle: {
                  text: null,
                  style: {
                    fontSize: "13px",
                    fontFamily: "Verdana, sans-serif",
                    color: "var(--text-color)",
                  },
                },
                credits: {
                  enabled: false,
                  style: {
                    fontSize: "13px",
                    fontFamily: "Verdana, sans-serif",
                    color: "var(--text-color)",
                  },
                },
              },
            },
          ],
        },
      },
    });
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
  }, [selectDataOFChart, continues, divideBy]);
  return (
    <>
      <div className="flex  justify-end ">
        {state?.chartOptions !== undefined ? (
          <>
            <HighchartsReact
              id={props?.id ?? "54hgh"}
              highcharts={Highcharts}
              options={state.chartOptions}
            />
          </>
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
export default BarchartLive;
