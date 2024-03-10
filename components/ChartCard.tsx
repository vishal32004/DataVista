"use client";
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
import { useState } from "react";
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
import { lineChartJson } from "@/helpers/lineChart";
import { ChartDataStructure } from "@/types";
interface ChartData {
  title: string;
  options: {};
}
const formSchema = z.object({
  chartTitle: z.string().min(2).max(50),
  chartType: z.string(),
  chartPage: z.string(),
});
const ChartCard = ({ data }: { data?: ChartData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [options, setOptions] = useState();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const res = await axios.get("/api/getData");

      switch (values.chartType) {
        case "line":
          const options = lineChartJson(res.data);
          //@ts-ignore
          setOptions(options);
          setIsDrawerOpen((el) => !el);
        default:
          break;
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle></CardTitle>
          <Button variant={"ghost"} onClick={toggleDrawer}>
            <Plus />
          </Button>
        </CardHeader>
        <CardContent>
          {options && <HighchartsUtility options={options} />}
          {/* {!options && <p>Create A chart</p>} */}
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
                          // disabled={isLoading}
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 dark:bg-[#1e1f22] dark:text-white border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue placeholder="Select a Chart Page" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-[#1e1f22]">
                          <SelectItem value={"Disease"} className="capitalize">
                            Disease
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Submit</Button>
              </div>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" onClick={toggleDrawer}>
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
