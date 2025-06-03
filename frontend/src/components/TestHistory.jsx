import React, { useState } from "react";
import { useGetTestHistoryQuery } from "../slices/api/historyApi";
import LoadingScreen from "./ui/LoadingScreen";
// import { Card, CardContent } from "./ui/card";
import { HoverEffect } from "./ui/card-hover-effect";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";

const TestHistory = () => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const { data, isSuccess, isLoading } = useGetTestHistoryQuery();
  function extractDateTime(isoString) {
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return { date: formattedDate, time: formattedTime };
  }
  console.log(data);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="h-full flex flex-col pt-26 p-8">
      <h1 className="text-xl mb-2 font-bold pl-2">Test History</h1>
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4")}>
        {data.map((item, idx) => (
          <a
            href={item?.link}
            key={item?.link}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card
              className={`cursor-pointer text-center text-lg ${
                item.request.method === "POST"
                  ? "bg-amber-600"
                  : item.request.method === "GET"
                  ? "bg-green-600"
                  : "bg-gray-900"
              }`}
            >
              <CardTitle className={``}>{item.request.name}</CardTitle>
              <CardDescription className={`text-white font-medium text-lg`}>
                {item.request.method}
              </CardDescription>
              <CardDescription className={`text-white truncate`}>
                {item.request.url}
              </CardDescription>
              <div className="bg-gray-200/70 flex cursor-default justify-center rounded-2xl items-center gap-4 p-2">
                <button className="text-red-600 font-medium p-2 hover:bg-gray-50/30 rounded-xl cursor-pointer shadow-4xl shadow-gray-900 outline-red-600">
                  Delete
                </button>
                <button className="bg-gray-900 hover:bg-gray-800 text-white p-2 px-3 rounded-xl cursor-pointer shadow-4xl shadow-gray-900">
                  Details
                </button>
              </div>
              <CardDescription className={`text-white font-medium`}>
                {extractDateTime(item.createdAt).date}{" "}
                {extractDateTime(item.createdAt).time}
              </CardDescription>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-2", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export default TestHistory;
