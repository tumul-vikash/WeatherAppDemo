import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const WeeklyWeather = ({data, index}) => {
  const {WeatherData} = useSelector(state => state.HomeReducer);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{data}</Text>
      <Text style={styles.tempMax}>
        {WeatherData?.daily?.temperature_2m_max[index] +
          ' ' +
          WeatherData?.daily_units?.temperature_2m_max}
      </Text>
      <Text style={styles.tempMin}>
        {WeatherData?.daily?.temperature_2m_min[index] +
          ' ' +
          WeatherData?.daily_units?.temperature_2m_max}
      </Text>
    </View>
  );
};

export default WeeklyWeather;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7,
  },
  heading: {
    color: '#111111',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  tempMax: {
    color: '#3E3E3E',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  tempMin: {
    color: '#3E3E3E',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  }
});
