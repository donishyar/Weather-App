import SearchBar from './components/SearchBar';
import ShowBar from './components/ShowBar';
import WeatherStatics from './components/WeatherStatics';
import { useState } from 'react';
import {getWeather, randSelect,getFiveDays,getDay} from './config/helpers';
import {cloudy,snow,sunny,rainy} from "./config/constants";
import FiveDays from './components/FiveDays';




  



function App() {

  
  const [city, setCity] = useState(' ');
  const [location , setLocation] = useState("Herat")
  const [status, setStatus] = useState("Sunny");
  const [degree, setDegree] = useState("30");
  const [icon, setIcon] = useState("http://cdn.weatherapi.com/weather/64x64/day/113.png");
  const [pressure,setPressure] = useState("1000");
  const [humidity,setHumidity] = useState("12");
  const [windSpeed,setWindSpeed] = useState("10");
  const [feelsLike,setSetFeelsLike] = useState("29");
  const [background,setBackground] = useState(cloudy[0]);
  const [toggleState, setToggleState] = useState(1);
  const [degSystem,setDegSystems] = useState("C");
  const[pressureUnit,setPressureUnit] = useState("mb");
  const[windSpeedUnit,setWindSpeedUnit] = useState("Kph");
  const[feelsLikeUnit,setSetFeelsLikeUnit] = useState("C");
  const[dayTwo,setDayTwo] = useState(30);
  const[dayThree,setDayThree] = useState(30);
  const[dayFour,setDayFour] = useState(30);
  const[dayFive,setDayFive] = useState(30);
  
  
  const handleChange = event => {
    setCity(event.target.value);
  };



  
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {

      try {
        const cityStatus = await getWeather(city,"cityStatus");
        const humidityData = await getWeather(city,"humidity");
        setIcon( await getWeather(city,"statusIcon"));
        setLocation(city.toUpperCase());
        setStatus(cityStatus);
        setHumidity(humidityData);
        getDay(city);
        

        if(degSystem=="C"){
          setDegree(Math.floor(await getWeather(city,"cityTemp_c")));
          setPressure(await getWeather(city,"pressure_mb"));
          setWindSpeed(await getWeather(city,"wind_kph"));
          setSetFeelsLike(Math.floor(await getWeather(city,"feelslike_c")));
          setDayTwo(Math.floor(await getFiveDays(city,"metric","dayTwo")));
          setDayThree(Math.floor(await getFiveDays(city,"metric","dayThree")));
          setDayFour(Math.floor(await getFiveDays(city,"metric","dayFour")));
          setDayFive(Math.floor(await getFiveDays(city,"metric","dayFive")));
        } else {
          setDegree(Math.floor(await getWeather(city,"cityTemp_f")));
          setPressure(await getWeather(city,"pressure_in"));
          setWindSpeed(await getWeather(city,"wind_mph"));
          setSetFeelsLike(Math.floor(await getWeather(city,"feelslike_f")));
        }

        if (cityStatus.includes("Sunny")  || cityStatus.includes("Clear")) {
          console.log(cityStatus);
          setBackground(randSelect(sunny));
        } else if (cityStatus.includes("Cloudy") || cityStatus.includes("Partly cloudy")) {
   
          setBackground(randSelect(cloudy));
        } else if (cityStatus.includes("Snow")) {

          setBackground(randSelect(snow));
        } else if (
          cityStatus.includes("rain") ||
          cityStatus.includes("Light rain")  ||
          cityStatus.includes("Showers")  ||
          cityStatus.includes("Thunder")
        ) {
          setBackground(randSelect(rainy));
        }else{
          setBackground(cloudy[0]);
        }

      } catch (err) {
        console.error(err);
      }
    }
  };
  

  const tabToggle = async(index) => {
    setToggleState(index);
    if(index==1){
      setDegSystems("C");
      setPressureUnit("mb");
      setWindSpeedUnit("Kph");
      setSetFeelsLikeUnit("C");
      setDegree(Math.floor(await getWeather(city,"cityTemp_c")));
      setPressure(await getWeather(city,"pressure_mb"));
      setWindSpeed(await getWeather(city,"wind_kph"));
      setSetFeelsLike(Math.floor(await getWeather(city,"feelslike_c")));
      setDayTwo(Math.floor(await getFiveDays(city,"metric","dayTwo")));
      setDayThree(Math.floor(await getFiveDays(city,"metric","dayThree")));
      setDayFour(Math.floor(await getFiveDays(city,"metric","dayFour")));
      setDayFive(Math.floor(await getFiveDays(city,"metric","dayFive")));

    }else {
      setDegSystems("F");
      setPressureUnit("in");
      setWindSpeedUnit("Mph");
      setSetFeelsLikeUnit("F");
      setDegree(Math.floor(await getWeather(city,"cityTemp_f")));
      setPressure(await getWeather(city,"pressure_in"));
      setWindSpeed(await getWeather(city,"wind_mph"));
      setSetFeelsLike(Math.floor(await getWeather(city,"feelslike_f")));
      setDayTwo(Math.floor(await getFiveDays(city,"imperial","dayTwo")));
      setDayThree(Math.floor(await getFiveDays(city,"imperial","dayThree")));
      setDayFour(Math.floor(await getFiveDays(city,"imperial","dayFour")));
      setDayFive(Math.floor(await getFiveDays(city,"imperial","dayFive")));

    }
  }




  
 


  

  
  return (

        <div className="main__section" style={{backgroundImage:`URL(${background})`}}>
            <SearchBar value={city} changeValue={handleChange} enterPressed={handleKeyDown} toggle={toggleState} setToggle={setToggleState}toggledTab={tabToggle}/>
            <ShowBar location={location}  weatherStatus={status} weatherDegree={degree} weatherIcon={icon} unit={feelsLikeUnit}/>
            <WeatherStatics pressure={pressure} humidity={humidity} windSpeed ={windSpeed} feelsLike={feelsLike} pUnit={pressureUnit} wUnit={windSpeedUnit} fUnit={feelsLikeUnit} />
            <FiveDays dayOne={degree}  dayTwo={dayTwo} dayThree={dayThree} dayFour={dayFour} dayFive={dayFive} fUnit={feelsLikeUnit} />
        </div>
  )
}

export default App;


