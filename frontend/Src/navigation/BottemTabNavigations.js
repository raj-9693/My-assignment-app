import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeScreen ,CompetitionDetailsScreen,
        Registered,
        paymentsSuccessful,
       paymentsScreen,
}  from '../Screen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Component
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, }}
    >
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="Details" component={CompetitionDetailsScreen} />
     
    </Tab.Navigator>
  );
}

// Main Stack Navigator Component
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* //BottemTab */}
        <Stack.Screen name="MainTabs" component={BottomTabs} />

           {/* //Navigation Screen */}
        <Stack.Screen name="Registered" component={Registered} />
         <Stack.Screen name="paymentsSuccessful" component={paymentsSuccessful} />
          <Stack.Screen name="payments" component={paymentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}