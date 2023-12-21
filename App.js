import React, { useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Reels from './src/screens/Reels';
import Profile from './src/screens/Profile';


export default function App() {  




  // const navigation = useNavigation();
  
  // Check if the current route is the "Reels" screen
  // const isOnReelsPage = navigation.getCurrentRoute().name === 'Reels';


  const [fontsLoaded] = useFonts({
    "Jost-Italic-VariableFont": require("./assets/fonts/Jost-Italic-VariableFont_wght.ttf"),
    "Jost-VariableFont": require("./assets/fonts/Jost-VariableFont_wght.ttf"),


    "Os_Condensed-medium": require("./assets/fonts/OpenSans_Condensed-Medium.ttf"),
    "Os_Condensed-regular": require("./assets/fonts/OpenSans_Condensed-Regular.ttf"),
    "Os_Condensed-semi_bold": require("./assets/fonts/OpenSans_Condensed-SemiBold.ttf"),
  });

  useEffect(() => {
    async function loadFont() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    loadFont();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  const Tab = createBottomTabNavigator();

  // Method for BottomTabScreen Better to create External one
  const BottomTabScreen = ({ route }) => {

    // const navigation = useNavigation();
    // const isOnReelsPage = navigation;

    // console.log(isOnReelsPage)


    return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50
          },
          tabBarIcon: ({ focused, size, colour }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
              size = focused ? size + 8 : size + 2;
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "ios-search-outline";
              size = focused ? size + 8 : size + 2;

            }
            else if (route.name === "Reels") {
              iconName = focused ? "caret-forward-circle" : "caret-forward-circle-outline";
              size = focused ? size + 8 : size + 2;

            }
            else if (route.name === "Activity") {
              iconName = focused ? "ios-heart" : "ios-heart-outline";
              size = focused ? size + 8 : size + 2;

            }
            else if (route.name === "Profile") {
              iconName = focused ? "ios-person-circle" : "ios-person-outline";
              size = focused ? size + 8 : size + 2;

            }
           return <Ionic name={iconName} size={size} color={colour} />
          }
        })}>


        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Reels" component={Reels} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} />
        
      </Tab.Navigator>)
  }

 
  return (
    <NavigationContainer >
      {/* <StatusBar style="auto" /> */}
      <BottomTabScreen />
    </NavigationContainer>
  );
}


