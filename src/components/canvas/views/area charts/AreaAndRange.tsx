import React, { Component, useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GetSensorsSeries,
  GetSensorsSeriesFilled,
} from "../../../../api/sensors";
import { SensorsReceiveTpe } from "../../../pages/sensors/sensorsTable";
import Button from "../../../UI/button/Button";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function AreaAndRange({
  itemSelected,
}: {
  itemSelected: SensorsReceiveTpe;
}) {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>();
  const [themeChange, setThemeChange] = useState<"dark1" | "light1">("dark1");
  const query = useQuery("sensorseries" + itemSelected._id, () =>
    GetSensorsSeriesFilled(String(itemSelected._id))
  );
  const queryClient = useQueryClient();

  function createData() {
    const tempdata: {
      x: Date;
      y?: number;
    }[] = [];
    const max: {
      x: Date;
      y?: number;
    }[] = [];
    const min: {
      x: Date;
      y?: number;
    }[] = [];
    ////console.log(query.data);
    const minRange = new Date(query?.data?.[0]?.data?.[0]?.x ?? 0);
    const MaxRange = new Date(
      query?.data?.[0]?.data?.[Number(query?.data?.[0]?.data?.length ?? 0 - 1)]
        ?.x ?? 0
    );
    max.push(
      { x: minRange, y: itemSelected.sensorLastSerie?.metaField?.max },
      { x: MaxRange, y: itemSelected.sensorLastSerie?.metaField?.max }
    );
    // min.push(
    //   { x: minRange, y: itemSelected.sensorLastSerie?.metaField?.min },
    //   { x: MaxRange, y: itemSelected.sensorLastSerie?.metaField?.min }
    // );
    min.push({ x: minRange, y: 20 }, { x: MaxRange, y: 20 });

    const numberOFMinutes = (MaxRange.getTime() - minRange.getTime()) / 60000;
    //console.log("numberOFMinutes", numberOFMinutes);

    //console.log(query.data);
    let lastValidY = 0;
    query.data?.[0]?.data?.map((item, index) => {
      if (item?.x !== undefined && index % 2 === 0) {
        const datess = new Date(item.x);
        if (
          item.y === undefined &&
          query.data?.[0]?.data[index - 1].y === undefined
        ) {
          if (query.data?.[0]?.data[index].y !== undefined)
            lastValidY = Number(query?.data?.[0]?.data[index - 2]?.y);
          tempdata.push({
            y: undefined,
            x: datess,
          });
        } else {
          tempdata.push({
            y: Number(item?.y),
            x: datess,
          });
        }
        // tempdata.push(Number(item?.metaField?.value));
      }
    });
    //console.log(tempdata);

    // query.data?.[0]?.data?.map((item, index) => {
    //   if (item?.x !== undefined && item?.y !== undefined && index % 1 === 0) {
    //     const datess = new Date(item.x);
    //     tempdata.push({
    //       y: Number(item?.y),
    //       x: datess,
    //     });
    //     // tempdata.push(Number(item?.metaField?.value));
    //   }
    //   if (item?.y !== undefined && index % 1 === 0) {
    //     const datess = new Date(item.x);
    //     tempdata2.push({
    //       y: Number(item?.y),
    //       x: datess,
    //     });
    //     // tempdata.push(Number(item?.metaField?.value));
    //   }
    // });

    setUserData({
      theme: themeChange,

      zoomEnabled: true,
      exportFileName: String(itemSelected._id),
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text:
          itemSelected.resolution +
          "-" +
          itemSelected.title +
          "-" +
          itemSelected.type,
      },

      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey",
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === "undefined" ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      axisY: {
        // gridColor: "#FFBFD5",
        // scaleBreaks: {
        //   autoCalculate: true,
        // },
        title: t(itemSelected.unit ?? "unit"),
        interval: 2,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisX: {
        prefix: "T",
        interval: 2,
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          showInLegend: true,
          type: "spline",
          xValueFormatString: "YYYY-MM-DD-hh-mm-ss",
          yValueFormatString: "قطع ارتباط",
          name: " قطع ارتباط",
          point: "",
          dataPoints: [...max],
        },
        {
          showInLegend: true,
          type: "spline",
          xValueFormatString: "YYYY-MM-DD-hh-mm-ss",
          yValueFormatString: "قطع ارتباط",
          name: " قطع ارتباط",
          point: "",
          dataPoints: [...min],
        },
        {
          markerColor: "red",
          lineThickness: 1,
          showInLegend: true,
          type: "spline",
          xValueFormatString: "YYYY-MM-DD-hh-mm-ss",
          yValueFormatString: "#,##0.## " + t(itemSelected?.unit ?? "unit"),
          connectNullData: true,
          dataPoints: [...tempdata],
        },
      ],
    });
  }
  // const options = {
  //   theme: "light2",
  //   animationEnabled: true,
  //   exportEnabled: true,
  //   title: {
  //     text: "General Electric Company Stock Price",
  //   },
  //   subtitles: [
  //     {
  //       text: "High and Low Prices - 2017",
  //     },
  //   ],
  //   axisY: {
  //     title: "Stock Price (in USD)",
  //     includeZero: false,
  //     prefix: "$",
  //   },
  //   data: [
  //     {
  //       type: "rangeSplineArea",
  //       xValueFormatString: "MMM YYYY",
  //       yValueFormatString: "$#,##0.00",
  //       toolTipContent: "{x}<br><b>High:</b> {y[1]}<br><b>Low:</b> {y[0]}",
  //       dataPoints: [],
  //     },
  //   ],
  // };
  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto",
  };

  const mutation = useMutation({
    mutationFn: () => GetSensorsSeriesFilled(String(itemSelected._id)),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["sensorseries" + itemSelected._id],
      });
      //console.log("sensor query is revalidate");
    },
  });

  useEffect(() => {
    // let timer1 = setTimeout(() => mutation.mutate(), 30000);
    // ////console.log(query);
    // if (query.isFetching === true) {
    //  //console.log("sensor query is updated");
    // }
    if (query.status === "success") {
      createData();
      //console.log("sensor seriesss query is updated");
    }
    // return () => {
    //   clearTimeout(timer1);
    // };
  }, [query.status, themeChange]);

  return (
    <>
      <div className="flex w-fit h-fit">
        <Button
          onClick={() => {
            if (themeChange === "dark1") setThemeChange("light1");
            else setThemeChange("dark1");
          }}
        >
          change theme
        </Button>
      </div>
      <div className="flex w-full">
        {/* <h1></h1> */}
        {query.status === "success" ? (
          <CanvasJSChart
            _id={String(itemSelected._id)}
            options={userData}
            /* onRef={ref => this.chart = ref} */
          />
        ) : (
          <></>
        )}
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    </>
  );
}
