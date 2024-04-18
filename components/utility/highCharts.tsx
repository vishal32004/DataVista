import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Options } from "highcharts";
import cylinder from "highcharts/modules/cylinder";
import funnel from "highcharts/modules/funnel";
import highcharts3d from "highcharts/highcharts-3d";
require("highcharts/modules/exporting")(Highcharts);
interface HighchartsUtilityProps {
  options: Options;
}

highcharts3d(Highcharts);
cylinder(Highcharts);
funnel(Highcharts);
const HighchartsUtility: React.FC<HighchartsUtilityProps> = ({
  options,
  ...props
}) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={options} {...props} />
  );
};

export default HighchartsUtility;
