import ChartCard from "../ChartCard";
interface GridProps {
  pagename: string;
}
const Grid: React.FC<GridProps> = ({ pagename }) => {
  return (
    <div className="h-screen">
      <div className="row m-3">
        <div className="col-6">
          <ChartCard chartKey={"chart-1"} pagename={pagename}/>
        </div>
        <div className="col-6">
          <ChartCard chartKey={"chart-2"} pagename={pagename}/>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-12">
          <ChartCard chartKey={"chart-3"} pagename={pagename}/>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-6">
          <ChartCard chartKey={"chart-4"} pagename={pagename}/>
        </div>
        <div className="col-6">
          <ChartCard chartKey={"chart-5"} pagename={pagename}/>
        </div>
      </div>
    </div>
  );
};

export default Grid;
