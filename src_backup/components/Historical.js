import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"
import Button from '@material-ui/core/Button';

const raw = [
  {
      "device_id": "AHU-15",
      "energy": 20.563757257039263,
      "timestamp": new Date('Thu, 17 Jan 2020 01:00:00 GMT').getTime()
  },
  {
      "device_id": "AHU-14",
      "energy": 21.584701511309106,
      "timestamp": new Date('Thu, 17 Jan 2020 23:00:00 GMT').getTime()
  }
]  

const raw2 = [
  {
      "device_id": "AHU-15",
      "energy": 10.563757257039263,
      "timestamp": new Date('Thu, 17 Jan 2020 01:12:00 GMT').getTime()
  },
  {
      "device_id": "AHU-14",
      "energy": 51.584701511309106,
      "timestamp": new Date('Thu, 17 Jan 2020 23:08:00 GMT').getTime()
  }
]  


const parseData = (raw) => {
  var arr=[];
  Object.keys(raw).forEach(function (key){
    var arr2=[];
    arr2.push(raw[key]['timestamp']);
    arr2.push(raw[key]['energy']);
    arr.push(arr2);
  });
  console.log(arr);
  return arr;
}

function afterSetExtremes(e) {
  console.log(e.min);
  console.log(e.max);
}


const options ={
  title: {
    text: 'Energy Consumption Live Chart'
  },
  yAxis: {
    labels: {
        format: '{value} KWH'
    }
  },
  chart: {
    type: 'line',
    zoomType: 'x'
  },
  xAxis: {
    events: {
      afterSetExtremes: afterSetExtremes
    },
    type: 'datetime',
    dateTimeLabelFormats: {
        day: '%e of %b'
    }
},
  series :[
    {
      name : 'PM-1',
      data: parseData(raw),
    },
    {
      name : 'PM-2',
      data: parseData(raw2),
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
    this.applyCallback = this.applyCallback.bind(this);
    this.getData = this.getData.bind(this);
    let now = new Date();
    let start = moment(new Date(2016, 8, 20, 0, 0, 0, 0));
    let end = moment(start)
      .add(5, "days")
      .subtract(1, "second");
    this.state = {
      start : start,
      end : end,
      selectedOption: null,
      dataResults: [],
      options: [
        {
          name: 'Select…',
          value: null,
        },
        {
          name: 'A',
          value: 'a',
        },
        {
          name: 'B',
          value: 'b',
        },
        {
          name: 'C',
          value: 'c',
        },
      ],
      value: '?',
    }
  }

  startDateChange = startDate => {
    this.setState({ startDate })
    console.log(startDate)
  }

  endDateChange = endDate => {
    this.setState({ endDate })
    console.log(endDate)
  }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => this.state.selectedOption.forEach((e)=>{console.log(e.value)})
    );
  };

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

applyCallback(startDate, endDate){
  this.setState({
          start: startDate,
          end : endDate
      }
  )
  console.log(startDate.format("DD-MM-YYYY HH:mm"))   
  console.log(endDate.format("DD-MM-YYYY HH:mm"))   
}

  getData = () => {
    const selectionOption = this.state.selectedOption;
    selectionOption.forEach((e)=>{
      console.log(e.value)
    });
    // fetch('http://localhost:8181/getKWH')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       dataResults: data
    //     });
    //   });
    }

  render() {
    const { dataResults } = this.state.dataResults;
    const chartConfig = getConfig(dataResults);
    const { selectedOption } = this.state;
    const  value  = this.state.value
    let now = new Date();
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
    let end = moment(start).add(1, "days").subtract(1, "seconds");
    let ranges = {
        "Today Only": [moment(start), moment(end)],
        "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
        "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    }
    let local = {
        "format":"DD-MM-YYYY HH:mm",
        "sundayFirst" : false
    }
    let maxDate = moment(start).add(24, "hour")
    return (
      <div>
         <div>test
                    <DateTimeRangeContainer 
                        ranges={ranges}
                        start={this.state.start}
                        end={this.state.end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.applyCallback}
                    >    
                        <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        /> 
                    </DateTimeRangeContainer>
          </div>
        <label>Please Select Devices</label>
        <div>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            isMulti
            options={optionsSelect}
          />
        </div>
        <hr />
        <HighchartsReact Highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default App;
