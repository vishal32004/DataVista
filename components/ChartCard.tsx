"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateChart } from "@/helpers/createChart";
import HighchartsUtility from "@/components/utility/highCharts";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
interface Page {
  id: number;
  pagename: string;
}

const formSchema = z.object({
  chartTitle: z.string().min(2).max(50),
  chartType: z.string(),
});

const ChartCard: React.FC<{ chartKey: string }> = ({ chartKey }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [selectedPage, setSelectedPage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePageChange = useCallback((value: string) => {
    setSelectedPage(value);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.get("/api/getData");
      const options = CreateChart(res.data, {
        chartTitle: values.chartTitle,
        chartType: values.chartType,
        xAxisLabel: "X-Axis",
        yAxisLabel: "Y-Axis",
        xValueKey: "year",
        yValueKeys: ["total_covid", "total_lung_cancer"],
      });
      setOptions(options);
      setIsDrawerOpen(!isDrawerOpen);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

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

      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create A Chart</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-6"
            >
              <FormField
                control={form.control}
                name="chartTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                      Chart Title
                    </FormLabel>
                    <Input
                      className="dark:bg-[#1e1f22] bg-[#e6e6e9] dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter Chart Title"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <Button className="w-full">Submit</Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose
              onClick={toggleDrawer}
              className="w-full bg-red-500 text-white p-2 rounded-sm"
            >
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChartCard;
