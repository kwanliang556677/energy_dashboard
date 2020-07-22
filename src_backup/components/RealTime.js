import React, {Component} from 'react';
import Highcharts, { keys } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import Cell from 'material-grid/dist/Grid/Cell';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const options ={
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
      "name": "AHU-1",
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
      "name": "AHU-5",
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

const options2 ={
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
      "name": "AHU-1",
      "data": [
        [
          1579222800000,
          26.563757257039263
        ],
        [
          1579302000000,
          21.584701511309106
        ]
      ]
    },
    {
      "name": "AHU-5",
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
    },
    {
      "name": "AHU-67",
      "data": [
        [
          1579223520000,
          69.563757257039263
        ],
        [
          1579302480000,
          41.584701511309106
        ]
      ]
    }    
  ]
};
const getConfig = data => ({
  
  rangeSelector: {
    selected: 1
  },
  title: {
    text: 'Energy Consumption Live Chart'
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

const optionsSelect = [
  { value: 'AHU-1', label: 'AHU-1' },
  { value: 'AHU-5', label: 'AHU-5' },
  { value: 'AHU-10', label: 'AHU-10' },
];

class App extends Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.state = {
      selectedOption:  { value: 'AHU-1', label: 'AHU-1' },
      dataResults : options,
    }
  }

  handleChange = selectedOption => {
    console.log(JSON.stringify(options2));
    this.setState(
      { selectedOption }, () => this.getData(selectedOption)
    );
  };

 getData = (selectedOption) => {

  var arr=[];
  var j=0;
  for(j=0;j<2;j++){
    var jsonObject = {};
    var data = [];
    var i=0;
    jsonObject.name='AHU-9'+j
    jsonObject.data=data;
    for(i=0;i<2;i++){
      var subData = [];
      subData.push(1579223520000+i*10);
      subData.push(200+j*10);
      data.push(subData);
    }
    arr.push(jsonObject);
  }
  console.log(arr);

  var test = options2;
  test.series = arr;
  console.log(test);

  // const selectionOption = this.state.selectedOption;
  // selectionOption.forEach((e)=>{
  //   console.log(e.value)
  // });
  const requestOptions = {
    method: 'POST',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify({"device_id":["AHU-1"]})
  };

  fetch('https://us-central1-iotmqttproject.cloudfunctions.net/test', requestOptions)
    //.then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        dataResults: options2
      });
    }).catch(function(e) {
      //console.log(e);
    });;
  }

  parseData = (raw) => {
    var arr=[];
    console.log(raw);
    Object.keys(raw).forEach(function (key){
      console.log(raw[key]);
      var arr2=[];
      // arr2.push(raw[key]['timestamp']);
      // arr2.push(raw[key]['energy']);
      // arr.push(arr2);
    });
    console.log(arr);
    return arr;
  }

  componentDidMount() {
    //this.getData();
    this.trigger();
  }  

  trigger() {
    let newTime = Date.now() - this.props.date;
    // setInterval(() => { 
    //   console.log('hi')
    //     this.getData();
    // }, 2000);
  }

  render() {
    // const { dataResults } = this.state.dataResults;
    // const chartConfig = getConfig(dataResults);
    const { selectedOption } = this.state;
    const  value  = this.state.value
    return (
      <Container maxWidth="sm">
      <div>
         <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="overline" display="block" gutterBottom> Please Select</Typography>
            </Grid>
            <Grid item xs={6}>
              <Select value={this.state.selectedOption} onChange={this.handleChange} isMulti options={optionsSelect}/>
            </Grid>
          </Grid>
        <hr />
        <HighchartsReact Highcharts={Highcharts} options={this.state.dataResults} />
      </div>
      </Container>
    );
  }
}

export default App;
