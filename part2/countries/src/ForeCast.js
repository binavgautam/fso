import axios from "axios";
import { useEffect, useState } from "react";

export default function ForeCast({ city }) {
  const [forecast, setForecast] = useState(null);

  console.log(city);

  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: city[0],
    },
    headers: {
      "X-RapidAPI-Key": "2afb0b8d26mshb003a300512946ap19308ajsn9c6473bae454",
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setForecast(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h3>Weather in {city} </h3>
      <div>
        {forecast && (
          <>
            <p>Temperature : {forecast.main.temp}</p>
            <img
              src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
              alt=""
            />
            <p>Winds : {forecast.wind.speed}</p>
          </>
        )}
      </div>
    </div>
  );
}
