// import React, {Component} from 'react';
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
// import Select from 'react-select';
// import Button from '@material-ui/core/Button';
// import Cell from 'material-grid/dist/Grid/Cell';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';


// const getData = (options) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ device_id: [options]})
//   };
//   fetch('https://us-central1-iotmqttproject.cloudfunctions.net/PowerMeterEngine', requestOptions)
//     .then(res => res.json())
//     .then(data => {
//       this.setState({
//         dataResults: data
//      });
//   });
// }

// const getRequestData = (raw) => {
//   var arr=[];
//   Object.keys(raw).forEach(function (key){
//     var arr2=[];
//     arr2.push(raw[key]['timestamp']);
//     arr2.push(raw[key]['energy']);
//     arr.push(arr2);
//   });
//   console.log(arr);
//   return arr;
// }

// const getChartData = (raw) => {
//   var arr=[];
//   Object.keys(raw).forEach(function (key){
//     var arr2=[];
//     arr2.push(raw[key]['timestamp']);
//     arr2.push(raw[key]['energy']);
//     arr.push(arr2);
//   });
//   console.log(arr);
//   return arr;
// }





// const options ={
//   title: {
//     text: 'Energy Consumption Live Chart'
//   },
//   yAxis: {
//     labels: {
//         format: '{value} KWH'
//     }
//   },
//   xAxis: {
//     type: 'datetime',
//     dateTimeLabelFormats: {
//         day: '%e of %b'
//     }
// },
//   series :getData()
// };


// const getConfig = data => ({
//   rangeSelector: {
//     selected: 1
//   },
//   title: {
//     text: 'Energy Consumption Live Chart'
//   },
//   yAxis: {
//     labels: {
//         format: '{value} KWH'
//     }
//   },
//   series: [{
//     name: 'Consumption',
//     data: data,
//     tooltip: {
//      valueDecimals: 2
//     }
//   }]
// });

// const optionsSelect = [
//   { value: 'AHU-1', label: 'AHU-1' },
//   { value: 'AHU-5', label: 'AHU-5' },
//   { value: 'AHU-10', label: 'AHU-10' },
// ];

// class App extends Component {
//   constructor() {
//     super();
//     this.getData = this.getData.bind(this);
//     this.state = {
//       selectedOption: null,
//       dataResults: [],
//     }
//   }

//   handleChange = selectedOption => {
//     this.setState(
//       { selectedOption }
//     );
//   };

//   handleSearch = () =>{
//     getData(selectedOption);
//   }

//   componentDidMount() {
//     this.getData(selectedOption)
//     this.trigger();
//   }  

//   trigger() {
//     setInterval(() => { 
//         this.getData();
//     }, 2000);
//   }

//   render() {
//     const requestData = getRequestData(this.optionsSelect);
//     const { dataResults } = this.state.dataResults;
//     const chartConfig = getConfig(dataResults);
//     const { selectedOption } = this.state;
//     return (
//       <div>
//          <Grid container spacing={1}>
//             <Grid item xs={12}>
//               <Typography variant="overline" display="block" gutterBottom>Please Select</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Select
//                 value={selectedOption}
//                 onChange={this.handleChange}
//                 isMulti
//                 options={optionsSelect}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Button variant="contained" color="primary" onClick={this.handleSearch}>Update</Button>
//             </Grid>
//           </Grid>
//         <hr />
//         <HighchartsReact Highcharts={Highcharts} options={chartConfig} />
//       </div>
//     );
//   }
// }

// export default App;