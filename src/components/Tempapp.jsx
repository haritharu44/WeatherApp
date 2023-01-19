import React, { useState, useEffect } from "react";
import "./Sass/index.scss";

export default function Tempapp() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("Mumbai");

  const InputEvent = (event) => {
    const curVal = event.target.value;

    setSearch(curVal);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=64d8dff63027e8a0e9b8fb143a842411`;
      const response = await fetch(url);
      // console.log(response)
      const resJson = await response.json();
      // console.log(resJson);
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);
   
  const getCurrentDay=()=>{
    const weekday=["SUN","MON","TUE","WED","THU","FRI","SAT"];
    // console.log(weekday[1])

    const curTime = new Date();
    const day= curTime.getDay();
    // console.log(weekday[day]);
    return (weekday[day])
  }

  const getCurrentTime=()=>{
    const months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
    const curTime=new Date();
    const month=curTime.getMonth();
    const date=curTime.getDate();
    const ntime=curTime.toLocaleTimeString();
    // const time=Ntime.getTime();
    return (`${months[month]}-${date} | ${ntime}`)
    console.log(ntime);
  }
  getCurrentTime();
  // getCurrentDay();
  return (
    <>
      <div className="container">
        <input
          type="search"
          onChange={InputEvent}
          value={search}
          placeholder="Enter City Name"
        />
        {!city ? (
          <p className="nodata"> No data Found</p>
        ) : (
          <>
            <div className="info">
              <div className="location">
                <h2 className="address">
                  <i className="fa-solid fa-street-view"></i>
                  {search}
                </h2>
                <div id="date">{getCurrentDay()} | {getCurrentTime()} </div>
              </div>
              <div className="temperature mt-4">
                <h1 className="temp">{city.temp} ℃</h1>
                <p className="tempmin-max">Min :{city.temp_min} ℃ | Max :{city.temp_max} ℃</p>
              </div>
            </div>
          </>
        )}

        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
    </>
  );
}
