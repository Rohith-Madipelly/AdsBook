import { createStackNavigator } from "@react-navigation/stack";
import { useState,useMemo, useEffect } from "react";

import Welcome from "./Welcome";

import Login from "./AuthScreens/Login";
import Register from "./AuthScreens/Register";
import Forgot from "./AuthScreens/Forgot";
import OtpScreen from "./AuthScreens/OtpScreen";

import New from "./AuthScreens/New";

import RestPassword from "./AuthScreens/RestPassword";
import BottomTabScreen from '../Navigations/BottomTabScreen'

import ASO from "../utils/AsyncStorage_Calls";

import { useSelector,useDispatch } from "react-redux";
import { setToken } from '../../src/redux/actions/loginAction'
import Profile from "./MainScreens/Profiles/Profile";
import Password from "./MainScreens/Profiles/Password";
import Notifications from "./MainScreens/Profiles/Notifications";
import About from "./MainScreens/Profiles/About";
import RateReview from "./MainScreens/Profiles/Rate&Review";
import PrivacyPolicy from "./MainScreens/Profiles/PrivacyPolicy";
import ShareApp from "./MainScreens/Profiles/ShareApp";
import Help from "./MainScreens/Profiles/Help";


export default function Screens() {
  const [user,setUser] =useState(true)

  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const loginSelector = useSelector((state) => state.isLogin);


  const verifyToken = async () => { 
      ASO.getTokenJWT('Token', (error, token) => {
        if (error) {
          console.error('Error getting token:', error);
        } else {
          // console.log('Retrieved token:', token);
          if(token!=null){
            dispatch(setToken(token));
            console.log(token)
          }
        }
      });
  }

// setUser(loginSelector)
useEffect(()=>{
  verifyToken();
},[])

useEffect(() => {
  setUser(loginSelector)
  // console.log("loginSelector",loginSelector)

}, [loginSelector])




  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
     
    >{
      user?(
      <Stack.Group screenOptions={{animationTypeForReplace:'pop',}}>

      <Stack.Screen name="Bottom-navigator" component={BottomTabScreen} />

      <Stack.Screen name="ProfileProfile" component={Profile} />
      <Stack.Screen name="ProfilePassword" component={Password} />
      <Stack.Screen name="ProfileNotifications" component={Notifications} />
      <Stack.Screen name="ProfileAbout" component={About} />
      <Stack.Screen name="ProfileRateAndReview" component={RateReview} />
      <Stack.Screen name="ProfilePrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ProfileShareApp" component={ShareApp} />
      <Stack.Screen name="ProfileHelp" component={Help} />

    
      </Stack.Group>
      ):(
      <Stack.Group>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} /> 
      <Stack.Screen name="ForgotPassword" component={Forgot} /> 
       {/* <Stack.Screen name="OtpScreen" component={OtpScreen} /> */}
       <Stack.Screen name="OtpScreen" component={New} />

      <Stack.Screen name="RestPassword" component={RestPassword} /> 




      </Stack.Group>
      )
      }
    </Stack.Navigator>
  );
}

