import { z } from "zod";
export type ChartValues<X extends string, Y extends string, Prefix extends string> = {
    chartTitle: string;
    chartType: string;
    xAxisLabel: string | undefined;
    yAxisLabel: string | undefined;
    xValueKey: X;
    yValueKeys: Y[];
    prefix: Prefix;
    colors: string[]
}

export type chartData = {
    options: Record<string, any>
    filters: string[]
}


export interface FilterOption {
    label: string;
    value: string;
}

// form schema

export const formSchema = z
    .object({
        chartTitle: z.string().min(2).max(50),
        chartType: z.string(),
        chartXAxis: z.string().optional(),
        chartYAxis: z.string().optional(),
        pages: z.string(),
        columns: z.array(z.string()),
        prefix: z.string(),
        category: z.string(),
        colors: z.string(),
    })
    .refine((data) => {
        const chartType = data.chartType;
        const isPieChart = chartType === "pie";
        const isDonutChart = chartType === "donut";
        const isHalfDonutChart = chartType === "half-donut";
        if (isPieChart || isDonutChart || isHalfDonutChart) {
            const { chartXAxis, chartYAxis, ...rest } = data;
            return rest;
        }
        return data;
    });




export interface DrawerCreateChartProps {
    open: boolean;
    handleFilterAndCharts: (
        options: Record<string, any>,
        filters: string[],
        columns: string[],
        pages: string,
        category: string,
        prefix: string
    ) => void;
    toggleDrawer: () => void;
    chartKey: string;
}
export type Page = {
    value: string;
    label: string;
};