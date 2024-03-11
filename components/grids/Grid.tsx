import ChartCard from "../ChartCard";
const Grid = () => {
  return (
    <div className="h-screen">
      <div className="row">
        <ChartCard chartKey={"chart-1"} />
      </div>
      <div className="row ">
        <ChartCard chartKey={"chart-2"} />
      </div>
      <div className="row ">
        <ChartCard chartKey={"chart-3"} />
      </div>
      <div className="row">
        <ChartCard chartKey={"chart-4"} />
      </div>
    </div>
  );
};

export default Grid;
