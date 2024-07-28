import types from '../types';

const initialState = {
  CurrentLocation: null,
  CityDetails: null,
  WeatherData: null,
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_LOCATION:
      return {
        ...state,
        CurrentLocation: action.payload,
      };
    case types.GET_CITY_DETAILS:
      return {
        ...state,
        CityDetails: action.payload,
      }
    case types.GET_WEATHER_DATA:
      return {
        ...state,
        WeatherData: action.payload,
      }
    default:
      return state;
  }
};

export default HomeReducer;
