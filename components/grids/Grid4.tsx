import React from "react";
import ChartCard from "../ChartCard";

const Grid4 = () => {
  return (
    <div>
      <div className="h-screen">
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-1"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-2"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-3"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-4"} />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-5"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid4;
