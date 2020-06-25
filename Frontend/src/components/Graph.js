import axios from "axios";
import "react-dropdown/style.css";
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "react-bootstrap";
import "./edit.css";

export class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resp: {},
      radio: "",
      value: "",
      listOpen: false,
      headerTitle: this.props.title,
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: "red",
          },
        ],
      },
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue = (event) => {
    this.setState(
      {
        radio: event.target.value,
      },
      function () {
        console.log(this.state.radio);
        axios
          .get("http://127.0.0.1:5000/" + this.state.value, {
            params: { val: this.state.radio },
          })
          .then((response) => {
            var serial = [];
            var newState = [];
            for (var i = 0; i < 213; i++) {
              serial[i] = i + 1;
              newState[i] = response["data"][i];
            }
            console.log("Hello", newState);
            this.setState({
              chartData: {
                labels: serial,
                datasets: [
                  {
                    data: newState,
                    backgroundColor: "red",
                  },
                ],
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  changeHandler = (e) => {
    this.setState(
      {
        value: e.target.value,
      },
      function () {
        axios
          .get("http://127.0.0.1:5000/" + this.state.value, {
            params: {},
          })
          .then((response) => {
            var serial = [];
            var newState = [];
            for (var i = 0; i < 213; i++) {
              serial[i] = i + 1;
              newState[i] = response["data"][i];
            }
            console.log("Hello", newState);
            this.setState({
              chartData: {
                labels: serial,
                datasets: [
                  {
                    data: newState,
                    backgroundColor: "red",
                  },
                ],
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  render() {
    return (
      <>
        <div>
          <h3 align="center">Please select the required field</h3>
        </div>
        <div className="dropdown">
          <select
            id="lang"
            value={this.state.value}
            onChange={this.changeHandler}
          >
            <option> Select </option>
            <option value="ssc_p">SSC_P</option>
            <option value="hsc_p">HSC_p</option>
            <option value="degree_p">Degree_P</option>
            <option value="etest_p">Etest_p</option>
            <option value="mba_p">Mba_p</option>
          </select>
        </div>
        <div className="top">
          <h4> The graph displays the students mark of selected item</h4>
        </div>
        <div className="chart">
          <Bar
            data={this.state.chartData}
            options={{
              maintainAspectRatio: false,
              legend: { display: false },
            }}
          />
        </div>
        <div className="text">
          <h5>
            {" "}
            <u>FILTERS </u>{" "}
          </h5>
        </div>
        <div className="options" onChange={this.onChangeValue}>
          <span>
            <input type="radio" value="Male" name="group" /> Male
            <br />
          </span>
          <span>
            <input type="radio" value="Female" name="group" /> Female
            <br />
          </span>
          <span>
            <input type="radio" value="placed" name="group" /> Placed <br />
          </span>
          <span>
            <input type="radio" value="not placed" name="group" /> Not placed
            <br />
          </span>
        </div>
      </>
    );
  }
}

export default Graph;
