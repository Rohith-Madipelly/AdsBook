import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from 'expo-font';

// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import Screen from './src/screens/index'

// Redux
import { Provider } from "react-redux";
import { store } from './src/redux/store';
import BottomTabScreen from './src/Navigations/BottomTabScreen';


SplashScreen.preventAutoHideAsync();


export default function App() {

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



  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
}


