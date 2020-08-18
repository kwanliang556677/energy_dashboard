import React, { createContext, useState } from "react";

// Create Context Object
export const FilterContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const FilterContextProvider = props => {
  //Init selected filter state
  const [deviceState, setDeviceState] = useState([ 
  ]);
  const [reportState, setReportState] = useState( 
    { value: 'Custom', label: 'Custom' }
  );
  const [floorLevelState, setFloorLevelState] = useState([
  ]);
  const [startDate, setStartDate] = useState(new Date('2020-08-01T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2020-08-15T23:59:00'));

  //Init Possible filter State
  const [deviceList, setDeviceResult] = useState([]);
  const [reportList, setReportList] = useState([
    { value: 'Custom', label: 'Custom' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' }
  ]);

  const [levelList, setLevelList] = useState([
    { value: '1', label: 'Level1' },
    { value: '2', label: 'Level2' },
    { value: '3', label: 'Level3' },
    { value: '4', label: 'Level4' }
  ]);

  return (
    <FilterContext.Provider value={
      {
        //Selected Filter State
        deviceState: [deviceState, setDeviceState], 
        reportState: [reportState, setReportState],
        floorLevelState: [floorLevelState, setFloorLevelState],
        startDate: [startDate, setStartDate],
        endDate: [endDate, setEndDate],
       
        //Possible Filter State
        deviceList: [deviceList, setDeviceResult],
        reportList: [reportList, setReportList],
        levelList: [levelList, setLevelList]
      }}>
      {props.children}
    </FilterContext.Provider>
  );
};
