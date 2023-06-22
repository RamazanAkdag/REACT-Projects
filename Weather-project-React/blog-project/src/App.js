import React, { Component } from "react";
import axios from "axios";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    // İlk state değerini tanımlayın
    this.state = {
      fetchRes: {},
    };
  }

  getResult = (cityName) => {
    const apiKey = "bb1bd49706ebc1f81ee537163ee41dd6";
    const apiURI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    axios
      .get(apiURI)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.setState({ fetchRes: data }, () => {
          //console.log("State güncellendi:", this.state.fetchRes);
        });
      })
      .catch((err) => console.log(err));
  };

  setQuery = (e) => {
    if (e.keyCode === 13) {
      //entera basıldı
      // console.log(e.target.value);
      const city = e.target.value;
      this.getResult(city);
    }
  };

  render = () => {
    let cityInfo;
    let temp;
    let desc;
    let minmax;
    if (Object.keys(this.state.fetchRes).length === 0) {
      cityInfo = "";
    } else {
      /*console.log(
        `${this.state.fetchRes.name},${this.state.fetchRes.sys.country}`
      );*/
      cityInfo = ` ${this.state.fetchRes.name},${this.state.fetchRes.sys.country}`;
      temp = this.state.fetchRes.main.temp + "C";
      desc = this.state.fetchRes.weather[0].description;
      minmax =
        this.state.fetchRes.main.temp_min +
        "C / " +
        this.state.fetchRes.main.temp_max +
        "C";
    }

    return (
      <div className="container">
        <div className="header">
          <h1>Hava Durumu</h1>
          <input
            type="text"
            onKeyDown={this.setQuery}
            placeholder="Şehir Girin"
          />
        </div>
        <div className="content">
          <div className="city">{cityInfo}</div>
          <div className="temp">{temp}</div>
          <div className="desc">{desc}</div>
          <div className="min-max">{minmax}</div>
        </div>
      </div>
    );
  };
}
