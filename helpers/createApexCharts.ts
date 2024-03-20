// import { ChartValues } from "@/types";
// import { ApexOptions } from "apexcharts";

// export const CreateApexChart = <T extends Record<string, any>, X extends string, Y extends string, Prefix extends string>(
//     data: T[],
//     values: ChartValues<X, Y, Prefix>
// ): ApexOptions => {
//     // if (values.chartType === 'pie' || values.chartType === 'donut' || values.chartType === 'half-donut') {
//     //     // You can implement pie chart specific logic here if needed
//     //     // For now, returning an empty object as ApexCharts don't support pie charts directly
//     //     return {};
//     // }

//     const xValues = data.map((entry) => entry[values.xValueKey]);
//     const seriesData = values.yValueKeys.map((key) => {
//         const newKey = values.prefix + '_' + key
//         return {
//             name: key.replace(values.prefix, "").replace("_", " ").toUpperCase(),
//             data: data.map((entry) => parseInt(entry[newKey].toString())),
//         };
//     });

//     const options: ApexOptions = {
//         chart: {
//             //@ts-ignore
//             type: values.chartType,
//         },
//         title: {
//             text: values.chartTitle,
//             align: "left",
//         },
//         xaxis: {
//             title: {
//                 text: values.xAxisLabel,
//             },
//             categories: xValues,
//         },
//         yaxis: {
//             title: {
//                 text: values.yAxisLabel,
//             },
//         },
//         legend: {
//             position: 'top'
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: values.chartType === 'bar'
//             }
//         },
//         series: seriesData,
//         responsive: [
//             {
//                 breakpoint: 500,
//                 options: {
//                     legend: {
//                         position: "bottom"
//                     }
//                 }
//             }
//         ],
//         credits: {
//             enabled: false,
//         },
//     };

//     return options;
// };
