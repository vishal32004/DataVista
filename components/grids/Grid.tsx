import ChartCard from "../ChartCard";
const Grid = () => {
  return (
    <div className="h-screen">
      <div className="row h-2/3">
        <ChartCard></ChartCard>
      </div>
      <div className="row h-2/3">
        <ChartCard></ChartCard>
      </div>
      <div className="row h-2/3">
        <ChartCard></ChartCard>
      </div>
      <div className="row h-2/3">
        <ChartCard></ChartCard>
      </div>
    </div>
  );
};

export default Grid;
