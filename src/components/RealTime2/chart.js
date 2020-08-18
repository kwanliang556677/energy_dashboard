import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useContext } from "react";
import { EnergyContext } from "./chart-context-provider";

export default function Chart(param) {
  const {timeSeriesState, pieChartResultState, weeklyResultState}  = useContext(EnergyContext);

  const [timeSeriesContext, settimeSeriesContext] = timeSeriesState;
  const [pieChartContext, setpieChartContext] = pieChartResultState;
  const [weeklyContext, setweeklyContext] = weeklyResultState;

    const getChart = (param) =>{
      var newChart= JSON.parse(JSON.stringify(timeSeriesContext));
      if(param.dataType=="pieData"){
        newChart = JSON.parse(JSON.stringify(pieChartContext));
      }else if(param.dataType=="weeklyData" || param.dataType=="dollarData") {
       newChart = JSON.parse(JSON.stringify(weeklyContext));
      }
      newChart.chart.type=param.chartType;
      console.log('Aggregated' + newChart);
      return newChart;
    };

  return (
    <div style={{height: "100%"}} >
      <HighchartsReact immutable="true" Highcharts={Highcharts} containerProps={{ className: "highcharts" }} updateArgs={[false,false,false]} options={getChart(param.chartParam)} />
    </div>
  );
}