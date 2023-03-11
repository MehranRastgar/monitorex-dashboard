import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Material";
import * as am5stock from "@amcharts/amcharts5/stock";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import ProgressAndNoData from "../Progress/ProgressAndNoData";
import { Datum, SensorsReportType } from "../../../store/slices/analizeSlice";
import dayjs, { Dayjs } from "dayjs";
import { socket } from "../../../components/socketio";

let date = new Date();
date.setHours(0, 0, 0, 0);
let value = 100;

function generateD(data: []) {
  const arr: object[] = [];
  data?.map((item: any, index) => {
    if (item?.x !== undefined && item?.y !== null)
      arr.push({
        date: new Date(item?.x).getTime(),
        value: item?.y ?? null,
        value2: item?.y * 1.1,
        date2: new Date(item?.x).getTime(),
      });
  });
  return arr;
}
export interface PropsXYChart {
  id?: string;
  data?: SensorsReportType[];
  isLoading?: boolean;
}
const XYChart: React.FC<PropsXYChart> = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<
    { date: number; value: number; bullet?: boolean; name?: string }[]
  >([]);
  const [dataReal, setDataReal] = useState<any>();
  const [seriss, setSeries] = useState<any>();
  const [allData, setAllData] = useState<any>();
  //---------------------------------------------------------------------
  function generateDatas(count: number) {
    let data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }
  //---------------------------------------------------------------------
  function generateData() {
    value = Math.round(Math.random() * 10 - 5 + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value,
    };
  }
  //---------------------------------------------------------------------
  function generateXYDynamicData(data: SensorsReportType[]) {
    const arr: object[] = [];
    const adsL: SensorsReportType[] = [];
    data?.map((eachSensor: SensorsReportType, index) => {
      const arr2: object[] = [];
      eachSensor?.data?.map((eachData: any, index) => {
        const DataObject = {
          [`${"date"}_${eachSensor.sensor?._id}`]: new Date(
            eachData?.x
          ).getTime(),
          [`${"value"}_${eachSensor.sensor?._id}`]: eachData?.y ?? null,
        };
        arr2.push(DataObject);
      });
      arr.push(arr2);
      adsL.push(eachSensor);
    });
    setAllData(arr);
    return arr;
  }
  //---------------------------------------------------------------------
  useEffect(() => {
    const root = am5.Root.new("chartAmXy" + "-" + props?.id ?? "id");
    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
      })
    );

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        baseInterval: { timeUnit: "second", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    // let xAxis = chart.xAxes.push(
    //   am5xy.DateAxis.new(root, {
    //     baseInterval: {
    //       timeUnit: "second",
    //       count: 1,
    //     },
    //     renderer: am5xy.AxisRendererX.new(root, {}),
    //     tooltip: am5.Tooltip.new(root, {}),
    //   })
    // );
    if (
      xAxis?.get("dateFormats")?.["second"] !== undefined &&
      xAxis?.get("periodChangeDateFormats")?.["second"] !== undefined
    ) {
      // xAxis?.get("dateFormats")["second"] = "MM/dd";
      // xAxis?.get("periodChangeDateFormats")["second"] = "MMMM";
    }
    // Generate random data
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, "second", 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }
    //---------------------------------------------------------------------
    function generateDatas(count: any) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }
    var data = generateDatas(374);
    var dataPF: [] = [];
    // dataPF = generateD(props?.data?.[0].data);
    const newDa = generateXYDynamicData(props?.data ?? []);
    props?.data?.map((dataitem, index) => {});
    // Create series

    function createSeries(
      name: string,
      field: string,
      date: string,
      data: any
    ) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          connect: false,
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: date,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      series.strokes.template.set("strokeWidth", 2);

      series
        ?.get("tooltip")
        ?.label?.set(
          "text",
          "[bold]{name}[/]\n{valueX?.formatDate()}: {valueY} "
        );
      series.data.setAll(data);
      let objarr: any[] = [series];
      objarr.push(data);
      setSeries(objarr);
      series.bullets.push(function (root: any, series: any, dataItem: any) {
        // only create sprite if bullet == true in data context
        if (dataItem?.dataContext?.bullet) {
          let container = am5.Container.new(root, {});
          let circle0 = container.children.push(
            am5.Circle.new(root, {
              radius: 5,
              fill: am5.color(0xff0000),
            })
          );
          let circle1 = container.children.push(
            am5.Circle.new(root, {
              radius: 5,
              fill: am5.color(0xff0000),
            })
          );

          circle1.animate({
            key: "radius",
            to: 20,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity,
          });
          circle1.animate({
            key: "opacity",
            to: 0,
            from: 1,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity,
          });

          return am5.Bullet.new(root, {
            locationX: undefined,
            sprite: container,
          });
        }
        return undefined;
      });
      // setSeries(series);
    }
    props?.data?.map((item, Ind) => {
      if (item?.sensor?.title !== undefined)
        createSeries(
          item?.sensor?.title,
          "value_" + item.sensor?._id,
          "date_" + item.sensor?._id,
          newDa?.[Ind]
        );
    });
    // createSeries();
    // createSeries("date2", "value2");
    // createSeries("date2", "value2");
    props?.data?.map((item, index) => {});
    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis,
      })
    );

    xAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
        wheelable: true,
      })
    );
    console.table(chart?.series);
    let easing = am5.ease.linear;

    chart.appear(1000, 100);
    return () => {
      // clearInterval(intervalId);
      root.dispose();
    };
  }, [props?.data]);
  //---------------------------------------------------------------------
  useEffect(() => {
    // props?.data?.map((item: SensorsReportType, index) => {
    //   if (item?._id !== undefined)
    //     socket.on(item?._id, (data) => {
    //       if (data.value === 200000) {
    //         return;
    //       }
    //       const DObject = {
    //         [`${"date"}_${data?.sensorId}`]: new Date(
    //           data?.createdAt
    //         ).getTime(),
    //         [`${"value"}_${data?.sensorId}`]: data?.value ?? null,
    //       };
    //       const newd = [...allData];
    //       // setAllData([...newd]);
    //       const aaa: any[] = [...allData];
    //       aaa[0]?.push(DObject);
    //       console.table(aaa.values);
    //       setDataReal(aaa);
    //       // setSeries(data);
    //       //   const find = props?.data?.findIndex(
    //       //     (theItem: any) => theItem?._id === data.sensorId
    //       //   );
    //       //   if (find) {
    //       //     let newdata = [...dataReal];
    //       //     newdata?.[find]?.data.push([new Date(data.createdAt), data.value]);
    //       //     setDataReal([...newdata]);
    //       //   }
    //     });
    // });
    // return () => {
    //   // socket.off("connect");
    //   // socket.off(idSubScribe);
    //   props?.data?.map((item, index) => {
    //     socket.off(item?._id);
    //   });
    // };
  }, [props.data]);
  //---------------------------------------------------------------------
  useEffect(() => {
    // if (dataReal !== undefined) addData(seriss[0]);
  }, [dataReal]);

  function addData(series: any) {
    let arr: any = [...allData[0]];
    series?.data.setAll(arr);
  }
  //---------------------------------------------------------------------

  return (
    <>
      <div
        className={`${
          props?.data !== undefined && props?.data.length > 0 ? "" : "hidden"
        }`}
        id={"chartAmXy" + "-" + props?.id ?? "id"}
        style={{ width: "1200px", height: "400px" }}
      ></div>
      {props?.data !== undefined && props?.data.length > 0 ? (
        <></>
      ) : (
        <>
          <ProgressAndNoData isLoading={props?.isLoading ?? false} />
        </>
      )}
    </>
  );
};
export default XYChart;

const prefix = "myPrefix";
const id = 123;
const myObject = {
  [`${prefix}_${id}`]: "myValue",
};
