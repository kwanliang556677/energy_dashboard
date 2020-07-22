import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options ={
  series :[
    {
      name : 'Energy Meter',
      data: [
        [10, 5],
        [90, 9]
    ]
    }
  ]
};
const RealTimeChart = () => {
  return (
    <HighchartsReact Highcharts={Highcharts} options={options} />
  )
}

export default RealTimeChart
