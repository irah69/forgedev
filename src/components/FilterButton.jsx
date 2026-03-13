import React from "react";
import { Button } from "@/components/ui/button";

export default function FilterButton({ onClick }) {
  return (
    <div className="flex justify-end w-full">
      <Button
        onClick={onClick}
        className="font-bold text-white !bg-black border-none hover:!bg-neutral-900 shadow-lg rounded-full flex items-center gap-2 playfair-font mr-8"
      >
        {/*  <span className="filter-icon">⚲</span> */}
        Filters
      </Button>
    </div>
  );
}
