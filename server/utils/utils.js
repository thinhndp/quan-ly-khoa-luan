export const getIncludeFilter = (queryVal, option = "i") => {
  return { $regex: new RegExp(`^.*${queryVal}.*`) }
}