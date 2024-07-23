// src/components/OrderCard.js
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const OrderCard = () => {
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
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        groupData: true,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
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
      am5xy.LineSeries.new(root, {
        name: "Orders",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Add data
    series.data.setAll([
      { date: new Date(2024, 5, 1), value: 50 },
      { date: new Date(2024, 5, 2), value: 53 },
      { date: new Date(2024, 5, 3), value: 56 },
      { date: new Date(2024, 5, 4), value: 52 },
      { date: new Date(2024, 5, 5), value: 48 },
      { date: new Date(2024, 5, 6), value: 50 },
    ]);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-100">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-500 bg-blue-100 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M9 7h6M12 11v9m-4-4h8" />
          </svg>
        </div>
      </div>
      <div className="text-gray-600">Today Orders</div>
      <div className="text-2xl font-bold text-gray-900">3,89,658</div>
      <div className="mt-2" style={{ height: '150px' }} ref={chartRef}></div>
    </div>
  );
};

export default OrderCard;