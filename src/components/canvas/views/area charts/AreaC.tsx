import React, { Component, useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetSensorsSeriesFilled } from "../../../../api/sensors";
import { SensorsReceiveTpe } from "../../../pages/sensors/sensorsTable";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function AreaC({
  itemSelected,
}: {
  itemSelected: SensorsReceiveTpe;
}) {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>();
  const query = useQuery("sensorseries", () =>
    GetSensorsSeriesFilled(String(itemSelected._id))
  );

  function createData() {
    const tempdata: {
      x?: Date;
      y: number;
    }[] = [];
    const tempdata2: {
      x?: Date;
      y: number;
    }[] = [];
    console.log(query.data);
    query.data?.[0]?.data?.map((item, index) => {
      if (item?.x !== undefined && index % 1 === 0) {
        const datess = new Date(item.x);
        if (item.y === null && query.data?.[0]?.data[index - 1].y === null) {
          tempdata2.push({
            y: Number(item?.y),
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
    setUserData({
      theme: "light2",
      zoomEnabled: true,

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
      axisY: {
        title: t(itemSelected.unit ?? "unit"),
        includeZero: true,
      },
      data: [
        {
          type: "area",
          xValueFormatString: "YYYY-MM-DD-",
          yValueFormatString: "#,##0.## " + t(itemSelected?.unit ?? "unit"),
          dataPoints: [...tempdata],
        },
      ],
    });
  }

  useEffect(() => {
    createData();
  }, [query.status]);
  return (
    <>
      <div>
        {/* <h1></h1> */}
        <CanvasJSChart
          options={userData}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    </>
  );
}
