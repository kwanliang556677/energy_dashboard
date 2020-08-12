import React, { useState, createContext } from "react";
import treeImage from './tree.png';
import gasImage from './gas.png';
import oilImage from './oil.png';
import carImage from './car.jpg';

// Create Context Object
export const CounterContext = createContext();


const optionsDollar ={
  chart: {
    type: 'line',
    zoomType: 'x'
  },
  "title": {
    "text": "Electricity Bill Estimate Live Chart"
  },
  "yAxis": {
    "labels": {
      "format": "$ {value}"
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
      grouping: false,
      animation: false
    }
  },
  "series": [
    {
      "name": "PM-1",
      "data": [
        [
          1579222800000,
          20.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    },
    {
      "name": "PM-2",
      "data": [
        [
          1579222800000,
          21.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    },
    {
      "name": "PM-3",
      "data": [
        [
          1579223520000,
          10.563757257039263
        ],
        [
          1579302480000,
          51.584701511309106
        ]
      ]
    }
  ]
};

const options ={
  chart: {
    type: 'line',
    zoomType: 'x'
  },
  
  "title": {
    "text": "Energy Consumption Live Chart"
  },
  "yAxis": {
    "labels": {
      "format": "{value} KWH"
    }
  },
  xAxis: {
    events: {
      afterSetExtremes: (e)=>afterSetExtremes(e)
  },
    type: 'datetime',
    dateTimeLabelFormats: {
        day: '%e of %b'
    }
},
  plotOptions: {
  	series: {
    	pointWidth: 1,
      grouping: false,
      animation: false
    }
  },
  "series": [
    {
      "name": "PM-1",
      "data": [
        [
          1579222800000,
          20.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    },
    {
      "name": "PM-2",
      "data": [
        [
          1579222800000,
          21.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    },
    {
      "name": "PM-3",
      "data": [
        [
          1579223520000,
          10.563757257039263
        ],
        [
          1579302480000,
          51.584701511309106
        ]
      ]
    }
  ]
};

function afterSetExtremes(e) {
  console.log('d')
  // console.log(e.min);
  // console.log(e.max);
}


const optionsWeekly ={
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
    {
      "name": "Last Week",
      "data": [
        [
          1579222800000,
          20.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    },
    {
      "name": "This Week",
      "data": [
        [
          1579222800000,
          21.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    }
  ]
};



const options2={
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Weekly Consumption'
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
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
          name: 'Level1',
          y: 61.41,
          sliced: true,
          selected: true
      }, {
          name: 'Level2',
          y: 11.84
      }, {
          name: 'Level3',
          y: 10.85
      }, {
          name: 'Level4',
          y: 4.67
      }, {
          name: 'Level5',
          y: 4.18
      }, {
          name: 'Level6',
          y: 1.64
      }, {
          name: 'Level7',
          y: 1.6
      }, {
          name: 'Level8',
          y: 1.2
      }, {
          name: 'Level9',
          y: 2.61
      }]
  }]
};

const tileData = [
  {
    img: treeImage,
    title: 'Metrics Tons of CO2',
    author: '134.5m Tons',
  },
  {
    img: gasImage,
    title: 'Litres of Petrol Consumed',
    author: '57,291.56 L',
  },
  {
    img: oilImage,
    title: 'Barrels of Oil Consumed',
    author: '312.8 Barrels',
  },
  {
    img: carImage,
    title: 'KM driven by a Passenger Car',
    author: '519,092 KM',
  },
];


// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
  const [selectedOption, setSelectedOption] = useState([ 
    { value: 'PM-1', label: 'PM-1' }
  ]);
  const [selectedOption2, setSelectedOption2] = useState([ 
    { value: 'Daily', label: 'Daily' }
  ]);
  const [selectedOption3, setSelectedOption3] = useState([ 
    { value: 'Level1', label: 'Level1' }
  ]);
  const [dataResults, setDataResults] = useState(options);
  const [dataResults2, setDataResults2] = useState(options2);
  const [dataResults3, setDataResults3] = useState(optionsWeekly);
  const [dataResults4, setDataResults4] = useState(tileData);

  const [counter, setCounter] = useState(0);
  const [deviceList, setDeviceList] = useState([]);
  const [reportList, setReportList] = useState([
    { value: 'Custom', label: 'Custom' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' }
  ]);
  const [levelList, setLevelList] = useState([
    { value: 'Level1', label: 'Level1' },
    { value: 'Level2', label: 'Level2' },
    { value: 'Level3', label: 'Level3' },
    { value: 'Level4', label: 'Level4' }
  ]);
  const [startDate, setStartDate] = useState(new Date('2020-09-21T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2020-09-24T23:59:00'));

  return (
    <CounterContext.Provider  value={
      { 
        counter: [counter, setCounter], 
        selectedOption: [selectedOption, setSelectedOption], 
        selectedOption2: [selectedOption2, setSelectedOption2],
        selectedOption3: [selectedOption3, setSelectedOption3],
        dataResults: [dataResults, setDataResults], 
        dataResults2: [dataResults2, setDataResults2], 
        dataResults3: [dataResults3, setDataResults3], 
        dataResults4: [dataResults4, setDataResults4], 
        deviceList: [deviceList, setDeviceList],
        reportList: [reportList, setReportList],
        levelList: [levelList, setLevelList],
        startDate: [startDate, setStartDate],
        endDate: [endDate, setEndDate]
      }}>
      {props.children}
    </CounterContext.Provider>
  );
};
