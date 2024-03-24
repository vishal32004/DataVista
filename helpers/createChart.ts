import { ChartValues, chartData } from "@/types";
import { PieChart } from "./charts/pieChart";
export const CreateChart = <T extends Record<string, any>, X extends string, Y extends string, Prefix extends string>(
    data: T[],
    values: ChartValues<X, Y, Prefix>,
    filter: boolean
) => {
    if (values.chartType === 'pie' || values.chartType === 'donut' || values.chartType === 'half-donut') {
        const options = PieChart(data, values);
        return options;
    }

    console.log(values)
    let xValues;
    if (filter) {
        const newXvalues = []
        newXvalues.push(values.xValueKey)
        xValues = newXvalues
        console.log(xValues, "here foes ")
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

    const options = {
        chart: {
            type: values.chartType,
        },

        colors: ['#0d181c', '#cadaea', '#9CAFAA', '#76ABAE', '#9BB0C1', '#7469B6', '#40679E'],
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
        filters: xValues
    }

    console.log(options)
    return chartData;
};
