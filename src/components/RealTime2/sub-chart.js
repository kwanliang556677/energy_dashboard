import React, { useContext, useEffect } from "react";
import { CounterContext } from "./chart-context-provider";
import Chart from "./chart";

class HelloWorld extends React.Component {
  render() {
      return <h1><Chart /></h1>
  }
}

export default HelloWorld