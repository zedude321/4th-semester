import { useEffect, useState } from "react";

const Weather = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getData()
      .then((e) => {
        setData(e);
        console.log(e);
      })
      .catch((e) => console.log(e));
  }, []);

  async function getData() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=47.9077&longitude=106.8832&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }

  const getWeatherCode = (code) => {
    if (code < 1) {
      return "Clear sky";
    } else if (code < 4) {
      return "Partly Cloudy";
    } else if (code < 51) {
      return "Foggy";
    } else if (code < 57) {
      return "Drizzling";
    } else if (code < 67) {
      return "Raining";
    } else if (code < 80) {
      return "Snowy";
    } else if (code > 95) {
      return "Thunderstorm";
    } else {
      return "Heavy rain or snow";
    }
  };

  const showCurrentForecast = () => {
    return data.hourly.temperature_2m.map((e, i) => {
      return (
        i % 3 == 0 &&
        i < 22 &&
        i > 5 && (
          <div
            className={`text-xl flex flex-col p-2 items-center w-full h-full justify-center`}
            key={i}
          >
            <p className="text-slate-300 text-sm text-center">
              {i > 12 ? i - 12 + ":00 PM" : i == 12 ? i + ":00 PM" : i + ":00 AM"}
            </p>
            <p className="text-4xl text-center">{e}°C</p>
            <p className="text-sm text-center">
              {getWeatherCode(data.hourly.weather_code[i])}
            </p>
          </div>
        )
      );
    });
  };

  const getDay = (day) => {
    const date = new Date(day);
    const number = date.getDay();
    if (date.getDate() == new Date().getDate()) {
      return "Today";
    }
    switch (number) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  };

  return (
    data && (
      <div className="bg-slate-950 text-white grid grid-cols-3 gap-4 p-4 h-screen">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center w-full h-full px-6">
            <div className="flex flex-col gap-2">
              <span className="flex gap-1">
                <p className="text-slate-400">Timezone: </p>
                <p>{data.timezone}</p>
              </span>
              <p className="text-8xl font-bold">
                {data.current.temperature_2m}
                {data.current_units.temperature_2m}
              </p>
            </div>
            <p className="text-3xl">
              {getWeatherCode(data.current.weather_code)}
            </p>
          </div>
          <div className="bg-slate-700 p-6 rounded-2xl h-full flex flex-col justify-between gap-4">
            <p className="text-slate-300 font-semibold text-sm">
              TODAY&apos;S FORECAST
            </p>
            <div className="flex w-full justify-between items-center divide-x divide-slate-900 h-full">
              {showCurrentForecast()}
            </div>
          </div>
          <div className="bg-slate-700 p-6 rounded-2xl h-full flex flex-col gap-2">
            <p className="text-slate-300 font-semibold text-sm">
              AIR CONDITION
            </p>
            <div className="grid grid-cols-2 h-full">
              <div>
                <p className="text-slate-300">Reel feel</p>
                <p className="text-5xl font-semibold">
                  {data.current.apparent_temperature}
                  {data.current_units.apparent_temperature}
                </p>
              </div>
              <div>
                <p className="text-slate-300">Wind</p>
                <p className="text-5xl font-semibold">
                  {data.current.wind_speed_10m}{" "}
                  {data.current_units.wind_speed_10m}
                </p>
              </div>
              <div>
                <p className="text-slate-300">Rain</p>
                <p className="text-5xl font-semibold">
                  {data.current.rain} {data.current_units.rain}
                </p>
              </div>
              <div>
                <p className="text-slate-300">Humidity</p>
                <p className="text-5xl font-semibold">
                  {data.current.relative_humidity_2m}{" "}
                  {data.current_units.relative_humidity_2m}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-700 p-6 rounded-2xl h-full flex flex-col gap-6">
          <p className="text-slate-300 font-semibold text-sm">7 DAY FORECAST</p>
          <div className="h-full flex flex-col justify-between divide-y divide-slate-900">
            {data.daily.time.map((e, i) => {
              return (
                <div className="grid grid-cols-4 h-full items-center" key={i}>
                  <p className="text-gray-300">{getDay(e)}</p>
                  <div className="flex justify-between col-span-3">
                    <p className="text-xl font-semibold">
                      {getWeatherCode(data.daily.weather_code[i])}
                    </p>
                    <span className="flex">
                      <p className="text-lg">{data.daily.temperature_2m_max[i]}/</p>
                      <p className="text-lg text-slate-300">{data.daily.temperature_2m_min[i]}</p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Weather;
