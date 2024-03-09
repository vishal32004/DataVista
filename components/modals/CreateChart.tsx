"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useModal } from "@/hooks/useModal";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Chart Name name is required.",
  }),
  ChartType: z.string(),
  table: z.string(),
  columns: z.string(),
});

export const CreateChart = () => {
  const { isOpen, onClose, type, data } = useModal();
  console.log(data);
  const isModalOpen = isOpen && type === "createChart";
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("test");
    //   try {
    //     const url = qs.stringifyUrl({
    //       url: "/api/channels",
    //       query: {
    //         serverId: params?.serverId,
    //       },
    //     });
    //     await axios.post(url, values);

    //     form.reset();
    //     router.refresh();
    //     onClose();
    //   } catch (error) {
    //     console.log(error);
    //   }
  };
  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#313338] dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Chart
          </DialogTitle>
        </DialogHeader>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                      Chart Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="dark:bg-[#1e1f22] bg-[#e6e6e9] dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ChartType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 dark:bg-[#1e1f22] dark:text-white border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-[#1e1f22]">
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 dark:bg-[#2b2d31] px-6 py-4">
              <Button variant="destructive" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
};
