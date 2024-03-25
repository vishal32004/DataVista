import React from "react";
import ChartCard from "../ChartCard";

const Grid5 = () => {
  return (
    <div>
      <div className="h-screen">
        <div className="row m-3">
          <div className="col-6">
            <ChartCard chartKey={"chart-1"} />
          </div>
          <div className="col-6">
            <ChartCard chartKey={"chart-2"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-3"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-6">
            <ChartCard chartKey={"chart-4"} />
          </div>
          <div className="col-6">
            <ChartCard chartKey={"chart-5"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-6"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-6">
            <ChartCard chartKey={"chart-7"} />
          </div>
          <div className="col-6">
            <ChartCard chartKey={"chart-8"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-9"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid5;
