export type ChartValues<X extends string, Y extends string, Prefix extends string> = {
    chartTitle: string;
    chartType: string;
    xAxisLabel: string;
    yAxisLabel: string;
    xValueKey: X;
    yValueKeys: Y[];
    prefix: Prefix;
}