"use client";
import { Plus } from "lucide-react";
import { HoverTooltip } from "../HoverTooltip";
// import { useModal } from "@/hooks/useModal";

export const Action = () => {
  //   const { onOpen } = useModal();

  return (
    <div>
      <HoverTooltip side="right" align="center" label="Add a Tab">
        <button
          //   onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-black">
            <Plus
              className="group-hover:text-white transition text-[#000]"
              size={25}
            />
          </div>
        </button>
      </HoverTooltip>
    </div>
  );
};
