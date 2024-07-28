import types from '../types';

import store from '../store';

import {apiGet} from '../../services/api';
import {GET_CITY_DETAILS} from '../../services/urls';

import axios from 'axios';

const {dispatch} = store;

export function getCurrentLocation(data) {
  apiGet(
    `${GET_CITY_DETAILS}?latitude=${data[0]?.latitude}&longitude=${data[0]?.longitude}&localityLanguage=en`,
  ).then(res => {
    console.log('CITY DETAILS', res);

    dispatch({
      type: types.GET_CITY_DETAILS,
      payload: res,
    });

    dispatch({
      type: types.GET_CURRENT_LOCATION,
      payload: data,
    });
  });
}

export async function getWeatherData(data) {
  try {
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast`,
      {
        params: {
          latitude: data[0]?.latitude,
          longitude: data[0]?.longitude,
          hourly: 'temperature_2m,wind_speed_10m',
          daily: 'temperature_2m_max,temperature_2m_min',
          current_weather: true,
          weathercode: true,
          feels_like: true,
          air_quality: true,
          timezone: 'auto',
          forecast_hours: 24,
        },
      },
    );
    // console.log('Weather Data', JSON.stringify(weatherResponse?.data));
    dispatch({
      type: types.GET_WEATHER_DATA,
      payload: weatherResponse?.data
    })
  } catch (error) {
    console.log(error);
  }
}
