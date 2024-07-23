// src/components/SalesStatistics.js
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SalesStatistics = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      })
    );

    // Create X-axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Sales",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Add data
    series.data.setAll([
      { month: "Jan", value: 6 },
      { month: "Feb", value: 8 },
      { month: "Mar", value: 10 },
      { month: "Apr", value: 14 },
      { month: "May", value: 18 },
      { month: "Jun", value: 22 },
      { month: "Jul", value: 19 },
      { month: "Aug", value: 16 },
      { month: "Sep", value: 14 },
      { month: "Oct", value: 12 },
    ]);

    xAxis.data.setAll(series.data.values);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Sales Statistics</h2>
      <div ref={chartRef} style={{ height: '300px' }}></div>
      <div className="flex justify-between mt-4">
        <div>
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-blue-500 mr-2 rounded-full"></span>
            <span>Product Order</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-green-500 mr-2 rounded-full"></span>
            <span>Product Pending</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-red-500 mr-2 rounded-full"></span>
            <span>Product Cancelled</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-500 mr-2 rounded-full"></span>
            <span>Product Delivered</span>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">43,541.58</span>
            <span className="text-blue-500 ml-2">25.4%</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">17,351.12</span>
            <span className="text-green-500 ml-2">17.4%</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">32,569.74</span>
            <span className="text-red-500 ml-2">16.7%</span>
          </div>
          <div>
            <span className="text-gray-700 font-semibold">67,356.24</span>
            <span className="text-yellow-500 ml-2">65.7%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;