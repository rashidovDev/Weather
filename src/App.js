import React, { useState } from 'react'
import axios from 'axios'
import City from './components/City'
import PickCity from './components/PickCity'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('Toshkent')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className={(typeof data.main != "undefined") ? 
    (((data.main.temp * 0.355) > 20 ) ? "app warm" : "app cool") :  "app warm"}>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
       <City 
      data = {data}
      /> 
    </div>
  );
}

export default App;
