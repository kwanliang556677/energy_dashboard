import React from "react";


import { CounterContextProvider } from "./chart-context-provider";
import CounterDisplay from "./chart";
import CounterButtons from "./sub-chart";

export default function CounterView() {
  return (
    <CounterContextProvider>
      <h3>Historical Chart</h3>
     
        <CounterDisplay />
        <CounterButtons />
     
    </CounterContextProvider>
  );
}