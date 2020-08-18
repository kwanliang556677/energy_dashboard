import moment from "moment";
import React from "react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import './style.css';


class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    let start = moment(this.props.startDate);
    let end = moment(start)
      .add(5, "days")
      .subtract(1, "second");
    this.state = {
      start: start,
      end: end
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    console.log("Apply Callback");
    console.log(startDate.format("DD-MM-YYYY HH:mm"));
    console.log(endDate.format("DD-MM-YYYY HH:mm"));
    this.setState({
      start: startDate,
      end: endDate
    });
  }

  rangeCallback(index, value) {
  
    console.log(index, value);
  }

  onClick() {
    console.log('okClick');
    let newStart = moment(this.state.start).subtract(3, "days");
    // console.log("On Click Callback");
    // console.log(newStart.format("DD-MM-YYYY HH:mm"));
    this.setState({ start: newStart });
  }

  renderVanillaPicker() {
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    let ranges = {
      "Today Only": [moment(start), moment(end)],
      "Yesterday Only": [
        moment(start).subtract(1, "days"),
        moment(end).subtract(1, "days")
      ],
      "3 Days": [moment(start).subtract(3, "days"), moment(end)],
      "5 Days": [moment(start).subtract(5, "days"), moment(end)],
      "1 Week": [moment(start).subtract(7, "days"), moment(end)],
      "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
      "1 Month": [moment(start).subtract(1, "months"), moment(end)],
      "1st August 18": [
        moment("2018-08-01 00:00:00"),
        moment("2018-08-02 23:59:59")
      ],
      "1 Year": [moment(start).subtract(1, "years"), moment(end)]
    };
    let local = {
      format: "DD-MM-YYYY HH:mm",
      sundayFirst: false
    };
    let maxDate = moment(end).add(24, "hour");
    let value = `${this.state.start.format(
      "DD-MM-YYYY HH:mm"
    )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;
    let disabled = false;
    return (
      <div>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={
            (startDate, endDate)=>{
              this.applyCallback(startDate, endDate);
              this.props.handler(startDate, endDate);
            }
          }
          rangeCallback={(startDate, endDate)=>this.props.handler(startDate, endDate)}
          smartMode
        >
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: "pointer" }}
            disabled={disabled}
            value={value}
            className="test"
          />
        </DateTimeRangeContainer>
        <br />
      </div>
    );
  }


  render() {
  
    return (
      <div className="container">
      
        {this.renderVanillaPicker()}
      
      
      </div>
    );
  }
}
export default DateFilter;
