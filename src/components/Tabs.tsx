"use client";

import React from "react";
import { motion } from "motion/react";

interface Props {
  data: string[];
  selectedTabs: string;
  setSelectedTabs: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({ data, selectedTabs, setSelectedTabs }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:items-start sm:justify-start">
      {data.map((text, key) => {
        const isSelected = selectedTabs === text;

        return (
          <div
            key={text + key}
            className={`relative cursor-pointer rounded-md px-3 py-1 font-medium ${isSelected ? "text-white" : "text-gray-600"}`}
            onClick={() => setSelectedTabs(text)}
          >
            <span className="relative z-10" unselectable="off">
              {text}
            </span>

            {isSelected && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-md bg-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
