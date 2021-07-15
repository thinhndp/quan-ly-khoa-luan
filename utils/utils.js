export const getIncludeFilter = (queryVal, option = "i") => {
  return { $regex: new RegExp(`^.*${queryVal}.*`), $options: option }
}

export const getConvertedQueryString = (queryStr) => {
  return queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
}

export const getDateString = (dateTimeStr) => {
  return dateTimeStr.substring(0, 10);
}

export const getLastMonday = (currentDate) => {
  var d = new Date(currentDate);
  var day = d.getDay();
  var diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export const getNextSunday = (currentDate) => {
  var d = new Date(currentDate);
  var day = d.getDay();
  var diff = d.getDate() - day + (day == 0 ? 0 : 7);
  return new Date(d.setDate(diff));
}

export const getDaysBetween = (d1, d2) => {
  return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
}

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}