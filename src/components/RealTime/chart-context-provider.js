import React, { useState, createContext } from "react";

// Create Context Object
export const CounterContext = createContext();

const options ={
  "chart": {
    "type": "line"
  },
  "title": {
    "text": "Energy Consumption Live Chart"
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

  return (
    <CounterContext.Provider  value={
      { 
        counter: [counter, setCounter], 
        selectedOption: [selectedOption, setSelectedOption], 
        dataResults: [dataResults, setDataResults], 
        deviceList: [deviceList, setDeviceList]
      }}>
      {props.children}
    </CounterContext.Provider>
  );
};