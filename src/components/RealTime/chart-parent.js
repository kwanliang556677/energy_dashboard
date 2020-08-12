import React from "react";


import { CounterContextProvider } from "./chart-context-provider";
import Chart from "./chart";
import CounterButtons from "./sub-chart";
import ExampleLayout from "./ExampleLayout";
import FilterPanel from "./filter-panel";

export default function CounterView() {
  return (
    <CounterContextProvider>
      <h3>Real Time Chart</h3>
      <FilterPanel />
      <ExampleLayout />
        {/* <CounterButtons /> */}
    </CounterContextProvider>
  );
}