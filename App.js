import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Reels from './src/screens/Reels';
import Profile from './src/screens/Profile';





export default function App() {


  const windoWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height


  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () => {
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
              iconName = focused ? "search" : "ios-search-outline"
            }
            else if (route.name === "Reels") {
              iconName = focused ? "caret-forward-circle" : "caret-forward-circle-outline"
            }
            else if (route.name === "Activity") {
              iconName = focused ? "ios-heart" : "ios-heart-outline"
            }
            else if (route.name === "Profile") {
              iconName = focused ? "ios-person-circle" : "ios-person-outline"
            }
           return <Ionic name={iconName} size={size} color={colour} />
          }

        })}>



        <Tab.Screen name="Home" component={Reels} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Reels" component={Reels} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} />




      </Tab.Navigator>)
  }
  
  return (
    <NavigationContainer >
      <StatusBar style="auto" />

      {/* <Stack.Navigator> */}
      <BottomTabScreen />
      {/* <Stack.Screen name='AdsBook' component={BottomTabScreen} options={{ headerShown: true }}/> */}
      {/* <Stack.Screen name='Reels' component={Reels} options={{ headerShown: false }}/> */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}
//  App;
const styles = StyleSheet.create({
  NavigationContainer: {
    backgroundColor: "red"
  },
});


