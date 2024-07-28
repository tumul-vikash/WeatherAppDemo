/* eslint-disable react-native/no-inline-styles */
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RNLocation from 'react-native-location';
import {useSelector} from 'react-redux';

import {getCurrentLocation, getWeatherData} from '../../redux/actions/Home';

import {WMO_CODES} from '../../utils/utils';

import WeeklyWeather from './WeeklyWeather';
import HourlyWeather from './HourlyWeather';

const Home = () => {
  const {CityDetails, WeatherData} = useSelector(state => state.HomeReducer);

  console.log(JSON.stringify(WeatherData));

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(locations => {
          console.log(locations);
          getCurrentLocation(locations);
          getWeatherData(locations);
        });
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {CityDetails && (
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            {CityDetails?.city +
              ', ' +
              CityDetails?.principalSubdivision +
              ', ' +
              CityDetails?.countryCode}
          </Text>
        </View>
      )}
      {WeatherData && (
        <View style={styles.dailyWeather}>
          <View style={styles.box1}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 40,
                  color: '#111111',
                }}>
                {WeatherData?.current_weather?.temperature +
                  ' ' +
                  WeatherData?.current_weather_units?.temperature}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 18,
                  color: '#3E3E3E',
                }}>
                {WeatherData?.current_weather?.windspeed +
                  ' ' +
                  WeatherData?.current_weather_units?.windspeed}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 18,
                  color: '#3E3E3E',
                }}>
                {WMO_CODES[WeatherData?.current_weather?.weathercode]}
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              data={WeatherData?.daily?.time}
              renderItem={({item, index}) => (
                <WeeklyWeather data={item} index={index} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
      {WeatherData && (
        <View style={styles.hourlyWeather}>
          {WeatherData?.hourly?.time.map((item, index) => (
            <HourlyWeather data={item} index={index} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  headingContainer: {
    borderRadius: 30,
    width: '70%',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#040D88',
    alignSelf: 'center',
  },
  heading: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  dailyWeather: {
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: '#EFEFEF',
    padding: 15,
    marginBottom: 20,
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hourlyWeather: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#EFEFEF',
    padding: 15,
  },
});
