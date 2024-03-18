"use client";
import { Drawer, Button, MultiSelect } from "@mantine/core";
import { CreateChart } from "@/helpers/createChart";
import { ComboboxItem, Select } from "@mantine/core";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import qs from "query-string";
const formSchema = z.object({
  chartTitle: z.string().min(2).max(50),
  chartType: z.string(),
  chartXAxis: z.string(),
  chartYAxis: z.string(),
  pages: z.string(),
  columns: z.array(z.string()),
  prefix: z.string(),
});
interface DrawerCreateChartProps {
  open: boolean;
  setOptions: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  toggleDrawer: () => void;
  chartKey: string;
}
type Page = {
  value: string;
  label: string;
};
export const DrawerCreateChart: React.FC<DrawerCreateChartProps> = ({
  open,
  setOptions,
  toggleDrawer,
  chartKey,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>("");
  const [colummn, setColummn] = useState<
    [
      {
        value: string;
        label: string;
      }
    ]
  >([
    {
      value: "",
      label: "",
    },
  ]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "test here");
    try {
      const res = await axios.get("/api/getData", {
        params: {
          prefix: values.prefix,
          tableName: values.pages,
          columns: JSON.stringify(values.columns),
        },
      });

      console.log(res.data);
      const options = CreateChart(res.data, {
        chartTitle: values.chartTitle,
        chartType: values.chartType,
        xAxisLabel: values.chartXAxis,
        yAxisLabel: values.chartYAxis,
        xValueKey: "year",
        yValueKeys: values.columns,
        prefix: values.prefix.toLowerCase(),
      });
      // saveChart(options)
      console.log(options);
      setOptions(options);
      toggleDrawer();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    const fetchPageNames = async () => {
      try {
        const response = await axios.get("/api/page");
        if (response.data) {
          const pages = response.data.map(
            (el: { pageid: number; pagename: string }) => ({
              value: el.pagename.toLowerCase(),
              label: el.pagename.charAt(0).toUpperCase() + el.pagename.slice(1),
            })
          );
          setPages(pages);
        }
      } catch (error) {
        console.error("Error fetching page names:", error);
      }
    };

    fetchPageNames();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      const fetchColumnsForPage = async () => {
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
          console.log(formattedColumns);
          setColummn(formattedColumns);
        } catch (error) {
          console.error("Error fetching columns for page:", error);
        }
      };

      fetchColumnsForPage();
    }
  }, [selectedPage]);

  // const saveChart = async (newJson: Record<string, any>) => {
  //   const data = {
  //     json: JSON.stringify(newJson),
  //     chartKey,
  //   };
  //   try {
  //     const res = await axios.post("/api/charts/saveChart", data);
  //   } catch (error) {
  //     console.log(error, "error saving the chart");
  //   }
  // };
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
              name="chartXAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    X-Axis Label
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
              name="chartYAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Y-Axis Label
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
                  <FormLabel>Chart Type</FormLabel>
                  <Select
                    data={[
                      { value: "bar", label: "Bar" },
                      { value: "line", label: "Line" },
                      { value: "pie", label: "Pie" },
                      { value: "column", label: "Column" },
                      { value: "area", label: "Area" },
                      { value: "donut", label: "Donut" },
                      { value: "half-donut", label: "Semi Circle" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Type"
                    searchable
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Name</FormLabel>
                  <Select
                    data={pages}
                    value={field.value || ""}
                    onChange={(value, option) => {
                      field.onChange(value);
                      setSelectedPage(value);
                    }}
                    placeholder="Select A Page Name"
                    searchable
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
                  <FormLabel>Column Name</FormLabel>
                  <MultiSelect
                    data={colummn}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Page Name"
                    searchable
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
                  <FormLabel>Prefix</FormLabel>
                  <Select
                    data={[
                      { value: "SUM", label: "Total" },
                      { value: "AVG", label: "Average" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select A Type"
                    searchable
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </Drawer>
    </>
  );
};
