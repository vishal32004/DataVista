"use client";
import Grid from "@/components/grids/Grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import qs from "query-string";
import axios from "axios";
import Grid2 from "@/components/grids/Grid2";
import Grid3 from "@/components/grids/Grid3";
import Grid4 from "@/components/grids/Grid4";
import Grid5 from "@/components/grids/Grid5";
interface TabsTypes {
  pagename: string;
  grid: string;
}
const Home = () => {
  const [tabsButton, setTabsButton] = useState<TabsTypes[]>([]);
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/page/getPage",
        });
        const response = await axios.get(url);
        if (response.data.length > 0) {
          const tabs = response.data;
          console.log(tabs, "test here");
          setTabsButton(tabs);
        }
      } catch (error) {
        console.error("Error fetching Tabs:", error);
      }
    };
    fetchPages();
  }, []);

  return (
    <Tabs defaultValue={tabsButton.length > 0 ? tabsButton[0].pagename : ""}>
      <TabsList className="flex justify-center">
        {tabsButton.map((tab, index) => (
          <TabsTrigger key={index} value={tab.pagename}>
            {formatTabName(tab.pagename)}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsButton.map((tab, index) => (
        <TabsContent key={index} value={tab.pagename}>
          {renderGrid(tab.grid, tab.pagename)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

const renderGrid = (grid: string, pagename: string) => {
  switch (grid) {
    case "1":
      return <Grid pagename={pagename} />;
    case "2":
      return <Grid2 pagename={pagename} />;
    case "3":
      return <Grid3 pagename={pagename} />;
    case "4":
      return <Grid4 pagename={pagename} />;
    case "5":
      return <Grid5 pagename={pagename} />;
    default:
      return null;
  }
};

const formatTabName = (pagename: string) => {
  let formattedName = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  formattedName = formattedName.replace(/_/g, " ");
  return formattedName;
};

export default Home;
