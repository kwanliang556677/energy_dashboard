import React, { useState, createContext } from "react";

// Create Context Object
export const CounterContext = createContext();

const options ={
  chart: {
    type: 'spline',
    zoomType: 'x'
},
  "title": {
    "text": "Energy Consumption Historical Chart"
  },
  "yAxis": {
    "labels": {
      "format": "{value} KWH"
    }
  },
  "xAxis": {
    "events": {
      "afterSetExtremes": (e) => afterSetExtremes(e)
    },
    "type": "datetime",
    "dateTimeLabelFormats": {
      "day": "%e of %b"
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

const afterSetExtremes = (e) =>{
  console.log(e.min);
  console.log(e.max);
}

// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
  const [selectedOption, setSelectedOption] = useState([ 
    { value: 'PM-1', label: 'PM-1' }, 
    { value: 'PM-2', label: 'PM-2' }, 
    { value: 'PM-3', label: 'PM-3' }
  ]);
  const [dataResults, setDataResults] = useState(options);
  const [counter, setCounter] = useState(0);
  const [deviceList, setDeviceList] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2020-07-15T21:11:54'));
  const [endDate, setEndDate] = useState(new Date('2020-07-18T21:11:54'));

  return (
    <CounterContext.Provider value={
      { 
        counter: [counter, setCounter], 
        selectedOption: [selectedOption, setSelectedOption], 
        dataResults: [dataResults, setDataResults], 
        deviceList: [deviceList, setDeviceList],
        startDate: [startDate, setStartDate],
        endDate: [endDate, setEndDate]
      }}>
      {props.children}
    </CounterContext.Provider>
  );
};