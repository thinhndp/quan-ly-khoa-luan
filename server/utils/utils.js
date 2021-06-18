export const getIncludeFilter = (queryVal, option = "i") => {
  return { $regex: new RegExp(`^.*${queryVal}.*`) }
}

export const getConvertedQueryString = (queryStr) => {
  return queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
}