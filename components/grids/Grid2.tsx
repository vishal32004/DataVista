import React from "react";
import ChartCard from "../ChartCard";

const Grid2 = () => {
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
          <div className="col-6">
            <ChartCard chartKey={"chart-3"} />
          </div>
          <div className="col-6">
            <ChartCard chartKey={"chart-4"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-8">
            <ChartCard chartKey={"chart-5"} />
          </div>
          <div className="col-4">
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
      </div>
    </div>
  );
};

export default Grid2;
