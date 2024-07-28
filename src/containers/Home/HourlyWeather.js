/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';

const HourlyWeather = ({data, index}) => {
  const {WeatherData} = useSelector(state => state.HomeReducer);

  return (
    <View style={styles.container} key={index}>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 16,
          color: '#111111',
          textAlign: 'center',
          width: '33%'
        }}>
        {moment(data).format('hh:mm a')}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#11111178',
          textAlign: 'center',
          width: '33%'
        }}>
        {WeatherData?.hourly?.temperature_2m[index] +
          ' ' +
          WeatherData?.hourly_units?.temperature_2m}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#11111178',
          textAlign: 'center',
          width: '33%'
        }}>
        {WeatherData?.hourly?.wind_speed_10m[index] +
          ' ' +
          WeatherData?.hourly_units?.wind_speed_10m}
      </Text>
    </View>
  );
};

export default HourlyWeather;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
