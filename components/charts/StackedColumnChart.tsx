// import Highcharts from 'highcharts'
// import HighchartsExporting from 'highcharts/modules/exporting'
// import HighchartsReact from 'highcharts-react-official'

// if (typeof Highcharts === 'object') {
//     HighchartsExporting(Highcharts)
// }

// const options = {
//   chart: {
//     type: "column",
//   },
//   title: {
//     text: "Major trophies for some English teams",
//     align: "left",
//   },
//   xAxis: {
//     categories: ["Arsenal", "Chelsea", "Liverpool", "Manchester United"],
//   },
//   yAxis: {
//     min: 0,
//     title: {
//       text: "Count trophies",
//     },
//     stackLabels: {
//       enabled: true,
//     },
//   },
//   legend: {
//     align: "left",
//     x: 70,
//     verticalAlign: "top",
//     y: 70,
//     floating: true,
//     backgroundColor: "white",
//     borderColor: "#CCC",
//     borderWidth: 1,
//     shadow: false,
//   },
//   tooltip: {
//     headerFormat: "<b>{point.x}</b><br/>",
//     pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
//   },
//   plotOptions: {
//     column: {
//       stacking: "normal",
//       dataLabels: {
//         enabled: true,
//       },
//     },
//   },
//   series: [
//     {
//       name: "BPL",
//       data: [3, 5, 1, 13],
//     },
//     {
//       name: "FA Cup",
//       data: [14, 8, 8, 12],
//     },
//     {
//       name: "CL",
//       data: [0, 2, 6, 3],
//     },
//   ],
// };

// const StackedColumnChart = () => {
//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default StackedColumnChart;
