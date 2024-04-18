import { ChartValues, chartData } from "@/types";
import { PieChart } from "./charts/pieChart";
export const CreateChart = <T extends Record<string, any>, X extends string, Y extends string, Prefix extends string>(
    data: T[],
    values: ChartValues<X, Y, Prefix>,
    filter: boolean
) => {
    if (values.chartType === 'pie' || values.chartType === 'donut' || values.chartType === 'half-donut' || values.chartType === '3d-pie' || values.chartType === '3d-donut') {
        const options = PieChart(data, values);
        return options;
    }

    let xValues;
    if (filter) {
        const parsedValue = JSON.parse(values.xValueKey)
        xValues = parsedValue
    } else {
        xValues = data.map((entry) => entry[values.xValueKey]);
    }

    const seriesData = values.yValueKeys.map((key) => {
        const newKey = values.prefix + '_' + key
        return {
            name: key.replace(values.prefix, "").replace("_", " ").toUpperCase(),
            data: data.map((entry) => parseInt(entry[newKey].toString())),
        };
    });

    console.log("function")

    let chartType = values.chartType;
    let chartOptions = {}
    if (values.chartType.startsWith('stacked')) {
        chartType = values.chartType.replace('stacked-', '');
    }

    let is3d = false;
    if (values.chartType.startsWith('3d')) {
        chartType = values.chartType.replace('3d-', '');
        is3d = true
        chartOptions = {
            type: chartType,
            options3d: {
                enabled: true,
                alpha: 45
            }
        };
    } else {
        chartOptions = {
            type: chartType
        };
    }
    const options = {
        chart: chartOptions,
        colors: values.colors,
        title: {
            text: values.chartTitle,
            align: "left",
        },
        xAxis: {
            title: {
                text: values.xAxisLabel,
            },
            categories: xValues,
        },
        yAxis: {
            title: {
                text: values.yAxisLabel,
            },
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top'
        },
        plotOptions: {
            series: {
                stacking: values.chartType.startsWith('stacked') ? 'normal' : null,
                label: {
                    connectorAllowed: false,
                },
            },
        },
        series: seriesData,
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                        },
                    },
                },
            ],
        },
        credits: {
            enabled: false,
        },
    };


    const chartData: chartData = {
        options: options,
        filters: xValues,
        is3D: is3d
    }
    return chartData;
};
