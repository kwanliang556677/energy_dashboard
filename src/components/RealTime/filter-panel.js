import React, { useContext, useEffect, useState, useRef } from "react";
import { CounterContext } from "./chart-context-provider";
import Highcharts, { keys } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DateFilter from './DateFilter'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function FilterPanel() {
  const {counter, selectedOption, selectedOption2, selectedOption3, dataResults,dataResults2,dataResults3,dataResults4, deviceList,
    reportList, levelList, startDate, endDate}  = useContext(CounterContext);
  const [selectedOptionContext, setSelectedOptionContext] = selectedOption;
  const [selectedOption3Context, setSelectedOption3Context] = selectedOption3;
  const [dataResultsContext, setDataResultsContext] = dataResults;
  const [dataResultsContext2, setDataResultsContext2] = dataResults2;
  const [dataResultsContext3, setDataResultsContext3] = dataResults3;
  const [dataResultsContext4, setDataResultsContext4] = dataResults4;

  const [counterContext, setCounterContext] = counter;
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [deviceListContext, setDeviceList] = useState(deviceList);
  const [reportListContext, setReportList] = useState(reportList);
  const [levelListContext, setLevelList] = useState(levelList);
  const classes = useStyles();
  const deviceRef = useRef(selectedOptionContext);
  const levelRef = useRef(selectedOption3Context);
  const countRef = useRef(selectedOptionContext);
  const count2Ref = useRef(selectedOption3Context);
  countRef.current = selectedOptionContext;
  count2Ref.current = selectedOption3Context;

    useEffect(() => {
      console.log('useEffect-filter-panel');
      populateDeviceList();
      // const myInterval = setInterval(() => { 
      //   updateChart(deviceRef.current, levelRef.current);
      //   }, 16000);
      const myInterval = setInterval(() => { 
        console.log(countRef.current);
          updateChart(countRef.current, count2Ref.current);
        }, 10000);     
        return () => {
          console.log("Unmount");
          clearInterval(myInterval);
        };
    },[]);

    const parseData = (data, chartOption) => {
       var fetchOptions = JSON.parse(JSON.stringify(chartOption));
       fetchOptions.series=data;
      return fetchOptions;
    }

  // const parseData = (raw) => {
  //   var arr = []
  //   Object.keys(raw).forEach(function (key){
  //     var j;
  //       var jsonObject = {};
  //       var data = [];
  //       jsonObject.name=key
  //       jsonObject.data=data;
  //       for(j=0;j<raw[key].length-1;j++){
  //         var subData = [];
  //         subData.push(new Date(raw[key][j]['timestamp']).getTime());
  //         subData.push(raw[key][j]['energy']);
  //         data.push(subData);
  //       }
  //       arr.push(jsonObject);
  //    });
  //    var fetchOptions = JSON.parse(JSON.stringify(dataResultsContext));
  //    fetchOptions.series=arr;
  //   return fetchOptions;
  // }

  const toggleLoadingIcon = (param) =>{
    setOpen(param);
  }

  const updateChart = (selectedOption, selectedOption3) => {
    console.log(deviceRef);
    setAllowUpdate(false);
    toggleLoadingIcon(true);
    var deviceIdListJson = {};
    var arr = [];
    var arr3 = [];
    if(selectedOption!=null){
      console.log(selectedOption);
      console.log(selectedOption3);
      selectedOption.forEach((item)=>{
        arr.push(item.value);
      });
    }
    console.log(selectedOption3);
    if(selectedOption3!=null){
      selectedOption3.forEach((item)=>{
        arr3.push(item.value);
      });
    }
     // deviceIdListJson.number_record=100;
      deviceIdListJson.deviceId=arr;
      deviceIdListJson.level=arr3;
      deviceIdListJson.limit=200;
    
    const requestOptions = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(deviceIdListJson)
    };
  
    fetch('https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_historical_power', requestOptions)
      .then(res => res.json())
      .then(data => parseData(data, dataResultsContext))
      .then(data2 =>{ 
        console.log(data2);
        setDataResultsContext(data2);
        setAllowUpdate(true);
        toggleLoadingIcon(false);
      })
      .catch(function(e) {
        console.log(e);
      }); 

      fetch('https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_floor_level_energy', requestOptions)
      .then(res => res.json())
      .then(data => parseData(data, dataResultsContext2))
      .then(data2 =>{ 
        setDataResultsContext2(data2);
        setAllowUpdate(true);
        toggleLoadingIcon(false);
      })
      .catch(function(e) {
        console.log(e);
      }); 

      fetch('https://powermeter-api-ewhwbw5mva-uc.a.run.app/get_realtime_green_house_equivalences', requestOptions)
      .then(res => res.json())
      .then(data2 =>{ 
        dataResultsContext4[0]['author'] = data2['co2ValueInTon']+'m Tons';
        dataResultsContext4[1]['author'] = data2['gasolineConsumedInLiter']+'L';
        dataResultsContext4[2]['author'] = data2['foilConsumedInBarrel']+'Barrels';
        dataResultsContext4[3]['author'] = data2['distanceVehicleDrivenInKm']+'KM';
        setDataResultsContext4(dataResultsContext4);
        setAllowUpdate(true);
        toggleLoadingIcon(false);
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
          setReportList(reportList[0]);
          setLevelList(levelList[0]);
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }

    const handleChange = selectedOption => {
      setSelectedOptionContext(selectedOption);
    };

    const handleFloorChange = selectedOption => {
      setSelectedOption3Context(selectedOption);
    };

  return (
    <div>
            <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
       <Grid container spacing={1}>
          <Grid item xs={6}>
            Please select Floor Level:
            <Select value={selectedOption3Context} onChange={handleFloorChange} isMulti options={levelListContext}/>
          </Grid>
          <Grid item xs={6}>
          Please select Device List:
            <Select value={selectedOptionContext} onChange={handleChange} isMulti options={deviceListContext}/>
          </Grid>
          <Box display="flex" alignItems="flex-end" paddingBottom="4px">
            <Grid item xs={6} className="btn">
              <Button onClick={()=>updateChart(selectedOptionContext,selectedOption3Context)} variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Box>
        </Grid>
      <hr />
    </div>
  );
}