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

//input data
//multi  ===>
//theme
//zoom
//legend
//export
const theme = {
  colors: [
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
  ],
  chart: {
    backgroundColor: {
      linearGradient: [0, 0, 500, 500],
      stops: [
        [0, "rgb(255, 255, 255)"],
        [1, "rgb(240, 240, 255)"],
      ],
    },
  },
  title: {
    style: {
      color: "#000",
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
    },
  },
  subtitle: {
    style: {
      color: "#666666",
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
    },
  },
};
// Apply the theme

export default function MultiLineChart({ id }: { id: string }) {
  const selectDataOFChart = useAppSelector(selectSensorReposts);
  // const [hoverData, setddata] = useState()
  // const selectSensorsData =
  const [state, setState] = useState({});
  const [continus, setContinus] = useState(false);
  const [justPoint, setJustPoint] = useState(false);

  function sumOfdata(data: SensorsReportType[]) {
    const arrSeries: { name: string; data: any[] }[] = [];
    data?.map((sens, index) => {
      if (sens?.data !== undefined) {
        arrSeries.push({
          lineWidth: justPoint ? 0 : 1,
          marker: {
            enabled: justPoint,
            radius: 2,
          },
          name: "sensor-" + sens.sensor?.title,
          data: [...makeData(sens?.data)],
        });
      }
    });
    console.log(arrSeries);
    if (arrSeries.length > 0) {
      setState({
        theme: { ...theme },
        chartOptions: {
          legend: {
            enabled: true,
          },
          // accessibility: {
          //   series: {
          //     descriptionFormat: "{seriesDescription}.",
          //   },
          //   description:
          //     "Use the dropdown menus above to display different indicator series on the chart.",
          //   screenReaderSection: {
          //     beforeChartFormat:
          //       "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div>",
          //   },
          // },

          tooltip: {
            shared: true,
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

          chart: {
            zoomType: "y",
          },
          title: {
            text: "Example with **bold** text",
            floating: true,
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
          // yAxis: [
          //   {
          //     height: "30%",
          //   },
          //   {
          //     top: "20%",
          //     height: "20%",
          //   },
          //   {
          //     top: "80%",
          //     height: "20%",
          //   },
          // ],
        },
      });
    }
  }

  function makeData(data: Datum[]) {
    const arr: any[] = [];
    data.map((item, index) => {
      if (item?.x !== undefined)
        if (item?.y !== undefined || continus)
          arr.push([new Date(item?.x), item?.y ?? null]);
    });
    console.log(state);
    return arr;
  }

  const { chartOptions, hoverData } = state;
  useEffect(() => {
    if (selectDataOFChart !== undefined && selectDataOFChart?.length > 0) {
      sumOfdata(selectDataOFChart);
    }
  }, [selectDataOFChart, continus, justPoint]);

  return (
    <div>
      <button
        className={
          "flex border m-2 p-2 " + `${continus ? "bg-red-400" : "bg-green-400"}`
        }
        onClick={(e) => {
          setContinus((val) => !val);
        }}
      >
        continus
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
      {chartOptions !== undefined ? (
        <HighchartsReact
          id={id}
          constructorType={"stockChart"}
          highcharts={Highcharts}
          options={chartOptions}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
