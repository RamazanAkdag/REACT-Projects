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
    const apiKey = "{{urApiKey}}";
    const apiURI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;//api uri

    axios // Get Request from api
      .get(apiURI)
      .then((res) => res.data)// take data of response
      .then((data) => {
        console.log(data);
        this.setState({ fetchRes: data }, () => {// define data to our state
          //console.log("State güncellendi:", this.state.fetchRes);//state updated
        });
      })
      .catch((err) => console.log(err));
  };

  setQuery = (e) => {//eventListener for input keypress
    if (e.keyCode === 13) {// enter pressed
      //entera basıldı
      // console.log(e.target.value);
      const city = e.target.value;// get city name from user
      this.getResult(city);// get request to api
    }
  };

  render = () => {
    let cityInfo;
    let temp;
    let desc;
    let minmax;
    if (Object.keys(this.state.fetchRes).length === 0) {// if our fetcchre state is empty. our values = ""
      cityInfo = "";
      temp = "";
       desc = "";
       minmax = "";
    } else {                                            // if it isn't empty get All values from fetchres state
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

    // Show weather info to user
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
