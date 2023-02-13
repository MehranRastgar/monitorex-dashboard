import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5stock from "@amcharts/amcharts5/stock";
import { useEffect, useState } from "react";
let date = new Date();
date.setHours(0, 0, 0, 0);
let value = 100;
export default function AmStockLive({
  id,
  dataReal,
}: {
  id: string;
  dataReal: { date: number; value: number }[];
}) {
  const [data, setData] =
    useState<{ date: number; value: number; bullet?: boolean }[]>(dataReal);
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
    const root = am5.Root.new("chartdiv" + "-" + id);
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo?.dispose();
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);
    // Define data

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "second",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.SmoothedXYLineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );
    let arr: { date: number; value: number; bullet?: boolean }[] = [
      ...dataReal,
    ];
    arr[arr.length - 1] = { ...arr[arr.length - 1], bullet: true };
    setData(arr);
    series.data.setAll(arr);
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
    // const intervalId = setInterval(function () {
    //   addData(series);
    // }, 1000);
    let easing = am5.ease.linear;

    chart.appear(1000, 100);
    setSeries(series);
    // const intervalId = setInterval(function () {
    //   let arr: { date: number; value: number; bullet?: boolean }[] = [
    //     ...dataReal,
    //   ];
    //   arr[arr.length - 1] = { ...arr[arr.length - 1], bullet: true };
    //   // setData(arr);
    //   series.data.setAll(arr);
    // }, 1000);
    return () => {
      // clearInterval(intervalId);
      root.dispose();
    };
  }, []);
  useEffect(() => {
    if (seriss !== undefined) addData(seriss);
  }, [dataReal]);

  function addData(series: any) {
    let arr: { date: number; value: number; bullet?: boolean }[] = [
      ...dataReal,
    ];
    arr[arr.length - 1] = { ...arr[arr.length - 1], bullet: true };
    // setData(arr);
    series.data.setAll(arr);
  }

  return (
    <div
      id={"chartdiv" + "-" + id}
      style={{ width: "1000px", height: "400px" }}
    ></div>
  );
}
