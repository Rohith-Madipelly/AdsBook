// BottomTabScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

import Home from '../screens/MainScreens/Home';
import Wallet from '../screens/MainScreens/Wallet';
import Reels from '../screens/MainScreens/Reels';
import Reels2 from '../screens/MainScreens/Reels copy';
import Profile from '../screens/MainScreens/Profile';
import { Platform } from 'react-native';


const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ route }) => {



  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') {
      // Check iOS version to apply different heights
      const majorVersion = parseInt(Platform.Version, 10);
      return majorVersion >= 11 ? 75 : 50; // iOS 11+ for devices with notches
    }
    return 50; // Default for Android
  };



  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarStyle: {
        height: getTabBarHeight()
      },
      tabBarIcon: ({ focused, size, colour }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home-sharp" : "home-outline";
          size = focused ? size + 8 : size + 2;
        } 
        else if (route.name === "Wallet") {
          iconName = focused ? "wallet" : "wallet-outline";
          size = focused ? size + 8 : size + 2;

        }

        else if (route.name === "Reels") {
          iconName = focused ? "caret-forward-circle" : "caret-forward-circle-outline";
          size = focused ? size + 8 : size + 2;

        }
        else if (route.name === "Activity") {
          iconName = focused ? "wallet" : "wallet-outline";
          size = focused ? size + 8 : size + 2;

        }
        else if (route.name === "Profile") {
          iconName = focused ? "person-circle" :  "person-circle-outline" ;
          size = focused ? size + 8 : size + 2;

        }
       return <Ionic name={iconName} size={size} color={colour} />
      }
    })}>

      {/* <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Reels" component={Reels2} options={{ headerShown: false }} />

      <Tab.Screen name="Wallet" component={Wallet} options={{
          headerShown: true, // Show the header
          headerBackVisible: true, // Hide the back button
        }} />

      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>



  );
};

export default BottomTabScreen;



















