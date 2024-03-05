"use client";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { lineChartJson } from "@/helpers/lineChart";
import { useEffect, useState } from "react";
import axios from "axios";

const LineChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getData");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsMounted(true);
      }
    };

    fetchData();
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  const options = lineChartJson(data);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
