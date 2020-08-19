import React from "react";
import { EnergyContextProvider } from "./chart-context-provider";
import { FilterContextProvider } from "./filter-provider";
import ChartLayout from "./ExampleLayout";
import FilterPanel from "./filter-panel";
import Nav from '../../App'
export default function CounterView() {
  return (
    <Nav Child = {child}/>
  );
}

const child =() =>(
  <div>
  <EnergyContextProvider>
    <h3>Historical Chart</h3>
    <FilterContextProvider>
      <FilterPanel />
    </FilterContextProvider>
    <ChartLayout />
  </EnergyContextProvider>;
</div>
)