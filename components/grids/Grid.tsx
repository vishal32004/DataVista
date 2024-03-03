"use client";
import { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import StackedAreaChart from "../charts/StackedAreaChart";
import PieChart from "../charts/PieChart";
import StackedColumnChart from "../charts/StackedColumnChart";
import WaterFallChart from "../charts/BubbleChart";
import BubbleChart from "../charts/BubbleChart";
const Grid = () => {
  const [chartsData, setChartsData] = useState("");
  useEffect(() => {}, []);

  return (
    <div className="h-screen">
      <div className="row">
        <div className="col-4">
          <LineChart />
        </div>
        <div className="col-4">
          <StackedAreaChart />
        </div>
        <div className="col-4">
          <PieChart/>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <StackedColumnChart/>
        </div>
        <div className="col-4">
          <BubbleChart/>
        </div>
        <div className="col-4">
          <LineChart />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <LineChart />
        </div>
        <div className="col-4">
          <LineChart />
        </div>
        <div className="col-4">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Grid;
