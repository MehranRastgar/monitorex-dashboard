/* App.js */
import React, { Component } from "react";

import dynamic from "next/dynamic";
const CanvasJSReact = dynamic(() => import("../../assets/canvasjs.react"), {
  ssr: false,
});

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AreaAndZoom extends Component {
  DPS = 0;
  constructor() {
    super();
    this.DPS = 50000;
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints(noOfDps) {
    var xVal = 1,
      yVal = 100;
    var dps = [];
    for (var i = 0; i < this.DPS; i++) {
      yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
      dps.push({ x: xVal, y: yVal });
      xVal++;
    }
    return dps;
  }

  render() {
    const options = {
      theme: "light1", // "light1", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Try Zooming and Panning",
      },
      data: [
        {
          type: "area",
          dataPoints: this.generateDataPoints(50000),
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

module.exports = AreaAndZoom;
