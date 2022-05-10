import React, {useState} from "react"
import './App.css';

const api = {
  key: "ab06391013cb9c36253ea9bd3c5ac6f6",
  base: "http://api.openweathermap.org/data/2.5/"
}


export default function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()
    let hour = d.getHours();
    let minutes = d.getMinutes()
    
    return `${day} ${date} ${month} ${year} ${hour}:${minutes}`
  }


  return (

    <div className='main'>

     <div className="search">
       <input 
       type="text"
       className="input"
       placeholder="Enter Location"
       onChange={e => setQuery(e.target.value)}
       value={query}
       onKeyPress={search}
       />
     </div>
     {(typeof weather.main != "undefined") ? (
     <div>
     <div className="main-inform">
       <div className="city-inform">
      <p>{weather.name},{weather.sys.country} </p>
      <h1>{Math.round(weather.main.temp)}&#176;F</h1>
      </div>
      <div className="city-inform2">
       <h3>     {weather.weather[0].main}</h3>
      </div>
     </div>
     
     <div className="inform">
       <div  className="inform1">
         <h4>{Math.round(weather.main.feels_like)}&#176;F</h4>
         <p>Feels Like</p>
        </div>

        <div  className="inform1">
         <h4>{Math.round(weather.main.humidity)}&#176;F</h4>
         <p>Humidity</p>
        </div>

         <div  className="inform1">
         <h4>{Math.round(weather.wind.speed)}m/s</h4>
         <p>Winds</p>
        </div>
     </div>
    </div>
     ) : ("")}
    </div>
    
  )
}

