import React, { useContext, useEffect } from "react";
import { CounterContext } from "./chart-context-provider";

export default function CounterButtons() {

  const {selectedOption, dataResults} = useContext(CounterContext);
  const [selectedOptionContext, setSelectedOptionContext] = selectedOption;
  const [dataResultsContext, setDataResultsContext] = dataResults;

  
  useEffect(() => {
    console.log(selectedOptionContext);
  });

  return (
    <div>

 

    </div>
  );
}