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
  const [columnsFilters, setcolumnsFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>("");
  const [tableName, setTableName] = useState<string | null>("");
  const [whereClause, setWhereClause] = useState<string | null>("");
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
    category: string
  ) => {
    console.log(options)
    console.log(filters)
    console.log(columns)
    console.log(pages)
    console.log(category)
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
  };

  useEffect(() => {
    if (selectedFilter) {
      const fetchFilteredData = async () => {
        try {
          const url = qs.stringifyUrl({
            url: "/api/data/filter",
            query: {
              selectedFilter: selectedFilter,
              columns: JSON.stringify(columnsFilters),
              tableName: tableName,
              where: whereClause,
            },
          });
          const response = await axios.get(url);
          console.log(response.data,"test");
          // se(formatedPrefix);
        } catch (error) {
          console.error("Error fetching columns for page:", error);
        }
      };

      fetchFilteredData();
    }
  }, [columnsFilters, selectedFilter, tableName, whereClause]);

  return (
    <>
      <Card className="bg-white rounded-[30px]">
        <CardHeader className="flex flex-row items-center justify-between">
          {filters.length === 0 && (
            <Button variant={"ghost"} onClick={toggleDrawer}>
              <Plus />
            </Button>
          )}

          {filters.length > 0 && (
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
              onChange={(value, option) => {
                setSelectedFilter(value);
              }}
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
