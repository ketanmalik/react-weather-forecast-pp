const getUrlCode = day => {
  let url = "";
  switch (day) {
    case "mon":
      url = "/monday";
      break;
    case "tue":
      url = "/tuesday";
      break;
    case "wed":
      url = "/wednesday";
      break;
    case "thu":
      url = "/thursday";
      break;
    case "fri":
      url = "/friday";
      break;
    case "sat":
      url = "/saturday";
      break;
    case "sun":
      url = "/sunday";
      break;
    default:
      url = "/";
  }
  return url;
};

export default getUrlCode;
