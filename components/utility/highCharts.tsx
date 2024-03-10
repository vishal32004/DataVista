import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Options } from "highcharts";

interface HighchartsUtilityProps {
  options: Options;
}

const HighchartsUtility: React.FC<HighchartsUtilityProps> = ({
  options,
  ...props
}) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={options} {...props} />
  );
};

export default HighchartsUtility;
