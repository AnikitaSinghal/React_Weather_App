import React, { useState } from "react";
function Weather() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState(null);
  const [error, seterror] = useState("");
  const GetCityWeather = () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=df8805b218019cc28ee719f8c0d9667e`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.message) {
          seterror(response.message);
          setdata(null);
        } else {
          seterror("");
          setdata(response);
        }
        console.log("Response is", response);
      });
  };
  if (loading) {
    return <h1>Loading New request</h1>;
  }
  return (
    <>
      <input
        placeholder="Enter location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <br />
      <button onClick={GetCityWeather}>Search</button>
      {error ? <h4 style={{ color: "red" }}>{error}</h4> : null}
      {data ? (
        <>
          <h1>Current Weather</h1>
          <div>Temperature: {data.main.temp}</div>
          <div>Pressure: {data.main.pressure}</div>
          <div>Visibility: {data.visibility}</div>
          <img src="weather.0.icon" alt="" />
        </>
      ) : null}
    </>
  );
}
export default Weather;
