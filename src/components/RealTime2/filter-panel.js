import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import Select from 'react-select';
import { EnergyContext } from "./chart-context-provider";
import DateFilter from './DateFilter';
import { FilterContext } from './filter-provider';

const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  exportBtn : {
    color : 'white',
    textDecorationLine:'none',
  }
}));


export default function FilterPanel() {
  const {timeSeriesState, pieChartResultState, weeklyResultState, greenHouseState}  = useContext(EnergyContext);
  const {deviceState, floorLevelState, deviceList, levelList} = useContext(FilterContext);

  const [deviceContext, setdeviceContext] = deviceState;
  const [floorLevelContext, setfloorLevelContext] = floorLevelState;

  const [timeSeriesContext, settimeSeriesContext] = timeSeriesState;
  const [pieChartContext, setpieChartContext] = pieChartResultState;
  const [weeklyContext, setweeklyContext] = weeklyResultState;
  const [greenHouseContext, setgreenHouseContext] = greenHouseState;

  const [deviceListContext, setDeviceList] = useState(deviceList);
  const [levelListContext, setLevelList] = useState(levelList);

  const [allowUpdate, setAllowUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const deviceRef = useRef(deviceContext);
  const floorLevelRef = useRef(floorLevelContext);
  deviceRef.current = deviceContext;
  floorLevelRef.current = floorLevelContext;

  useEffect(() => {
    populateDeviceList();
    updateChart(deviceRef.current, floorLevelRef.current);
    const myInterval = setInterval(() => { 
      console.log(deviceRef.current);
        updateChart(deviceRef.current, floorLevelRef.current);
      }, 100000);     
      return () => {
        console.log("Unmount");
        clearInterval(myInterval);
      };
  },[]);

    const parseData = (data, chartOption) => {
      console.log('test3', data);
       var fetchOptions = JSON.parse(JSON.stringify(chartOption));
       fetchOptions.series=data;
      return fetchOptions;
    }

  const toggleLoadingIcon = (param) =>{
    setOpen(param);
  }

  const updateChart = (device, floorLevel) => {
    console.log('updating chart!!')
    setAllowUpdate(false);
    toggleLoadingIcon(true);
    var deviceIdListJson = {};
    var deviceArr = [];
    var floorLevelArr = [];
 
    if(device!=null && device.length>0){
      device.forEach((item)=>{
        deviceArr.push(item.value);
      });
      deviceIdListJson.deviceId=deviceArr;
    }
    if(floorLevel!=null && floorLevel.length>0){
      floorLevel.forEach((item)=>{
        floorLevelArr.push(item.value);
      });
      deviceIdListJson.floorLevel=floorLevelArr;
    }
     deviceIdListJson.limit=500;

    const requestOptions = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(deviceIdListJson)
    };

    var energyUrl = 'https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_energy_trend';
    
    fetch(energyUrl, requestOptions)
      .then(res => res.json())
      .then(data => parseData(data, timeSeriesContext))
      .then(data2 =>{ 
        console.log('test2:', data2);
        settimeSeriesContext(data2);
        setAllowUpdate(true);
        toggleLoadingIcon(false);
      })
      .catch(function(e) {
        console.log(e);
      }); 

      fetch('https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_floor_level_energy', requestOptions)
      .then(res => res.json())
      .then(data => parseData(data, pieChartContext))
      .then(data2 =>{ 
        console.log('test:', data2);
        setpieChartContext(data2);
        setAllowUpdate(true);
      })
      .catch(function(e) {
        console.log(e);
      }); 

      fetch('https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_realtime_green_house_equivalences', requestOptions)
      .then(res => res.json())
      .then(data2 =>{ 
        greenHouseContext[0]['author'] = data2['co2ValueInTon']+'m Tons';
        greenHouseContext[1]['author'] = data2['gasolineConsumedInLiter']+'L';
        greenHouseContext[2]['author'] = data2['foilConsumedInBarrel']+'Barrels';
        greenHouseContext[3]['author'] = data2['distanceVehicleDrivenInKm']+'KM';
        setgreenHouseContext(greenHouseContext);
        setAllowUpdate(true);
      })
      .catch(function(e) {
        console.log(e);
      }); 
    }

    const populateDeviceList = () =>{
      const requestOptions = {
        method: 'GET'
      };
      fetch('https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_all_device_names', requestOptions)
        .then(res => res.json())
        .then(data =>{
          setDeviceList(data);
         
          setLevelList(levelList[0]);
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }

    const handleChange = device => {
      setdeviceContext(device);
    };


    const handleFloorChange = device => {
      setfloorLevelContext(device);
    };



  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
       <Grid container spacing={1}>
          <Grid item xs={6}>
            Please select Floor Level:
            <Select value={floorLevelContext} onChange={handleFloorChange} isMulti options={levelListContext}/>
          </Grid>
          <Grid item xs={6}>
          Please select Device List:
            <Select value={deviceContext} onChange={handleChange} isMulti options={deviceListContext}/>
          </Grid>
          <Box display="flex" alignItems="flex-end" paddingBottom="4px">
            <Grid item xs={6} className="btn">
              <Button onClick={()=>updateChart(deviceContext, floorLevelContext)} variant="contained" color="primary">
                Search
              </Button>
            </Grid>
            <Grid style={{marginLeft : "10px"}} item xs={6} className="btn">
              <Button variant="contained" color="secondary">
               <CSVLink className={classes.exportBtn} data={csvData}>Export</CSVLink>
              </Button>
            </Grid>
          </Box>
        </Grid>
      <hr />
    </div>
  );
}