import { AlignValue } from 'highcharts';

// ...

export interface ChartDataStructure {
  title: {
    text: string;
    align: string; // Assuming this align is a string, update if necessary
  };
  xAxis: {
    title: {
      text: string;
    };
    categories: number[];
  };
  yAxis: {
    title: {
      text: string;
    };
  };
  legend: {
    layout: string;
    align: AlignValue | undefined; // Adjust the type based on Highcharts
    verticalAlign: string;
  };
  plotOptions: {
    series: {
      label: {
        connectorAllowed: boolean;
      };
    };
  };
  series: {
    name: string;
    data: number[];
  }[];
  responsive: {
    rules: {
      condition: {
        maxWidth: number;
      };
      chartOptions: {
        legend: {
          layout: string;
          align: AlignValue | undefined; // Adjust the type based on Highcharts
          verticalAlign: string;
        };
      };
    }[];
  };
  credits: {
    enabled: boolean;
  };
}
