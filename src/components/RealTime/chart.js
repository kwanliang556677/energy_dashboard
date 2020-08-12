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

export default function Chart(param) {
  const {counter, selectedOption,selectedOption3, dataResults,dataResults2,dataResults3,dataResults4, deviceList} = useContext(CounterContext);
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
  const classes = useStyles();
  const [chartUpdate, setChartUpdate] = useState(false);

    const getChart = (param) =>{
      console.log(param)
      var newChart= JSON.parse(JSON.stringify(dataResultsContext));
      if(param.dataType=="pieData"){
        newChart = JSON.parse(JSON.stringify(dataResultsContext2));
      }else if(param.dataType=="weeklyData" || param.dataType=="dollarData") {
       newChart = JSON.parse(JSON.stringify(dataResultsContext3));
      }
      newChart.chart.type=param.chartType;
      return newChart;
    };

  return (
    <div style={{height: "100%"}} >
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HighchartsReact immutable="true" Highcharts={Highcharts} containerProps={{ className: "highcharts" }} updateArgs={[false,false,false]} options={getChart(param.chartParam)} />
    </div>
  );
}