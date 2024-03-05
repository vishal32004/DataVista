type DiseaseData = {
    year: number;
    total_covid: number;
    total_lung_cancer: number;
    total_heart_failure: number;
    total_hiv_aids: number;
    total_stroke: number;
    total_tuberculosis: number;
};
export const lineChartJson = (data: DiseaseData[]) => {
    const years = data.map((entry: { year: number }) => Number(entry.year));
    const diseases = [
        "total_covid",
        "total_lung_cancer",
        "total_heart_failure",
        "total_hiv_aids",
        "total_stroke",
        "total_tuberculosis",
    ];

    const seriesData = diseases.map((disease) => ({
        name: disease.replace("total_", "").replace("_", " ").toUpperCase(),
        data: data.map((entry: { [key: string]: number }) =>
            parseInt(entry[disease].toString())
        ),
    }));

    console.log(seriesData);
    console.log(years);
    const options = {
        title: {
            text: "Disease Data Over the Years",
            align: "left",
        },
        xAxis: {
            title: {
                text: "Year",
            },
        },
        yAxis: {
            title: {
                text: "Number of Cases",
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
                    connectorAllowed: false
                },
                pointStart: 1948
            }
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
    return options
}



// export const loadchart = (data: any) => {
//     const years = data.map((entry: { year: number }) => Number(entry.year));
//     const diseases = [
//         "total_covid",
//         "total_lung_cancer",
//         "total_heart_failure",
//         "total_hiv_aids",
//         "total_stroke",
//         "total_tuberculosis",
//     ];

//     const seriesData = diseases.map((disease) => ({
//         name: disease.replace("total_", "").replace("_", " ").toUpperCase(),
//         data: data.map((entry: { [key: string]: number }) =>
//             parseInt(entry[disease].toString())
//         ),
//     }));

//     console.log(seriesData);
//     console.log(years);
//     const options = {
//         title: {
//             text: "Disease Data Over the Years",
//             align: "left",
//         },
//         xAxis: {
//             title: {
//                 text: "Year",
//             },
//         },
//         yAxis: {
//             title: {
//                 text: "Number of Cases",
//             },
//         },
//         legend: {
//             layout: "vertical",
//             align: "right",
//             verticalAlign: "middle",
//         },
//         plotOptions: {
//             series: {
//                 label: {
//                     connectorAllowed: false
//                 },
//                 pointStart: 1948
//             }
//         },
//         series: seriesData,
//         responsive: {
//             rules: [
//                 {
//                     condition: {
//                         maxWidth: 500,
//                     },
//                     chartOptions: {
//                         legend: {
//                             layout: "horizontal",
//                             align: "center",
//                             verticalAlign: "bottom",
//                         },
//                     },
//                 },
//             ],
//         },
//         credits: {
//             enabled: false,
//         },
//     };
//     console.log(options,"fdjslkfjlskjfsfdjf")
//     return options
// }