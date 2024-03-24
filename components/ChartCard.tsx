"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import HighchartsUtility from "@/components/utility/highCharts";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DrawerCreateChart } from "./Drawer";
import { MultiSelect } from "@mantine/core";
import { FilterOption } from "@/types";
import { CreateChart } from "@/helpers/createChart";

const ChartCard: React.FC<{ chartKey: string }> = ({ chartKey }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [columnsFilters, setcolumnsFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[] | undefined>(
    []
  );
  const [tableName, setTableName] = useState<string | null>("");
  const [whereClause, setWhereClause] = useState<string | null>("");
  const [prefix, setPrefix] = useState("");
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/charts/getCharts",
          query: {
            chartKey: chartKey,
          },
        });
        const response = await axios.get(url);
        if (response.data.length > 0) {
          const chartOption = response.data[0].chartjson;
          setOptions(chartOption);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, [chartKey]);

  const handleFilterAndCharts = (
    options: Record<string, any>,
    filters: string[],
    columns: string[],
    pages: string,
    category: string,
    prefixnew: string
  ) => {
    if (options) {
      setOptions(options);
    }
    if (filters) {
      const formattedFilters = filters.map((label) => ({
        label,
        value: label,
      }));
      setFilters(formattedFilters);
    }

    if (columns) {
      console.log(columns);
      setcolumnsFilters(columns);
    }

    if (pages) {
      setTableName(pages);
    }

    setWhereClause(category);
    setPrefix(prefixnew);
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        console.log(selectedFilter, "anothe test");
        const url = qs.stringifyUrl({
          url: "/api/data/filter",
          query: {
            selectedFilter: JSON.stringify(selectedFilter),
            columns: JSON.stringify(columnsFilters),
            tableName: tableName,
            where: whereClause,
            prefix: prefix,
          },
        });
        const response = await axios.get(url);
        console.log(response.data);
        const filteredChartData = CreateChart(
          response.data,
          {
            chartTitle: options.title.text,
            chartType: options.chart.type,
            xAxisLabel: options.xAxis.title.text,
            yAxisLabel: options.yAxis.title.text,
            xValueKey: JSON.stringify(selectedFilter),
            yValueKeys: columnsFilters,
            prefix: prefix,
          },
          true
        );
        setOptions(filteredChartData.options);
      } catch (error) {
        console.error("Error fetching columns for page:", error);
      }
    };

    fetchFilteredData();
  }, [selectedFilter]);

  return (
    <>
      <Card className="bg-white rounded-[30px]">
        <CardHeader className="flex flex-row items-center justify-between">
          {/* {filters.length === 0 && ( */}
          <Button variant={"ghost"} onClick={toggleDrawer}>
            <Plus />
          </Button>
          {/* )} */}

          {filters.length > 0 && (
            <MultiSelect
              data={filters}
              placeholder="Select"
              searchable
              styles={{
                input: {
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "30px",
                },
              }}
              value={selectedFilter}
              onChange={setSelectedFilter}
            />
          )}
        </CardHeader>
        <CardContent className="highcharts-dark">
          {options ? (
            <HighchartsUtility options={options} />
          ) : (
            <p>Create A chart</p>
          )}
        </CardContent>
      </Card>
      <DrawerCreateChart
        open={isDrawerOpen}
        handleFilterAndCharts={handleFilterAndCharts}
        toggleDrawer={toggleDrawer}
        chartKey={chartKey}
      />
    </>
  );
};

export default ChartCard;
