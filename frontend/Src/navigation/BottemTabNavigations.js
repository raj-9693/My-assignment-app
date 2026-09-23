
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeScreen ,CompetitionDetailsScreen,
        Registered,
        paymentsSuccessful,
         }  from '../Screen';
import { getActiveCompetition } from '../Services/competitionApi';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Component
function BottomTabs() {
  const [competitionData, setCompetitionData] = useState(null);

  useEffect(() => {
    let isActive = true;

    getActiveCompetition()
      .then((response) => {
        const result = response?.data?.data || response?.data;

        if (isActive && result) {
          setCompetitionData(result);
        }
      })
      .catch((error) => {
        console.log('Unable to load competition for Home:', error?.message || error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, }}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen {...props} competitionData={competitionData} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Details">
        {(props) => (
          <CompetitionDetailsScreen
            {...props}
            onCompetitionLoaded={setCompetitionData}
          />
        )}
      </Tab.Screen>
     
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}