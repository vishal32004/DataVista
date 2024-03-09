"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";

const ChartCard = () => {
  const { onOpen } = useModal();
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Card Title</CardTitle>
        <Button variant={"ghost"} onClick={() => onOpen("createChart")}>
          <Plus />
        </Button>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default ChartCard;
