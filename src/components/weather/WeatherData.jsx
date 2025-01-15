import './weatherData.css';
import { useSelector } from "react-redux";
import clear from '../../assets/clear.jpg';
import snow from '../../assets/snow.svg';
import rain from '../../assets/rain.jpg';
import mist from '../../assets/mist.png';
import cloud from '../../assets/cloud.webp';

const WeatherData = () => {
    const {weatherData} = useSelector((state) => state.todo.user);
    if (!weatherData) return null; 
  
    const temperature = Math.floor(Number(weatherData.temp) - 273.15);
  
    let weatherImgSrc = '';
    switch (weatherData.weather) {
      case 'Haze':
        weatherImgSrc = mist;
        break;
      case 'Mist':
        weatherImgSrc = mist;
        break;
      case 'Clouds':
        weatherImgSrc = cloud;
        break;
      case 'Rain':
        weatherImgSrc = rain;
        break;
      case 'Snow':
        weatherImgSrc = snow;
        break;
      case 'Clear':
        weatherImgSrc = clear;
        break;
      default:
        weatherImgSrc = clear;
        break;
    }
  
    return (
      <div style={{ display: 'flex', alignItems: 'center',flexDirection: 'column',justifyContent: 'center',lineHeight: '0.8', alignSelf:'start'}}>
        {/* Weather Image */}
        <div style={{ display: 'flex', alignItems: 'center',gap: '4px',}}>
        <img src={weatherImgSrc} alt={weatherData.weather} style={{ maxWidth: '30px', maxHeight: '30px' }} />
          <p>{temperature}°C</p>
        </div>
        {/* Weather Details */}
        <div className="weather-details">
          <span style={{fontSize:16}}>{weatherData.description}</span> {' ,'}
          <span style={{fontSize:15}}>Wind : {weatherData.windSpeed} Km/H</span>
        </div>
      </div>
    );
  };
  
  export default WeatherData;
  