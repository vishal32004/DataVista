"use client";
import qs from "query-string";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import HighchartsUtility from "./utility/highCharts";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateChart } from "@/helpers/createChart";
import { MultiSelect } from "react-multi-select-component";
interface Page {
  id: number;
  pagename: string;
}
const formSchema = z.object({
  chartTitle: z.string().min(2).max(50),
  chartType: z.string(),
  chartPage: z.string(),
  columns: z.array(z.string()),
});
const ChartCard = ({ chartKey }: { chartKey: string }) => {
  const column = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear", disabled: true },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<{}>();
  const [pageNames, setPageNames] = useState<Page[]>([]);
  const [selected, setSelected] = useState([]);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [columns, setColumns] = useState<any[]>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/api/charts/${chartKey}`);
  //       if (response.data) {
  //         const parsedData = response.data;
  //         setOptions(parsedData.options);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching chart data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [chartKey]);

  useEffect(() => {
    const fetchPageNames = async () => {
      try {
        const response = await axios.get("/api/page");
        if (response.data) {
          setPageNames(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching page names:", error);
      }
    };

    fetchPageNames();
  }, []);

  useEffect(() => {
    const fetchColumnsForPage = async () => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/columns",
          query: {
            selectedPage: selectedPage,
          },
        });
      const response = await axios.get(url);
       
          console.log(response.data) 
            setColumns(response.data);
         
        
      } catch (error) {
        console.error("Error fetching columns for page:", error);
      }
    };

    fetchColumnsForPage();
  }, [selectedPage]);
  const handlePageChange: (value: string) => void = (value) => {
    setSelectedPage(value);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const res = await axios.get("/api/getData");
      const options = CreateChart(res.data, {
        chartTitle: values.chartTitle,
        chartType: values.chartType,
        chartPage: values.chartPage,
        xAxisLabel: "X-Axis",
        yAxisLabel: "Y-Axis",
        xValueKey: "year",
        yValueKeys: ["total_covid", "total_lung_cancer"],
      });
      setOptions(options);
      setIsDrawerOpen((el) => !el);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="chartTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Chart Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:bg-[#1e1f22] bg-[#e6e6e9] dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter Chart Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 dark:bg-[#1e1f22] dark:text-white border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue placeholder="Select a Chart type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-[#1e1f22]">
                          <SelectItem value={"bar"} className="capitalize">
                            Bar
                          </SelectItem>
                          <SelectItem value={"line"} className="capitalize">
                            Line
                          </SelectItem>
                          <SelectItem value={"pie"} className="capitalize">
                            Pie
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chartPage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chart Page Name</FormLabel>
                      <Select
                        onValueChange={handlePageChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 dark:bg-[#1e1f22] dark:text-white border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue placeholder="Select a Chart Page" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-[#1e1f22]">
                          {pageNames.map((pageName) => (
                            <SelectItem
                              key={pageName.id}
                              value={pageName.pagename}
                              className="capitalize"
                            >
                              {pageName.pagename}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="columns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Frameworks</FormLabel>
                      <MultiSelect
                        options={column}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Select"}
                        isCreatable={true}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">Submit</Button>
              </div>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose>
              <Button
                variant="outline"
                onClick={toggleDrawer}
                className="w-full"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChartCard;
