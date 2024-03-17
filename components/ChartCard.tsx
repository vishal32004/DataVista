"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import HighchartsUtility from "@/components/utility/highCharts";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DrawerCreateChart } from "./Drawer";
const ChartCard: React.FC<{ chartKey: string }> = ({ chartKey }) => {
  const [options, setOptions] = useState<Record<string, any>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant={"ghost"} onClick={toggleDrawer}>
            <Plus />
          </Button>
        </CardHeader>
        <CardContent>
          {options ? (
            <HighchartsUtility options={options} />
          ) : (
            <p>Create A chart</p>
          )}
        </CardContent>
      </Card>
      <DrawerCreateChart
        open={isDrawerOpen}
        setOptions={setOptions}
        toggleDrawer={toggleDrawer}
        chartKey={chartKey}
      />
    </>
  );
};

export default ChartCard;
