import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import qs from "query-string";
import HighchartsUtility from "@/components/utility/highCharts";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Edit, Plus } from "lucide-react";
import { DrawerCreateChart } from "./Drawer";
import { MultiSelect } from "@mantine/core";
import { FilterOption } from "@/types";
import { CreateChart } from "@/helpers/createChart";

const ChartCard: React.FC<{ chartKey: string; pagename: string }> = ({
  chartKey,
  pagename,
}) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [columnsFilters, setColumnsFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[] | undefined>(
    []
  );
  const [tableName, setTableName] = useState<string | null>("");
  const [whereClause, setWhereClause] = useState<string | null>("");
  const [prefix, setPrefix] = useState("");
  const [alpha, setAlpha] = useState<number>(15);
  const [beta, setBeta] = useState<number>(15);
  const [depth, setDepth] = useState<number>(50);
  const [chart3d, setChart3d] = useState<boolean>(false);
  const [isChart, setIsChart] = useState<boolean>(false);
  const [getChartData, setgetChartData] = useState<any>({});

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleFilterAndCharts = useCallback(
    (
      options: Record<string, any>,
      filters: string[],
      columns: string[],
      pages: string,
      category: string,
      prefixnew: string,
      is3d: boolean
    ) => {
      if (
        !options ||
        !filters ||
        !columns ||
        !pages ||
        !category ||
        !prefixnew
      ) {
        console.error("invalid");
        return;
      }
      setOptions(options);
      const formattedFilters = filters.map((label) => ({
        label,
        value: label,
      }));
      setIsChart(true);
      setFilters(formattedFilters);
      setColumnsFilters(columns);
      setTableName(pages);
      setWhereClause(category);
      setPrefix(prefixnew);
      setChart3d(is3d);
    },
    []
  );

  const fetchData = async () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/charts/getCharts",
        query: {
          chartKey: chartKey,
          pagename,
        },
      });
      const response = await axios.get(url);
      if (response.data.length > 0) {
        console.log(response.data);
        const chartOption = response.data[0].chartjson;
        const existChartFilters =
          response.data[0].chartjson.xAxis.categories.map((label: string) => ({
            label,
            value: label,
          }));
        setColumnsFilters(JSON.parse(response.data[0].columnname));
        setTableName(response.data[0].pagename);
        setWhereClause(response.data[0].groupby);
        setPrefix(response.data[0].prefix.toLowerCase());
        setFilters(existChartFilters);
        setOptions(chartOption);
        setIsChart(true);
        setgetChartData(response.data);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [chartKey, pagename]);

  useEffect(() => {
    if (selectedFilter !== undefined && selectedFilter.length === 0) {
      fetchData();
    }
  }, [selectedFilter]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
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
        let newChartType = options.chart.type;
        if (chart3d) {
          newChartType = "3d-" + newChartType;
        }
        const filteredChartData = CreateChart(
          response.data,
          {
            chartTitle: options.title.text,
            chartType: newChartType,
            xAxisLabel: options.xAxis.title.text,
            yAxisLabel: options.yAxis.title.text,
            xValueKey: JSON.stringify(selectedFilter),
            yValueKeys: columnsFilters,
            prefix: prefix,
            colors: options.colors,
          },
          true
        );
        setOptions(filteredChartData.options);
      } catch (error) {
        console.error("Error fetching columns for page:", error);
      }
    };
    if (selectedFilter !== undefined && selectedFilter.length > 0) {
      fetchFilteredData();
    }
  }, [selectedFilter, columnsFilters, tableName, whereClause, prefix, chart3d]);

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlpha(parseInt(e.target.value));
  };

  const handleBetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeta(parseInt(e.target.value));
  };

  const handleDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepth(parseInt(e.target.value));
  };

  useEffect(() => {
    if (options.chart && options.chart.options3d) {
      const updatedOptions = {
        ...options,
        chart: {
          ...options.chart,
          options3d: {
            ...options.chart.options3d,
            alpha: alpha,
            beta: beta,
            depth: depth,
          },
        },
      };
      setOptions(updatedOptions);
    }
  }, [alpha, beta, depth]);

  return (
    <>
      <Card className="bg-white rounded-[30px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant={"ghost"} onClick={toggleDrawer}>
            {isChart ? <Edit /> : <Plus />}
          </Button>
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

        {chart3d && (
          <CardFooter>
            <table>
              <tr>
                <td>
                  <label htmlFor="alpha">Alpha Angle</label>
                </td>
                <td>
                  <input
                    id="alpha"
                    type="range"
                    min="0"
                    max="45"
                    value={alpha}
                    onChange={handleAlphaChange}
                  />{" "}
                  <span className="value">{alpha}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="beta">Beta Angle</label>
                </td>
                <td>
                  <input
                    id="beta"
                    type="range"
                    min="-45"
                    max="45"
                    value={beta}
                    onChange={handleBetaChange}
                  />{" "}
                  <span className="value">{beta}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="depth">Depth</label>
                </td>
                <td>
                  <input
                    id="depth"
                    type="range"
                    min="20"
                    max="100"
                    value={depth}
                    onChange={handleDepthChange}
                  />{" "}
                  <span className="value">{depth}</span>
                </td>
              </tr>
            </table>
          </CardFooter>
        )}
      </Card>
      <DrawerCreateChart
        open={isDrawerOpen}
        handleFilterAndCharts={handleFilterAndCharts}
        toggleDrawer={toggleDrawer}
        chartKey={chartKey}
        existingChartData={getChartData[0]}
      />
    </>
  );
};

export default ChartCard;
