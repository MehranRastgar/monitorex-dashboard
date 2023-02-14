import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5stock from "@amcharts/amcharts5/stock";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import ProgressAndNoData from "../Progress/ProgressAndNoData";
import { SensorsReportType } from "../../../store/slices/analizeSlice";
import dayjs, { Dayjs } from "dayjs";

let date = new Date();
date.setHours(0, 0, 0, 0);
let value = 100;

function generateD(data: []) {
  const arr: object[] = [];
  data?.map((item, index) => {
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
  const [seriss, setSeries] = useState<any>();

  function generateDatas(count: number) {
    let data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }
  function generateData() {
    value = Math.round(Math.random() * 10 - 5 + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value,
    };
  }

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

    xAxis.get("dateFormats")["second"] = "MM/dd";
    xAxis.get("periodChangeDateFormats")["second"] = "MMMM";

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

    function generateDatas(count) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }
    var data = generateDatas(374);
    var dataPF: [] = [];
    dataPF = generateD(props?.data?.[0].data);
    props?.data?.map((dataitem, index) => {});
    console.log("data offff", dataPF, data);
    // Create series

    function createSeries(name, field) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          connect: false,
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      series.strokes.template.set("strokeWidth", 2);

      series
        .get("tooltip")
        .label.set("text", "[bold]{name}[/]\n{valueX?.formatDate()}: {valueY}");
      series.data.setAll(dataPF);
    }
    createSeries("date", "value");
    createSeries("date2", "value2");
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
      })
    );
    return () => {
      // clearInterval(intervalId);
      root.dispose();
    };
  }, [props?.data]);
  // useEffect(() => {
  //   if (seriss !== undefined) addData(seriss);
  // }, [props?.data]);

  return (
    <>
      <div
        className={`${
          props?.data !== undefined && props?.data.length > 0 ? "" : "hidden"
        }`}
        id={"chartAmXy" + "-" + props?.id ?? "id"}
        style={{ width: "1000px", height: "400px" }}
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
