import sunny from "../images/sunny.png";
import rainy from "../images/rainy.png";
import cloudy from "../images/cloudy.jpeg";

const getImageCode = main => {
  let code = "http://openweathermap.org/img/wn/";
  switch (main) {
    case "Thunderstorm":
      code += "11d@2x.png";
      break;
    case "Drizzle":
      code += "09d@2x.png";
      break;
    case "Rain":
      code = { rainy }["rainy"];
      // code += "10d@2x.png";
      break;
    case "Snow":
      code += "13d@2x.png";
      break;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      code += "50d@2x.png";
      break;
    case "Clear":
      code = { sunny }["sunny"];
      // code += "01d@2x.png";
      break;
    case "Clouds":
      code = { cloudy }["cloudy"];
      // code += "02d@2x.png";
      break;
    default:
      code += "50d@2x.png";
  }
  return code;
};

export default getImageCode;
