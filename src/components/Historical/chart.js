import React, { useContext, useEffect, useState, useRef } from "react";
import { CounterContext } from "./chart-context-provider";
import Highcharts, { keys, dateFormats } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const getConfig = data => ({
  
  rangeSelector: {
    selected: 1
  },
  title: {
    text: 'Energy Consumption Historical Chart'
  },
  yAxis: {
    labels: {
        format: '{value} KWH'
    }
  },
  series: [{
    name: 'Consumption',
    data: data,
    tooltip: {
     valueDecimals: 2
    }
  }]
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
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
  const {counter, selectedOption, dataResults, deviceList, startDate, endDate} = useContext(CounterContext);
  const [selectedOptionContext, setSelectedOptionContext] = selectedOption;
  const [dataResultsContext, setDataResultsContext] = dataResults;
  const [startDateContext, setStartDateContext] = startDate;
  const [endDateContext, setEndDateContext] = endDate;

  const [allowUpdate, setAllowUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [deviceListContext, setDeviceList] = useState(deviceList);
  const classes = useStyles();

  useEffect(() => {
    populateDeviceList();
    //trigger();
    return () => {
      
    };
  },[]);

  const trigger = () => {
    setInterval(() => { 
      updateChart();
    }, 20000);
  }

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
     var fetchOptions = dataResultsContext;
     fetchOptions.series=arr;
    return fetchOptions;
  }

  const toggleLoadingIcon = (param) =>{
    setOpen(param);
  }

  const updateChart = (selectedOption) => {
    setAllowUpdate(false);
    toggleLoadingIcon(true);
    // var selectedOption = selectedOptionContext['selectedOption'];
    var deviceIdListJson = {};
    var arr = [];
    if(selectedOption!=null){
      selectedOption.forEach((item)=>{
        arr.push(item.value);
      });

      deviceIdListJson.type="historical";
      deviceIdListJson.device_id=arr;
      deviceIdListJson.start_datetime = startDateContext;
      deviceIdListJson.end_datetime = endDateContext;
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
      setSelectedOptionContext(selectedOption);
    };

    const handleButtonClick = param =>{
      updateChart(selectedOptionContext);
    }

    const handleStartDateChange = (date) => {
      setStartDateContext(date);
    }

    const handleEndDateChange = (date) => {
      setEndDateContext(date);
    }

    const getChart = (param) =>{
      var newChart = JSON.parse(JSON.stringify(dataResultsContext));
      newChart.chart.type=param;
      console.log(newChart);
      console.log(dataResultsContext);
      return newChart;
    };

  return (
    <div>
       <Grid alignItems="center" container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="overline" display="block" gutterBottom> Please Select</Typography>
          </Grid>      
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                value={startDateContext}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="End Date"
                value={endDateContext}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            <Select value={selectedOptionContext} onChange={handleChange} isMulti options={optionsSelect}/>
          </Grid>
          <Grid item xs={3}>
          <Button onClick={handleButtonClick} variant="contained" color="primary">
            Search
          </Button>
          </Grid>                                  
        </Grid>
      <hr />
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HighchartsReact Highcharts={Highcharts} allowChartUpdate={allowUpdate} updateArgs={[true,true,true]} options={dataResultsContext} />
      <HighchartsReact Highcharts={Highcharts} updateArgs={[true,true,true]} options={getChart('column')} />
      <HighchartsReact Highcharts={Highcharts} updateArgs={[true,true,true]} options={getChart('bar')} />
    </div>
  );
}