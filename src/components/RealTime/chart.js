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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const optionsSelect = [
  { value: 'PM-1', label: 'PM-1' },
  { value: 'PM-2', label: 'PM-2' },
  { value: 'PM-3', label: 'PM-3' },
  { value: 'PM-4', label: 'PM-4' },
  { value: 'PM-5', label: 'PM-5' }
];

export default function CounterDisplay() {
  const {counter, selectedOption, dataResults, deviceList} = useContext(CounterContext);
  const [selectedOptionContext, setSelectedOptionContext] = selectedOption;
  const [dataResultsContext, setDataResultsContext] = dataResults;
  const [counterContext, setCounterContext] = counter;
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [deviceListContext, setDeviceList] = useState(deviceList);
  const classes = useStyles();

  const countRef = useRef(selectedOptionContext);
  countRef.current = selectedOptionContext;

  // useEffect(() => {
  //   //populateDeviceList();
  //   console.log('useEffect');
  //   trigger();
  //   return () => {
  //     console.log('useEffectUnMount');
  //   };
  // },[]);

    useEffect(() => {
      console.log('mount');
      console.log('selectedOptionDefault : ', countRef.current);
      const myInterval = setInterval(() => { 
        console.log(countRef.current);
          //updateChart(countRef.current['selectedOption']);
        }, 10000);
        return () => {
          console.log("Unmount");
          clearInterval(myInterval);
        };
    },[]);

  const parseData = (raw) => {
    var arr = []
    Object.keys(raw).forEach(function (key){
      var j;
        var jsonObject = {};
        var data = [];
        jsonObject.name=key
        jsonObject.data=data;
        for(j=0;j<raw[key].length-1;j++){
          var subData = [];
          subData.push(new Date(raw[key][j]['timestamp']).getTime());
          subData.push(raw[key][j]['energy']);
          data.push(subData);
        }
        arr.push(jsonObject);
     });
     var fetchOptions = JSON.parse(JSON.stringify(dataResultsContext));
     fetchOptions.series=arr;
    return fetchOptions;
  }

  const toggleLoadingIcon = (param) =>{
    setOpen(param);
  }

  const updateChart = (selectedOption) => {
    setAllowUpdate(false);
    toggleLoadingIcon(true);
    var deviceIdListJson = {};
    var arr = [];
    if(selectedOption!=null){
      selectedOption.forEach((item)=>{
        arr.push(item.value);
      });
     // deviceIdListJson.number_record=100;
      deviceIdListJson.device_id=arr;
    }

    const requestOptions = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(deviceIdListJson)
    };
  
    fetch('https://us-central1-iotmqttproject.cloudfunctions.net/PowerMeterEngine', requestOptions)
      .then(res => res.json())
      .then(data => parseData(data))
      .then(data2 =>{ 
        setDataResultsContext(data2);
        setAllowUpdate(true);
        toggleLoadingIcon(false);
      })
      .catch(function(e) {
        console.log(e);
      }); 
    }

    const populateDeviceList = () =>{
      const requestOptions = {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"type":"getDevices"})
      };
    
      fetch('https://us-central1-iotmqttproject.cloudfunctions.net/PowerMeterEngine', requestOptions)
        .then(res => res.json())
        .then(data =>{ 
          setDeviceList(data);
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }

    const handleChange = selectedOption => {
      console.log(selectedOption);
      setSelectedOptionContext(selectedOption);
      console.log(selectedOptionContext)
      updateChart(selectedOption);
    };

    const getChart = (param) =>{
      var newChart = JSON.parse(JSON.stringify(dataResultsContext));
      newChart.chart.type=param;
      console.log(newChart);
      console.log(dataResultsContext);
      return newChart;
    };

  return (
    <div>
       <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="overline" display="block" gutterBottom> Please Select</Typography>
          </Grid>
          <Grid item xs={6}>
            <Select value={selectedOptionContext} onChange={handleChange} isMulti options={optionsSelect}/>
          </Grid>
        </Grid>
      <hr />
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HighchartsReact Highcharts={Highcharts} updateArgs={[true,true,true]} options={dataResultsContext} />
      <HighchartsReact Highcharts={Highcharts} updateArgs={[true,true,true]} options={getChart('column')} />
      <HighchartsReact Highcharts={Highcharts} updateArgs={[true,true,true]} options={getChart('bar')} />
    </div>

  );
}