import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../containers/Home/Home';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
