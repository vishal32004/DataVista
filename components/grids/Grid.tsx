import ChartCard from "../ChartCard";
const Grid = () => {
  return (
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
        <div className="col-5">
          <ChartCard chartKey={"chart-4"} />
        </div>
        <div className="col-7">
          <ChartCard chartKey={"chart-5"} />
        </div>
      </div>
      <div className="row m-3">
        <div className="col-md-4">
          <ChartCard chartKey={"chart-6"} />
        </div>
        <div className="col-md-4">
          <ChartCard chartKey={"chart-7"} />
        </div>
        <div className="col-md-4">
          <ChartCard chartKey={"chart-8"} />
        </div>
      </div>
    </div>
  );
};

export default Grid;
