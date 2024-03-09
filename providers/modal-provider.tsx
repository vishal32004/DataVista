"use client";
import { CreateChart } from "@/components/modals/CreateChart";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateChart />
    </>
  );
};
