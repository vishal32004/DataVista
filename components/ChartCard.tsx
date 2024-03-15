"use client";
import React, { useState } from "react";
import axios from "axios";
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
      />
    </>
  );
};

export default ChartCard;
