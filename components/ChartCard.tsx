"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import HighchartsUtility from "@/components/utility/highCharts";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DrawerCreateChart } from "./Drawer";
import { Select } from "@mantine/core";
import { FilterOption } from "@/types";

const ChartCard: React.FC<{ chartKey: string }> = ({ chartKey }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOption[]>([]);
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
    filters: string[]
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
  };
  return (
    <>
      <Card className="bg-white rounded-[30px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant={"ghost"} onClick={toggleDrawer}>
            <Plus />
          </Button>

          <Select
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
          />
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
