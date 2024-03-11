type ChartValues<X extends string, Y extends string> = {
    chartTitle: string;
    chartType: string;
    chartPage: string;
    xAxisLabel: string;
    yAxisLabel: string;
    xValueKey: X;
    yValueKeys: Y[];
};

export const CreateChart = <T extends Record<string, any>, X extends string, Y extends string>(
    data: T[],
    values: ChartValues<X, Y>
) => {
    const xValues = data.map((entry) => entry[values.xValueKey]);
    const seriesData = values.yValueKeys.map((key) => ({
        name: key.replace("total_", "").replace("_", " ").toUpperCase(),
        data: data.map((entry) => parseInt(entry[key].toString())),
    }));

    const options = {
        chart: {
            type: values.chartType,
        },
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
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
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

    return options;
};
