import ChartCard from "../ChartCard";
const Grid = () => {
  return (
    <div className="row">
      <div className="col-6">
        <ChartCard chartKey={"chart-1"} />
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-6">
            <div className="h-1/2">
              <ChartCard chartKey={"chart-2"} />
            </div>
            <div className="h-1/2">
              <ChartCard chartKey={"chart-3"} />
            </div>
          </div>
          <div className="col-6">
            <div className="h-1/2">
              <ChartCard chartKey={"chart-4"} />
            </div>
            <div className="h-1/2">
              <ChartCard chartKey={"chart-5"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
