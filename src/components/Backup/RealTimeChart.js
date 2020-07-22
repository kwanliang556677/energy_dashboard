import React, {Component} from 'react';
import Highcharts, { keys } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const apiReturn = {
  "AHU-41": [
    {
      "energy": 10.03802739606413,
      "timestamp": "Thu, 17 Sep 2020 23:00:00 GMT"
    },
    {
      "energy": 22.150867581748688,
      "timestamp": "Thu, 17 Sep 2021 22:45:00 GMT"
    }
  ],
  "AHU-29": [
    {
      "energy": 12.03802739606413,
      "timestamp": "Thu, 17 Sep 2020 23:00:00 GMT"
    },
    {
      "energy": 12.150867581748688,
      "timestamp": "Thu, 29 Sep 2020 22:45:00 GMT"
    }
  ]
}



const optionsTempate ={
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
  "series": []
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
    this.state = {
      selectedOption:  [],
      dataResults : options,
    }
  }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption }, () => this.updateChart()
    );
  };

 updateChart = () => {
  var selectedOption = this.state.selectedOption;
  var deviceIdListJson = {};
  var arr = [];
  console.log(selectedOption);
  if(selectedOption!=null){
    selectedOption.forEach((item)=>{
      deviceIdListJson.deviceId=arr;
      arr.push(item.value);
    });
  }

  console.log(deviceIdListJson);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify(deviceIdListJson)
  };

  fetch('https://us-central1-iotmqttproject.cloudfunctions.net/test', requestOptions)
    //.then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        dataResults: this.parseData(apiReturn)
      });
    }).catch(function(e) {
      console.log(e);
    });;
  }

  parseData = (raw) => {
    var arr = []
    Object.keys(raw).forEach(function (key){
      var j;
      for(j=0;j<Object.keys(raw).length-1;j++){
        var jsonObject = {};
        var data = [];
        var i=0;
        jsonObject.name=key
        jsonObject.data=data;
        for(i=0;i<2;i++){
          var subData = [];
          subData.push(new Date(raw[key][i]['timestamp']).getTime());
          subData.push(raw[key][i]['energy']);
          data.push(subData);
        }
        arr.push(jsonObject);
      }
     });
     var fetchOptions = optionsTempate;
     fetchOptions.series=arr;
     console.log(fetchOptions);
    return fetchOptions;
  }

  componentDidMount() {
    //this.getData();
    this.trigger();
  }  

  trigger() {
    setInterval(() => { 
      this.updateChart();
    }, 20000);
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
