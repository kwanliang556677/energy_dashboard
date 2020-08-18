import React, { useState, createContext } from "react";
import treeImage from './images/tree.png';
import gasImage from './images/gas.png';
import oilImage from './images/oil.png';
import carImage from './images/car.jpg';

// Create Context Object
export const EnergyContext = createContext();

const optionTimeSeries ={
  chart: {
    type: 'line',
    zoomType: 'x'
  },
  
  "title": {
    "text": "Energy Consumption Live Chart"
  },
  yAxis: {
    labels: {
        format: '{value:,.0f} KWH'
    }
},
  xAxis: {
    events: {
      afterSetExtremes:''
  },
    type: 'datetime',
    dateTimeLabelFormats: {
        day: '%e-%b'
    }
},
  plotOptions: {
  	series: {
    	pointWidth: 1,
      grouping: false,
      animation: false
    }
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
},
  "series": [
  ]
};

const optionTimeSeriesWeekly ={
  "chart": {
    "type": "column"
  },
  "title": {
    "text": "Energy Consumption Weekly Comparison"
  },
  "yAxis": {
    "labels": {
      "format": "{value} KWH"
    }
  },
  "xAxis": {
    "type": "datetime",
    "dateTimeLabelFormats": {
      "day": "%e of %b"
    }
  },
  plotOptions: {
  	series: {
    	pointWidth: 1,
      grouping: true,
      animation: false
    }
  },
  "series": [
   
  ]
};

const optionTimeSeriesPieChart={
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Monthly Consumption'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          animation: false
      }
  },
  series: []
};

const greenhouseConst = [
  {
    img: treeImage,
    title: 'Metrics Tons of CO2',
    author: '',
  },
  {
    img: gasImage,
    title: 'Litres of Petrol Consumed',
    author: '',
  },
  {
    img: oilImage,
    title: 'Barrels of Oil Consumed',
    author: '',
  },
  {
    img: carImage,
    title: 'KM driven by a Passenger Car',
    author: '',
  },
];

// Create a provider for components to consume and subscribe to changes
export const EnergyContextProvider = props => {
  //Init Chart State
  const [timeSeriesState, setTimeSeriesState] = useState(optionTimeSeries);
  const [pieChartResultState, setPieChartState] = useState(optionTimeSeriesPieChart);
  const [weeklyResultState, setWeeklyState] = useState(optionTimeSeriesWeekly);
  const [greenHouseState, setGreenHouseState] = useState(greenhouseConst);

  return (
    <EnergyContext.Provider value={
      {
        //Chart State
        timeSeriesState: [timeSeriesState, setTimeSeriesState], 
        pieChartResultState: [pieChartResultState, setPieChartState], 
        weeklyResultState: [weeklyResultState, setWeeklyState], 
        greenHouseState: [greenHouseState, setGreenHouseState], 
      }}>
      {props.children}
    </EnergyContext.Provider>
  );
};
