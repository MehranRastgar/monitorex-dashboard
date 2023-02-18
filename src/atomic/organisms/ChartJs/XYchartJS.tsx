import React, { useState, useEffect, useRef } from "react";
import Chart, { ChartDataSets } from "chart.js";

interface DataPoint {
  x: number;
  y: number;
}

interface DataSet {
  label: string;
  color: string;
  data: DataPoint[];
  updateData: (index?: number, newData?: DataPoint) => DataPoint | null;
}

interface Props {
  dataSets: DataSet[];
}

const XYChartJS: React.FC<Props> = ({ dataSets }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [newDataPoint, setNewDataPoint] = useState<DataPoint>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined" && !chart && chartRef.current) {
      const newChart = new Chart(chartRef.current, {
        type: "scatter",
        data: {
          datasets: dataSets.map(({ label, color, data }) => ({
            label,
            data,
            borderColor: color,
            backgroundColor: color + "33",
            pointRadius: 5,
            pointHoverRadius: 7,
          })),
        },
        options: {
          scales: {
            xAxes: [
              {
                type: "linear",
                position: "bottom",
              },
            ],
            yAxes: [
              {
                type: "linear",
                position: "left",
              },
            ],
          },
        },
      });
      setChart(newChart);
    }
  }, [chart, dataSets]);

  const updateChart = () => {
    if (chart) {
      chart.update();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dataSets.forEach(({ data, updateData }) => {
        updateData();
        data.forEach((point, index) => {
          const update = updateData(index);
          if (update) {
            point.x = update.x ?? point.x;
            point.y = update.y ?? point.y;
          }
        });
      });
      updateChart();
    }, 1000);
    return () => clearInterval(interval);
  }, [dataSets]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dataSets[0].data.push(newDataPoint);
    setNewDataPoint({ x: 0, y: 0 });
    updateChart();
  };

  return (
    <div>
      <canvas ref={chartRef} />
      <form onSubmit={handleSubmit}>
        <label>
          New data point:
          <input
            type="number"
            value={newDataPoint.x}
            onChange={(event) =>
              setNewDataPoint((prev) => ({
                ...prev,
                x: parseFloat(event.target.value),
              }))
            }
          />
          <input
            type="number"
            value={newDataPoint.y}
            onChange={(event) =>
              setNewDataPoint((prev) => ({
                ...prev,
                y: parseFloat(event.target.value),
              }))
            }
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default XYChartJS;
