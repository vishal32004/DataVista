import React from "react";
import ChartCard from "../ChartCard";

interface GridProps {
  pagename: string;
}
const Grid4: React.FC<GridProps> = ({ pagename }) => {
  return (
    <div>
      <div className="h-screen">
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-1"} pagename={pagename}/>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-2"} pagename={pagename}/>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-3"} pagename={pagename}/>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-4"} pagename={pagename}/>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-12">
            <ChartCard chartKey={"chart-5"} pagename={pagename}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid4;
