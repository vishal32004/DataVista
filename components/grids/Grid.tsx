import ChartCard from "../ChartCard";
const Grid = () => {
  return (
    <div className="row m-3">
      <div className="col-6">
        <ChartCard chartKey={"chart-1"} />
      </div>
      <div className="col-6">
        <ChartCard chartKey={"chart-2"} />
      </div>
    </div>
  );
};

export default Grid;
