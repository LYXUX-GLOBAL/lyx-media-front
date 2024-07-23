// src/components/SalesByCategory.js
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SalesByCategory = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "category",
        innerRadius: am5.percent(50),
      })
    );

    series.data.setAll([
      { category: "Watch OS 8", value: 35 },
      { category: "Iphone 12 Max", value: 15 },
      { category: "Horror Book", value: 8 },
      { category: "Smart 4k TV", value: 7 },
    ]);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sales By Category</h2>
        <div className="text-gray-600">Sort By: <span className="font-bold">Weekly</span></div>
      </div>
      <div ref={chartRef} style={{ height: '300px' }}></div>
      <div className="flex justify-between mt-4">
        <div>
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-blue-500 mr-2 rounded-full"></span>
            <span>Watch OS 8</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-green-500 mr-2 rounded-full"></span>
            <span>Iphone 12 Max</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 bg-red-500 mr-2 rounded-full"></span>
            <span>Horror Book</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-500 mr-2 rounded-full"></span>
            <span>Smart 4k TV</span>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">35.0%</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">15.0%</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">8.0%</span>
          </div>
          <div>
            <span className="text-gray-700 font-semibold">7.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesByCategory;