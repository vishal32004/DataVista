"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import qs from "query-string";
import { Drawer, Button, MultiSelect } from "@mantine/core";
import { CreateChart } from "@/helpers/createChart";
import { Select } from "@mantine/core";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { chartData, formSchema, DrawerCreateChartProps, Page } from "@/types";
import { colorOptions, colorsArray } from "@/helpers/colors";

export const DrawerCreateChart: React.FC<DrawerCreateChartProps> = ({
  open,
  handleFilterAndCharts,
  toggleDrawer,
  chartKey,
  existingChartData = null,
}) => {
  const [selectedPage, setSelectedPage] = useState<string | null>("");
  const [pages, setPages] = useState<Page[]>([]);
  const [colummn, setColummn] = useState<[{ value: string; label: string }]>([
    { value: "", label: "" },
  ]);
  const [prefixGroup, setPrefixGroup] = useState([]);

  const fetchPageNames = useCallback(async () => {
    try {
      const response = await axios.get("/api/page");
      if (response.data) {
        return response.data.map(
          (el: { pageid: number; pagename: string }) => ({
            value: el.pagename.toLowerCase(),
            label: el.pagename.charAt(0).toUpperCase() + el.pagename.slice(1),
          })
        );
      }
    } catch (error) {
      console.error("Error fetching page names:", error);
      return [];
    }
  }, []);

  const fetchColumnsForPage = useCallback(async () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/columns",
        query: {
          selectedPage: selectedPage,
        },
      });
      const response = await axios.get(url);
      const formattedColumns = response.data.map(
        (column: { columnname: string }) => ({
          label:
            column.columnname.charAt(0).toUpperCase() +
            column.columnname.slice(1),
          value: column.columnname
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/\//g, "_"),
        })
      );
      const filteredColumns = formattedColumns.filter(
        (column: { value: string }) => !["year", "month"].includes(column.value)
      );
      setColummn(filteredColumns);
    } catch (error) {
      console.error("Error fetching columns for page:", error);
    }
  }, [selectedPage]);

  const fetchPrefix = useCallback(async () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/getPrefix",
        query: {
          selectedPage: selectedPage,
        },
      });
      const response = await axios.get(url);

      const formattedPrefix = response.data.map(
        (prefix: { prefix: string }) => ({
          label: prefix.prefix.charAt(0).toUpperCase() + prefix.prefix.slice(1),
          value: prefix.prefix.toLowerCase(),
        })
      );
      setPrefixGroup(formattedPrefix);
    } catch (error) {
      console.error("Error fetching columns for page:", error);
    }
  }, [selectedPage]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      chartTitle: "",
      chartType: "bar",
      chartXAxis: "",
      chartYAxis: "",
      colors: "0",
    },
  });

  const pagesMemo = useMemo(() => {
    return fetchPageNames();
  }, [fetchPageNames]);

  useEffect(() => {
    pagesMemo.then((pages) => setPages(pages));
  }, [pagesMemo]);

  useEffect(() => {
    if (selectedPage) {
      fetchColumnsForPage()
        .then(() => {
          fetchPrefix();
        })
        .catch((error) => {
          console.error("Error fetching columns for page:", error);
        });
    }
  }, [selectedPage, fetchColumnsForPage, fetchPrefix]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.get("/api/data", {
        params: {
          prefix: values.prefix,
          tableName: values.pages,
          columns: JSON.stringify(values.columns),
          category: values.category,
        },
      });

      const chartData: chartData = CreateChart(
        res.data,
        {
          chartTitle: values.chartTitle,
          chartType: values.chartType,
          xAxisLabel: values.chartXAxis,
          yAxisLabel: values.chartYAxis,
          xValueKey: values.category,
          yValueKeys: values.columns,
          prefix: values.prefix.toLowerCase(),
          colors: colorsArray[Number(values.colors)],
        },
        false
      );
      handleFilterAndCharts(
        chartData.options,
        chartData.filters,
        values.columns,
        values.pages,
        values.category,
        values.prefix.toLowerCase(),
        chartData.is3D
      );
      toggleDrawer();
      // saveChart(
      //   chartData.options,
      //   selectedPage,
      //   values.columns,
      //   values.category,
      //   values.prefix,
      //   values.colors,
      //   values.chartType
      // );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const saveChart = async (
    newJson: Record<string, any>,
    selectedPage: string | null,
    columns: string[],
    prefix: string,
    category: string,
    colors: string,
    chartType: string
  ) => {
    const data = {
      json: JSON.stringify(newJson),
      chartKey,
      selectedPage,
      columns,
      prefix,
      groupBy: category,
      colors,
      chartType,
    };
    try {
      const res = await axios.post("/api/charts/saveChart", data);
    } catch (error) {
      console.log(error, "error saving the chart");
    }
  };

  useEffect(() => {
    console.log(existingChartData, "jsdhfsdfkd");
    if (existingChartData !== null) {
      const columns: string[] = JSON.parse(existingChartData.columnname);
      form.setValue("chartTitle", existingChartData.chartjson.title.text);
      form.setValue("chartType", existingChartData.charttype);
      form.setValue("chartXAxis", existingChartData.chartjson.xAxis.title.text);
      form.setValue("chartYAxis", existingChartData.chartjson.yAxis.title.text);
        form.setValue("pages", existingChartData.pagename);
        setSelectedPage(existingChartData.pagename)
      form.setValue("columns", columns);
      form.setValue("prefix", existingChartData.prefix);
      form.setValue("category", existingChartData.groupby);
      form.setValue("colors", existingChartData.colors);
    }
  }, [existingChartData, form]);

  return (
    <>
      <Drawer
        opened={open}
        onClose={toggleDrawer}
        title="Create A Chart"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
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
            <FormField
              control={form.control}
              name="chartType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Chart Type
                  </FormLabel>
                  <Select
                    data={[
                      { value: "bar", label: "Bar" },
                      { value: "line", label: "Line" },
                      { value: "pie", label: "Pie" },
                      { value: "column", label: "Column" },
                      { value: "area", label: "Area" },
                      { value: "donut", label: "Donut" },
                      { value: "half-donut", label: "Half Donut" },
                      { value: "stacked-bar", label: "Stacked Bar" },
                      { value: "stacked-column", label: "Stacked Column" },
                      { value: "stacked-area", label: "Stacked Area" },
                      { value: "3d-cylinder", label: "Cylinder" },
                      { value: "3d-column", label: "3D-Column" },
                      { value: "3d-donut", label: "3D-donut" },
                      { value: "3d-pie", label: "3D-pie" },
                      { value: "3d-area", label: "3D-Area" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Type"
                    searchable
                    styles={{
                      input: { backgroundColor: "#e6e6e9", color: "#000" },
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chartXAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    X-Axis Label
                  </FormLabel>
                  {form.watch("chartType") !== "pie" &&
                    form.watch("chartType") !== "donut" &&
                    form.watch("chartType") !== "half-donut" && (
                      <Input
                        className="dark:bg-[#1e1f22] bg-[#e6e6e9] dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter X-Axis Label"
                        {...field}
                      />
                    )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chartYAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Y-Axis Label
                  </FormLabel>
                  {form.watch("chartType") !== "pie" &&
                    form.watch("chartType") !== "donut" &&
                    form.watch("chartType") !== "half-donut" && (
                      <Input
                        className="dark:bg-[#1e1f22] bg-[#e6e6e9] dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Y-Axis Label"
                        {...field}
                      />
                    )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Page Name
                  </FormLabel>
                  <Select
                    data={pages}
                    value={field.value || ""}
                    onChange={(value, option) => {
                      field.onChange(value);
                      setSelectedPage(value);
                    }}
                    placeholder="Select A Page Name"
                    searchable
                    styles={{ input: { backgroundColor: "#e6e6e9" } }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="columns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Column Name
                  </FormLabel>
                  <MultiSelect
                    data={colummn}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Page Name"
                    searchable
                    styles={{ input: { backgroundColor: "#e6e6e9" } }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Prefix
                  </FormLabel>
                  <Select
                    data={[
                      { value: "SUM", label: "Total" },
                      { value: "AVG", label: "Average" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Type"
                    searchable
                    styles={{ input: { backgroundColor: "#e6e6e9" } }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Group By
                  </FormLabel>
                  <Select
                    data={prefixGroup}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Type"
                    searchable
                    styles={{ input: { backgroundColor: "#e6e6e9" } }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Select Colors
                  </FormLabel>
                  <Select
                    data={colorOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Color"
                    searchable
                    styles={{ input: { backgroundColor: "#e6e6e9" } }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <p className="text-sm font-bold text-zinc-500 dark:text-white mb-2">
                Color Preview:
              </p>
              <div className="flex">
                {form.watch("colors") !== undefined &&
                  colorsArray[parseInt(form.watch("colors"))].map(
                    (color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 mr-2 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                    )
                  )}
              </div>
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </Drawer>
    </>
  );
};
