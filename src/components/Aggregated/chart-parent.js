import React from "react";
import { EnergyContextProvider } from "./chart-context-provider";
import { FilterContextProvider } from "./filter-provider";
import ChartLayout from "./ExampleLayout";
import FilterPanel from "./filter-panel";
import Nav from './Nav'

import Test from './Test';

export default function CounterView() {
  return (
    <div>
    <Nav />

   
    </div>
  );
}