// src/components/Analytics.js
import React, { useState, useLayoutEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Analytics = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useLayoutEffect(() => {
    const root1 = am5.Root.new(chartRef1.current);
    const root2 = am5.Root.new(chartRef2.current);

    root1.setThemes([am5themes_Animated.new(root1)]);
    root2.setThemes([am5themes_Animated.new(root2)]);

    const chart1 = root1.container.children.push(
      am5xy.XYChart.new(root1, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root1.verticalLayout,
      })
    );

    const chart2 = root2.container.children.push(
      am5xy.XYChart.new(root2, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root2.verticalLayout,
      })
    );

    const xAxis1 = chart1.xAxes.push(
      am5xy.DateAxis.new(root1, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root1, {}),
        tooltip: am5.Tooltip.new(root1, {}),
      })
    );

    const xAxis2 = chart2.xAxes.push(
      am5xy.DateAxis.new(root2, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root2, {}),
        tooltip: am5.Tooltip.new(root2, {}),
      })
    );

    const yAxis1 = chart1.yAxes.push(
      am5xy.ValueAxis.new(root1, {
        renderer: am5xy.AxisRendererY.new(root1, {}),
      })
    );

    const yAxis2 = chart2.yAxes.push(
      am5xy.ValueAxis.new(root2, {
        renderer: am5xy.AxisRendererY.new(root2, {}),
      })
    );

    const series1 = chart1.series.push(
      am5xy.LineSeries.new(root1, {
        name: "Net Sales",
        xAxis: xAxis1,
        yAxis: yAxis1,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root1, {
          labelText: "{valueY}",
        }),
      })
    );

    const series2 = chart2.series.push(
      am5xy.LineSeries.new(root2, {
        name: "Orders",
        xAxis: xAxis2,
        yAxis: yAxis2,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root2, {
          labelText: "{valueY}",
        }),
      })
    );

    series1.data.setAll([
      { date: new Date(2024, 6, 1), value: 50 },
      { date: new Date(2024, 6, 2), value: 53 },
      { date: new Date(2024, 6, 3), value: 56 },
      { date: new Date(2024, 6, 4), value: 52 },
      { date: new Date(2024, 6, 5), value: 48 },
      { date: new Date(2024, 6, 6), value: 50 },
    ]);

    series2.data.setAll([
      { date: new Date(2024, 6, 1), value: 10 },
      { date: new Date(2024, 6, 2), value: 13 },
      { date: new Date(2024, 6, 3), value: 16 },
      { date: new Date(2024, 6, 4), value: 12 },
      { date: new Date(2024, 6, 5), value: 8 },
      { date: new Date(2024, 6, 6), value: 10 },
    ]);

    series1.appear(1000);
    chart1.appear(1000, 100);
    series2.appear(1000);
    chart2.appear(1000, 100);

    return () => {
      root1.dispose();
      root2.dispose();
    };
  }, []);

  const rowData = [
    { category: 'Instagram Followers', itemsSold: 200, netSales: '$1,000' },
    { category: 'Instagram Likes', itemsSold: 150, netSales: '$750' },
    { category: 'Instagram Comments', itemsSold: 100, netSales: '$500' },
  ];

  const columnDefs = [
    { headerName: "Category", field: "category", sortable: true, filter: true },
    { headerName: "Items Sold", field: "itemsSold", sortable: true, filter: true },
    { headerName: "Net Sales", field: "netSales", sortable: true, filter: true },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <span>Date range:</span>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>
          <div className="flex justify-between mb-4">
            <span>Currency:</span>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Total Sales</h2>
          <p className="text-2xl">$3,89,658</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Net Sales</h2>
          <p className="text-2xl">$3,89,658</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Orders</h2>
          <p className="text-2xl">19</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Products Sold</h2>
          <p className="text-2xl">45,556</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Net Sales</h2>
          <div ref={chartRef1} style={{ height: '300px' }}></div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Orders</h2>
          <div ref={chartRef2} style={{ height: '300px' }}></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Top Categories - Items Sold</h2>
          <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={5}
            />
          </div>
           </div>
           <div className="bg-gray-100 p-4 rounded-lg">
             <h2 className="text-lg font-bold mb-4">Top Products - Items Sold</h2>
             <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
               <AgGridReact
                 rowData={rowData}
                 columnDefs={columnDefs}
                 pagination={true}
                 paginationPageSize={5}
               />
             </div>
           </div>
         </div>
       </div>
     );
   };

   export default Analytics;